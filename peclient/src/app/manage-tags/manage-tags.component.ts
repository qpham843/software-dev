import { Component, OnInit } from '@angular/core';
import { TagService } from './manage-tags.service';
import { Tag } from './tag';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.css']
})

export class ManageTagsComponent implements OnInit {
	constructor(
		private ts: TagService
	) { }

  	tags: any = [];

  	ngOnInit() {
		this.ts.getTags().subscribe((data: Tag) => {
			this.tags = data;
			console.log(this.tags);
  		});
  	}

  	addTags(tag:string)
  	{
  		this.ts.addTag(tag).subscribe((data: any) => {
  			console.log('added tag', data);
  			this.ngOnInit();
  		});
  	}

  	deleteTags() {
  		console.log("deleting tags");
	 	let checkboxes = document.getElementsByName("articleCheckbox");
	  	checkboxes.forEach(cb => {
	  		let cbe = cb as HTMLInputElement;
  			if (cbe.checked) 
  			{ 
  				console.log(cbe.value)
  				for(let x = 0; x < this.tags.length; x++) {
					if(this.tags[x] != undefined && this.tags[x].tag == cbe.value)
					{
						this.ts.deleteTag(this.tags[x].id).subscribe((data: any) => {
							console.log("back from deleting tag ", data);
						});
					}
				}
  			}
  			this.ngOnInit();
	  	})
  }
}