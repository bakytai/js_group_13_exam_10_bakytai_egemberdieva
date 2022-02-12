import { Injectable } from '@angular/core';
import { NewsService } from '../services/news.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsResolverService {

  constructor(private newsService: NewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<News | null> {
    const id = <string>route.params['id'];
    return this.newsService.fetchNewsDetails(id);
  }
}
