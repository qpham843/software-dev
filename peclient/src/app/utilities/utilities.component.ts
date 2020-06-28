import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UtilitiesService } from './utilities.service';
import { BuzzJob } from './buzzJob';

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


  constructor(
  	private fb: FormBuilder,
  	private us: UtilitiesService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) { 
    this.utilitiesForm = this.fb.group({});
  }

  ngOnInit() {
    this.getBuzz();
    this.getS3();
    this.getMetrics();
    this.getQueries();
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
}
