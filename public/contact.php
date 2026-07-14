<?php
declare(strict_types=1);

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
    textLength($message) > 5000
) {
    respond(422, 'One or more fields are too long.');
}

$recipient = 'info@mehmet-deliaci.net';
$subject = 'Neue Projektanfrage von ' . $name;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$body = implode("\n", [
    'Neue Anfrage über mehmet-deliaci.net',
    '',
    'Name: ' . $name,
    'E-Mail: ' . $email,
    'Unternehmen: ' . ($company !== '' ? $company : '–'),
    '',
    'Nachricht:',
    $message,
]);
$headers = implode("\r\n", [
    'From: Website <noreply@mehmet-deliaci.net>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

if (!mail($recipient, $encodedSubject, $body, $headers)) {
    respond(500, 'The message could not be sent.');
}

respond(200, 'Message sent.');
