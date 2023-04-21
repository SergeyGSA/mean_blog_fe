import {TestBed} from '@angular/core/testing'
import {MatSnackBar} from '@angular/material/snack-bar'

import {NotificationService} from './notification.service'

interface IMatSnackBarSpy {
  open: jasmine.Spy
}

describe('NotificationService', () => {
  let service: NotificationService
  let matSnackBarSpy: IMatSnackBarSpy

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj(['open'])

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        {provide: MatSnackBar, useValue: matSnackBarSpy},
      ],
    })

    service = TestBed.inject(NotificationService)
  })

  it('should be created', () => {
    expect(service).withContext("service wasn't created").toBeTruthy()
  })

  it('should display success message with given data', () => {
    const expectedArgs = [
      'success',
      undefined,
      {
        duration: 5000,
        panelClass: 'success-snackbar',
      },
    ]

    service.successHandler('success')
    expect(matSnackBarSpy.open).toHaveBeenCalledOnceWith(...expectedArgs)
  })

  it('should display error message with given data when array of errors has error', () => {
    const givenArgs = [
      'error from array of errors',
      undefined,
      {
        duration: 5000,
        panelClass: 'error-snackbar',
      },
    ]

    service.errorHandler({
      message: 'error',
      errors: [
        {msg: 'error from array of errors', location: '', param: '', value: ''},
      ],
    })
    expect(matSnackBarSpy.open).toHaveBeenCalledOnceWith(...givenArgs)
  })

  it('should display error message with given data when array of errors has NO error', () => {
    const givenArgs = [
      'error',
      undefined,
      {
        duration: 5000,
        panelClass: 'error-snackbar',
      },
    ]

    service.errorHandler({
      message: 'error',
      errors: [],
    })
    expect(matSnackBarSpy.open).toHaveBeenCalledOnceWith(...givenArgs)
  })
})
