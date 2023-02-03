import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {IAuthServerError} from 'src/app/auth/auth.interface'

// TODO: Зроби, будь ласка, ревью юніт тестів цього сервісу
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  public errorHandler(error: IAuthServerError): void {
    // Це у мене така особливість api вийшла, що можуть бути помилки в різних полях одного об'єкту
    // Якщо у масиві errors об'єкту error є помилки, то беремо звідти.
    // А якщо ні, то просто повідомлення з об'єкту error
    // І я на ці два кейси окремі тести написав
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
