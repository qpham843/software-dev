import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DashboardService } from './dashboard.service';
import { Article } from './article';
import { Status } from './article';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardForm: FormGroup;
  articles: any = [];
  stringSearched: string = "";
  statuses: any = [];

  constructor(
  	private ds: DashboardService,
  	private fb: FormBuilder,
  ) { 
  	this.dashboardForm = this.fb.group({
  		statusFilter: new FormControl(),
  		searchType: new FormControl(),
  		searchUrl: new FormControl(),
		searchTitle: new FormControl(),
	  });

	  this.dashboardForm.get('statusFilter').valueChanges.subscribe(val => {
	  	console.log("vvvvvvvvvvvvvv", val)
	  	this.ds.searchByStatus(val).subscribe((data: Article) => {
				this.articles = data;
			}
		);
	  })
  }
  
  
  ngOnInit() {
	this.ds.getArticles().subscribe((data: Article) => {
		this.articles = data;
		console.log(this.articles);
		//alert("hiiiiii");
  	});
	
	this.ds.getStatuses().subscribe((data: Status) => {
		this.statuses = data;
		console.log(this.statuses);
	});
  }

  searchUrl() {
  	this.ds.searchByUrl(this.dashboardForm.get('searchUrl').value).subscribe((data: Article) => {
  		this.articles = data;
  	})
  }

  searchTitle() {
  	this.ds.searchByTitle(this.dashboardForm.get('searchTitle').value).subscribe((data: Article) => {
  		this.articles = data;
  	})
  }

  filterByStatus(filterVal: any) {
	this.stringSearched = '';
	if (filterVal == "all")
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
	
	//val contains the $event from the html
	// one of the properties of event is srcElement (an html DOM object)
	// this object's value is the new value 
	changeStatus(id: number, val) {
		console.log("changing status", id, val.srcElement.value);
		this.ds.setStatus(id, val.srcElement.value).subscribe((data: Article) => {
			console.log("back from changing status", data);
			this.articles = data;
		});
	}
  
}