package com.example.demo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.controller.ArticleController;
import com.example.demo.entities.ArticleEntity;
import com.example.demo.entities.StatusEntity;
import com.example.demo.entities.ArticleHasStatusEntity;
import com.example.demo.repository.ArticleHasStatusRepository;
import com.example.demo.repository.ArticleRepository;
import com.example.demo.repository.StatusRepository;

@Service
public class ArticleService {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ArticleController.class);
	
	@Autowired private ArticleRepository articleRepository;
	@Autowired private StatusRepository statusRepository;
	@Autowired private ArticleHasStatusRepository articleHasStatusRepository;
	
	public ArticleEntity findArticleById(Integer id) {
		Optional<ArticleEntity> a = articleRepository.findById(id);
		if (a.isPresent())
			return a.get();
		else
			return null;
	}
	
	public List<ArticleEntity> findArticleByStatus(String statusCode) {
		return articleRepository.findByStatusCode(statusCode);
	}

	public ArticleEntity findArticleByUrl(String url) {
		Optional<ArticleEntity> a = articleRepository.findByUrl(url);
		if (a.isPresent()) {
			return a.get();
		} else {
			return null;
		}
	}
	
	public ArticleEntity createNewArticle(String url, String status) {
		ArticleEntity a = new ArticleEntity();
		a.setUrl(url);
		ArticleEntity b = articleRepository.save(a);
		ArticleHasStatusEntity ahs = new ArticleHasStatusEntity();
		ahs.setArticleId(b.getId());
		Optional<StatusEntity> s = statusRepository.findByStatusCode(status);
		if (s.isPresent()) {
			ahs.setArticleStatusId(s.get().getId());
		} else {
			ahs.setArticleStatusId(1);
		}
		ArticleHasStatusEntity newAhs = articleHasStatusRepository.save(ahs);
		Optional<ArticleEntity> c = articleRepository.findById(b.getId());
		if (c.isPresent()) {
			return c.get();
		} else {
			return null;
		}
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
	
	public ArticleEntity updateStatus(Integer id, String status, String comment) {
		Optional<ArticleEntity> articleToFind = articleRepository.findById(id);
		
		ArticleEntity foundArticle;
		if (articleToFind.isPresent()) 
			foundArticle = articleToFind.get();
		else
			return null;
			
		Optional<StatusEntity> dbStatusToFind = statusRepository.findByStatusCode(status);
		
		if (dbStatusToFind.isPresent()) {
			ArticleHasStatusEntity newStatus = new ArticleHasStatusEntity();
			StatusEntity dbStatus = dbStatusToFind.get();
			newStatus.setArticleId(foundArticle.getId());
			newStatus.setArticleStatusId(dbStatus.getId());
			newStatus.setDateChanged(new Date());
			newStatus.setComment(comment);
			articleHasStatusRepository.save(newStatus);
			Optional<ArticleEntity> updatedArticleToFind = articleRepository.findById(foundArticle.getId());
			if (updatedArticleToFind.isPresent()) {
				ArticleEntity foundUpdatedArticle = updatedArticleToFind.get();
				return foundUpdatedArticle;
			}
		}
		return null;			
	}

}
