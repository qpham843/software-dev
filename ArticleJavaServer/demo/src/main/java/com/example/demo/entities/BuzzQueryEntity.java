package com.example.demo.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;

@Entity
@Table (name="buzz_query")
@Immutable
public class BuzzQueryEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public BuzzQueryEntity() {}
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected Integer id;
	
	@Column(name="query")
	protected String query = "";
	
	@Column(name="active_flag")
	protected Integer activeFlag = 1;
	
	@Column(name="filename_tag")
	protected String filenameTag = "";

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "queryId")
	private List<BuzzQueryTagViewEntity> tags; 

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public List<BuzzQueryTagViewEntity> getTags() {
		return tags;
	}

	public void setTags(List<BuzzQueryTagViewEntity> tags) {
		this.tags = tags;
	}

	public Integer getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(Integer activeFlag) {
		this.activeFlag = activeFlag;
	}

	public String getFilenameTag() {
		return filenameTag;
	}

	public void setFilenameTag(String filenameTag) {
		this.filenameTag = filenameTag;
	}

}
