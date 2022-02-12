import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts!: News[];
  newsSubscription!: Subscription;
  apiUrl = environment.apiUrl;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsSubscription = this.newsService.newsChange.subscribe((news: News[]) => {
      this.posts = news;
    });

    this.newsService.getNews();
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

  deletePost(id: number) {
    this.newsService.deletePost(id).subscribe(()=> {
      this.newsService.getNews();
    })
  }
}
