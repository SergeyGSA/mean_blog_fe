import {DebugElement} from '@angular/core'
import {ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'

import {FooterComponent} from './footer.component'

describe('FooterComponent', () => {
  let component: FooterComponent
  let fixture: ComponentFixture<FooterComponent>
  let el: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FooterComponent)
    component = fixture.componentInstance
    el = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display copyright text', () => {
    const copyright = el.query(By.css('.footer__copyright'))

    expect(copyright).toBeTruthy()
    expect(copyright.nativeElement.textContent).toBe('Copyright © 2022')
  })
})
