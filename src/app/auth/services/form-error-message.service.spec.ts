import { TestBed } from '@angular/core/testing'
import { FormControl, FormGroup } from '@angular/forms'

import { FormControls, FormErrorMessageService, FormErrors } from './form-error-message.service'

const MOCK_FORM_GROUP: FormGroup<{[FormControls.Email]: FormControl<string>}> = new FormGroup({
  [FormControls.Email]: new FormControl<string>('', {nonNullable: true})
})

describe('FormErrorMessageService', () => {
  let service: FormErrorMessageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormErrorMessageService]
    })
    service = TestBed.inject(FormErrorMessageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return null if error doesn`t exist', () => {
    expect(service.showErrorMessage)
      .withContext('method showErrorMessage doesn`t exist')
      .toBeTruthy()
      
      expect(service.showErrorMessage(MOCK_FORM_GROUP, FormControls.Email, FormErrors.Email))
      .toBeNull()
    })
    
  it('should return correct error message', () => {
    const showErrorMessageSpy = spyOn(service, 'showErrorMessage')
      .and
      .callFake(function(_, formControls, formErrors): string | undefined | null {
        const isErrorPresent = true
        if (!isErrorPresent) {
          return null
        }
    
        return service['_formErrorMessages'][formControls][formErrors]
      })

    expect(showErrorMessageSpy(MOCK_FORM_GROUP, FormControls.Email, FormErrors.Email))
      .toEqual('Not a valid email')
  })
})
