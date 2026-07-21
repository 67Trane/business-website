# SMTP-Konfiguration des Kontaktformulars

Das Kontaktformular verschickt ausschließlich eine interne Benachrichtigung an
`info@mehmet-deliaci.net`. Der Besucher wird als `Reply-To` gesetzt und erhält keine
automatische E-Mail.

## Einmalige Server-Einrichtung

1. Im ALL-INKL-KAS muss das Postfach `noreply@mehmet-deliaci.net` existieren.
2. `deploy/contact-smtp.example.php` lokal kopieren und in `contact-smtp.php` umbenennen.
3. Das echte Postfach-Passwort in dieser Kopie eintragen.
4. Auf dem Webspace neben dem Document-Root einen Ordner `private` anlegen.
5. Die Konfiguration dorthin hochladen. Der erwartete Pfad ist:
   `<document-root>/../private/contact-smtp.php`.
6. Die Datei darf nicht in Git, `public/` oder `dist/` liegen. Wenn der FTP-Client
   Dateirechte unterstützt, nur dem Webspace-Benutzer Leserechte geben.

Beispiel: Liegt die öffentliche `contact.php` unter
`.../mehmet-deliaci.net/contact.php`, liegt die geheime Konfiguration unter
`.../private/contact-smtp.php`.

Falls die Domain direkt auf das oberste Verzeichnis des Webspace zeigt und der
Standardpfad deshalb nicht angelegt werden kann, kann der absolute Pfad über die
Servervariable `CONTACT_SMTP_CONFIG` vorgegeben werden. In diesem Fall nur den Pfad,
niemals das Passwort, in die Serverkonfiguration eintragen.

Der konfigurierte SMTP-Host ist `w01f9f1f.kasserver.com`, Port `465`, mit direktem
SSL/TLS und Anmeldung über die vollständige E-Mail-Adresse. Falls der KAS für das
Postfach einen anderen Servernamen anzeigt, hat die Angabe aus dem KAS Vorrang.

## Deployment

```bash
npm run build
```

Anschließend wie bisher den Inhalt von `dist/business-portfolio/browser/` per FTP in
den Document-Root hochladen. Die geheime Konfiguration wird nicht vom Angular-Build
kopiert und bleibt bei späteren Deployments erhalten.

## Funktionstest

Nach dem Upload eine Formularanfrage absenden. Im Original der empfangenen Nachricht
prüfen:

- `Return-Path` sollte `noreply@mehmet-deliaci.net` sein.
- Der erste `Received`-Eintrag sollte einen authentifizierten SMTP-Versand erkennen
  lassen und nicht mehr nur `Postfix, from userid ...` zeigen.
- Umlaute wie in `Neue Anfrage über ...` müssen korrekt dargestellt werden.
- `X-Spam` sollte nicht mehr `Yes` sein.
- Falls vorhanden, sollten SPF, DKIM und DMARC in `Authentication-Results` bestehen.

Wenn SMTP fehlschlägt, antwortet das Formular absichtlich nur mit einer allgemeinen
Fehlermeldung. Der konkrete Grund wird serverseitig im PHP-Fehlerprotokoll unter
`Contact form delivery failed` protokolliert, ohne das Passwort auszugeben.
