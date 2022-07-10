import { ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss', './menus.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMenuComponent implements OnDestroy {
  showmenu: boolean = false

  @Input() name!:string 
  @Input() avatar!:string|null

  @HostListener('click') toggleMenu(){
    this.showmenu = !this.showmenu
  }
  @HostListener('mouseleave') closeMenu() {
    this.showmenu = false
  }

  logoutSubs?: Subscription

  constructor(private _authService: AuthService) { }

  ngOnDestroy(): void {
    this.logoutSubs?.unsubscribe()
  }

  logout() {
    this.logoutSubs = this._authService.logout().subscribe()
  }
}
