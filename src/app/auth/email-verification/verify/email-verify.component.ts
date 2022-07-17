import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailVerifyComponent implements OnInit, OnDestroy {
  private paramsSubs!: Subscription
  private emailVerifySubs?: Subscription
  private sendEmailSubs?: Subscription

  response: boolean = false
  success?: boolean

  constructor(
    private _authService: AuthService, 
    private _route: ActivatedRoute, 
    private _router: Router,
    private _cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.paramsSubs = this._route.paramMap.subscribe(
      params => {
        const token = params.get('token') ?? ''
        this.emailVerifySubs = this._authService.emailVerify(token).subscribe({
          error: () => this.updateView(false),
          next: () => this.updateView(true),
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.paramsSubs.unsubscribe()
    this.emailVerifySubs?.unsubscribe()
    this.sendEmailSubs?.unsubscribe()
  }

  sendEmail(): void {
    this.response = false
    this.success = false
    this.sendEmailSubs = this._authService.sendVerificationEmail().subscribe(
      () => this._router.navigate(['/email/notification'])
    )
  }

  updateView(success:boolean): void {
    this.success = success
    this.response = true
    this._cd.detectChanges()
  }
}
