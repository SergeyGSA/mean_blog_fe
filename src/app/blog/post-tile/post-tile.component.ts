import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
interface IUser {
  email: string
  id: string
  fullName: string
  avatarUrl: string
}

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostTileComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
