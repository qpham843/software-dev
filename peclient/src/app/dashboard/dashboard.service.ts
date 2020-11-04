import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';
import { Status } from './article';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  
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

  getArticles() {
  	return this.http.get<Article>(this.apiDest + '/article/');
  }

  getStatuses() {
  	return this.http.get<Status>(this.apiDest + '/status/');
  }
  
  addArticle(id: number, tagStr: string) {
    //console.log(id, tagStr, "id + tag string, article added");
    return this.http.post(this.apiDest + "/article/" + id + "/tag/" + tagStr, null);
  }
  deleteArticle(id: number, tagStr: string) {
    //console.log(id, tagStr, "id + tag string, article deleted");
    return this.http.delete(this.apiDest + "/article/" + id + "/tag/" + tagStr);
  }

  searchByStatus(statusCode: string) {
    if(!statusCode || statusCode == "popular")
    {
      return this.http.get<Article>('/api/article/');
    }
  	return this.http.get<Article>('/api/article?status=' + statusCode);
  }

  searchByTitle(title: string) {
  	return this.http.get<Article>(this.apiDest + '/article?title=' + title);
  }

  searchByUrl(url: string) {
  	return this.http.get<Article>(this.apiDest + '/article?title=' + url);
  }

  searchByTag(url: string) {
  	return this.http.get<Article>(this.apiDest + '/tag?title=' + url);
  }

  setStatus(id: number, status: string) {
    return this.http.post(this.apiDest + '/article/' + id + '/status/' + status, null);
  }

}
