delete from article where filename_tag like '%evergreen%' and publish_date > timestamp('2020-05-05');
update article set filename_tag = 'Covid2EvergreenArticles' where filename_tag like '%evergreen%';
