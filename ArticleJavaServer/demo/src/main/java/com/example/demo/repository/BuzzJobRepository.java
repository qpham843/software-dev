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

public interface BuzzJobRepository extends JpaRepository<BuzzJobEntity, Integer>{
	public Optional<BuzzJobEntity> findById(Integer id);
	public List<BuzzJobEntity> findAllByOrderByStartDateDesc();
	
	@Modifying
	@Query(value = "UPDATE BuzzJobEntity SET endDate = :endDate, finished = :finished, elapsedSeconds = :elapsedSeconds, articlesReturned = :articlesReturned, articlesYoutube = :articlesYoutube, articles700 = :articles700, articlesDropped = :articlesDropped, articlesCreated = :articlesCreated, articlesUpdated = :articlesUpdated where id = :id")
	@Transactional
	public void storeBJ(Integer id, Date endDate, Integer finished, Integer elapsedSeconds, Integer articlesReturned, Integer articlesYoutube, Integer articles700, Integer articlesDropped, Integer articlesCreated, Integer articlesUpdated);
	
}
