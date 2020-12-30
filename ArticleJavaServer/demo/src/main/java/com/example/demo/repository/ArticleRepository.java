package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;

//import sun.jvm.hotspot.debugger.Page;

import com.example.demo.entities.ArticleEntity;


public interface ArticleRepository extends PagingAndSortingRepository<ArticleEntity, Integer>{
	public Optional<ArticleEntity> findById(Integer id);
	public Optional<ArticleEntity> findByUrl(String url);
	
	@Query(value="select * from article where articleTitle like concat('%',:title,'%') ", nativeQuery=true)
	public List<ArticleEntity> findByTitle(String title);

	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id order by a.publish_date DESC", nativeQuery=true)
	public List<ArticleEntity> findByStatusCodeOrderByPublishDateDesc(String statusCode);
	
	public ArticleEntity findOneByArticleHash(String articleHash);
	public List<ArticleEntity> findAllByOrderByPublishDateDesc();
	
	public List<ArticleEntity> findByTags_tagOrderByPublishDateDesc(String tag);

	public Page<ArticleEntity> findAllByOrderByPublishDateDesc(Pageable pageable);
	public Page<ArticleEntity> findAllByOrderByArticleTitleDesc(Pageable pageable);
	public Page<ArticleEntity> findAllByOrderByUrlDesc(Pageable pageable);
	public Page<ArticleEntity> findAllByOrderByTotalSharesDesc(Pageable pageable);

	public Page<ArticleEntity> findAllByOrderByPublishDateAsc(Pageable pageable);
	public Page<ArticleEntity> findAllByOrderByArticleTitleAsc(Pageable pageable);
	public Page<ArticleEntity> findAllByOrderByUrlAsc(Pageable pageable);
	public Page<ArticleEntity> findAllByOrderByTotalSharesAsc(Pageable pageable);
	
	public Page<ArticleEntity> findByIdIn(List<Integer> articleIds, Pageable pageable);

	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id", nativeQuery=true)
	public Page<ArticleEntity> findByStatusCodeOrderByPublishDateDesc(String statusCode, Pageable pageable);

	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id", nativeQuery=true)
	public Page<ArticleEntity> findByStatusCode(String statusCode, Pageable pageable);

	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id", nativeQuery=true)
	public Page<ArticleEntity> findByStatusCodeOrderByArticleTitleDesc(String statusCode, Pageable pageable);
	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id", nativeQuery=true)
	public Page<ArticleEntity> findByStatusCodeOrderByUrlDesc(String statusCode, Pageable pageable);
	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id", nativeQuery=true)
	public Page<ArticleEntity> findByStatusCodeOrderByTotalSharesDesc(String statusCode, Pageable pageable);

	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id", nativeQuery=true)
	public Page<ArticleEntity> findByStatusCodeOrderByArticleTitleAsc(String statusCode, Pageable pageable);
	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id", nativeQuery=true)
	public Page<ArticleEntity> findByStatusCodeOrderByUrlAsc(String statusCode, Pageable pageable);
	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id", nativeQuery=true)
	public Page<ArticleEntity> findByStatusCodeOrderByPublishDateAsc(String statusCode, Pageable pageable);
	@Query(value="select a.* from article a, article_current_status acs where acs.status_code = :statusCode and acs.id = a.id", nativeQuery=true)
	public Page<ArticleEntity> findByStatusCodeOrderByTotalSharesAsc(String statusCode, Pageable pageable);

	
}
