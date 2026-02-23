import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  isOpen = signal(false);

  toggle() {
    this.isOpen.update(value => !value);
    this.handleBodyScroll();
  }

  close() {
    this.isOpen.set(false);
    this.handleBodyScroll();
  }

  private handleBodyScroll() {
    document.body.style.overflow = this.isOpen() ? 'hidden' : '';
  }

}
