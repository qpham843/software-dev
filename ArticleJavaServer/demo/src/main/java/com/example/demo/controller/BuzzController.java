package com.example.demo.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.service.ArticleService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("buzz")
public class BuzzController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzController.class);
	
	@Autowired ArticleService articleService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String getBuzz() {

        RestTemplate restTemplate = new RestTemplate();
        String foo = "";
//        String url="https://gturnquist-quoters.cfapps.io/api/random";
//        StringBuilder url = new StringBuilder("https://api.buzzsumo.com/search/articles.json?");
//        url.append("q=www.washingtonpost.com%2Fnational-security%2Ftrump-ordered-hold-on-military-aid-days-before-calling-ukrainian-president-officials-say%2F2019%2F09%2F23%2Fdf93a6ca-de38-11e9-8dc8-498eabc129a0_story.html%0A");
//        url.append("&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf");
//        https://www.washingtonpost.com/national-security/trump-ordered-hold-on-military-aid-days-before-calling-ukrainian-president-officials-say/2019/09/23/df93a6ca-de38-11e9-8dc8-498eabc129a0_story.html
        StringBuilder url = new StringBuilder("https://api.buzzsumo.com/search/articles.json?q=https://www.washingtonpost.com/national-security/trump-ordered-hold-on-military-aid-days-before-calling-ukrainian-president-officials-say/2019/09/23/df93a6ca-de38-11e9-8dc8-498eabc129a0_story.html&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf");
//        StringBuilder url = new StringBuilder("http://dummy.restapiexample.com/api/v1/employees");
        
        ResponseEntity<String> response = restTemplate.getForEntity(url.toString(),String.class);
        logger.info(url.toString());
        logger.info(response.getBody());
        return response.getBody();
	}
	
}
