import {ChangeDetectionStrategy, Component, OnInit, Self} from '@angular/core'
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
import {
  FormErrorMessageService,
  FormErrors,
  FormFields,
} from 'src/app/auth/services/form-error-message.service'
import {UnsubscribeService} from 'src/app/shared/services/unsubscribe.service'

interface IPasswords {
  password: FormControl<string>
  passwordConfirmation: FormControl<string>
}

// interface IPasswordsGroup {
//   password: FormControl<string>
//   passwordConfirmation: FormControl<string>
// }
interface IRegisterForm {
  email: FormControl<string>
  fullName: FormControl<string>
  // passwordsGroup: FormGroup<IPasswordsGroup>
  password: FormControl<string>
  passwordConfirmation: FormControl<string>
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  protected registerForm!: FormGroup<IRegisterForm>

  protected loading$: Observable<boolean> = this.store.pipe(select(getLoading))
  protected loaded$: Observable<boolean> = this.store.pipe(select(getLoaded))
  protected serverError$: Observable<
    IAuthServerError | undefined
  > = this.store.pipe(select(getServerError))

  protected get formFields(): typeof FormFields {
    return FormFields
  }

  protected get formErrors(): typeof FormErrors {
    return FormErrors
  }

  constructor(
    private store: Store,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private formErrorMessageService: FormErrorMessageService,
    @Self() private readonly unsubscribe$: UnsubscribeService
  ) {}
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
      password: this.registerForm.value.password?.trim(),
    }

    this.store.dispatch(register(newUser))
  }

  protected getErrorMessage(
    form: FormGroup,
    formControls: FormFields,
    formErrors: FormErrors
  ): string | undefined | null {
    return this.formErrorMessageService.displayErrorMessage(
      form,
      formControls,
      formErrors
    )
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
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5)],
      }),
      passwordConfirmation: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    })
  }

  // private _passwordConfirming(c: AbstractControl): {invalid: boolean} {
  //   if (c.get('password')?.value !== c.get('confirm_password')?.value) {
  //     return {invalid: true}
  //   }

  //   return {invalid: false}
  // }
}
