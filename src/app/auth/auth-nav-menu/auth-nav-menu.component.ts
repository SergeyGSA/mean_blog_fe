import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { getSignIn, getSignUp } from 'src/app/store/auth-store/active-nav/acive-nav.seletors'

@Component({
  selector: 'app-auth-nav-menu',
  templateUrl: './auth-nav-menu.component.html',
  styleUrls: ['./auth-nav-menu.component.scss']
})
export class AuthNavMenuComponent implements OnInit {
  public signIn$: Observable<string> = this.store$.pipe(select(getSignIn))
  public signUp$: Observable<string> = this.store$.pipe(select(getSignUp))

  constructor( private store$: Store ) { }

  ngOnInit(): void {
  }
}
