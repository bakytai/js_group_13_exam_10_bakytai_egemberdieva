import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comments, CommentsData } from '../models/comments.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
 commentsChange = new Subject<Comments[]>();

  private comments: Comments[] = [];

  constructor(private http: HttpClient) {
  }

  getComments(id: number) {
    return this.http.get<Comments[]>(environment.apiUrl + '/comments?news_id=' + id).pipe(
      map(result => {
        return result.map(comment=> {
          return new Comments(comment.id, comment.news_id, comment.author, comment.comment);
        });
      })
    ).subscribe(response => {
      this.comments = response;
      this.commentsChange.next(this.comments.slice());
    });
  };

  createComment(comment: CommentsData, id: number) {
    const body = {
      news_id: id,
      author: comment.author,
      comment: comment.comment
    };

    if (comment.author === null) {
      body.author = 'anonymus';
    }

    return this.http.post(environment.apiUrl + '/comments', body);
  };

  deleteComment(id: number) {
    return this.http.delete(environment.apiUrl + `/comments/${id}`);
  }
}
