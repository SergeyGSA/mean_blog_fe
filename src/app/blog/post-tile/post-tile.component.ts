import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { tap, map, Observable } from 'rxjs'
import { getUserData } from 'src/app/store/auth-store/auth.selectors'

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostTileComponent implements OnInit {

  constructor( private readonly store: Store ) { 
  }

  ngOnInit(): void {

  }

}
