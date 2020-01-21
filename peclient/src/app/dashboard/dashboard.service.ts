import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  
  constructor(
  	private http: HttpClient
  ) { }

  

  getArticles() {
  	return this.http.get<Article>('/api/article/');
  }

  getStatuses() {
  	return this.http.get<Status>('/api/status/');
  }


  searchByStatus(statusCode: string) {
  	return this.http.get<Article>('/api/article?status=' + statusCode);
  }

  searchByTitle(title: string) {
  	return this.http.get<Article>('/api/article?title=' + title);
  }

  searchByUrl(url: string) {
  	return this.http.get<Article>('/api/article?title=' + url);
  }

  setSubmit(articleId: number) {
    return this.http.post('/api/article/' + articleId + '/status/' + 
       this.statusMap.get("SENT_TO_TAGWORKS").statusCode, null);
  }

  setReject(articleId: number) {
    return this.http.post('/api/article/' + articleId + '/status/' + 
      this.statusMap.get("TAGWORKS_REJECTED").statusCode, null);
  }

}
