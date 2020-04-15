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
import com.example.demo.repository.ArticleRepository;
import com.example.demo.service.ArticleService;

@Service
public class AWSService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(AWSService.class);
	
	@Autowired ArticleService articleService;
	@Autowired FileService fileService;
	
	public void sendToS3(List<ArticleEntity> toSend) {

		logger.info("sending " + toSend.size() + " articles to s3");		
		
		toSend.forEach(article -> {
			
				//ProcessBuilder pb = new ProcessBuilder("/home/python3_env/bin/aws", "s3 cp", article.getFilename(), "s3://dev.publiceditor.io/articles/");
//				usage: aws [options] <command> <subcommand> [<subcommand> ...] [parameters]
//						Line 369: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom   To see help text, you can run:
//						Line 370: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom
//						Line 371: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom     aws help
//						Line 372: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom     aws <command> help
//						Line 373: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom     aws <command> <subcommand> help
//						Line 374: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom   aws: error: argument command: Invalid choice, valid choices are:
//						Line 375: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom
//						Line 376: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom   accessanalyzer                           | acm
//						Line 377: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom   acm-pca                                  | alexaforbusiness
//						Line 378: article_server_1  | ""2020-04-15 13:10:47 [http-nio-8080-exec-1] INFO  com.example.demo.service.AWSService - California weed industry gets boost from coronavirus, but problems loom   amplify                                  | apigateway
				
				//ProcessBuilder pb = new ProcessBuilder("/home/python3_env/bin/python3", "aws","s3 ls s3://dev.publiceditor.io/articles/");
				// /home/python3_env/bin/python3: can't open file 'aws': [Errno 2] No such file or directory
				
				//ProcessBuilder pb = new ProcessBuilder("/home/python3_env/bin/python3", "aws s3 ls s3://dev.publiceditor.io/articles/");
				// /home/python3_env/bin/python3: can't open file 'aws s3 ls s3://dev.publiceditor.io/articles/': [Errno 2] No such file or directory

				//ProcessBuilder pb = new ProcessBuilder("/home/python3_env/bin/python3", "aws","s3","ls","s3://dev.publiceditor.io/articles/");
				// /home/python3_env/bin/python3: can't open file 'aws': [Errno 2] No such file or directory
				
			if (article.getFilename() == null || fileService.fileExists(article.getFilename()) == false) {
				logger.info("filename null or does not exist - making file");
				article = fileService.makeFile(article);
				// this sets filename and hash
				// seo we need to save
				articleService.save(article);
			} 
			
			logger.info("calling s3-put.py with " + article.getFilename());
			ProcessBuilder pb = new ProcessBuilder("/home/python3_env/bin/python3", "/home/scraper/s3-put.py",article.getFilename());

			pb.redirectErrorStream(true); // equivalent of 2>&1
			StringBuffer x = new StringBuffer();
			x.append(article.getArticleTitle());
			x.append(" ");
			x.append(article.getArticleHash());
			x.append(" ");
			logger.info(x.toString());
			try {
				Process p = pb.start();
				BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream(),StandardCharsets.UTF_8));
				String l = "";
				while ((l = reader.readLine()) != null) {
					logger.info(x.toString() + " " + l);
				}
			} catch (IOException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
		});
	}
	

}
