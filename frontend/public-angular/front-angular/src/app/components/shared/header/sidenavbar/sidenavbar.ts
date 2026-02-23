import { Component, inject, signal } from '@angular/core';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-sidenavbar',
  imports: [],
  templateUrl: './sidenavbar.html',
  styleUrls: ['./sidenavbar.scss'],
})
export class Sidenavbar {
  menuService = inject(MenuService);
}
