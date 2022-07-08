import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { IRegisterData } from '../auth.interface'
import { register } from 'src/app/store/auth-store/register/register.actions'
import { getLoaded, getLoading, getServerError } from 'src/app/store/auth-store/register/register.selectors'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup

  public loading$: Observable<boolean> = this.store$.pipe(select(getLoading))
  public loaded$: Observable<boolean> = this.store$.pipe(select(getLoaded))
  public serverError$: Observable<string> = this.store$.pipe(select(getServerError))

  public get emailErrors(): string {
    if (this.registerForm.controls['email'].hasError('required')) {
      return "Email can't be empty";
    }

    return this.registerForm.controls['email'].hasError('email') ? 'Not a valid email' : ''
  }

  public get fullNameErrors(): string {
    if (this.registerForm.controls['fullName'].hasError('required')) {
      return "Full name can't be empty";
    }

    return this.registerForm.controls['fullName'].hasError('minlength') ? 'Full name must be more than 3 symbols' : ''
  }

  public get passwordErrors(): string {
    if (this.registerForm.controls['password'].hasError('required')) {
      return "Password can't be empty";
    }

    return this.registerForm.controls['password'].hasError('minlength') ? 'Password must be more than 5 symbols' : ''
  }
  //TODO: create validation getter for avatarUrl 

  constructor( private store$: Store ) {}

  ngOnInit(): void {
    this.initForm()
  }

  public onSubmit(): void {
    const newUser: IRegisterData = {
      email: this.registerForm.value.email.trim(),
      fullName: this.registerForm.value.fullName.trim(),
      password: this.registerForm.value.password.trim(),
      avatarUrl: this.registerForm.value.avatarUrl.trim()
    }

    this.store$.dispatch(register(newUser))
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      // TODO: Add url regex for avatarUrl validators 
      avatarUrl: new FormControl('', [Validators.required])
    }) 
  }
}
