import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { Logo } from "../logo/logo";
import { MenuService } from '../../../services/menu.service';
import { Sidenavbar } from "./sidenavbar/sidenavbar";

@Component({
  selector: 'app-header',
  imports: [Logo, Sidenavbar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {

  showLangOptions = signal(false);
  currentLang = signal('ES');

  /**
   * MENU SIDENAVBAR
   */
  
  menuService = inject(MenuService);

  // scrolled = signal(false);
  // @HostListener('window:scroll')
  // onScroll() {
  //     this.scrolled.set(window.scrollY > 0);
  // }



  
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
