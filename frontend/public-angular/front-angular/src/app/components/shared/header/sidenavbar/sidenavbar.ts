import { Component, inject, signal } from '@angular/core';
import { MenuService } from '../../../../services/menu.service';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Instagram, Facebook, MessageCircle, Twitter } from 'lucide-angular';

@Component({
  selector: 'app-sidenavbar',
  imports: [RouterLink, LucideAngularModule,],
  templateUrl: './sidenavbar.html',
  styleUrls: ['./sidenavbar.scss'],
})
export class Sidenavbar {
  readonly Instagram = Instagram;
  readonly Facebook = Facebook;
  readonly MessageCircle = MessageCircle;
  readonly Twitter = Twitter;


  menuService = inject(MenuService);
  navigateAndClose() {
    this.menuService.close();
  }
}
