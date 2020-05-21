package com.example.demo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.example.demo.entities.BuzzJobEntity;
import com.example.demo.entities.BuzzQueryEntity;
import com.example.demo.entities.S3JobEntity;
import com.example.demo.entities.TagEntity;
import com.example.demo.repository.BuzzJobRepository;
import com.example.demo.repository.BuzzQueryRepository;
import com.example.demo.repository.S3JobRepository;
import com.example.demo.repository.TagRepository;
import com.example.demo.service.ArticleService;

@Service
public class TagService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(TagService.class);

	@Autowired TagRepository tagRepository;	
	@Autowired BuzzQueryRepository buzzQueryRepository;	
	
	public List<TagEntity> getTags() {
		return tagRepository.findAllByOrderByTag(); 
	}
	
	public TagEntity getTag(String tag) {
		Optional<TagEntity> foundTag = tagRepository.findByTag(tag);
		if (foundTag.isPresent())
			return foundTag.get();
		else
			return null;
	}
	public TagEntity getTagById(Integer id) {
		Optional<TagEntity> foundTag = tagRepository.findById(id);
		if (foundTag.isPresent())
			return foundTag.get();
		else
			return null;
	}
	public TagEntity newTag(String tag) {
		TagEntity newTag = new TagEntity();
		newTag.setTag(tag);
		return tagRepository.save(newTag);
	}
		
}
