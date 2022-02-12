import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../models/news.model';
import { environment } from '../../environments/environment';
import { CommentsService } from '../services/comments.service';
import { Comments } from '../models/comments.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  post!: News;
  apiUrl = environment.apiUrl;
  comments!: Comments[];

  constructor(private route: ActivatedRoute, private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = <News>data.news;
    });

    this.commentsService.getComments(this.post.id).subscribe(comments =>{
      this.comments = comments;
    });
  }
}
