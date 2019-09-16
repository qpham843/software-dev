package com.example.demo.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.service.ArticleService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/article")
public class ArticleController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ArticleController.class);
	
	@Autowired ArticleService articleService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<ArticleEntity> getAllArticles() {
		return articleService.findAllArticles();
	}

	@RequestMapping(value = "/{Id}", method = RequestMethod.GET)
	public ArticleEntity getArticleById(@PathVariable("Id") Integer Id) {
		return articleService.findArticleById(Id);
	}
	
	@RequestMapping(value = "url/{url}", method = RequestMethod.GET)
	public List<ArticleEntity> getArticleByUrl(@PathVariable("url") String url) {
		return articleService.findArticleByUrl(url);
	}

	@RequestMapping(value = "title/{title}", method = RequestMethod.GET)
	public List<ArticleEntity> getArticleByTitle(@PathVariable("title") String title) {
		return articleService.findArticleByTitle(title);
	}

}
