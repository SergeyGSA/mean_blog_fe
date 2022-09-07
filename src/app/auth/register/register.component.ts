import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
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

interface IRegisterForm {
  email: FormControl<string>
  fullName: FormControl<string>
  password: FormControl<string>
  avatarUrl: FormControl<string>
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

  private regexpUrl = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi

  protected get emailErrors(): string {
    if (this.registerForm.controls['email'].hasError('required')) {
      return "Email can't be empty"
    }

    return this.registerForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : ''
  }

  protected get fullNameErrors(): string {
    if (this.registerForm.controls['fullName'].hasError('required')) {
      return "Full name can't be empty"
    }

    return this.registerForm.controls['fullName'].hasError('minlength')
      ? 'Full name must be more than 3 symbols'
      : ''
  }

  protected get passwordErrors(): string {
    if (this.registerForm.controls['password'].hasError('required')) {
      return "Password can't be empty"
    }

    return this.registerForm.controls['password'].hasError('minlength')
      ? 'Password must be more than 5 symbols'
      : ''
  }

  protected get avatarUrlErrors(): string {
    if (this.registerForm.controls['avatarUrl'].hasError('required')) {
      return "Avatar url can't be empty"
    }

    return this.registerForm.controls['avatarUrl'].hasError('pattern')
      ? 'Provide a valid url address'
      : ''
  }

  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) {
    super()
  }

  ngOnInit(): void {
    this.initForm()
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
      password: this.registerForm.value.password?.trim(),
      avatarUrl: this.registerForm.value.avatarUrl?.trim(),
    }

    this.store.dispatch(register(newUser))
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      fullName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5)],
      }),
      avatarUrl: new FormControl('', {
        nonNullable: true,
        validators: [Validators.pattern(this.regexpUrl)],
      }),
    })
  }
}
