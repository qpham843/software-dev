export interface Status {
  statusText: string;
  statusCode: string;
}

export interface Article {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  articleText: string;
  url: string;
  statuses: Status[];
}
