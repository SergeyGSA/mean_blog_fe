import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { getSignIn, getSignUp } from '../../store/shared-store/active-nav/active-nav.selectors'
import { isAuth } from 'src/app/store/auth-store/auth.selectors'

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  public signIn$: Observable<string> = this.store.pipe(select(getSignIn))
  public signUp$: Observable<string> = this.store.pipe(select(getSignUp))
  public isAuth$: Observable<boolean> = this.store.pipe(select(isAuth))

  constructor( private readonly store: Store ) { }

  ngOnInit(): void {
  }
}
