package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.StatusEntity;

public interface StatusRepository extends CrudRepository<StatusEntity, Integer>{
	public Optional<StatusEntity> findById(Integer id);
	public Optional<StatusEntity> findByStatusCode(String statusCode);
	
}
