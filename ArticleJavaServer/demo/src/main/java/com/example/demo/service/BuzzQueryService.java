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
import com.example.demo.service.TagService;


@Service
public class BuzzQueryService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzQueryService.class);

	@Autowired TagRepository tagRepository;	
	@Autowired TagService tagService;	
	@Autowired BuzzQueryRepository buzzQueryRepository;	
	@Autowired BuzzQueryHasTagRepository buzzQueryHasTagRepository;	
	
	public List<BuzzQueryEntity> getQueries() {
		//return buzzQueryRepository.findAll(); 
		return buzzQueryRepository.findByActiveFlag(1);
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
		System.out.println("inside tagQuery()");
		System.out.println("query id: " + queryId);
		System.out.println("tag name: " + tag);
		Optional<TagEntity> tagEntity = tagRepository.findByTag(tag);
		Optional<BuzzQueryEntity> buzzQuery = buzzQueryRepository.findById(queryId);
		Optional<BuzzQueryHasTagEntity> buzzQueryHasTag;
		
		if (buzzQuery.isPresent() == false){
			System.out.println("buzzquery doesn't exist");
			return null;
		}

		TagEntity newTag = null;
		
		if (tagEntity.isPresent() == false) {
			System.out.println("tagentity doesn't exist, adding new tag entity");
			newTag = tagService.newTag(tag);
			tagRepository.save(newTag);
		} else {
			newTag = tagEntity.get();
		}

		buzzQueryHasTag = buzzQueryHasTagRepository.findByQueryIdAndTagId(buzzQuery.get().getId(), newTag.getId());
		BuzzQueryHasTagEntity bqht = null;
		if (buzzQueryHasTag.isPresent() == false) {
			bqht = new BuzzQueryHasTagEntity();
			bqht.setQueryId(buzzQuery.get().getId());
			bqht.setTagId(newTag.getId());
			bqht.setTag(tag);
			buzzQueryHasTagRepository.save(bqht);
			System.out.println("Made new buzzQueryHasTagEntity: " + tag);
			
		} else {
			System.out.println("buzzQueryHasTagEntity already exists");
		}

		buzzQueryRepository.findById(buzzQuery.get().getId());
		if (buzzQuery.isPresent())
			return buzzQuery.get();
		else
			return null;		
	}
		
}
