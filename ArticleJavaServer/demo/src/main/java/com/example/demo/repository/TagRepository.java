package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.StatusEntity;
import com.example.demo.entities.TagEntity;

public interface TagRepository extends CrudRepository<TagEntity, Integer>{
	public Optional<TagEntity> findById(Integer id);
	public Optional<TagEntity> findByTag(String tag);	
	public List<TagEntity> findAllByOrderByTag();
}
