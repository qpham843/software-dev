export interface BuzzJob {
  id: number;
  startDate: string;
  endDate: string;
  finished: boolean;
  elapsedSeconds: number;
  query: string;
  articlesReturned: number;
  articlesYoutube: number;
  articles700: number;
  articlesDropped: number;
  articlesCreated: number;
  articlesUpdated: number;

}
