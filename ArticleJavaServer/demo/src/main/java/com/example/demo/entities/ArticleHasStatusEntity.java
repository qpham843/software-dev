package com.example.demo.entities;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="article_has_status")
public class ArticleHasStatusEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ArticleHasStatusEntity() {}
	
	@Id
	@Column(name="id")
	protected Integer id;
	
	@Column(name="article_id")
	protected Integer articleId = 0;
	
	@Column(name="article_status_id")
	protected Integer articleStatusId = 0;
	
	@Column(name="timestamp")
	protected java.sql.Timestamp timestamp = new Timestamp(Instant.now().toEpochMilli());
	
	@Column(name="comment")
	protected String comment = "";

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getArticleId() {
		return articleId;
	}

	public void setArticleId(Integer articleId) {
		this.articleId = articleId;
	}

	public Integer getArticleStatusId() {
		return articleStatusId;
	}

	public void setArticleStatusId(Integer articleStatusId) {
		this.articleStatusId = articleStatusId;
	}

	public java.sql.Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(java.sql.Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}


}
