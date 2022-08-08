import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { select, Store } from '@ngrx/store'
import { RouterModule } from '@angular/router'
import { Observable } from 'rxjs'
import { MatButtonModule } from '@angular/material/button'

import { getSignIn, getSignUp } from '../../store/shared-store/active-nav/active-nav.selectors'
import { getUserData, isAuth } from 'src/app/store/auth-store/auth.selectors'
import { IUserData } from 'src/app/auth/auth.interface'

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatButtonModule]
})
export class NavMenuComponent implements OnInit {
  protected signIn$: Observable<string> = this.store.pipe(select(getSignIn))
  protected signUp$: Observable<string> = this.store.pipe(select(getSignUp))
  protected isAuth$: Observable<boolean> = this.store.pipe(select(isAuth))
  protected userData$: Observable<IUserData | undefined> = this.store.pipe(select(getUserData))

  constructor( private readonly store: Store ) { }

  ngOnInit(): void {
  }
}
