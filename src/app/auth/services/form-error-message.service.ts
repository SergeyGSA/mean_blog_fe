import {Injectable} from '@angular/core'
import {FormGroup} from '@angular/forms'

export enum FormFields {
  Email = 'email',
  FullName = 'fullName',
  Password = 'password',
  PasswordConfirmation = 'passwordConfirmation',
}

export enum FormErrors {
  Required = 'required',
  Email = 'email',
  MinLength = 'minlength',
}

type formErrorMessagesType = {
  [key in FormFields]: {
    [key in FormErrors]?: string
  }
}

@Injectable({
  providedIn: 'root',
})
export class FormErrorMessageService {
  private _formErrorMessages: formErrorMessagesType = {
    [FormFields.Email]: {
      [FormErrors.Email]: 'Not a valid email',
      [FormErrors.Required]: 'Email can`t be empty',
    },
    [FormFields.FullName]: {
      [FormErrors.Required]: 'Full name can`t be empty',
      [FormErrors.MinLength]: 'Full name must be more than 3 symbols',
    },
    [FormFields.Password]: {
      [FormErrors.Required]: 'Password can`t be empty',
      [FormErrors.MinLength]: 'Password must be more than 5 symbols',
    },
    [FormFields.PasswordConfirmation]: {
      [FormErrors.Required]: 'Confirm password can`t be empty',
      // FIXME: Паролі повинні співпадати, треба додати логіку
    },
  }

  constructor() {}

  public displayErrorMessage(
    form: FormGroup,
    formControls: FormFields,
    formErrors: FormErrors
  ): string | undefined | null {
    const isErrorPresent = form.controls[formControls].hasError(formErrors)
    if (!isErrorPresent) {
      return null
    }

    return this._formErrorMessages[formControls][formErrors]
  }
}
