package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import com.example.demo.repository.TagRepository;
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

import com.example.demo.entities.TagEntity;
import com.example.demo.entities.BuzzJobEntity;
import com.example.demo.service.TagService;
import com.example.demo.service.AuthService;
import com.example.demo.service.ScrapeService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/tags")
public class TagController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ArticleController.class);
	
	@Autowired TagService tagService;
	@Autowired ScrapeService scrapeService;
	@Autowired TagRepository tagRepository;
	@Autowired AuthService authService; 
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity getTags(
	) {
		return new ResponseEntity<>(tagService.getTags(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addTag", method = RequestMethod.POST)
	public ResponseEntity addTag(
		HttpServletRequest request,
		@RequestParam(required = true, name="name") String tagName
	) {

		JSONObject returnVal = new JSONObject();
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}

		TagEntity tag = tagService.newTag(tagName);
		tagRepository.save(tag);
		returnVal.put("name", tag.getTag());
		return new ResponseEntity<>(returnVal.toString(), HttpStatus.OK);
	}

	@RequestMapping(value = "/delTag", method = RequestMethod.POST)
	public ResponseEntity delTag(
		HttpServletRequest request,
		@RequestParam(required = true, name="id") Integer tagId
	) {

		JSONObject returnVal = new JSONObject();
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}

		returnVal.put("id", tagId);
		tagService.deleteTag(tagId);
		return new ResponseEntity<>(returnVal.toString(), HttpStatus.OK);
	}

	
}
