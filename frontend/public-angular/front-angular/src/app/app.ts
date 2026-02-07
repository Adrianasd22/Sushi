import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPage } from "./pages/menu-page/menu-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuPage],
  templateUrl: 'app.html',
  styles: [],
})
export class App {
  title = signal('Angular');
  titulo = signal('');
}
