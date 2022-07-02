import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss', './menus.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMenuComponent {
  showmenu: boolean = false

  @HostListener('click') toggleMenu(){
    this.showmenu = !this.showmenu
  }
  @HostListener('mouseleave') closeMenu() {
    this.showmenu = false
  }
}
