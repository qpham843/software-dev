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
import com.example.demo.entities.StatusEntity;
import com.example.demo.entities.TagEntity;
import com.example.demo.repository.BuzzJobRepository;
import com.example.demo.repository.BuzzQueryRepository;
import com.example.demo.repository.S3JobRepository;
import com.example.demo.repository.StatusRepository;
import com.example.demo.repository.TagRepository;
import com.example.demo.service.ArticleService;

@Service
public class StatusService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(StatusService.class);

	@Autowired StatusRepository statusRepository;	
	
	public StatusEntity getStatusByCode(String statusCode) {
		Optional<StatusEntity> r = statusRepository.findByStatusCode(statusCode);
		if (r.isPresent()) {
			return r.get();
		} else {
			return null;
		}
			
	}
	
}
