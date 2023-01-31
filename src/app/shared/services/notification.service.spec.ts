import {TestBed} from '@angular/core/testing'
import {MatSnackBar} from '@angular/material/snack-bar'
import {IAuthServerError} from 'src/app/auth/auth.interface'

import {NotificationService} from './notification.service'

describe('NotificationService', () => {
  let service: NotificationService
  let matSnackBar: MatSnackBar

  const mockMatSnackBar = {
    open: () => {},
  }

  const MOCK_SERVER_ERROR: IAuthServerError = {
    message: 'error',
    errors: [],
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        {provide: MatSnackBar, useValue: mockMatSnackBar},
      ],
    })

    service = TestBed.inject(NotificationService)
    matSnackBar = TestBed.inject(MatSnackBar)
  })

  it('should be created', () => {
    expect(service).withContext("service wasn't created").toBeTruthy()
  })

  //FIXME: REFACTOR THIS TEST
  xit('should display error message', () => {
    const matSnackBarSpy = jasmine.createSpyObj('matSnackBar', ['open'])
  })

  //FIXME: REFACTOR THIS TEST
  xit('should display success message', () => {
    const matSnackBarSpy = spyOn(matSnackBar, 'open').and.stub()
  })
})
