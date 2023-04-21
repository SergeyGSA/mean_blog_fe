import {TestBed} from '@angular/core/testing'

import {UnsubscribeService} from './unsubscribe.service'

describe('UnsubscribeService', () => {
  let service: UnsubscribeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsubscribeService],
    })
    service = TestBed.inject(UnsubscribeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should complete the subject on ngOnDestroy', () => {
    spyOn(service, 'complete')
    service.ngOnDestroy()
    expect(service.complete).toHaveBeenCalled()
  })

  it('should call next on ngOnDestroy', () => {
    spyOn(service, 'next')
    service.ngOnDestroy()
    expect(service.next).toHaveBeenCalled()
  })
})
