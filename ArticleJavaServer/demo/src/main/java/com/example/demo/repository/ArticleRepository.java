package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.ArticleEntity;

public interface ArticleRepository extends CrudRepository<ArticleEntity, Integer>{
	public Optional<ArticleEntity> findById(Integer id);
	public Optional<ArticleEntity> findByUrl(String url);
	
	@Query(value="select * from article where title like concat('%',:title,'%') ", nativeQuery=true)
	public List<ArticleEntity> findByTitle(String title);

	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id order by a.publish_date DESC", nativeQuery=true)
	public List<ArticleEntity> findByStatusCodeOrderByPublishDateDesc(String statusCode);
	
	public ArticleEntity findOneByArticleHash(String articleHash);
	public List<ArticleEntity> findAllByOrderByPublishDateDesc();
	
	public List<ArticleEntity> findByTags_tagOrderByPublishDateDesc(String tag);
	
}
