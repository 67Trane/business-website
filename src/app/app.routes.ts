import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Webentwickler Weißenburg – Websites & Web-Apps | Mehmet Deliaci',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'impressum',
    title: 'Impressum · Mehmet Deliaci',
    loadComponent: () => import('./pages/legal/imprint').then((m) => m.Imprint),
  },
  {
    path: 'datenschutz',
    title: 'Datenschutz · Mehmet Deliaci',
    loadComponent: () => import('./pages/legal/privacy').then((m) => m.Privacy),
  },
  {
    // Explicit route so prerendering emits /404/index.html, which Apache
    // serves for unknown paths via ErrorDocument (see public/.htaccess).
    path: '404',
    title: 'Seite nicht gefunden · Mehmet Deliaci',
    loadComponent: () => import('./pages/not-found').then((m) => m.NotFound),
  },
  // Unknown routes show the 404 page (client-side navigation).
  {
    path: '**',
    title: 'Seite nicht gefunden · Mehmet Deliaci',
    loadComponent: () => import('./pages/not-found').then((m) => m.NotFound),
  },
];
