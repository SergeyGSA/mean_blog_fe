import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { IRegisterData } from '../auth.interface'
import { AuthService } from '../auth.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm!: FormGroup
  private regSub: Subscription | null

  @Input() public formError = ''

  get emailErrors(): string {
    if (this.registerForm.controls['email'].hasError('required')) {
      return "Email can't be empty";
    }

    return this.registerForm.controls['email'].hasError('email') ? 'Not a valid email' : ''
  }

  get fullNameErrors(): string {
    if (this.registerForm.controls['fullName'].hasError('required')) {
      return "Full name can't be empty";
    }

    return this.registerForm.controls['fullName'].hasError('minlength') ? 'Full name must be more than 3 symbols' : ''
  }

  get passwordErrors(): string {
    if (this.registerForm.controls['password'].hasError('required')) {
      return "Password can't be empty";
    }

    return this.registerForm.controls['password'].hasError('minlength') ? 'Password must be more than 5 symbols' : ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
    ) {  
    this.regSub = null
  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.regSub) this.regSub.unsubscribe()
  }

  onSubmit(): void {
    this.registerForm.disable()

    const newUser: IRegisterData = {
      email: this.registerForm.value.email.trim(),
      fullName: this.registerForm.value.fullName.trim(),
      password: this.registerForm.value.password.trim(),
      avatarUrl: this.registerForm.value.avatarUrl.trim()
    }

    this.regSub = this.authService.register(newUser).subscribe(
      data => this.router.navigate(['auth/login']),
      err => {
        console.error(err)
        this.registerForm.enable()
      }
    )
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      avatarUrl: new FormControl('')
    }) 
  }
}
