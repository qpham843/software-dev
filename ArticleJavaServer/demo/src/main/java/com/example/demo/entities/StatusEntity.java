package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;

@Entity
@Table (name="article_status")
@Immutable
public class StatusEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public StatusEntity() {}
	
	@Id
	@Column(name="id")
	protected Integer id;
	
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
	
	
}
