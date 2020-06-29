package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.StatusEntity;
import com.example.demo.entities.TagEntity;

public interface TagRepository extends CrudRepository<TagEntity, Integer>{
	@Modifying
	@Transactional
	@Query(value="DELETE from tag WHERE id = :id", nativeQuery=true)
	public void deleteTagById(Integer id);

	public Optional<TagEntity> findById(Integer id);
	public Optional<TagEntity> findByTag(String tag);

	@Query(value="select * from tag", nativeQuery=true)
	public List<TagEntity> findAllByOrderByTag();

}
