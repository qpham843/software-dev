package com.example.demo.controller;

import java.io.IOException;
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
		ArticleEntity article = articleService.findArticleById(4);
		fileService.makeFile(article);
		return "aaaa";
	}
	@RequestMapping(value = "/py", method = RequestMethod.GET)
	public String getBuzzPy() {
		Runtime r = Runtime.getRuntime();
		try {
			Process p = r.exec("cmd /c python c:\\aa\\software-dev\\py\\try4.py");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "bbbbb";
	}
}
