export interface Status {
  statusText: string;
  statusCode: string;
}

export interface Article {
  id: number;
  articleTitle: string;
  author: string;
  publishDate: string;
  articleText: string;
  url: string;
  statuses: Status[];
}
