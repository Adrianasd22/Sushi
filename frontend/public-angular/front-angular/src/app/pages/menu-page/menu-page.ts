import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Header } from "../../components/shared/header/header";

@Component({
  selector: 'app-menu-page',
  imports: [Header],
  templateUrl: './menu-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage { 
  titulo = input.required();
}
