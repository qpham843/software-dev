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
@Table (name="buzz_job")
@Immutable
public class BuzzJobEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public BuzzJobEntity() {}
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected Integer id;

//	  `id` int NOT NULL AUTO_INCREMENT,
//	  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//	  `end_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//	  `elapsed_seconds` int null default 0,
//	  `query` mediumtext default NULL,
//	  `articles_returned` integer default 0,
//	  `articles_youtube` integer default 0,
//	  `articles_700` integer default 0,
//	  `articles_dropped` integer default 0,
//	  `articles_created` integer default 0,
//	  `articles_updated` integer default 0,

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

	@Column(name="query")
	protected String query = "";

	@Column(name="articles_returned")
	protected Integer articlesReturned = 0;

	@Column(name="articles_youtube")
	protected Integer articlesYoutube = 0;

	@Column(name="articles_700")
	protected Integer articles700 = 0;

	@Column(name="articles_dropped")
	protected Integer articlesDropped = 0;
	
	@Column(name="articles_created")
	protected Integer articlesCreated = 0;

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

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public Integer getArticlesReturned() {
		return articlesReturned;
	}

	public void setArticlesReturned(Integer articlesReturned) {
		this.articlesReturned = articlesReturned;
	}

	public Integer getArticlesYoutube() {
		return articlesYoutube;
	}

	public void setArticlesYoutube(Integer articlesYoutube) {
		this.articlesYoutube = articlesYoutube;
	}
	
	public void addArticlesYoutube() {
		articlesYoutube++;
	}

	public Integer getArticles700() {
		return articles700;
	}

	public void setArticles700(Integer articles700) {
		this.articles700 = articles700;
	}
	
	public void addArticles700() {
		articles700++;
	}

	public Integer getArticlesDropped() {
		return articlesDropped;
	}

	public void setArticlesDropped(Integer articlesDropped) {
		this.articlesDropped = articlesDropped;
	}
	
	public void addArticlesDropped() {
		articlesDropped++;
	}

	public Integer getArticlesCreated() {
		return articlesCreated;
	}

	public void setArticlesCreated(Integer articlesCreated) {
		this.articlesCreated = articlesCreated;
	}
	
	public void addArticlesCreated() {
		articlesCreated++;
	}

	public Integer getArticlesUpdated() {
		return articlesUpdated;
	}

	public void setArticlesUpdated(Integer articlesUpdated) {
		this.articlesUpdated = articlesUpdated;
	}
	
	public void addArticlesUpdated() {
		articlesUpdated++;
	}
	
	
}
