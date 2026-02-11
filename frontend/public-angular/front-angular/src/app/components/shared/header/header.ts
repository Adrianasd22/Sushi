import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  showLangOptions = signal(false);
  currentLang = signal('ES');

  // scrolled = signal(false);
  // @HostListener('window:scroll')
  // onScroll() {
  //     this.scrolled.set(window.scrollY > 0);
  // }

  LangToggle() {
    this.showLangOptions.set(true);
  }
  setLang(lang: string) {
    this.currentLang.set(lang);
    this.showLangOptions.set(false);
  }
}
