import {ComponentFixture, inject, TestBed} from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Observable } from 'rxjs'

import { IUserData } from 'src/app/auth/auth.interface'
import {NavMenuComponent} from './nav-menu.component'

type navMenuStoreType = {
  signIn: Observable<string>
  signUp: Observable<string>
  isAuth: Observable<boolean>
  userData: Observable<IUserData | undefined>
}

describe('NavMenuComponent', () => {
  let component: NavMenuComponent
  let fixture: ComponentFixture<NavMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [NavMenuComponent, RouterTestingModule],
      providers: [provideMockStore()]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // FIXME: Is it correct?
  it('should create mock store', inject([Store], (store: MockStore<navMenuStoreType>) => {
    expect(store).toBeTruthy()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
