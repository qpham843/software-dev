package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.entities.ArticleStatusEntity;

public interface ArticleStatusRepository extends CrudRepository<ArticleStatusEntity, Integer>{
	public Optional<ArticleStatusEntity> findById(Integer id);
	
}
