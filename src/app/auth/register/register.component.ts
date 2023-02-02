import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable, takeUntil} from 'rxjs'

import {IAuthServerError, IRegisterData} from 'src/app/auth/auth.interface'
import {register} from 'src/app/store/auth-store/auth.actions'
import {
  getLoaded,
  getLoading,
  getServerError,
} from 'src/app/store/auth-store/auth.selectors'
import {signUp} from 'src/app/store/shared-store/active-nav/active-nav.actions'
import {NotificationService} from 'src/app/shared/services/notification.service'
import {UnSub} from 'src/app/shared/UnSub.class'

interface IPasswords {
  password: FormControl<string>
  passwordConfirmation: FormControl<string>
}
interface IRegisterForm {
  email: FormControl<string>
  fullName: FormControl<string>
  passwords: FormGroup<IPasswords>
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends UnSub implements OnInit {
  protected registerForm!: FormGroup<IRegisterForm>

  protected loading$: Observable<boolean> = this.store.pipe(select(getLoading))
  protected loaded$: Observable<boolean> = this.store.pipe(select(getLoaded))
  protected serverError$: Observable<
    IAuthServerError | undefined
  > = this.store.pipe(select(getServerError))

  protected get checkEmailErrors(): string {
    if (this.registerForm.controls['email'].hasError('required')) {
      return "Email can't be empty"
    }

    return this.registerForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : ''
  }

  protected get checkFullNameErrors(): string {
    if (this.registerForm.controls['fullName'].hasError('required')) {
      return "Full name can't be empty"
    }

    return this.registerForm.controls['fullName'].hasError('minlength')
      ? 'Full name must be more than 3 symbols'
      : ''
  }

  protected get checkPasswordErrors(): string {
    if (
      this.registerForm.controls.passwords.controls.password.hasError(
        'required'
      )
    ) {
      return "Password can't be empty"
    }

    return this.registerForm.controls.passwords.controls.password.hasError(
      'minlength'
    )
      ? 'Password must be more than 5 symbols'
      : ''
  }

  protected get checkPasswordConfirmationErrors(): string {
    if (
      this.registerForm.controls.passwords.controls.passwordConfirmation.hasError(
        'required'
      )
    ) {
      return "Confirm password can't be empty"
    }
    return this.registerForm.controls.passwords.controls.passwordConfirmation.hasError(
      'passwordMismatch'
    )
      ? "Passwords don't match"
      : ''
  }

  constructor(
    private store: Store,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    super()
  }

  ngOnInit(): void {
    this._initForm()
    this.store.dispatch(signUp())

    this.loaded$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: boolean) => {
        if (data) {
          this.notificationService.successHandler('Welcome on board!')
        }
      })

    this.serverError$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((registerError) => {
        if (registerError) {
          this.notificationService.errorHandler(registerError)
        }
      })
  }

  protected onSubmit(): void {
    const newUser: IRegisterData = {
      email: this.registerForm.value.email?.trim(),
      fullName: this.registerForm.value.fullName?.trim(),
      password: this.registerForm.value.passwords?.password?.trim(),
    }

    this.store.dispatch(register(newUser))
  }

  private _initForm(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      fullName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      passwords: this.fb.group(
        {
          password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(5)],
          }),
          passwordConfirmation: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
          }),
        },
        {validator: this._passwordConfirming}
      ),
    })
  }

  private _passwordConfirming(c: AbstractControl): {invalid: boolean} {
    if (c.get('password')?.value !== c.get('confirm_password')?.value) {
      return {invalid: true}
    }

    return {invalid: false}
  }
}
