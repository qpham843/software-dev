package com.example.demo.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="article")
public class ArticleEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ArticleEntity() {}
	
	@Id
	@Column(name="id")
	protected Integer id;
	
	@Column(name="title")
	protected String title = "";
	
	@Column(name="author")
	protected String author = "";
	
	@Column(name="publish_date")
	protected Date publishDate = Date.from(Instant.now());
	
	@Column(name="article_text")
	protected String articleText = "";
	
	@Column(name="url")
	protected String url = "";

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Date getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(Date publishDate) {
		this.publishDate = publishDate;
	}

	public String getArticleText() {
		return articleText;
	}

	public void setArticleText(String articleText) {
		this.articleText = articleText;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	
	
}
