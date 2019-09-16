package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.entities.ArticleHasStatusEntity;
import com.example.demo.entities.ArticleStatusEntity;

public interface ArticleHasStatusRepository extends CrudRepository<ArticleHasStatusEntity, Integer>{
	public Optional<ArticleHasStatusEntity> findById(Integer id); 

	public List<ArticleHasStatusEntity> findByArticleStatusId(Integer statusId);
	public List<ArticleHasStatusEntity> findByArticleId(Integer articleId);
	
	@Query(value="select * from article_has_status where article_id = :articleId sort desc timestamp limit 1 ", nativeQuery=true)
	public ArticleHasStatusEntity findCurrentStatus(Integer articleId);

//	@Query(value="select * from article where title like concat('%',:title,'%') ", nativeQuery=true)
//	public List<ArticleEntity> findByTitle(String title);

	
}
