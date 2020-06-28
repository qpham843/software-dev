import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuzzQueryService {

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

  getQueries() {
  	return this.http.get(this.apiDest + '/query');
  }

  newQuery(query: string) {
    return this.http.post(this.apiDest + '/query/' + query, null);
  }
}
