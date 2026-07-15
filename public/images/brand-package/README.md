# Mehmet Deliaci – Logo- und Favicon-Paket

## Empfohlene Dateien für die Website

- `favicons/favicon.ico`: klassisches Browser-Favicon mit 16, 32 und 48 px
- `favicons/apple-touch-icon.png`: Apple-Touch-Icon, 180 × 180 px
- `favicons/icon-192.png`: PWA-/Android-Icon, 192 × 192 px
- `favicons/icon-512.png`: PWA-/App-Icon, 512 × 512 px
- `favicons/icon-maskable-512.png`: Maskable-PWA-Icon mit zusätzlichem Sicherheitsabstand
- `favicons/site.webmanifest`: Web-App-Manifest

Die Ordner `favicons/dark` und `favicons/light` enthalten zusätzlich alle Einzelgrößen von 16 bis 512 px. Die SVG-Dateien im Ordner `masters` sind die sauberen, skalierbaren Ausgangsdateien.

## Einbau in HTML

```html
<link rel="icon" href="/favicons/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg">
<link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png">
<link rel="manifest" href="/favicons/site.webmanifest">
<meta name="theme-color" content="#062843">
```

Kopiere dafür `masters/favicon-dark.svg` zusätzlich als `favicons/favicon.svg` in dein Webprojekt oder passe den Pfad im HTML an.

## Hinweise

Das kleine MD-Zeichen wurde für gute Lesbarkeit bei 16 × 16 px vereinfacht und sauber als Vektor rekonstruiert. Schatten und Präsentationshintergrund aus der ursprünglichen Übersicht wurden bewusst entfernt. Die bisherigen großen Hauptlogo-Ausschnitte liegen im Ordner `logos-aus-uebersicht`; sie stammen weiterhin aus der gelieferten Rasterübersicht und sind keine echten Vektordateien.
