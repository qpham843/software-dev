package com.example.demo.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.service.ArticleService;

@Service
public class BuzzService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzService.class);
	
	@Autowired ArticleService articleService;
	
	public JSONObject getBuzz(String articleUrl) {

        RestTemplate restTemplate = new RestTemplate();
//        StringBuilder url = new StringBuilder("https://api.buzzsumo.com/search/articles.json?q=https://www.washingtonpost.com/politics/as-warren-and-buttigieg-rise-the-democratic-presidential-race-is-competitive-and-fluid-a-washington-post-abc-news-poll-finds/2019/11/02/4b7aca3c-fccd-11e9-8906-ab6b60de9124_story.html&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf");
        
        ResponseEntity<String> response = restTemplate.getForEntity(articleUrl,String.class);
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
        
        
//        logger.info("numWords: " + j.opt("num_words").toString());
//        logger.info("totalShares: " + j.opt("total_shares").toString());
//        return response.getBody();
        return buzzEntry;
	}

}
