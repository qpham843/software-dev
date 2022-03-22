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
import com.example.demo.repository.BuzzJobRepository;
import com.example.demo.service.ArticleService;

@Service
@Transactional
public class BuzzJobService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzJobService.class);

	@PersistenceContext private EntityManager entityManager;
	@Autowired BuzzJobRepository buzzJobRepository;	
	
	public List<BuzzJobEntity> getBuzzJobs() {
		return buzzJobRepository.findAllByOrderByStartDateDesc();
	}
	
	public BuzzJobEntity refresh(BuzzJobEntity bj) {
		Optional<BuzzJobEntity> newBj = buzzJobRepository.findById(bj.getId());
		if (newBj.isPresent()) {
			return newBj.get();
		} else {
			return null;
		}
	}
	
	public BuzzJobEntity startNew(String query) {
		BuzzJobEntity bj = new BuzzJobEntity();
		bj.setQuery(query);
		return buzzJobRepository.save(bj);
	}
	
	public List<BuzzJobEntity> findRecent() {
		//return buzzJobRepository.findAllByOrderByStartDateDesc();
		Date now = new Date();
		//60*60*24*1000*2 (miliseconds in a day) * 2
		Long twoDaysMilliseconds = (long) (60 * 60 * 24 * 1000 * 2);
		Date lessTwoDays = new Date(now.getTime() - twoDaysMilliseconds); 
		return buzzJobRepository.findByStartDateGreaterThanOrderByStartDateDesc(lessTwoDays);

	}
	
	public BuzzJobEntity save(BuzzJobEntity bj) {
		Date now = new Date();
		Integer seconds = (int) (now.getTime() - bj.getStartDate().getTime()) / 1000;
		buzzJobRepository.storeBJ(
			bj.getId(),
			bj.getEndDate(),
			bj.getFinished(),
			seconds,
			bj.getArticlesReturned(),
			bj.getArticlesYoutube(),
			bj.getArticles700(),
			bj.getArticlesDropped(),
			bj.getArticlesCreated(),
			bj.getArticlesUpdated()
		);
		return bj;
	}
	

}
