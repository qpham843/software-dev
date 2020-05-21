package com.example.demo.entities;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table (name="query_has_tag")
public class BuzzQueryHasTagEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public BuzzQueryHasTagEntity() {}
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected Integer id;
	
	@Column(name="query_id")
	protected Integer queryId = 0;
	
	@Column(name="tag_id")
	protected Integer tagId = 0;

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

	public Integer getTagId() {
		return tagId;
	}

	public void setTagId(Integer tagId) {
		this.tagId = tagId;
	}


}
