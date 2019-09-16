package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.repository.ArticleRepository;

@Service
public class ArticleService {
	@Autowired private ArticleRepository articleRepository;
	public ArticleEntity findArticleById(Integer id) {
		Optional<ArticleEntity> a = articleRepository.findById(id);
		if (a.isPresent())
			return a.get();
		else
			return null;
	}

	public List<ArticleEntity> findArticleByUrl(String url) {
		return articleRepository.findByUrl(url);
	}

	public List<ArticleEntity> findArticleByTitle(String title) {
		return articleRepository.findByTitle(title);
	}
	
	public List<ArticleEntity> findAllArticles() {
		Iterable<ArticleEntity> articleIterable = articleRepository.findAll();
		List<ArticleEntity> list = new ArrayList<ArticleEntity>();
		articleIterable.forEach(list::add);
		return list;
		
	}

}
