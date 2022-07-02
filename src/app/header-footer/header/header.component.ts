import { ChangeDetectionStrategy, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  logged: boolean = false

  mobileMenu: boolean = false

  constructor(private _renderer: Renderer2) { }

  showMobileMenu() {
    this.mobileMenu = true
    this._renderer.addClass(document.body, 'no-scroll')
  }

  closeMobileMenu() {
    this.mobileMenu = false
    this._renderer.removeClass(document.body, 'no-scroll')
  }
}
