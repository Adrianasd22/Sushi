import { NgModule, signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu-page/menu-page';


export const routes: Routes = [
  {
    path: '',
    component: MenuPage,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  
}
