import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Mehmet Deliaci · Webentwicklung & digitale Lösungen',
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
  // Unknown routes redirect to the home page.
  { path: '**', redirectTo: '' },
];
