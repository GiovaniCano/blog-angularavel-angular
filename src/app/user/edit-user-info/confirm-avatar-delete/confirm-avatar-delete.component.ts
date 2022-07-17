import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-confirm-avatar-delete',
  templateUrl: './confirm-avatar-delete.component.html',
  styleUrls: ['./confirm-avatar-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmAvatarDeleteComponent implements OnDestroy {
  private deleteAvatarSubs?: Subscription

  @Output() closeModal = new EventEmitter<boolean>()

  @HostListener('window:keydown.escape') escapeKey = () => this.cancel()

  constructor(private _authService: AuthService) { }

  cancel(): void {
    this.closeModal.emit(false)
  }

  deleteAvatar(): void {
    this._authService.deleteAvatar().subscribe(()=>this.closeModal.emit(true))    
  }

  ngOnDestroy(): void {
    this.deleteAvatarSubs?.unsubscribe()
  }
}
