import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comments } from '../models/comments.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  constructor(private http: HttpClient) {
  }

  getComments(id: number) {
    return this.http.get<Comments[]>(environment.apiUrl + '/comments?news_id=' + id).pipe(
      map(result => {
        return result.map(comment=> {
          return new Comments(comment.id, comment.news_id, comment.author, comment.comment);
        });
      })
    );
  }
}
