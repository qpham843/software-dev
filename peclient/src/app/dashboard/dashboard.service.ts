import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  public statusMap: any = new Map([
    ["URL_FROM_BUZZFEED",   {"statusCode": "A", "description": "Url From BuzzFeed"}],
    ["SCRAPED",             {"statusCode": "B", "description": "Scraped"}],
    ["METADATA_EXTRACTED",  {"statusCode": "C", "description": "Metadata Extracted"}],
    ["FILE_CREATED",        {"statusCode": "D", "description": "FileCreated"}],
    ["SENT_TO_TAGWORKS",    {"statusCode": "E", "description": "Sent To Tagworks"}],
    ["TAGWORKS_COMPLETE",   {"statusCode": "F", "description": "Tagworks Complete"}],
    ["METADATA_ERROR",      {"statusCode": "G", "description": "Metadata Error"}],
    ["TAGWORKS_REJECTED",   {"statusCode": "H", "description": "Tagworks Rejected"}],
  ]);
  
  constructor(
  	private http: HttpClient
  ) { }

  

  getArticles() {
  	return this.http.get<Article>('/api/article/');
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

