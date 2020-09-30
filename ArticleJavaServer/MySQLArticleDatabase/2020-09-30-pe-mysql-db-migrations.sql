ALTER TABLE buzz_query CHANGE COLUMN filename_tag filename_tag text;
alter table article change column filename_tag filename_tag text;

insert into buzz_query 
(id, query, filename_tag, active_flag) 
values 
(4, 'q=covid&num_days=365&result_type=evergreen_score&language=en', 'EvergreenCovidArticles',true);

update buzz_query set filename_tag = 'EvergreenCovidArticles' where filename_tag = 'EvergreenCovidArticl';

update buzz_query set query = 'https://api.buzzsumo.com/search/trends.json?topic=coronavirus,covid&search_type=trending_now&hours=24&count=25&countries=United States' where filename_tag = 'CovidArticles';

update buzz_query set query = 'https://api.buzzsumo.com/search/trends.json?topic=Black Lives Matter,BLM&search_type=trending_now&hours=24&count=25&countries=United States' where filename_tag = 'BLMArticles';

update buzz_query set query = 'https://api.buzzsumo.com/search/trends.json?topic=Election 2020,US Election,Election&search_type=trending_now&hours=24&count=25&countries=United States' where filename_tag = 'ElectionArticles';

update buzz_query set query = 'https://api.buzzsumo.com/search/articles.json?q=covid&num_days=365&result_type=evergreen_score&language=en' where filename_tag = 'EvergreenCovidArticles';


