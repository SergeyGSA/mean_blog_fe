import { Component, OnInit } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { signIn } from 'src/app/store/shared-store/active-nav/active-nav.actions'
import { login } from 'src/app/store/auth-store/auth.actions'
import { getLoaded, getLoading, getServerError } from 'src/app/store/auth-store/auth.selectors'
import { ILoginData } from '../auth.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: UntypedFormGroup

  public loaded$: Observable<boolean> = this.store.pipe(select(getLoaded))
  public loading$: Observable<boolean> = this.store.pipe(select(getLoading))
  public serverError$: Observable<string> = this.store.pipe(select(getServerError))

  public get emailErrors(): string {
    if (this.loginForm.controls['email'].hasError('required')) {
      return "Email can't be empty"
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : ''
  }

  public get passwordErrors(): string {
    return this.loginForm.controls['password'].hasError('required') ? "Password can't be empty" : ''
  }

  constructor( private readonly store: Store, private readonly router: Router ) { }

  ngOnInit(): void {
    this.initForm()
    this.store.dispatch(signIn())
  }

  public onSubmit(): void {
    const loginData: ILoginData = {
      email: this.loginForm.value.email.trim(),
      password: this.loginForm.value.password.trim()
    }

    this.store.dispatch(login(loginData))
    this.router.navigate(['/'])
  }

  private initForm(): void {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required])
    })
  }
}
