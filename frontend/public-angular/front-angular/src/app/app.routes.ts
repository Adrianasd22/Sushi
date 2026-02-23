import { NgModule, signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu-page/menu-page';


export const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  },
  {
    path: 'menu',
    component: MenuPage,
  },
  // {
  //   path: 'login',
  // },
  // {
  //   path: 'registration',
  // },
  {
    path: '**', //Cualquier ruta que no sea las anteriores
    loadComponent: () => import('./pages/error404-page/error404-page').then((m) => m.Error404Page),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
