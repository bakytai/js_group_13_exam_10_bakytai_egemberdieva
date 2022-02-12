import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { News, NewsData } from '../models/news.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export  class NewsService {
  newsFetching = new Subject<boolean>();
  newsChange = new Subject<News[]>();

  private news: News[] = [];

  constructor(private http: HttpClient) {}

  getNews() {
    this.newsFetching.next(true);
    return this.http.get<News[]>(environment.apiUrl + '/news')
      .pipe(map(result => {
        if (result === null) {
          return [];
        }
        return result.map(newsId => {
          return new News(newsId.id, newsId.title, newsId.content, newsId.image, newsId.date);
        });
      }))
      .subscribe(data => {
        this.news = data;
        this.newsChange.next(this.news.slice());
        this.newsFetching.next(false);
      });
  };

  createNewPost(newsData: NewsData) {
    const formData = new FormData();
    Object.keys(newsData).forEach(key => {
      if (newsData[key] !== null) {
        formData.append(key,newsData[key]);
      }
    })
    return this.http.post(environment.apiUrl + '/news', formData);
  };

  fetchNewsDetails(id: string) {
    return this.http.get<News>(environment.apiUrl + `/news/${id}`).pipe(
      map(result => {
        if (!result) {
          return  null
        }
        return new News(result.id, result.title, result.content, result.image, result.date);
      })
    );
  }
}
