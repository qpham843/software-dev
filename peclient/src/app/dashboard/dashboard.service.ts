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

  getArticles(page: number, size: number, sort: string) {
  	return this.http.get<Article>(this.apiDest + '/article/' + 'page?no=' + page + '&size=' + size + '&sort=' + sort);
  }
  //article/page?no=0&size=100&sort=date

  getStatuses() {
  	return this.http.get<Status>(this.apiDest + '/status/');
  }
  getTotNumArticles() {
    return this.http.get<Number>(this.apiDest + '/article/totalpages?size=1');
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
    //fix
  	return this.http.get<Article>('/api/article?status=' + statusCode);
  }

  searchByTitle(title: string) {
  	return this.http.get<Article>(this.apiDest + '/article?title=' + title);
  }

  searchByUrl(url: string) {
  	return this.http.get<Article>(this.apiDest + '/article?url=' + url);
  }

  searchByTag(tag: string) {
  	return this.http.get<Article>(this.apiDest + '/article?tag=' + tag);
  }

  setStatus(id: number, status: string) {
    return this.http.post(this.apiDest + '/article/' + id + '/status/' + status, null);
  }

}
