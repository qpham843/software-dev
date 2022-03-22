package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.ArticleHasStatusEntity;
import com.example.demo.entities.ArticleHasTagEntity;

public interface ArticleHasTagRepository extends CrudRepository<ArticleHasTagEntity, Integer>{
	public Optional<ArticleHasTagEntity> findById(Integer id);
	public List<ArticleHasTagEntity> findByArticleId(Integer articleId);
	public List<ArticleHasTagEntity> findByTagId(Integer tagId);
	
	@Query("SELECT DISTINCT aht.articleId from ArticleHasTagEntity aht where aht.tagId = :tagId")
	public List<Integer> findDistinctArticleIdByTagId(Integer tagId);
	public Optional<ArticleHasTagEntity> findByArticleIdAndTagId(Integer articleId, Integer tagId);
	
}
