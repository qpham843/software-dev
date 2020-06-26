package com.example.demo.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.entities.BuzzJobEntity;
import com.example.demo.entities.BuzzQueryEntity;
import com.example.demo.repository.BuzzJobRepository;
import com.example.demo.service.ArticleService;

@Service
public class BuzzService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzService.class);
	
	@Autowired ArticleService articleService;
	@Autowired BuzzJobService buzzJobService;
	
	public JSONObject getBuzz(String articleUrl) {

        RestTemplate restTemplate = new RestTemplate();
        StringBuilder url = new StringBuilder("https://api.buzzsumo.com/search/articles.json?q=");
        url.append(articleUrl);
        url.append("&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf");
        
        ResponseEntity<String> response = restTemplate.getForEntity(url.toString(),String.class);
        String res = response.getBody();
        logger.info(res);
        JSONObject j = new JSONObject(res);
        JSONArray a = j.optJSONArray("results");
        JSONObject buzzEntry = null;
        if (a != null && a.length() > 0) {
        	buzzEntry = a.getJSONObject(0);
        	logger.info("numWords: " + buzzEntry.opt("num_words").toString());
            logger.info("totalShares: " + buzzEntry.opt("total_shares").toString());
        }
        
        return buzzEntry;
	}
	
	public JSONArray getTodaysTop(BuzzJobEntity bj, BuzzQueryEntity query) {
		RestTemplate restTemplate = new RestTemplate();
		String url = 
				"https://api.buzzsumo.com/search/trends.json?"
				.concat(query.getQuery())
				.concat("&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf");
        logger.info(url);

        ResponseEntity<String> response = restTemplate.getForEntity(url,String.class);
        String res = response.getBody();
        JSONObject j = new JSONObject(res);
        JSONArray a = j.optJSONArray("results");
        bj.setArticlesReturned(a.length());
        bj = buzzJobService.save(bj);
        
        JSONArray filtered = new JSONArray();
        //a.forEach(art -> {
        for(Integer x = 0; x < a.length(); x++) {
        	JSONObject article = (JSONObject) a.get(x);
        	
        	boolean add = true;
            
        	//exclude youtube
        	if (article.optString("domain_name", "").equals("youtube.com")) {
            	logger.info("skipping youtube");
            	add = false;
            	bj.addArticlesYoutube();
            	bj.addArticlesDropped();
            } 
    		// exclude word count > 700
            logger.info(article.toString(2));
        	if (article.optInt("num_words", 701) > 700) {
            	logger.info("skipping > 700 words");
            	add = false;
            	bj.addArticles700();
            	bj.addArticlesDropped();
            }
        	
            if (add) {
            	logger.info(j.toString(2));
            	filtered.put(article);
            }            	
            
        };
        bj = buzzJobService.save(bj);
        return filtered;
        
	}

}
