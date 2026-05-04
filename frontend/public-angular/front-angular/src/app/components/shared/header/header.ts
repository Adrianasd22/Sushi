import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { Logo } from "../logo/logo";
import { MenuService } from '../../../services/menu.service';
import { Sidenavbar } from "./sidenavbar/sidenavbar";
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Logo, Sidenavbar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private router = inject(Router);
  goToOrder() {
    this.router.navigate(['/order']);
  }

  orderService = inject(OrderService);
  totalItems = this.orderService.totalItems;

  showLangOptions = signal(false);
  currentLang = signal('ES');

  menuService = inject(MenuService);
  
  /**
   * IDIOMAS
   */
  LangToggle() {
    this.showLangOptions.set(true);
  }
  setLang(lang: string) {
    this.currentLang.set(lang);
    this.showLangOptions.set(false);
  }
}
