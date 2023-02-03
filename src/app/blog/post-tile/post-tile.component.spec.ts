import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core'
import {ComponentFixture, TestBed} from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import {PostTileComponent} from './post-tile.component'

const mockUserData = {
  email: 'tested email', 
  id: 'tested id of user', 
  fullName: 'tested full name',
  avatarUrl: 'tested avatar url'
}
const expectedPost = {
  id: 'tested id of post', 
  title: 'Post\'s title for test', 
  imageUrl: 'https://test.com.ua', 
  text: 'Text for test', 
  tags: ['tested tag', 'another tested tag'], 
  user: mockUserData, 
  viewsCount: 10, 
  updatedAt: new Date(), 
  createdAt: new Date()
}

fdescribe('PostTileComponent', () => {
  let component: PostTileComponent
  let fixture: ComponentFixture<PostTileComponent>

  let postDe: DebugElement
  let postEl: Element

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostTileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTileComponent)
    component = fixture.componentInstance

    postDe = fixture.debugElement.query(By.css('.post-card'))
    postEl = postDe.nativeElement

    component.post = expectedPost

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // FIXME: Fix this test
  it('should display correct @Input data', () => {   
    const expectedPostTitle = expectedPost.title
    expect(postEl.textContent).withContext('wrong post\'s title').toContain(expectedPostTitle)

    const expectedPostImageUrl = expectedPost.imageUrl
    // expect(postEl).withContext('wrong img url').toContain(expectedPostImageUrl)

    const expectedPostText = expectedPost.text
    expect(postEl.textContent).withContext('wrong post\'s text').toContain(expectedPostText)

    const expectedPostUser = expectedPost.user
    expect(postEl.textContent).withContext('wrong user\'s name').toContain(expectedPostUser.fullName)
  })

  it('should return correct property', () => {
    spyOnProperty(component, 'backgroundImageForPost', 'get')
      .and
      .returnValue({'background-image': component.post.user.avatarUrl!})
      
    expect(component.backgroundImageForPost).toBeTruthy()
    expect(component.backgroundImageForPost).toEqual({'background-image': 'tested avatar url'})
  })
})
