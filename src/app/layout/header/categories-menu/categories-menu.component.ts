import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss', '../menus.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesMenuComponent {
  showmenu: boolean = false
  @HostListener('click') toggleMenu(){
    this.showmenu = !this.showmenu
  }
  @HostListener('mouseleave') closeMenu() {
    this.showmenu = false
  }
}
