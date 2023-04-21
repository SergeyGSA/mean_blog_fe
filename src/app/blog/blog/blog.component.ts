import {ChangeDetectionStrategy, Component, OnInit, Self} from '@angular/core'
import {BehaviorSubject, map, takeUntil, tap} from 'rxjs'
import {PostService} from 'src/app/blog//services/post.service'
import {IPost} from 'src/app/blog//post.interface'
import {UnsubscribeService} from 'src/app/shared/services/unsubscribe.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [UnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  protected recentPosts$ = new BehaviorSubject<IPost[] | null>(null)
  protected mostViewedPosts$ = new BehaviorSubject<IPost[] | null>(null)

  constructor(
    private postService: PostService,
    @Self() private readonly unsubscribe$: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this._getRecentPosts()
    this._getMostViewedPosts()
  }

  protected trackPosts(index: number, item: IPost): string {
    return item.id
  }

  private _getRecentPosts(): void {
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
  }

  private _getMostViewedPosts(): void {
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
}
