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

  searchByTitle(title: string) {
  	return this.http.get<Article>('/api/article/title/' + title);
  }

}

