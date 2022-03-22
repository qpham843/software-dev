package com.example.demo.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Immutable;

@Entity
@Table (name="update_job")
@Immutable
public class UpdateJobEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public UpdateJobEntity() {}
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected Integer id;

  // `id` int NOT NULL AUTO_INCREMENT,
  // `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  // `end_date` timestamp NULL DEFAULT NULL,
  // `finished` tinyint NOT NULL DEFAULT 0,
  // `elapsed_seconds` int null default 0,
  // `articles_buzz` integer default 0,
  // `articles_user` integer default 0,
  // `articles_updated` integer default 0,

	@Column(name="start_date")
	@Temporal(TemporalType.TIMESTAMP)
	protected Date startDate = new Date();

	@Column(name="end_date")
	@Temporal(TemporalType.TIMESTAMP)
	protected Date endDate = new Date();

	@Column(name="finished")
	protected Integer finished = 0;
	
	@Column(name="elapsed_seconds")
	protected Integer elapsedSeconds = 0;

	@Column(name="articles_buzz")
	protected Integer articlesBuzz = 0;

	@Column(name="articles_user")
	protected Integer articlesUser = 0;

	@Column(name="articles_updated")
	protected Integer articlesUpdated = 0;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Integer getFinished() {
		return finished;
	}

	public void setFinished(Integer finished) {
		this.finished = finished;
	}

	public Integer getElapsedSeconds() {
		return elapsedSeconds;
	}

	public void setElapsedSeconds(Integer elapsedSeconds) {
		this.elapsedSeconds = elapsedSeconds;
	}

	public Integer getArticlesBuzz() {
		return articlesBuzz;
	}

	public void setArticlesBuzz(Integer articlesBuzz) {
		this.articlesBuzz = articlesBuzz;
	}
	
	public void addArticlesBuzz() {
		articlesBuzz++;
	}

	public Integer addArticlesUser() {
		return articlesUser++;
	}

	public Integer getArticlesUser() {
		return articlesUser;
	}

	public void setArticlesUser(Integer articlesUser) {
		this.articlesUser = articlesUser;
	}
	
	public void addArticlesUpdated() {
		articlesUpdated++;
	}

	public Integer getArticlesUpdated() {
		return articlesUpdated;
	}

	public void setArticlesUpdated(Integer articlesUpdated) {
		this.articlesUpdated = articlesUpdated;
	}
}
