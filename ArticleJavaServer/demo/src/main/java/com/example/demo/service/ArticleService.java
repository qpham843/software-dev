package com.example.demo.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Streamable;

import com.example.demo.controller.ArticleController;
import com.example.demo.entities.ArticleEntity;
import com.example.demo.entities.StatusEntity;
import com.example.demo.entities.TagEntity;
import com.example.demo.entities.ArticleHasStatusEntity;
import com.example.demo.entities.ArticleHasTagEntity;
import com.example.demo.entities.BuzzJobEntity;
import com.example.demo.entities.BuzzQueryEntity;
import com.example.demo.entities.BuzzQueryHasTagEntity;
import com.example.demo.repository.BuzzQueryHasTagRepository;
import com.example.demo.entities.S3JobEntity;
import com.example.demo.repository.ArticleHasStatusRepository;
import com.example.demo.repository.ArticleHasTagRepository;
import com.example.demo.repository.ArticleRepository;
import com.example.demo.repository.StatusRepository;
import com.example.demo.repository.TagRepository;
import com.example.demo.service.BuzzService;
import com.example.demo.service.FileService;
import com.example.demo.service.TagService;
import com.example.demo.entities.UpdateJobEntity;




@Service
public class ArticleService {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ArticleService.class);
	
	@Autowired private ArticleRepository articleRepository;
	@Autowired private StatusRepository statusRepository;
	@Autowired private ArticleHasStatusRepository articleHasStatusRepository;
	@Autowired private BuzzQueryHasTagRepository buzzQueryHasTagRepository;
	@Autowired private BuzzService buzzService;
	@Autowired private TagService tagService;
	@Autowired private BuzzJobService buzzJobService;
	@Autowired private FileService fileService;
	@Autowired private ScrapeService scrapeService;
	@Autowired private AWSService awsService;
	@Autowired private S3JobService s3JobService;
	@Autowired private TagRepository tagRepository;
	@Autowired private ArticleHasTagRepository articleHasTagRepository;
	@Autowired private UpdateJobService updateJobService;
	@Autowired private BuzzQueryService buzzQueryService;

	
	public ArticleEntity findArticleById(Integer id) {
		Optional<ArticleEntity> a = articleRepository.findById(id);
		if (a.isPresent())
			return a.get();
		else
			return null;
	}
	
	public List<ArticleEntity> findArticleByStatus(String statusCode) {
		return articleRepository.findByStatusCodeOrderByPublishDateDesc(statusCode);
	}

	/**does the same as find article by status except returns a paginated result */
	public List<ArticleEntity> findArticleByStatusPaginated(String statusCode, int pageNo, int pageSize) {
		Pageable paging = PageRequest.of(pageNo, pageSize);
		Page<ArticleEntity> pagedResult = null;
		pagedResult = articleRepository.findByStatusCodeOrderByPublishDateDesc(statusCode, paging);
		return pagedResult.getContent();
	}

	public List<ArticleEntity> findArticleByTag(String tag) {
		logger.info("tag " + tag);
		return articleRepository.findByTags_tagOrderByPublishDateDesc(tag);
	}

	public ArticleEntity findArticleByUrl(String url) {
		logger.info("findArticleByUrl: " + url);
		Optional<ArticleEntity> a = articleRepository.findByUrl(url);
		if (a.isPresent()) {
			return a.get();
		} else {
			return null;
		}
	}
	
	public ArticleEntity processSubmitArticle(String url) {
		// create new record
		ArticleEntity newArticle = createNewArticle(url, "USER");
		
		//see if it's in buzzsumo
		JSONObject jArticle = buzzService.getBuzz(url);
		
		//update with buzz fields
		newArticle = updateArticleWithBuzz(jArticle, newArticle);
		
		//scrape article, 
		newArticle.setArticleText(scrapeService.scrapeArticle(url));
		
		// sha256, create metadata, tar.gz
		newArticle = fileService.makeFile(newArticle);	
		
		articleRepository.save(newArticle);
		return newArticle;

	}

	public JSONArray updateMetrics() {
		JSONArray list = new JSONArray();
		List<ArticleEntity> buzzArticles = articleRepository.findByStatusCodeOrderByPublishDateDesc("BUZZ");
		List<ArticleEntity> userArticles = articleRepository.findByStatusCodeOrderByPublishDateDesc("USER");
		UpdateJobEntity uj = updateJobService.startNew(); 
		for (ArticleEntity article : buzzArticles) {
			logger.info("ITERATING THROUGH BUZZ ARTICLES:");
			String title = article.getArticleTitle();
			if (title.equals("")) {
				logger.info("TITLE = \"\"");
				continue;
			}
			String url = article.getUrl();
			JSONObject jArticle = new JSONObject();

			try {
				jArticle = buzzService.getBuzz(url);
			} catch(Exception e) {
				logger.info("BuzzService Error");
				continue;
			}

			if (jArticle == null) {
				logger.info("jArticle is NULL");
				continue;
			}

			if (jArticle.get("author_name").toString().equals("none")) {
				continue;
			}

			ArticleEntity updatedArticle = updateArticleWithBuzz(jArticle, article);

			logger.info("UPDATING BUZZ ARTICLE:");
			Integer updatedAt = Integer.parseInt(new SimpleDateFormat("YYYYMMDD").format(new Date()));
			updatedArticle.setUpdatedAt(updatedAt);
			articleRepository.save(updatedArticle);
			list.put(jArticle);
			//Avoid too many requests error
			try {
				TimeUnit.SECONDS.sleep(1);
			} catch(InterruptedException e) {
				logger.info("TimeUnit Error");
			}
			uj.addArticlesBuzz();
			uj.addArticlesUpdated();
			uj = updateJobService.save(uj);
		}

		for (ArticleEntity article : userArticles) {
			logger.info("ITERATING THROUGH USER ARTICLES:");
			String url = article.getUrl();
			JSONObject jArticle = buzzService.getBuzz(url);
			
			if (jArticle == null) 
				continue;
			
			if (jArticle.get("author_name").toString().equals("none")) {
				continue;
			}
			
			logger.info("UPDATING USER ARTICLE:");
			ArticleEntity updatedArticle = updateArticleWithBuzz(jArticle, article);			
			Integer updatedAt = Integer.parseInt(new SimpleDateFormat("YYYYMMDD").format(new Date()));
			updatedArticle.setUpdatedAt(updatedAt);
			articleRepository.save(updatedArticle);
			list.put(jArticle);
			try {
				TimeUnit.SECONDS.sleep(1);
			} catch(InterruptedException e) {
				logger.info("TimeUnit Error");
			}
			uj.addArticlesUser();
			uj.addArticlesUpdated();
			uj = updateJobService.save(uj);
		}

		Date endDate = new Date();
	    Long jobDuration = (endDate.getTime() - uj.getStartDate().getTime()) / 1000; 

	    uj.setEndDate(new Date());
	    uj.setFinished(1);
	    uj.setElapsedSeconds(jobDuration.intValue());
	    
	    uj = updateJobService.save(uj);

		return list;
	}
	
	public JSONObject processBatchArticle(Integer id) {
		logger.info("in articleService - processBatchArticle");
		
		BuzzQueryEntity buzzQuery = buzzQueryService.getQueryById(id);
		if (buzzQuery == null) {
			return new JSONObject();
		}
		
		BuzzJobEntity bj = buzzJobService.startNew(buzzQuery.getQuery()); 
		
		logger.info("new buzzJob record created: " + bj.toString());
		
		JSONArray articles = buzzService.getTodaysTop(bj, buzzQuery);
		
		logger.info("back in articleService processBatchArticle - got todaysTop - buzzJob record updated: " + bj.toString());
		
		bj = buzzJobService.refresh(bj);
		
		JSONObject res = new JSONObject();
		
		logger.info("got todays top from buzz - processing articles " + articles.length());
		
		for (int x = 0; x < articles.length(); x++) {
			System.out.println("Looking at article...");
			
			// for each article, get its url
			JSONObject ar = (JSONObject) articles.get(x);
			String url = ar.optString("url");

			// see if its in the db already
			ArticleEntity existingArticle = this.findArticleByUrl(url);
			
			ArticleEntity updatedArticle = new ArticleEntity();
			
			// if not, create it
			if (existingArticle == null) {
				logger.info("new article - creating " + url);

				//accumulate buzz job record
				bj.addArticlesCreated();

				// create new record
				updatedArticle = createNewArticle(url, "BUZZ");
				updatedArticle.setFilenameTag(buzzQuery.getFilenameTag());
		
				//update with buzz fields
				updatedArticle = updateArticleWithBuzz(ar, updatedArticle);
			
				//scrape article, 
				updatedArticle.setArticleText(scrapeService.scrapeArticle(url));
			
				// sha256, create metadata, tar.gz
				updatedArticle = fileService.makeFile(updatedArticle);

			} else {

				logger.info("existing article - updating " + existingArticle.getUrl());

				//accumulate buzz job record
				bj.addArticlesUpdated();

				//existing article - update metadata
				updatedArticle = updateArticleWithBuzz(ar, existingArticle);
			}
			
			//set article's date updated 
			Integer updatedAt = Integer.parseInt(new SimpleDateFormat("YYYYMMDD").format(new Date()));			//long epoch = new java.text.SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse("01/01/1970 01:00:00").getTime() / 1000;
			updatedArticle.setUpdatedAt(updatedAt);
			
			// save newly created or updated article
			articleRepository.save(updatedArticle);
			
			res.put(updatedArticle.getUrl(), updatedArticle.getArticleTitle());
			bj = buzzJobService.save(bj);

			List<BuzzQueryHasTagEntity> queryTags = buzzQueryHasTagRepository.findByQueryId(buzzQuery.getId());
			System.out.println("buzzQuery.getId(): " + buzzQuery.getId());
			if (queryTags.size() == 0) {
				System.out.println("Query list is empty...");
			}
			
			
			System.out.println("ABOUT TO LOOK AT TAGS");
			for (int i = 0; i < queryTags.size(); i++) {
				System.out.println("ADDING TAG TO ARTICLE: " + queryTags.get(i).getTag());
				ArticleEntity a = updateTag(updatedArticle.getId(), queryTags.get(i).getTag());
				articleRepository.save(a);
			}
		}
		
		Date endDate = new Date();
		Long jobDuration = (endDate.getTime() - bj.getStartDate().getTime()) / 1000; 
		
		bj.setEndDate(new Date());
		bj.setFinished(1);
		bj.setElapsedSeconds(jobDuration.intValue());
		
		bj = buzzJobService.save(bj);
		
		logger.info(res.toString(2));
		return res;
	}
		
	public String sendToS3() {
		S3JobEntity s3j = s3JobService.startNew();
		StringBuilder s = new StringBuilder();
				
		List<ArticleEntity> articlesToSend = articleRepository.findByStatusCodeOrderByPublishDateDesc("APPROVED");
		
		s3j.setArticlesToSend(articlesToSend.size());
		s3JobService.save(s3j);
		
		String m1 = "in articleController.sendToS3. Sending " + articlesToSend.size() + " articles to s3";
		logger.info(m1);
		s.append(m1);
		s.append(awsService.sendToS3(articlesToSend, s3j));
		
		Date endDate = new Date();
		Long jobDuration = (endDate.getTime() - s3j.getStartDate().getTime()) / 1000; 

		s3j.setFinished(1);
		s3j.setElapsedSeconds(jobDuration.intValue());
		s3j = s3JobService.save(s3j);
		return s.toString();
	}
	
	public ArticleEntity createNewArticle(String url, String status) {
		ArticleEntity a = new ArticleEntity();
		a.setUrl(url);
		ArticleEntity b = articleRepository.save(a);
		ArticleHasStatusEntity ahs = new ArticleHasStatusEntity();
		ahs.setArticleId(b.getId());
		Optional<StatusEntity> s = statusRepository.findByStatusCode(status);
		if (s.isPresent()) {
			ahs.setArticleStatusId(s.get().getId());
		} else {
			ahs.setArticleStatusId(1);
		}
		ArticleHasStatusEntity newAhs = articleHasStatusRepository.save(ahs);
		Optional<ArticleEntity> c = articleRepository.findById(b.getId());
		if (c.isPresent()) {
			return c.get();
		} else {
			return null;
		}
	}

	public List<ArticleEntity> findArticleByTitle(String title) {
		return articleRepository.findByTitle(title);
	}
	
	public List<ArticleEntity> findAllArticles() {
		List<ArticleEntity> list = articleRepository.findAllByOrderByPublishDateDesc();
		return list;
		
	}
	
	/* Update ArticleHasTag object
	id - Article Id
	tag - Tag name
	*/
	public ArticleEntity updateTag(Integer id, String tag) {
		System.out.println("UPDATING TAG");
		System.out.println("id: " + id + " tag: " + tag);
		Optional<ArticleEntity> articleToFind = articleRepository.findById(id);
		Optional<TagEntity> dbTagToFind = tagRepository.findByTag(tag);
		
		ArticleEntity foundArticle = null;
		TagEntity tagEntity = null;
		ArticleHasTagEntity aht = null;
		
		if (articleToFind.isPresent()) {
			foundArticle = articleToFind.get();
			System.out.println("FOUND ARTICLE:");
			System.out.println(foundArticle.getTitle());
			System.out.println("Article's filename tag: " + foundArticle.getFilenameTag());
		} else {
			System.out.println("DID NOT FIND ARTICLE");
			return null;
		}
		
		if (dbTagToFind.isPresent()) {
			tagEntity = dbTagToFind.get(); 
			System.out.println("FOUND TAG:");
			System.out.println(tagEntity.getTag());
			System.out.println("Tag's ID: " + tagEntity.getId());
		} else {
			System.out.println("DID NOT FIND TAG");
			tagEntity = tagService.newTag(tag);
		}
		
		Optional<ArticleHasTagEntity> ahtToFind = articleHasTagRepository.findByArticleIdAndTagId(foundArticle.getId(), tagEntity.getId()); 
		
		if (ahtToFind.isPresent()) {
			aht = ahtToFind.get();
			System.out.println("FOUND ArticleHasTagEntity");
			System.out.println("ArticleId: " + aht.getArticleId());
			System.out.println("TagId: " + aht.getTagId());
		} else {
			System.out.println("CREATING NEW AHT entry");
			aht = new ArticleHasTagEntity();
			aht.setArticleId(foundArticle.getId());
			aht.setTagId(tagEntity.getId());
			articleHasTagRepository.save(aht);	
		}	
		
		articleToFind = articleRepository.findById(foundArticle.getId());
		if (articleToFind.isPresent())
			return articleToFind.get();
		else
			return null;
	}

	public ArticleEntity deleteTag(Integer id, String tag) {
		Optional<ArticleEntity> articleToFind = articleRepository.findById(id);
		Optional<TagEntity> dbTagToFind = tagRepository.findByTag(tag);
		
		ArticleEntity foundArticle = null;
		TagEntity tagEntity = null;
		ArticleHasTagEntity aht = null;
		
		if (articleToFind.isPresent()) {
			foundArticle = articleToFind.get();
		} else {
			logger.info("DID NOT FIND ARTICLE");
			return null;
		}
		
		if (dbTagToFind.isPresent()) {
			tagEntity = dbTagToFind.get(); 
		} else {
			logger.info("DID NOT FIND TAG");
			return null;
		}
		
		Optional<ArticleHasTagEntity> ahtToFind = articleHasTagRepository.findByArticleIdAndTagId(foundArticle.getId(), tagEntity.getId()); 
		
		if (ahtToFind.isPresent()) {
			aht = ahtToFind.get();
		}

		logger.info("DELETING AHT entry");
		articleHasTagRepository.delete(aht);

		articleToFind = articleRepository.findById(foundArticle.getId());
		if (articleToFind.isPresent())
			return articleToFind.get();
		else
			return null;

	}
	
	public ArticleEntity updateStatus(Integer id, String status, String comment) {
		Optional<ArticleEntity> articleToFind = articleRepository.findById(id);
		
		ArticleEntity foundArticle;
		if (articleToFind.isPresent()) 
			foundArticle = articleToFind.get();
		else
			return null;
			
		Optional<StatusEntity> dbStatusToFind = statusRepository.findByStatusCode(status);
		
		if (dbStatusToFind.isPresent()) {
			ArticleHasStatusEntity newStatus = new ArticleHasStatusEntity();
			StatusEntity dbStatus = dbStatusToFind.get();
			newStatus.setArticleId(foundArticle.getId());
			newStatus.setArticleStatusId(dbStatus.getId());
			newStatus.setDateChanged(new Date());
			newStatus.setComment(comment);
			articleHasStatusRepository.save(newStatus);
			Optional<ArticleEntity> updatedArticleToFind = articleRepository.findById(foundArticle.getId());
			if (updatedArticleToFind.isPresent()) {
				ArticleEntity foundUpdatedArticle = updatedArticleToFind.get();
				return foundUpdatedArticle;
			}
		}
		return null;			
	}
	
	public ArticleEntity updateArticleWithBuzz(JSONObject jArticle, ArticleEntity article) {

//		logger.info("article.setAlexaRank("+jArticle.optInt("alexa_rank", 0));
//		logger.info("article.setAngryCount("+jArticle.optInt("angry_count", 0));
//		logger.info("article.setArticleTitle("+jArticle.optString("title", ""));
//		logger.info("article.setAuthor("+jArticle.optString("author_name", ""));
//		logger.info("article.setBuzzsumoArticleId("+jArticle.optInt("id", 0));
//		logger.info("article.setDomainName("+jArticle.optString("domain_name", ""));
//		logger.info("article.setEvergreenScore("+jArticle.optDouble("evergreen_score", Double.parseDouble("0")));
//		logger.info("article.setFacebookComments("+jArticle.optInt("facebook_comments", 0));
//		logger.info("article.setFacebookLikes("+jArticle.optInt("facebook_likes", 0));
//		logger.info("article.setFacebookShares("+jArticle.optInt("total_facebook_shares", 0));
//		logger.info("article.setHahaCount("+jArticle.optInt("haha_count", 0));
//		logger.info("article.setLoveCount("+jArticle.optInt("love_count", 0));
//		logger.info("article.setNumLinkingDomains("+jArticle.optInt("num_linking_domains", 0));
//		logger.info("article.setSadCount("+jArticle.optInt("sad_count", 0));
//		logger.info("article.setTotalRedditEngagements("+jArticle.optInt("total_reddit_engagements", 0));
//		logger.info("article.setTotalShares("+jArticle.optInt("total_shares", 0));
//		logger.info("article.setTwitterShares("+jArticle.optInt("twitter_shares", 0));
//		logger.info("article.setWowCount("+jArticle.optInt("wow_count", 0));

		article.setAlexaRank(jArticle.optInt("alexa_rank", 0));
		article.setAngryCount(jArticle.optInt("angry_count", 0));
//		article.setArticleAmplifiers(articleAmplifiers);
		article.setArticleTitle(jArticle.optString("title", ""));
		article.setAuthor(jArticle.optString("author_name", ""));
		article.setBuzzsumoArticleId(jArticle.optInt("id", 0));
		article.setDomainName(jArticle.optString("domain_name", ""));
		article.setEvergreenScore(jArticle.optDouble("evergreen_score", Double.parseDouble("0")));
		article.setFacebookComments(jArticle.optInt("facebook_comments", 0));
		article.setFacebookLikes(jArticle.optInt("facebook_likes", 0));
		article.setFacebookShares(jArticle.optInt("total_facebook_shares"));
		article.setHahaCount(jArticle.optInt("haha_count", 0));
		article.setLoveCount(jArticle.optInt("love_count", 0));
		article.setNumLinkingDomains(jArticle.optInt("num_linking_domains", 0));
		Long sysEpochLong = System.currentTimeMillis() / 1000;
		article.setPublishDate(new Date((jArticle.optLong("published_date",  sysEpochLong) * 1000)));
		article.setPublishedDate(new Date((jArticle.optLong("published_date",  sysEpochLong) * 1000)));
		article.setSadCount(jArticle.optInt("sad_count", 0));
		article.setTotalRedditEngagements(jArticle.optInt("total_reddit_engagements", 0));
		article.setTotalShares(jArticle.optInt("total_shares", 0));
		article.setTwitterShares(jArticle.optInt("twitter_shares", 0));
//		article.setUpdatedAt(updatedAt);
		//article.setSubmitCount(jArticle.optInt("submit_count"));
		article.setWowCount(jArticle.optInt("wow_count", 0));
		
		articleRepository.save(article);
		
		return article;
	}
	
	public ArticleEntity save(ArticleEntity article) {
		return articleRepository.save(article);
	}
	
	public ArticleEntity updateArticle(Integer id, ArticleEntity article, String comment) {
		if (article.getId().equals(id)) {
			articleRepository.save(article);
			return article;
		} else {
			return null;
		}
	}

	public ArticleEntity updateVizData(String sha, String visData, String comment) {
		ArticleEntity article = articleRepository.findOneByArticleHash(sha);
		
		if (article != null) {
			article.setVisData(visData);
			articleRepository.save(article);
			return article;
		} else {
			return null;
		}
	}

	/*finds a given page of articles using PAGENO and PAGESIZE and returns a list 
	containing the correct articles. */
	public List<ArticleEntity> findPaginated(int pageNo, int pageSize) {
		if (pageNo >= 0 && pageSize > 0) {
			Pageable paging = PageRequest.of(pageNo, pageSize);
			Page<ArticleEntity> pagedResult = articleRepository.findAll(paging);
			return pagedResult.getContent();
		}
		return null;
	}

	/*returns a page of articles determined by PAGENO and PAGESIZE sorted by title, 
	url, or date, calls the related name driven query in repository layer depending 
	on the value of SORT*/
	public List<ArticleEntity> findPaginatedSorted(int pageNo, int pageSize, String sort, Boolean desc ) {
		if (pageNo >= 0 && pageSize > 0 && desc) {
			Pageable paging = PageRequest.of(pageNo, pageSize);
			Page<ArticleEntity> pagedResult = null;
			switch(sort) {
				case "title":
					pagedResult = articleRepository.findAllByOrderByTitleDesc(paging);
					break;
				case "url":
					pagedResult = articleRepository.findAllByOrderByUrlDesc(paging);
					break;
				case "date":
					pagedResult = articleRepository.findAllByOrderByPublishDateDesc(paging);
					break;
				case "totalShares":
					pagedResult = articleRepository.findAllByOrderByTotalSharesDesc(paging);
					break;
				default:
					pagedResult = articleRepository.findAll(paging);

			}
			return pagedResult.getContent();
		} else  if (pageNo >= 0 && pageSize > 0 && !desc) {
			Pageable paging = PageRequest.of(pageNo, pageSize);
			Page<ArticleEntity> pagedResult = null;
			switch(sort) {
				case "title":
					pagedResult = articleRepository.findAllByOrderByTitleAsc(paging);
					break;
				case "url":
					pagedResult = articleRepository.findAllByOrderByUrlAsc(paging);
					break;
				case "date":
					pagedResult = articleRepository.findAllByOrderByPublishDateAsc(paging);
					break;
				case "totalShares":
					pagedResult = articleRepository.findAllByOrderByTotalSharesAsc(paging);
					break;
				default:
					pagedResult = articleRepository.findAll(paging);
			}
			return pagedResult.getContent();
		}
		return null;
	}


	/*returns total number of pages in a repository given a pagesize */
	public int getTotalPages(int pageSize) {
		if (pageSize > 0) {
			Pageable paging = PageRequest.of(0, pageSize);
			Page<ArticleEntity> pagedResult = articleRepository.findAll(paging);
			return pagedResult.getTotalPages();
		}
		return -1;
	}


}
