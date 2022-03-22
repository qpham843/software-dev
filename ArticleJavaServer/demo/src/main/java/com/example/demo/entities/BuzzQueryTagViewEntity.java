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
@Table (name="query_tag_view")
@Immutable
public class BuzzQueryTagViewEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public BuzzQueryTagViewEntity() {}
	
	@Id
	@Column(name="id")
	protected Integer id;
	
	@Column(name="query_id")
	protected Integer queryId;

	@Column(name="tag")
	protected String tag = "";

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getQueryId() {
		return queryId;
	}

	public void setQueryId(Integer queryId) {
		this.queryId = queryId;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

}
