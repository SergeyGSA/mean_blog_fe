import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {ComponentFixture, TestBed} from '@angular/core/testing'
import {of} from 'rxjs'
import {IPost} from '../post.interface'
import {PostService} from '../services/post.service'

import {BlogComponent} from './blog.component'

interface IPostServiceSpy {
  getAllPosts: jasmine.Spy
}

const MOCK_ALL_POSTS: IPost[] = []

describe('BlogComponent', () => {
  let component: BlogComponent
  let fixture: ComponentFixture<BlogComponent>

  let postServiceSpy: IPostServiceSpy

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj(['getAllPosts'])
    postServiceSpy.getAllPosts.and.returnValue(of(MOCK_ALL_POSTS))

    await TestBed.configureTestingModule({
      declarations: [BlogComponent],
      providers: [{provide: PostService, useValue: postServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).withContext("component wasn't created").toBeTruthy()
  })
})
