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
import com.example.demo.entities.S3JobEntity;
import com.example.demo.repository.BuzzJobRepository;
import com.example.demo.repository.S3JobRepository;
import com.example.demo.service.ArticleService;

@Service
@Transactional
public class S3JobService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(S3JobService.class);

	@Autowired S3JobRepository s3JobRepository;	
	
	public List<S3JobEntity> getBuzzJobs() {
		return s3JobRepository.findAllByOrderByStartDateDesc();
	}
	
	public S3JobEntity refresh(S3JobEntity s3j) {
		Optional<S3JobEntity> newS3j = s3JobRepository.findById(s3j.getId());
		if (newS3j.isPresent()) {
			return newS3j.get();
		} else {
			return null;
		}
	}
	
	public S3JobEntity startNew() {
		S3JobEntity s3j = new S3JobEntity();
		return s3JobRepository.save(s3j);
	}
	
	public List<S3JobEntity> findRecent() {
		//return s3JobRepository.findAllByOrderByStartDateDesc();
		Date now = new Date();
		//60*60*24*1000*2 (miliseconds in a day) * 2
		Long twoDaysMilliseconds = (long) (60 * 60 * 24 * 1000 * 2);
		Date lessTwoDays = new Date(now.getTime() - twoDaysMilliseconds); 
		return s3JobRepository.findByStartDateGreaterThanOrderByStartDateDesc(lessTwoDays);
	}
	
	public S3JobEntity save(S3JobEntity s3j) {
		Date now = new Date();
		Integer seconds = (int) (now.getTime() - s3j.getStartDate().getTime()) / 1000;
		s3JobRepository.storeS3J(
			s3j.getId(),
			s3j.getFinished(),
			seconds,
			s3j.getArticlesToSend(),
			s3j.getArticlesSent(),
			s3j.getArticles()
		);
		return s3j;
	}
	

}
