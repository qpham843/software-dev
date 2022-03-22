package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.ArticleHasStatusEntity;

public interface ArticleHasStatusRepository extends CrudRepository<ArticleHasStatusEntity, Integer>{
	public Optional<ArticleHasStatusEntity> findById(Integer id);
	public List<ArticleHasStatusEntity> findByArticleStatusId(Integer articleStatusId);
	
	@Query("SELECT DISTINCT ahs.articleId from ArticleHasStatusEntity ahs where ahs.articleStatusId = :articleStatusId")
	public List<Integer> findDistinctArticleIdByArticleStatusId(Integer articleStatusId);
	
//	@Query(value="select * from article where title like concat('%',:title,'%') ", nativeQuery=true)
//	public List<ArticleEntity> findByTitle(String title);
//	
}
