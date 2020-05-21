package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.ArticleHasStatusEntity;
import com.example.demo.entities.ArticleHasTagEntity;
import com.example.demo.entities.BuzzQueryHasTagEntity;

public interface BuzzQueryHasTagRepository extends CrudRepository<BuzzQueryHasTagEntity, Integer>{
	public Optional<BuzzQueryHasTagEntity> findById(Integer id);
	public Optional<BuzzQueryHasTagEntity> findByQueryIdAndTagId(Integer articleId, Integer tagId);
	public List<BuzzQueryHasTagEntity> findByQueryId(Integer articleId);
	public List<BuzzQueryHasTagEntity> findByTagId(Integer tagId);
	
	
}
