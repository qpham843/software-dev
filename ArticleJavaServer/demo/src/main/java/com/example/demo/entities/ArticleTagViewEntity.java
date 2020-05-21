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
@Table (name="article_tag_view")
@Immutable
public class ArticleTagViewEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ArticleTagViewEntity() {}
	
	@Id
	@Column(name="article_has_tag_id")
	protected Integer articleHasTagId;
	
	@Column(name="article_id")
	protected Integer articleId;

	@Column(name="tag")
	protected String tag = "";

	public Integer getArticleHasTagId() {
		return articleHasTagId;
	}

	public void setArticleHasTagId(Integer articleHasTagId) {
		this.articleHasTagId = articleHasTagId;
	}

	public Integer getArticleId() {
		return articleId;
	}

	public void setArticleId(Integer articleId) {
		this.articleId = articleId;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

}
