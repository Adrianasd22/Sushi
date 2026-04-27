import { NgModule, signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu-page/menu-page';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';


export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'menu',
    component: MenuPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  // {
  //   path: 'registration',
  // },
  {
    path: '**', //Cualquier ruta que no sea las anteriores
    loadComponent: () => import('./pages/error404-page/error404-page').then((m) => m.Error404Page),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
