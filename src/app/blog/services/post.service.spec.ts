import {TestBed} from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

import {PostService} from './post.service'
import {environment} from 'src/environments/environment'

const MOCK_POSTS = [
  {id: '62e3d1cf56c89700efe731f0', title: 'Created a new post for testing'},
  {id: '62e3d1cf56c89700efe731f1', title: "Post's title to test get one post"},
]

describe('PostService', () => {
  let postService: PostService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    })

    postService = TestBed.inject(PostService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(postService).toBeTruthy()
  })

  it('should return all posts', () => {
    postService.getAllPosts().subscribe((posts) => {
      expect(posts).withContext('No posts returned').toBeTruthy()
      expect(posts.length).withContext('incorrect number of posts').toBe(2)

      const post = posts.find((post) => post.id === '62e3d1cf56c89700efe731f0')
      expect(post?.title).toBe('Created a new post for testing')
    })

    const req = httpTestingController.expectOne(`${environment.API_URL}/posts`)
    expect(req.request.method)
      .withContext('wrong http method, must be GET')
      .toEqual('GET')
    req.flush(MOCK_POSTS)
  })

  it('should return one post by id', () => {
    const testingPostId = '62e3d1cf56c89700efe731f1'
    const post = postService.getOnePost(testingPostId).subscribe((post) => {
      expect(post).withContext("can't find post by id").toBeTruthy()

      expect(post?.title).toBe("Post's title to test get one post")
    })

    const req = httpTestingController.expectOne(
      `${environment.API_URL}/posts/${testingPostId}`
    )
    expect(req.request.method)
      .withContext('wrong http method, must be GET')
      .toEqual('GET')
    req.flush(MOCK_POSTS[1])
  })

  afterEach(() => {
    httpTestingController.verify()
  })
})
