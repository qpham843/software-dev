
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

insert into tag (id, tag) values (1, 'one'), (2, 'two'), (3, 'three');

insert into article_has_tag (id, tag_id, article_id) values (1, 1, 1), (2, 2, 1), (3, 3, 1);

update article set filename_tag = "CovidArticles" where id > 0;

