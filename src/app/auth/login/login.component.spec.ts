import {ComponentFixture, TestBed} from '@angular/core/testing'
import {Router} from '@angular/router'
import {NotificationService} from 'src/app/shared/services/notification.service'

import {LoginComponent} from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  let notificationServiceSpy: NotificationService
  let routerSpy: Router

  beforeEach(async () => {
    notificationServiceSpy = jasmine.createSpyObj(NotificationService, [
      'successHandler',
      'errorHandler',
    ])
    // FIXME: Refactor
    notificationServiceSpy.successHandler('work')

    routerSpy = jasmine.createSpyObj(Router, ['navigate'])

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  xit('should create', () => {
    expect(component).toBeTruthy()
  })
})
