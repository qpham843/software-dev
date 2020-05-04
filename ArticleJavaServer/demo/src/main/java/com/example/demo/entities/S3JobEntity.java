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
@Table (name="s3_job")
@Immutable
public class S3JobEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public S3JobEntity() {}
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected Integer id;

//	  `id` int NOT NULL AUTO_INCREMENT,
//	  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//    `finished` TINYINT NOT NULL DEFAULT 0,
//	  `elapsed_seconds` int null default 0,
//	  `articles_to_send` integer default 0,
//	  `articles_sent` integer default 0,
// 	  `articles` mediumtext default null,

	@Column(name="start_date")
	@Temporal(TemporalType.TIMESTAMP)
	protected Date startDate = new Date();

	@Column(name="finished")
	protected Integer finished = 0;
	
	@Column(name="elapsed_seconds")
	protected Integer elapsedSeconds = 0;

	@Column(name="articles_to_send")
	protected Integer articlesToSend = 0;

	@Column(name="articles_sent")
	protected Integer articlesSent = 0;

	@Column(name="articles")
	protected String articles = "";

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

	public Integer getArticlesToSend() {
		return articlesToSend;
	}

	public void setArticlesToSend(Integer articlesToSend) {
		this.articlesToSend = articlesToSend;
	}

	public Integer getArticlesSent() {
		return articlesSent;
	}

	public void setArticlesSent(Integer articlesSent) {
		this.articlesSent = articlesSent;
	}
	
	public void addArticlesSent() {
		this.articlesSent++;
	}

	public String getArticles() {
		return articles;
	}

	public void setArticles(String articles) {
		this.articles = articles;
	}

}
