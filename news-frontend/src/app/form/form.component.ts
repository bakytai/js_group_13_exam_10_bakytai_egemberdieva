import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  fetching = false;

  constructor(private newsServices: NewsService) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
