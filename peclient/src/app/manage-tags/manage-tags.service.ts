import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../dashboard/article';
import { Status } from '../dashboard/article';
import { environment } from '../../environments/environment';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root'
})

export class TagService {
  
  apiDest: string = "";
  constructor(
  	private http: HttpClient
  ) { 
    if (environment.production) {
      this.apiDest = '/api';
    } else {
      this.apiDest = '/dev';
    }
  }

  getTags() {
  	return this.http.get<Tag>(this.apiDest + '/tags');
  }

  addTag(name: string) {
    console.log("Tag added");
    return this.http.post(this.apiDest + '/tags?name=' + name, null);
  }

  deleteTag(id: number) {
    return this.http.delete(this.apiDest + '/tags?id=' + id);
  }
}
