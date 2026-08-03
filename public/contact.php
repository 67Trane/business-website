<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

/** @return never */
function respond(int $status, string $message): void
{
    http_response_code($status);
    echo json_encode(['message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function input(string $key): string
{
    return trim((string) ($_POST[$key] ?? ''));
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

/** @return array{host: string, port: int, username: string, password: string} */
function smtpConfig(): array
{
    $configPath = $_SERVER['CONTACT_SMTP_CONFIG'] ?? getenv('CONTACT_SMTP_CONFIG');
    if (!is_string($configPath) || trim($configPath) === '') {
        $configPath = dirname(__DIR__) . '/private/contact-smtp.php';
    }

    if (!is_readable($configPath)) {
        throw new RuntimeException('SMTP configuration is missing.');
    }

    $config = require $configPath;
    if (!is_array($config)) {
        throw new RuntimeException('SMTP configuration is invalid.');
    }

    $host = trim((string) ($config['host'] ?? ''));
    $port = (int) ($config['port'] ?? 0);
    $username = trim((string) ($config['username'] ?? ''));
    $password = (string) ($config['password'] ?? '');

    if ($host === '' || $port < 1 || $username === '' || $password === '') {
        throw new RuntimeException('SMTP configuration is incomplete.');
    }

    return [
        'host' => $host,
        'port' => $port,
        'username' => $username,
        'password' => $password,
    ];
}

/**
 * Real visitor IP. Cloudflare sits in front of the site, so REMOTE_ADDR is a
 * Cloudflare edge address and would rate-limit everyone into one bucket.
 */
function clientIp(): string
{
    $forwarded = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? '';
    if (is_string($forwarded) && filter_var($forwarded, FILTER_VALIDATE_IP) !== false) {
        return $forwarded;
    }

    return (string) ($_SERVER['REMOTE_ADDR'] ?? '');
}

/**
 * Key for the submit tokens. Stored outside the web root on first use; if that
 * directory is not writable the fallback is still stable per installation and
 * not derivable from outside, which is all the token needs.
 */
function formSecret(): string
{
    static $cached = null;
    if (is_string($cached)) {
        return $cached;
    }

    $path = dirname(__DIR__) . '/private/form-secret.txt';
    if (is_readable($path)) {
        $stored = trim((string) @file_get_contents($path));
        if ($stored !== '') {
            return $cached = $stored;
        }
    }

    $directory = dirname($path);
    if (is_dir($directory) && is_writable($directory)) {
        try {
            $generated = bin2hex(random_bytes(32));
            if (@file_put_contents($path, $generated, LOCK_EX) !== false) {
                @chmod($path, 0600);
                return $cached = $generated;
            }
        } catch (Throwable $ignored) {
            // fall through to the derived fallback
        }
    }

    // Deliberately without filemtime(): re-uploading this file must not
    // invalidate the tokens of visitors who already have the form open.
    return $cached = hash('sha256', __FILE__ . '|' . php_uname('n'));
}

function tokenFor(int $issuedAt): string
{
    return hash_hmac('sha256', (string) $issuedAt, formSecret());
}

/**
 * A valid token proves the sender fetched it from this script first, i.e. ran
 * the page's JavaScript. The scattergun bots that POST straight at any *.php
 * they find cannot produce one. Deliberately no minimum age: a real visitor
 * whose token request was slow must never be turned away.
 */
function tokenValid(string $token, string $issuedAtRaw): bool
{
    if ($token === '' || $issuedAtRaw === '' || !ctype_digit($issuedAtRaw)) {
        return false;
    }

    $age = time() - (int) $issuedAtRaw;
    if ($age < -60 || $age > 43200) {
        return false;
    }

    return hash_equals(tokenFor((int) $issuedAtRaw), $token);
}

/** Caps how often one visitor can submit; degrades open if no writable store. */
function rateLimited(): bool
{
    $directory = sys_get_temp_dir() . '/md-contact-rl';
    if (!is_dir($directory)) {
        @mkdir($directory, 0700, true);
    }
    if (!is_dir($directory) || !is_writable($directory)) {
        return false;
    }

    $file = $directory . '/' . hash('sha256', clientIp()) . '.txt';
    $now = time();
    $recent = [];

    if (is_readable($file)) {
        foreach (explode(',', (string) @file_get_contents($file)) as $entry) {
            $entry = trim($entry);
            if (ctype_digit($entry) && $now - (int) $entry < 3600) {
                $recent[] = (int) $entry;
            }
        }
    }

    // Generous on purpose: most visitors are on mobile networks where many
    // subscribers share one public address, so a tight cap would eventually
    // turn away a real enquiry. Still hard enough to make bulk abuse pointless.
    if (count($recent) >= 10) {
        return true;
    }

    $recent[] = $now;
    @file_put_contents($file, implode(',', $recent), LOCK_EX);

    return false;
}

// Token handout for the form script.
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET' && isset($_GET['token'])) {
    $issuedAt = time();
    echo json_encode(['ts' => $issuedAt, 'token' => tokenFor($issuedAt)]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: GET, POST');
    respond(405, 'Method not allowed.');
}

// Honeypot: real visitors never see or fill this field.
if (input('website') !== '') {
    respond(200, 'Message sent.');
}

// Unlike the honeypot this is answered with a real error: the bots this stops
// fire and forget, so silence would only mislead a genuine visitor whose token
// request failed into believing the enquiry went out.
if (!tokenValid(input('form_token'), input('form_ts'))) {
    respond(403, 'Invalid or missing form token.');
}

if (rateLimited()) {
    respond(429, 'Too many requests. Please try again later.');
}

$name = input('name');
$email = input('email');
$company = input('company');
$phone = input('phone');
$message = input('message');

if (
    $name === '' ||
    $message === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    preg_match('/[\r\n]/', $name . $email) === 1
) {
    respond(422, 'Please check the required fields.');
}

if (
    textLength($name) > 100 ||
    textLength($email) > 254 ||
    textLength($company) > 150 ||
    textLength($phone) > 50 ||
    textLength($message) > 5000
) {
    respond(422, 'One or more fields are too long.');
}

$recipient = 'info@mehmet-deliaci.net';
$sender = 'noreply@mehmet-deliaci.net';
$subject = 'Neue Projektanfrage von ' . $name;
$body = implode("\n", [
    'Neue Anfrage über mehmet-deliaci.net',
    '',
    'Name: ' . $name,
    'E-Mail: ' . $email,
    'Telefon: ' . ($phone !== '' ? preg_replace('/[\r\n]+/', ' ', $phone) : '–'),
    'Unternehmen: ' . ($company !== '' ? $company : '–'),
    '',
    'Nachricht:',
    $message,
]);

try {
    $smtp = smtpConfig();

    require_once __DIR__ . '/vendor/phpmailer/src/Exception.php';
    require_once __DIR__ . '/vendor/phpmailer/src/PHPMailer.php';
    require_once __DIR__ . '/vendor/phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtp['host'];
    $mail->Port = $smtp['port'];
    $mail->SMTPAuth = true;
    $mail->Username = $smtp['username'];
    $mail->Password = $smtp['password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Timeout = 10;

    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Encoding = PHPMailer::ENCODING_QUOTED_PRINTABLE;
    $mail->Hostname = 'mehmet-deliaci.net';
    $mail->setFrom($sender, 'Website');
    $mail->Sender = $sender;
    $mail->addAddress($recipient);
    $mail->addReplyTo($email, $name);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->isHTML(false);
    $mail->send();
} catch (Throwable $exception) {
    error_log('Contact form delivery failed: ' . $exception->getMessage());
    respond(500, 'The message could not be sent.');
}

respond(200, 'Message sent.');
