import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewsData } from '../models/news.model';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  constructor(private newsServices: NewsService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newsData: NewsData = this.form.value;
    this.newsServices.createNewPost(newsData).subscribe(() => {
      this.newsServices.getNews();
      void this.router.navigate(['/']);
    });
  }
}
