import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IPost } from '../post.interface';

@Injectable()
export class PostService {

  constructor( private readonly http: HttpClient ) { }

  public getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${environment.API_URL}/posts`)
  }

  public getOnePost(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.API_URL}/posts/${id}`)
  }
}
