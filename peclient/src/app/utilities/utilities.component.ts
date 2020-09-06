import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UtilitiesService } from './utilities.service';
import { BuzzJob } from './buzzJob';

import { TagService } from '../manage-tags/manage-tags.service';
import { Tag } from '../manage-tags/tag';
import { stringify } from 'querystring';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

  utilitiesForm: FormGroup;
  buzzJobs: any = [];
  buzzQueries: any = [];
  s3Jobs: any = [];
  metricsJobs: any = [];
  disableBuzz: boolean = false;
  disableS3: boolean = false;
  disableMetrics: boolean = false;

  selected: string = "";
  tags: any = [];
  tagsString: string[] = [];
  tagsSelected: string[] = [];

  constructor(
  	private fb: FormBuilder,
  	private us: UtilitiesService,
    private el: ElementRef,
    private renderer: Renderer2,
    private ts: TagService,
  ) { 
    this.utilitiesForm = this.fb.group({
      typeaheadControl: new FormControl()
    });
  }

  ngOnInit() {
    this.getBuzz();
    this.getS3();
    this.getMetrics();
    this.getQueries();
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

  getBuzz() {
    this.us.getBuzzJobs().subscribe(d => {
      this.buzzJobs = d;
    })
  }

  getBuzzSumo(id: number) {
    this.disableBuzz = true;
    var intervalId: any = 0;
    intervalId = setInterval(
      () => this.getBuzz(),
      1000
    );
    this.us.doBuzz(id).subscribe(d => {
      console.log("back from doBuzz");
      console.log(d);
      console.log(d, "article id");
      clearInterval(intervalId);
      this.disableBuzz = false;
      this.getBuzz();
    },
    err => {
      console.log("there was an error getting buzz response", err);
      clearInterval(intervalId);
      this.disableBuzz = false;
      this.getBuzz();
    },
    () => {}
    );
  }

  getMetrics() {
    this.us.getMetricsJobs().subscribe(d => {
      this.metricsJobs = d;
    })
  }

  getQueries() {
    this.us.getBuzzQueries().subscribe(d => {
      this.buzzQueries = d;
    })
  }
  getUpdateMetrics() {
    this.disableMetrics = true;
    var intervalId: any = 0;
    intervalId = setInterval(
      () => this.getMetrics(),
      1000
    );  
    this.us.doMetrics().subscribe(d => {
      console.log("Update Metrics");
      console.log(d);
      clearInterval(intervalId);
      this.disableMetrics = false;
      this.getMetrics();
    },
    err => {
      console.log("There was an error updating metrics", err);
      clearInterval(intervalId);
      this.disableMetrics = false;
      this.getMetrics();
    },
    () => {}
    );
  }

  getS3() {
    this.us.getS3Jobs().subscribe(d => {
      this.s3Jobs = d;
    })
  }

  sendAcceptedToS3() {
    this.disableS3 = true;
    var intervalId: any = 0;
    intervalId = setInterval(
      () => this.getS3(),
      1000
    );
    this.us.doSend().subscribe(d => {
      console.log("back from doS3");
      console.log(d);
      clearInterval(intervalId);
      this.disableS3 = false;
      this.getS3();
    },
    err => {
      console.log("there was an error getting s3 response", err);
      clearInterval(intervalId);
      this.disableS3 = false;
      this.getS3();
    },
    () => {}
    );
  }

  addTag(tag:string) {
    let counter = 0;
    for(let x = 0; x < this.tagsSelected.length; x++) {
			if(this.tagsSelected[x].toString() == tag.toString())
			{
				counter = 1;
			}
    }
    if (counter == 0) {
      this.tagsSelected.push(tag);
    }
  }

  deleteTag(tag:string) {
    this.tagsSelected.splice(this.tagsSelected.indexOf(tag), 1);
  }
}

