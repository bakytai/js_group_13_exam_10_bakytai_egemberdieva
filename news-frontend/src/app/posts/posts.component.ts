import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  posts: News[] = [];
  apiUrl = environment.apiUrl;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
  }

}
