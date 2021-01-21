import { Component, OnInit, ElementRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TagService } from '../manage-tags/manage-tags.service';
import { DashboardService } from './dashboard.service';
import { Article } from './article';
import { Status } from './article';
import { Tag } from '../manage-tags/tag';

//idk if needed
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  @ViewChild('articleText', {static: true}) articleText: ElementRef;
  dashboardForm: FormGroup;
  articles: any = [];
  stringSearched: string = "";
  statuses: any = [];
  articleDetails: any = [];
  articleShow: boolean[] = [];
  totNumArticles: Number = 0;
  CONST_NUM_ARTICLES_PER_PAGE: number = 10;
  page:number=1;
  totalRecords:String;
  sort:string = "date";
  sortOrder: boolean = true; //main booleon others will be eliminated later
  
  selected: string = "";
  tags: any = [];
  tagsString: string[] = [];

  constructor(
  	private ds: DashboardService,
  	private ts: TagService,
  	private fb: FormBuilder,
  ) { 
  	this.dashboardForm = this.fb.group({
  		statusFilter: new FormControl(),
  		searchType: new FormControl(),
  		searchUrl: new FormControl(),
		searchTitle: new FormControl(),
		searchTag: new FormControl(),
		checkAll: new FormControl(),
		bulkStatus: new FormControl(),
		typeaheadControl: new FormControl()
	});

	// load list of statuses
	this.ds.getStatuses().subscribe((data: Status) => {
		this.statuses = data;
		console.log(this.statuses);
	});
	this.dashboardForm.get('statusFilter').valueChanges.subscribe(val => {
		console.log("filter value has changed", val)
		this.ds.searchByStatus(val, this.page - 1, this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder).subscribe((data: Article) => {
			console.log("data from changing status", data, "val=", val);
			this.articles = data;
			if(val == "popular")
			{
			//there's no field for publishedDate so I'm using publishDate instead
			//sorting by date
				console.log("popular sort");
				this.articles.sort(
	  	  			function(a, b) {
						if (a.publishDate < b.publishDate) {
							return 1;
						}
						if (a.publishDate > b.publishDate) {
							return -1;
						}
					return 0;
			});
			}
			//not needed idk why here
			// if(!val || val == "null")
			// {
			// 	console.log("hiii");
			// 	this.ds.getArticles((this.page - 1), this.CONST_NUM_ARTICLES_PER_PAGE, "date", this.sortOrder, this.dashboardForm.get('statusFilter').value).subscribe((data: Article) => {
			// 	this.articles = data;
			// 		for(let x = 0; x < this.articles.size; x++) {
			// 			this.articleShow[x] = true;
			// 		}
  			// 	});
			// }

			//showing articles 0-49
			for(let i = this.articles.length - 1; i >= 50;i--) 
			{
			this.articles.splice(i, 1);
			}
		});
		if(val != "null" && val != null) {
			this.ds.totNumArticlesStatus(val).subscribe((data: Number) => {
				console.log("number of articles for ", val,"status", data);
				this.totNumArticles = data;

			});
		} else {
			this.ds.getTotNumArticles().subscribe((data: Number) => {
				this.totNumArticles = data;
			});
		}


		this.dashboardForm.get("typeaheadControl").valueChanges.subscribe(value => {
			this.dashboardForm.get("typeaheadControl").setValue("", {emitEvent:false});
		  });
	});

	//checkall
	this.dashboardForm.get('checkAll').valueChanges.subscribe(v => {
		//console.log("toggling all checkboxes - checked = ", v);
	 	let checkboxes = document.getElementsByName("articleCheckbox");
	 	//console.log(checkboxes);
	  	checkboxes.forEach(cb => {
	  		let cbe = cb as HTMLInputElement;
  			//console.log("toggling checkbox", cbe);
  			cbe.checked = v;
	  	})
	});
  }
  
  ngOnInit() {
	  console.log("dashboard initialized");
	  this.ds.getTotNumArticles().subscribe((data: Number) => {
		  this.totNumArticles = data;
	  });
	
	  this.ds.getArticles((this.page - 1), this.CONST_NUM_ARTICLES_PER_PAGE, "date", this.sortOrder, this.dashboardForm.get('statusFilter').value).subscribe((data: Article) => {
		console.log(data);
		this.articles = data;
		for(let x = 0; x < this.articles.length; x++) {
			this.articleShow[x] = false;
		}
  	});
	this.dashboardForm.get('statusFilter').setValue(null);
	this.ts.getTags().subscribe((data: Tag) => {
		this.tags = data;
		for(let x = 0; x < this.tags.length; x++) {
			if(this.tags[x] != undefined)
			{
				this.tagsString.push(this.tags[x].tag);
			}
		}
		console.log(this.tagsString)
	});
  }

  loadArticleText(id: number) {
  	console.log("aaaaaaaaaa", id);
  	let art: Article = this.articles.find(a => a.id == id);
  	if (art)
  		this.articleText.nativeElement.innerHTML = art.articleText;
  }
  

  sortTitle: boolean = true;
  sortURL: boolean = true;
  sortStatus: boolean = true;
  sortTotal: boolean = true;
  sortChecks: boolean = true;

  onClick(s:string)  {
	  console.log("s=", s, "sort=", this.sort);
	  if (this.sort != s) {
		  this.sortOrder = true;
	  }
	  this.sort = s
	  this.sortOrder = !this.sortOrder;
	console.log("Sort clicked", this.sort);
	this.ds.getArticles(this.page - 1, this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder, this.dashboardForm.get('statusFilter').value).subscribe((data: Article) => {
		this.articles = data;
		for(let x = 0; x < this.articles.length; x++) {
			this.articleShow[x] = false;
		}
	});

	if(s === "sortChecks")
    {
		let checkboxes = document.getElementsByName("articleCheckbox");
		console.log(checkboxes.length);
		for(var ch; ch < checkboxes.length;ch++)
		{
			console.log(ch);
		}
	  	checkboxes.forEach(cb => {
	  		let cbe = cb as HTMLInputElement;
	  	})

		this.sortChecks = !this.sortChecks;
	}
  }

  handlePageChange(page: any) {
	this.ds.getArticles(page - 1, this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder, this.dashboardForm.get('statusFilter').value).subscribe((data: Article) => {
		console.log(page - 1, this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder, this.dashboardForm.get('statusFilter').value);
		this.articles = data;
		for(let x = 0; x < this.articles.length; x++) {
			this.articleShow[x] = false;
		}
  	});
	return page;
  }

  addTag(article_id:number, tag:string) {
		this.ds.addArticle(article_id, tag).subscribe((data: Article) => {
			this.ds.getArticles((this.page - 1), this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder, this.dashboardForm.get('statusFilter').value).subscribe((data: Article) => {
				this.articles = data;
			});
		});
  }

  deleteTag(article_id:number, tag:string) {
    this.ds.deleteArticle(article_id, tag).subscribe((data: Article) => {
		this.ds.getArticles((this.page - 1), this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder, this.dashboardForm.get('statusFilter').value).subscribe((data: Article) => {
			this.articles = data;
	  	});
    });
  }

  searchTag(tag:any) {
	console.log("search by TAG 1111 ", this.dashboardForm.get('searchTag').value);
	if(this.dashboardForm.get('searchTag').value != null) 
	{
		this.ds.searchByTag(this.dashboardForm.get('searchTag').value).subscribe((data: Article) => {
			this.articles = data;
		})
	}

  }

  searchTagButton() {
  console.log("search by TAG button", this.dashboardForm.get('searchTag').value);
  if(this.dashboardForm.get('searchTag').value != null) 
  {
	  this.ds.searchByTag(this.dashboardForm.get('searchTag').value).subscribe((data: Article) => {
		  this.articles = data;
	  })
  }
  }

  toggle(i:number) {
  	this.articleShow[i] = !this.articleShow[i];
  }

  //only works for EXACT URLS rn
  searchUrl() {
  	this.ds.searchByUrl(this.dashboardForm.get('searchUrl').value).subscribe((data: Article) => {
		if(data != null) 
		{
			let data2: Article[] = [data]; //switching one article element to an array
			this.totNumArticles = 1;
			this.articles = data2;	 
		} else {
			console.log("Invalid URL");
		}
  	})
  }

  searchTitle() {
  	console.log("search by title like", this.dashboardForm.get('searchTitle').value);
  	this.ds.searchByTitle(this.dashboardForm.get('searchTitle').value).subscribe((data: Article) => {
  		this.articles = data;
  	})
  }

  filterByStatus(filterVal: any) {
	this.stringSearched = '';
	if (filterVal == "all")
	this.ds.getArticles((this.page - 1), this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder, this.dashboardForm.get('statusFilter').value).subscribe((data: Article) => {
			this.articles = data;
  		});
	else
		this.ds.searchByStatus(this.dashboardForm.get('statusFilter').value, this.page - 1, this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder)
			.subscribe((data: Article) => {
				this.articles = data;
			}
		);
	}
	
	//val contains the $event from the html
	// one of the properties of event is srcElement (an html DOM object)
	// this object's value is the new value 
	changeStatus(id: number, val) {
		this.ds.setStatus(id, val.srcElement.value).subscribe((data: Article) => {
			this.ds.getArticles((this.page - 1), this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder, this.dashboardForm.get('statusFilter').value).subscribe((data: Article) => {
				this.articles = data;
  			});
		});
	}

	//number = id, val = status

	bulkChangeStatus(number, val) {
		this.ds.setStatus(number, val).subscribe((data: Article) => {
			this.ds.getArticles((this.page - 1), this.CONST_NUM_ARTICLES_PER_PAGE, this.sort, this.sortOrder, this.dashboardForm.get('statusFilter').value).subscribe((data: Article) => {
				this.articles = data;
  			});
		});
	}

	submitBulk() {
		let newStatus = this.dashboardForm.get('bulkStatus').value;
		console.log("submitting all checked for status change to ", newStatus);
	   let checkboxes = document.getElementsByName("articleCheckbox");
		checkboxes.forEach(cb => {
			let cbe = cb as HTMLInputElement;
			if (cbe.checked)  
				  // cbe.value contains the id of the checkbox (the is of the article)
					this.bulkChangeStatus(cbe.value, newStatus);
		})
	}
}