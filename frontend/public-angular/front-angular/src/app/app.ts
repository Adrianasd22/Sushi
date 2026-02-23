import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPage } from "./pages/menu-page/menu-page";
import { Header } from "./components/shared/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: 'app.html',
  styleUrl: './../styles.scss',
})
export class App {
  title = signal('Angular');
  titulo = signal('');
}
