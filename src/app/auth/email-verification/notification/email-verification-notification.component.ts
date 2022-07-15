import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './email-verification-notification.component.html',
  styleUrls: ['./email-verification-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'container-sm'}
})
export class EmailVerificationNotificationComponent implements OnInit, OnDestroy {
  email$: Observable<string> = this._authService.session$.pipe(map(session=>session.email))

  private emailSubs?: Subscription

  buttonIsDisabled:boolean = false

  constructor(private _authService: AuthService, private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.disableButton()
  }

  ngOnDestroy(): void {
    this.emailSubs?.unsubscribe()
  }

  sendEmail():void {
    this.disableButton()
    this.emailSubs = this._authService.sendVerificationEmail().subscribe()
  }
  
  disableButton() {
    this.buttonIsDisabled = true
    setTimeout(() => {
      this.buttonIsDisabled = false
      this._cd.detectChanges()
    }, 10500); // 10.5 sec. api:ThrottleRequests:6,1
  }
}
