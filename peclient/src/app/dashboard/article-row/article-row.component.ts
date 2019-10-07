import { Component, Input, OnInit } from '@angular/core';

import { Article } from '../article';

@Component({
  selector: '[app-article-row]',
  templateUrl: './article-row.component.html',
  styleUrls: ['./article-row.component.css']
})
export class ArticleRowComponent implements OnInit {

  @Input() article: Article;
  _publishDate: string;
  _statusCode: string;
  _statusText: string;

  public articleRow: any;

  constructor() { }

  ngOnInit() {
    this._publishDate = this.article.publishDate.split('T')[0];
    let slength = this.article.statuses.length;
    // Just get the most recent status from the history
    let latestStatus = this.article.statuses[slength-1];
    this._statusCode = latestStatus.statusCode;
    this._statusText = latestStatus.statusText;

    this.articleRow = {
      "publishDate": this._publishDate,
      "title": this.article.title,
      "url": this.article.url,
      "statusCode": this._statusCode,
      "statusText": this._statusText
    }
  }
  
}
