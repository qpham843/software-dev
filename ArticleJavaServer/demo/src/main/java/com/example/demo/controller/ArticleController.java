package com.example.demo.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.service.ArticleService;
import com.example.demo.service.BuzzService;
import com.example.demo.service.FileService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/article")
public class ArticleController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ArticleController.class);
	
	@Autowired ArticleService articleService;
	@Autowired BuzzService buzzService;
	@Autowired FileService fileService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public List<ArticleEntity> getAllArticles(
		@RequestParam(required = false, name="status") String statusCode,
		@RequestParam(required = false, name="title") String title,
		@RequestParam(required = false, name="url") String url
	) {
		if (statusCode != null) {
			return articleService.findArticleByStatus(statusCode); 
		}
		if (title != null) {
			return articleService.findArticleByTitle(title);
		}
		if (url != null) {
			ArticleEntity a = articleService.findArticleByUrl(url);
			List<ArticleEntity> al = new ArrayList<ArticleEntity>();
			al.add(a);
			return al;
		}
		return articleService.findAllArticles();
	}

	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public ArticleEntity newArticle(
		@RequestParam(required = true, name="url") String url
	) {
		ArticleEntity article = articleService.findArticleByUrl(url);
		JSONObject jArticle = null;
		if (article != null) {
			return article;
		} else {
			ArticleEntity newArticle = articleService.createNewArticle(url, "USER");
			jArticle = buzzService.getBuzz(url);
			ArticleEntity updatedArticle = articleService.updateArticleWithBuzz(jArticle, newArticle);
			fileService.makeFile(updatedArticle);
			return updatedArticle;
		}
		
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ArticleEntity getArticleById(@PathVariable("id") Integer id) {
		return articleService.findArticleById(id);
	}
	
	@RequestMapping(value = "/{id}/status/{status}", method = RequestMethod.POST)
	public ArticleEntity getArticleById(@PathVariable("id") Integer id,
			@PathVariable("status") String status) {
		return articleService.updateStatus(id, status, "Comment Placeholder - article controller - POST /status");
	}

	
}
