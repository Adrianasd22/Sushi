import { NgModule, signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu-page/menu-page';


export const routes: Routes = [
  {
    path: '',
  },
  {
    path: 'menu',
    component: MenuPage,
  },
  {
    path: '/login',
  },
  {
    path: '/registration',
  },
  {
    path: '**', //Cualquier ruta que no sea las anteriores
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
