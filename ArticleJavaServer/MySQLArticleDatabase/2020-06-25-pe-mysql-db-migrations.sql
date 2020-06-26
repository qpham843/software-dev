
alter table buzz_query
add column
	filename_tag varchar(20) null;

alter table buzz_query
add column
    active_flag boolean;

insert into buzz_query 
(id, query, filename_tag, active_flag) 
values 
(1, 'topic=coronavirus,covid&search_type=trending_now&hours=24&count=25&countries=United States', 'CovidArticles',true),
(2, 'topic=Black Lives Matter,BLM&search_type=trending_now&hours=24&count=25&countries=United States', 'BLMArticles',true),
(3, 'topic=Election 2020,US Election,Election&search_type=trending_now&hours=24&count=25&countries=United States', 'ElectionArticles',true)
;

alter table article
add column
	filename_tag varchar(20) null;

