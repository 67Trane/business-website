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

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Method not allowed.');
}

// Honeypot: real visitors never see or fill this field.
if (input('website') !== '') {
    respond(200, 'Message sent.');
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
