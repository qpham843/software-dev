package com.example.demo.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.service.BuzzService;
import com.example.demo.service.FileService;
import com.example.demo.entities.ArticleEntity;
import com.example.demo.service.ArticleService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("buzz")
public class BuzzController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzController.class);
	
	@Autowired ArticleService articleService;
	@Autowired BuzzService buzz;
	@Autowired FileService fileService;
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String getBuzz() {
		// StringBuilder url = new StringBuilder("https://api.buzzsumo.com/search/articles.json?q=https://www.washingtonpost.com/politics/as-warren-and-buttigieg-rise-the-democratic-presidential-race-is-competitive-and-fluid-a-washington-post-abc-news-poll-finds/2019/11/02/4b7aca3c-fccd-11e9-8906-ab6b60de9124_story.html&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf");
//		logger.info("from buxxBatch: " + buzz.getBuzz(url.toString()) );
		fileService.makeFile();
		return "aaaa";
	}
	
}
