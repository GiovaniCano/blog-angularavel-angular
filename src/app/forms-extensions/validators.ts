import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { map, Observable } from "rxjs";

export const passwordConfirmation: ValidatorFn = (passwordsGroup: AbstractControl): null | ValidationErrors => {
    const password = passwordsGroup.get('password') as FormControl
    const password_confirmation = passwordsGroup.get('password_confirmation') as FormControl

    return password.value === password_confirmation.value ? null : { passwordConfirmation: true }
}

export function isEmailAvailable(authService: AuthService): AsyncValidatorFn {
    return function (input: AbstractControl): Observable<ValidationErrors | null> {
        return authService.isEmailAvailable(input.value).pipe(
            map(res => res ? null : { isEmailAvailable: true })
        )
    }
}
export function isNameAvailable(authService: AuthService): AsyncValidatorFn {
    return function (input: AbstractControl): Observable<ValidationErrors | null> {
        return authService.isNameAvailable(input.value).pipe(
            map(res => res ? null : { isEmailAvailable: true })
        )
    }
}

export const alphaNumExtras: ValidatorFn = (input: AbstractControl): null | ValidationErrors => {
    const regex = new RegExp(/^[-\w .']+$/)
    return regex.test(input.value) ? null : { alphaNumExtras: true }
}

export const password: ValidatorFn = (input: AbstractControl): null | ValidationErrors => {
    /* https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/ */
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")
    return regex.test(input.value) ? null : { password: true }
}