import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DashboardService } from './dashboard.service';
import { Article } from './article';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardForm: FormGroup;
  articles: Article;
  searchString: string = "";

  constructor(
  	private dashboardService: DashboardService,
  	private fb: FormBuilder,
  ) { 
  	this.dashboardForm = this.fb.group({
  		statusFilter: new FormControl(),
  		searchType: new FormControl(),
  		searchString: new FormControl(),

  	})
  }
  
  
  ngOnInit() {
  	this.dashboardService.getArticles()
  	.subscribe((data: Article) => {
		this.articles = data;
  	});

  }

  search() {
  	console.log("searching");
  	this.dashboardService.searchByTitle(this.dashboardForm.get('searchString').value).subscribe(
  		(data: Article) => {
  		this.articles = data;
  		}
  	);

  }

}
