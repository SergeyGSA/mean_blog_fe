import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {

  constructor( ) { 
  }

  ngOnInit(): void {
  }

  public test() {
    // this.http.get('http://localhost:8080/posts').subscribe(
    //   data => console.log(data)
    // )
  }
}
