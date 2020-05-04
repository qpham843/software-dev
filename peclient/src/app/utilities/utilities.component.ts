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
  s3Jobs: any = [];
  disableBuzz: boolean = false;
  disableS3: boolean = false;


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
  }

  getBuzz() {
    this.us.getBuzzJobs().subscribe(d => {
      this.buzzJobs = d;
    })
  }

  getBuzzSumo() {
    this.disableBuzz = true;
    var intervalId: any = 0;
    intervalId = setInterval(
      () => this.getBuzz(),
      1000
    );
    this.us.doBuzz().subscribe(d => {
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
