import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable, takeUntil} from 'rxjs'
import {Router} from '@angular/router'

import {signIn} from 'src/app/store/shared-store/active-nav/active-nav.actions'
import {login} from 'src/app/store/auth-store/auth.actions'
import {
  getLoaded,
  getLoading,
  getServerError,
} from 'src/app/store/auth-store/auth.selectors'
import {IAuthServerError, ILoginData} from 'src/app/auth/auth.interface'
import {NotificationService} from 'src/app/shared/services/notification.service'
import {UnSub} from 'src/app/shared/UnSub.class'

interface ILoginForm {
  email: FormControl<string>
  password: FormControl<string>
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends UnSub implements OnInit {
  protected loginForm!: FormGroup<ILoginForm>

  protected loaded$: Observable<boolean> = this.store.pipe(select(getLoaded))
  protected loading$: Observable<boolean> = this.store.pipe(select(getLoading))
  protected serverError$: Observable<
    IAuthServerError | undefined
  > = this.store.pipe(select(getServerError))

  protected get emailErrors(): string {
    if (this.loginForm.controls['email'].hasError('required')) {
      return "Email can't be empty"
    }

    return this.loginForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : ''
  }

  protected get passwordErrors(): string {
    return this.loginForm.controls['password'].hasError('required')
      ? "Password can't be empty"
      : ''
  }

  constructor(
    private store: Store,
    private notificationService: NotificationService,
    private router: Router
  ) {
    super()
  }

  ngOnInit(): void {
    this.initForm()
    this.store.dispatch(signIn())

    this.loaded$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: boolean) => {
        if (data) {
          this.notificationService.successHandler('Welcome on board!')
        }
      })

    this.serverError$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loginError) => {
        if (loginError) {
          this.notificationService.errorHandler(loginError)
        }
      })
  }

  protected onSubmit(): void {
    const loginData: ILoginData = {
      email: this.loginForm.value.email?.trim(),
      password: this.loginForm.value.password?.trim(),
    }

    this.store.dispatch(login(loginData))
    // this.router.navigate(['/'])
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    })
  }
}
