import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { getSignIn, getSignUp } from '../../store/shared-store/active-nav/active-nav.selectors'
import { getLoaded } from '../../store/auth-store/login/login.selectors'

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  public signIn$: Observable<string> = this.store.pipe(select(getSignIn))
  public signUp$: Observable<string> = this.store.pipe(select(getSignUp))
  public loaded$: Observable<boolean> = this.store.pipe(select(getLoaded))

  constructor( private store: Store ) { }

  ngOnInit(): void {
  }
}
