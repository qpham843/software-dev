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
  statuses: Array<any> = [];

  constructor(
  	private ds: DashboardService,
  	private fb: FormBuilder,
  ) { 
  	this.dashboardForm = this.fb.group({
  		statusFilter: new FormControl(),
  		searchType: new FormControl(),
  		searchString: new FormControl(),

	  });
	for (let [k, v] of ds.statusMap) {
		this.statuses.push({"value": v.statusCode, "description": v.description});
	}
  }
  
  
  ngOnInit() {
  	this.ds.getArticles().subscribe((data: Article) => {
		this.articles = data;
  	});

  }

  search() {
  	console.log("searching");
	this.ds.searchByTitle(this.dashboardForm.get('searchString').value)
		.subscribe((data: Article) => {
			this.articles = data;
		}
  	);

  }

  filterArticles(filterVal: any) {
	if (filterVal == "All")
		this.ds.getArticles().subscribe((data: Article) => {
			this.articles = data;
  		});
	else
		this.ds.searchByStatus(this.dashboardForm.get('statusFilter').value)
			.subscribe((data: Article) => {
				this.articles = data;
			}
		);
}
  
}
