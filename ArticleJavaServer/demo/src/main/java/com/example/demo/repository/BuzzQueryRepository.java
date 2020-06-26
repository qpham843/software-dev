package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.BuzzQueryEntity;
import com.example.demo.entities.StatusEntity;
import com.example.demo.entities.TagEntity;

public interface BuzzQueryRepository extends CrudRepository<BuzzQueryEntity, Integer>{
	public Optional<BuzzQueryEntity> findById(Integer id);
	public List<BuzzQueryEntity> findAll();
	public List<BuzzQueryEntity> findByActiveFlag(Integer active);
}
