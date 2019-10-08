import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

import { Article } from '../article';

@Component({
  selector: '[app-article-row]',
  templateUrl: './article-row.component.html',
  styleUrls: ['./article-row.component.css']
})
export class ArticleRowComponent implements OnInit {

  @Input() article: Article;
  _statuses: any;
  _publishDate: string;
  _statusCode: string;
  _statusText: string;

  public articleRow: any;
  public displaySubmitButton: boolean;
  public displayRejectButton: boolean;

  constructor(private ds: DashboardService) {
  }

  ngOnInit() {
    this._statuses = this.ds.statusMap;
    this._publishDate = this.article.publishDate.split('T')[0];
    let slength = this.article.statuses.length;
    // Just get the most recent status from the history
    let latestStatus = this.article.statuses[slength-1];
    this._statusCode = latestStatus.statusCode;
    this._statusText = latestStatus.statusText;

    this.articleRow = {
      "id": this.article.id,
      "publishDate": this._publishDate,
      "title": this.article.title,
      "url": this.article.url,
      "statusCode": this._statusCode,
      "statusText": this._statusText
    }

    this.displaySubmitButton = [
      this._statuses.get("FILE_CREATED").statusCode, 
      this._statuses.get("TAGWORKS_REJECTED").statusCode]
      .includes(this._statusCode) ? true : false;

    this.displayRejectButton = [
      this._statuses.get("TAGWORKS_COMPLETE").statusCode, 
      this._statuses.get("METADATA_ERROR").statusCode, 
      this._statuses.get("TAGWORKS_REJECTED").statusCode]
      .includes(this._statusCode) ? false : true;
  }
 
  setSubmit(articleId: number) {
    this.ds.setSubmit(articleId).subscribe(
      // Proper UI behavior not yet implemented
      success => alert("Submitted to TagWorks"),
      error => alert(error)
    );
  }

  setReject(articleId: number) {
    this.ds.setReject(articleId).subscribe(
      // Proper UI behavior not yet implemented
      success => alert("Rejected"),
      error => alert(error)
    );
  }

}
