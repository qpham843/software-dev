package com.example.demo.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.entities.UpdateJobEntity;

import com.example.demo.entities.BuzzJobEntity;

public interface UpdateJobRepository extends CrudRepository<UpdateJobEntity, Integer>{
	public Optional<UpdateJobEntity> findById(Integer id);
	public List<UpdateJobEntity> findAllByOrderByStartDateDesc();
	public List<UpdateJobEntity> findByStartDateGreaterThanOrderByStartDateDesc(Date lessTwoDays);
	
	@Modifying
	@Query(value = "UPDATE UpdateJobEntity SET endDate = :endDate, finished = :finished, elapsedSeconds = :elapsedSeconds, articlesBuzz = :articlesBuzz, articlesUser = :articlesUser, articlesUpdated = :articlesUpdated where id = :id")
	@Transactional
	public void storeUJ(Integer id, Date endDate, Integer finished, Integer elapsedSeconds, Integer articlesBuzz, Integer articlesUser, Integer articlesUpdated);
}
