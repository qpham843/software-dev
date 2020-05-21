package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.entities.BuzzJobEntity;
import com.example.demo.service.ArticleService;
import com.example.demo.service.AuthService;
import com.example.demo.service.BuzzJobService;
import com.example.demo.service.BuzzQueryService;
import com.example.demo.service.BuzzService;
import com.example.demo.service.ScrapeService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/query")
public class BuzzQueryController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzQueryController.class);
	
	@Autowired AuthService authService; 
	@Autowired BuzzQueryService buzzQueryService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity getAllQueries(
		HttpServletRequest request
	) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(buzzQueryService.getQueries(), HttpStatus.OK);
	}
	

	
	@RequestMapping(value = "/{id}/tag/{tag}", method = RequestMethod.POST)
	public ResponseEntity toggleQueryTag(
			HttpServletRequest request,
			@PathVariable("id") Integer id,
			@PathVariable("tag") String tag) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(buzzQueryService.tagQuery(id, tag), HttpStatus.OK);
	}

	@RequestMapping(value = "/{query}", method = RequestMethod.POST)
	public ResponseEntity createQuery(
			HttpServletRequest request,
			@PathVariable("query") String query) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(buzzQueryService.newQuery(query), HttpStatus.OK);
	}
}
