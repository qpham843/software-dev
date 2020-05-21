package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.BuzzQueryEntity;
import com.example.demo.entities.BuzzQueryHasTagEntity;
import com.example.demo.entities.TagEntity;
import com.example.demo.repository.BuzzQueryHasTagRepository;
import com.example.demo.repository.BuzzQueryRepository;
import com.example.demo.repository.TagRepository;


@Service
public class BuzzQueryService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzQueryService.class);

	@Autowired TagRepository tagRepository;	
	@Autowired BuzzQueryRepository buzzQueryRepository;	
	@Autowired BuzzQueryHasTagRepository buzzQueryHasTagRepository;	
	
	public List<BuzzQueryEntity> getQueries() {
		return buzzQueryRepository.findAll(); 
	}
	
	public BuzzQueryEntity getQueryById(Integer id) {
		Optional<BuzzQueryEntity> foundQuery = buzzQueryRepository.findById(id);
		if (foundQuery.isPresent())
			return foundQuery.get();
		else
			return null;
	}
	public BuzzQueryEntity newQuery(String query) {
		BuzzQueryEntity newQuery = new BuzzQueryEntity();
		newQuery.setQuery(query);
		return buzzQueryRepository.save(newQuery);
	}
	public BuzzQueryEntity tagQuery(Integer queryId, String tag) {
		Optional<TagEntity> tagEntity = tagRepository.findByTag(tag);
		Optional<BuzzQueryEntity> buzzQuery = buzzQueryRepository.findById(queryId);
		Optional<BuzzQueryHasTagEntity> buzzQueryHasTag;
		
		if (buzzQuery.isPresent() == false)
			return null;
		
		if (tagEntity.isPresent() == false)
			return null;
		
		buzzQueryHasTag = buzzQueryHasTagRepository.findByQueryIdAndTagId(buzzQuery.get().getId(), tagEntity.get().getId());
		if (buzzQueryHasTag.isPresent())
			//tag is present for given query - delete it
			buzzQueryHasTagRepository.delete(buzzQueryHasTag.get());
		else {
			//tag is absent for given query - create it
			BuzzQueryHasTagEntity bqht = new BuzzQueryHasTagEntity();
			bqht.setQueryId(buzzQuery.get().getId());
			bqht.setTagId(tagEntity.get().getId());
			buzzQueryHasTagRepository.save(bqht);
		}
		buzzQueryRepository.findById(buzzQuery.get().getId());
		if (buzzQuery.isPresent())
			return buzzQuery.get();
		else
			return null;		
	}
		
}
