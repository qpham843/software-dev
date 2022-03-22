import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BuzzQueryService } from './buzz-query.service';

@Component({
  selector: 'app-buzz-queries',
  templateUrl: './buzz-queries.component.html',
  styleUrls: ['./buzz-queries.component.css']
})
export class BuzzQueriesComponent implements OnInit {

  queriesForm: FormGroup;
  queries: any = [];

  constructor(
  	private fb: FormBuilder,
  	private bqs: BuzzQueryService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) { 
    this.queriesForm = this.fb.group({
    	newQuery: new FormControl()
    });
  }


  ngOnInit() {
  	this.getQueries();
  }

  getQueries() {
  	this.bqs.getQueries().subscribe(d => {
  		console.log('got buzz queries', d);
  		this.queries = d;
  	});
  }

  submitQuery() {
  	this.bqs.newQuery(this.queriesForm.get('newQuery').value).subscribe(d => {
  		this.queriesForm.get('newQuery').setValue('');
  		this.getQueries();
  	})
  }

}
