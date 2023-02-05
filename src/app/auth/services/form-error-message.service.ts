import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'

export enum FormControls {
  Email = 'email',
  Password = 'password'
}

export enum FormErrors { 
  Required = 'required',
  Email = 'email'
}

type formErrorMessagesType = {
  [key in FormControls]: {
    [key in FormErrors]?: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class FormErrorMessageService {
  private _formErrorMessages: formErrorMessagesType = {
    [FormControls.Email]: {
      [FormErrors.Email]: 'Not a valid email',
      [FormErrors.Required]: "Email can't be empty"
    },
    [FormControls.Password]: {
      [FormErrors.Required]: "Password can't be empty"
    },
  }

  constructor() { }

  public showErrorMessage(form: FormGroup, formControls: FormControls, formErrors: FormErrors): string | undefined | null {
    const isErrorPresent = form.controls[formControls].hasError(formErrors)
    if (!isErrorPresent) {
      return null
    }

    return this._formErrorMessages[formControls][formErrors] 
  }
}
