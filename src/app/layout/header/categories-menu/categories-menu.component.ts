import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss', '../menus.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesMenuComponent {
  categories$ = this._postService.getCategories()

  showmenu: boolean = false

  @HostListener('click') toggleMenu() {
    this.showmenu = !this.showmenu
  }
  @HostListener('mouseleave') closeMenu() {
    this.showmenu = false
  }

  constructor(private _postService: PostService) { }
}
