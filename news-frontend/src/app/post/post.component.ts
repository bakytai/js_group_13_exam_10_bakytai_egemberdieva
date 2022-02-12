import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../models/news.model';
import { environment } from '../../environments/environment';
import { CommentsService } from '../services/comments.service';
import { Comments } from '../models/comments.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  post!: News;
  apiUrl = environment.apiUrl;
  comments!: Comments[];
  commentSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = <News>data.news;
    });

    this.commentSubscription = this.commentsService.commentsChange.subscribe((data: Comments[]) => {
      this.comments = data;
    });

    this.commentsService.getComments(this.post.id);
  }

  onSubmit() {

    const commentsData = {
      news_id: this.post.id,
      author: this.form.value.author,
      comment: this.form.value.comment
    }

    this.commentsService.createComment(commentsData, this.post.id).subscribe(() => {
      this.commentsService.getComments(this.post.id);
    });
  }

  ngOnDestroy() {
    this.commentSubscription.unsubscribe();
  }

  deleteComment(id: number) {
    this.commentsService.deleteComment(id).subscribe(()=> {
      this.commentsService.getComments(this.post.id);
    })
  }
}
