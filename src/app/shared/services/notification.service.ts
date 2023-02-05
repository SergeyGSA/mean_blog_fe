import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {IAuthServerError} from 'src/app/auth/auth.interface'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  public errorHandler(error: IAuthServerError): void {
    const err = error.errors.length ? error.errors[0].msg : error.message
    this._snackBar.open(err, undefined, {
      duration: 5000,
      panelClass: 'error-snackbar',
    })
  }

  public successHandler(message: string): void {
    this._snackBar.open(message, undefined, {
      duration: 5000,
      panelClass: 'success-snackbar',
    })
  }
}
