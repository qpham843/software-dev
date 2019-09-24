package com.example.demo.entities;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Immutable;

@Entity
@Table (name="article_status_view")
@Immutable
public class StatusViewEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public StatusViewEntity() {}
	
	@Id
	@Column(name="id")
	protected Integer id;
	
	@Column(name="article_id")
	protected Integer articleId;

	@Column(name="date_changed")
	@Temporal(TemporalType.TIMESTAMP)
	protected Date dateChanged = new Date();
	
	@Column(name="comment")
	protected String comment = "";
	
	@Column(name="status_code")
	protected String statusCode = "";
	
	@Column(name="status_text")
	protected String statusText = "";

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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatusText() {
		return statusText;
	}

	public void setStatusText(String statusText) {
		this.statusText = statusText;
	}

//	public String getDateChanged() {
//		return dateChanged;
//	}
//
//	public void setDateChanged(String dateChanged) {
//		this.dateChanged = dateChanged;
//	}

	public Date getDateChanged() {
		return dateChanged;
	}

	public void setDateChanged(Date dateChanged) {
		this.dateChanged = dateChanged;
	}

	

}
