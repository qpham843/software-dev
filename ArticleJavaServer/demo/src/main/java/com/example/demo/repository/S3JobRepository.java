package com.example.demo.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.BuzzJobEntity;
import com.example.demo.entities.S3JobEntity;

public interface S3JobRepository extends CrudRepository<S3JobEntity, Integer>{
	public Optional<S3JobEntity> findById(Integer id);
	public List<S3JobEntity> findAllByOrderByStartDateDesc();
	
	@Modifying
	@Query(value = "UPDATE S3JobEntity SET finished = :finished, elapsedSeconds = :elapsedSeconds, articlesToSend = :articlesToSend, articlesSent = :articlesSent, articles = :articles where id = :id")
	@Transactional
	public void storeS3J(Integer id, Integer finished, Integer elapsedSeconds, Integer articlesToSend, Integer articlesSent, String articles);
	
}
