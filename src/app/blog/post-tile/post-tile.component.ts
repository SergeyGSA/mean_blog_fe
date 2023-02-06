import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core'
import {IPost} from 'src/app/blog/post.interface'

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostTileComponent implements OnInit {
  protected isDisplayButtons: boolean = false

  @Input()
  public post!: IPost

  public get backgroundImageForPost() {
    return {'background-image': 'url(' + this.post.user.avatarUrl + ')'}
  }

  ngOnInit(): void {}

  protected trackTag(index: number, item: string): string {
    return item
  }
}
