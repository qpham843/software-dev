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
  disableBuzz: boolean = false;

  constructor(
  	private fb: FormBuilder,
  	private us: UtilitiesService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) { 

  	this.utilitiesForm = this.fb.group({
  		sendResults: new FormControl(),
  		buzzResults: new FormControl(),
  	});
  }

  ngOnInit() {
    this.getBuzz();

  }

  sendAcceptedToS3() {
  	this.us.doSend().subscribe(
      res => {
        console.log("response ", res)
        //console.log(d);
        this.utilitiesForm.get('sendResults').setValue("fffffffffff");
      },
      err => {
        console.log("errrrrr", err);

        console.log(err.ok);
        console.log(err.status);
        console.log(err.statusText);
        console.log(err.error.text);
        this.utilitiesForm.get('sendResults').setValue(err.error.text);
      },
      () => {
        
      });
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
    });
  }

}
