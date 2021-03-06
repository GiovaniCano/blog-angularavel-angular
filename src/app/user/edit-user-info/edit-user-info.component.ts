import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { validateImage } from 'src/app/forms-extensions/image.validator';
import { alphaNumExtras, isEmailAvailable, isNameAvailable } from 'src/app/forms-extensions/validators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserInfoComponent implements OnInit, OnDestroy {
  private userSubs!: Subscription
  private updateSubs?: Subscription
  private emailVerifySubs?: Subscription

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(25), Validators.minLength(2), alphaNumExtras],
      // asyncValidators: isNameAvailable(this._authService), // ngOnInit()
      // updateOn: "blur"
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.maxLength(255), Validators.minLength(5)],
      // asyncValidators: isEmailAvailable(this._authService), // ngOnInit()
      // updateOn: "blur"
    }),


    description: new FormControl('', [Validators.maxLength(255)]),
    avatar: new FormControl('', [])
  })

  get name() { return this.form.controls.name }
  get email() { return this.form.controls.email }
  get description() { return this.form.controls.description }
  get avatar() { return this.form.controls.avatar }

  avatarFile?: File
  showConfirmDeleteAvatar: boolean = false
  hasAvatar: boolean = false
  isVerified: boolean = true

  constructor(private _authService: AuthService, private _userService: UserService, private _router: Router) { }

  onChangeImage(event: any): void {
    const image: File = event.target.files[0]
    if(!image) return

    const errors = validateImage(image)
    if (errors) {
      this.form.get('avatar')?.setErrors(errors)
    } else {
      this.avatarFile = image
    }
  }

  confirmDeleteAvatar(imageDeleted: boolean): void {
    if(imageDeleted) this.hasAvatar = false
    this.showConfirmDeleteAvatar = !this.showConfirmDeleteAvatar
  }

  onSubmit(): void {
    this.form.markAsPending()

    const form = this.form.controls
    const body = new FormData()
      body.append('name', form.name.value ?? '')
      body.append('email', form.email.value ?? '')
      body.append('description', form.description.value ?? '')
      body.append('_method', 'PUT')
      if(this.avatarFile) body.append('avatar', this.avatarFile)

    this.updateSubs = this._authService.updateUserInfo(body).subscribe(res=>{
      if(res.mustVerifyEmail) {
        this._router.navigate(['/email/notification'])
      } else {
        this._router.navigate(['/user/profile/' + res.user.name])        
      }
    })
  }

  verifyEmail(): void {
    this.emailVerifySubs = this._authService.sendVerificationEmail().pipe(
      tap({finalize: () => this._router.navigate(['/email/notification'])})
    ).subscribe()
  }

  ngOnInit(): void {
    this.userSubs = this._userService.getCurrentUserInfo().subscribe(user => {
      const form = this.form.controls

      form.name.setValue(user.name)
      form.email.setValue(user.email)
      form.description.setValue(user.description)
      if(user.avatar) this.hasAvatar = true
      if(!user.email_verified_at) this.isVerified = false

      form.name.setAsyncValidators(isNameAvailable(this._authService)) // to avoid initial checking
      form.email.setAsyncValidators(isEmailAvailable(this._authService))
    })
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe()
    this.updateSubs?.unsubscribe()
    this.emailVerifySubs?.unsubscribe()
  }

}
