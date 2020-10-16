import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

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

  doSend() {
  	return this.http.get(this.apiDest + '/article/s3')
  }

  doBuzz(id: number) {
  	return this.http.get(this.apiDest + '/article/buzz2/' + id);
  }

  doMetrics() {
    return this.http.get(this.apiDest + '/article/update')
  }

  getBuzzJobs() {
    return this.http.get(this.apiDest + '/buzzJob');
  }
  
  getS3Jobs() {
    return this.http.get(this.apiDest + '/s3Job');
  }

  getMetricsJobs() {
    return this.http.get(this.apiDest + '/updateJob')
  }

  getBuzzQueries() {
    return this.http.get(this.apiDest + '/query')
  }
//unfinished need to get links
  addQueryTag(queryId: string, tagStr: any) {
    console.log(queryId, "queryId");
    console.log(tagStr.value, "tagStr");
    console.log(this.apiDest + '/query/' + queryId + '/tag/' + tagStr);
    return this.http.post(this.apiDest + '/query/' + queryId + '/tag/' + tagStr.value, null)
  }

  deleteQueryTag(queryId: string, tagStr: string) {
    return this.http.delete(this.apiDest + '/query/' + queryId + '/tag/' + tagStr)
  }

}
 