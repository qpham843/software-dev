package com.example.demo.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.service.ArticleService;

@Service
public class AWSService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(AWSService.class);
	
	@Autowired ArticleService articleService;
	
	public void sendToS3(List<ArticleEntity> toSend) {

		logger.info("sending " + toSend.size() + " articles to s3");		
		
		toSend.forEach(article -> {
			
			if (article.getFilename() != null) {
				ProcessBuilder pb = new ProcessBuilder("/home/python3_env/bin/python3", "aws s3 cp --profile goodly-james-cli", article.getFilename(), "s3://dev.publiceditor.io/articles/");
				pb.redirectErrorStream(true); // equivalent of 2>&1
				StringBuffer x = new StringBuffer();
				x.append(article.getArticleTitle());
				x.append(" ");
				x.append(article.getArticleHash());
				x.append(" ");
				try {
					Process p = pb.start();
					BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream(),StandardCharsets.UTF_8));
					String l = "";
					while ((l = reader.readLine()) != null) {
						logger.info(x.toString() + " " + l);
						x.append(l);
					}
				} catch (IOException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				}
			} else {
				articleService.updateStatus(article.getId(), "ERROR", "filename null - cannot send to s3");
			}
		});
	}
	

}
