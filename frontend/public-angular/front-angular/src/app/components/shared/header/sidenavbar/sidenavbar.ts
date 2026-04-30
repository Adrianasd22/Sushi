import { Component, inject, signal } from '@angular/core';
import { MenuService } from '../../../../services/menu.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  imports: [RouterLink],
  templateUrl: './sidenavbar.html',
  styleUrls: ['./sidenavbar.scss'],
})
export class Sidenavbar {
  menuService = inject(MenuService);
}
