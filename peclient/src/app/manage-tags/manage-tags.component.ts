import { Component, OnInit } from '@angular/core';
import {TagService} from './manage-tags.service';
@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.css']
})
export class ManageTagsComponent implements OnInit {
	constructor(private ts: TagService)
	{ 
	}

  ngOnInit() {
	this.ts.getTags().subscribe((data: tag) => {
		console.log(data);
		this.tags = data;
		console.log(this.tags);
		console.log(this.tags.length);
		for(let x = 0; x < this.tags.length; x++) {
			if(this.tags[x] != undefined)
			{
			console.log(this.tags[x].tag);
			}
		}
  	});
  }
  addTag(tag:string)
  {
  console.log(tag);
  }
 }