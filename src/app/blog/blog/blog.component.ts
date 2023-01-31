import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {BehaviorSubject, map, takeUntil, tap} from 'rxjs'
import {PostService} from 'src/app/blog//services/post.service'
import {IPost} from 'src/app/blog//post.interface'
import {UnSub} from 'src/app/shared/UnSub.class'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent extends UnSub implements OnInit {
  protected recentPosts$ = new BehaviorSubject<IPost[] | null>(null)
  protected mostViewedPosts$ = new BehaviorSubject<IPost[] | null>(null)

  constructor(private postService: PostService) {
    super()
  }

  ngOnInit(): void {
    this.postService
      .getAllPosts()
      .pipe(
        map((posts: IPost[]) =>
          posts.sort((a: IPost, b: IPost) => {
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )
          })
        ),
        tap((posts: IPost[]) => this.recentPosts$.next(posts)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe()
    this.postService
      .getAllPosts()
      .pipe(
        map((posts: IPost[]) =>
          posts.sort((a: IPost, b: IPost) => {
            return b.viewsCount - a.viewsCount
          })
        ),
        tap((posts: IPost[]) => this.mostViewedPosts$.next(posts)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe()
  }

  protected trackPosts(index: number, item: IPost): string {
    return item.id
  }
}
