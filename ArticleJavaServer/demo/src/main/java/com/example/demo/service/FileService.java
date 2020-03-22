package com.example.demo.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.*;
import org.json.JSONObject;
import org.rauschig.jarchivelib.ArchiveFormat;
import org.rauschig.jarchivelib.Archiver;
import org.rauschig.jarchivelib.ArchiverFactory;
import org.rauschig.jarchivelib.CompressionType;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.controller.BuzzController;
import com.example.demo.entities.ArticleEntity;
import com.example.demo.repository.ArticleRepository;

@Service
public class FileService {
	/*
	 * scrape article
	 * - get url from article object
	 * - call python (returns article text (string))
	 * - update article object (save to db)
	 * 
	 * place article and metadata on file system
	 * - store article text in /var/article/temp/text.txt
	 * - store metadata in /var/article/temp/metadata.txt
	 * 
	 * zip
	 * - tar gzip using /var/article folder, giving var/article.tar.gzip
	 * - rename to var/article/<url>.tgz
	 * 
	 */
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(FileService.class);
	@Autowired ArticleService articleService;
	@Autowired ArticleRepository articleRepository;
	
	public void makeFile(ArticleEntity article) {

		StringBuilder articleText = new StringBuilder(scrapeArticle(article));
		article.setArticleText(articleText.toString());
		String sha256hex = DigestUtils.sha256Hex(articleText.toString());
		article.setArticleHash(sha256hex);
		articleRepository.save(article);
				
		// strip off https:// or http://
		String u = article.getUrl();
		String u2 = u.replace("https://", "");
		String u3 = u2.replace("http://","");

		String articleDir = "/var/article/temp/";
		String zipDestDir = "/var/article/";
		String zipDestFilename = "article";
		String articleFilename = articleDir + "text.txt";
		String metadataFilename = articleDir + "metadata.json";
		//*******************************************************
		// CREATE ARTICLE FILE (text.txt)

		
		File articleFile = new File(articleFilename);
		try {
			FileUtils.writeStringToFile(articleFile, articleText.toString(), true);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//*******************************************************
		// CREATE METADATA FILE (metadata.json)
		JSONObject metadata = new JSONObject();
		
		metadata.put("extra", new JSONObject(article));
		metadata.put("file_sha256", sha256hex);
		metadata.put("filename", articleFile.getName());

		File metadataFile = new File(metadataFilename);
		try {
			FileUtils.writeStringToFile(metadataFile, metadata.toString(4), false);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//*******************************************************
		// CREATE tgz 
		
		String archiveName = "article";
		File zipSourceDirFile = new File(articleDir);
		File zipDestDirFile = new File(zipDestDir);
		
		Archiver archiver = ArchiverFactory.createArchiver(ArchiveFormat.TAR, CompressionType.GZIP);
		
		try {
			
			File archive = archiver.create(zipDestFilename, zipDestDirFile, zipSourceDirFile);
			File destFile = new File(zipDestDir + u3 + sha256hex + ".tgz");
			destFile.getParentFile().mkdirs();
			
			logger.info(archive.toPath().toString());
			logger.info(destFile.toString());

			Path temp = Files.move(
					archive.toPath(), 
					destFile.toPath(), 
					StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	Process mProcess;
	Process nProcess;
	public String scrapeArticle(ArticleEntity article) {

		logger.info("scraping article " + article.getUrl());
		String os = System.getProperty("os.name");
		Runtime r = Runtime.getRuntime();
		StringBuilder s = new StringBuilder();

		if (os.contains("ows")) {
			s.append("cmd /c c:\\var\\scrape.py ");
			s.append(article.getUrl());
			s.append(" > c:\\var\\article\\temp\\text.txt");
			
		} else {
			s.append("sh -c /var/scrape.py ");
			s.append(article.getUrl());
//			s.append(" > /var/article/temp/text.txt");
		}
		//String[] cmd = { "bash", "-c", "/var/scrape.py", article.getUrl() };
		//String[] cmd = { "/var/scrape.py", article.getUrl() };
		
		Process process;
		logger.info("aaaaaaaaaaaaa");
	       try{
	    	   logger.info("bbbbbbbbbbbb");
	    	   //process = Runtime.getRuntime().exec(new String[]{"/var/scrape.py " + article.getUrl() + " > /var/article/temp/text.txt"});
	    	   //process = Runtime.getRuntime().exec(new String[]{"/var/scrape.py"}, null, new String[] {"/var/"});
	    	   process = Runtime.getRuntime().exec("scrape.py");
	             mProcess = process;
	       }catch(Exception e) {
	    	   logger.info("ccccccccccccccccc");
	    	   System.out.println("Exception Raised" + e.toString());
	       }
	       logger.info("dddddddddddddddddddd");
	       InputStream stdout = mProcess.getInputStream();
	       logger.info("eeeeeeeeeeeeeeee");
	       BufferedReader reader = new BufferedReader(new InputStreamReader(stdout,StandardCharsets.UTF_8));
	       logger.info("fffffffffffffffff");
	       String line;
	       try{
	    	   logger.info("gggggggggggggggggg");
	          while((line = reader.readLine()) != null){
	        	  logger.info("hhhhhhhhhhhhhhhhhhhh"); 
	        	  System.out.println("stdout: "+ line);
	               logger.info("llllllllllllll " + line);
	          }
	       }catch(IOException e){
	    	   logger.info("iiiiiiiiiiiiiiiiiiiii");
	    	   System.out.println("Exception in reading output"+ e.toString());
	       }
		
		
		
		//logger.info("command line gggggg " + s.toString());
		//logger.info("command line hhhhhh " + cmd);
//		logger.info("using process builder");
//		ProcessBuilder pb = new ProcessBuilder("sh", "-c", "/var/scrape.py", article.getUrl());
//		pb.redirectErrorStream(true); // equivalent of 2>&1
//		try {
//			Process p = pb.start();
//		} catch (IOException e2) {
//			 TODO Auto-generated catch block
//			e2.printStackTrace();
//		}

//		try {
//			Process p = r.exec(cmd);
////			mProcess = p ;
////			nProcess = p;
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}

//		// ***** stdout
//		InputStream stdout = mProcess.getInputStream();
//		BufferedReader reader = new BufferedReader(new InputStreamReader(stdout,StandardCharsets.UTF_8));
//		String line;
//		StringBuilder articleText = new StringBuilder();
//		try{
//			while((line = reader.readLine()) != null){
//				logger.info("stdout..............: "+ line);
//				articleText.append(line);
//			}
//			logger.info("done reading stdout.................");
//			logger.info(articleText.toString());
//		}catch(IOException e){
//			System.out.println("Exception in reading output"+ e.toString());
//		}
//		
//		InputStream stderr = nProcess.getInputStream();
//		BufferedReader reader2 = new BufferedReader(new InputStreamReader(stderr,StandardCharsets.UTF_8));
//		String line2;
//		try{
//			while((line2 = reader2.readLine()) != null){
//				System.out.println("stderr: "+ line2);
//			}
//		}catch(IOException e){
//			System.out.println("Exception in reading stderr "+ e.toString());
//		}
//		
		
		File file = null; 
		if (os.contains("ows")) {
			file = new File("C:\\var\\article\\temp\\text.txt"); 
		} else {
			file = new File("/var/article/temp/text.txt"); 
		}
		  
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(file));
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		StringBuilder a = new StringBuilder();
		

		String st = "";
		try {
			while ((st = br.readLine()) != null) {
				a.append(st);
				a.append(System.lineSeparator());
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		logger.info("done scraping ");
		
		logger.info(a.toString());
		return a.toString();
	}
	
}
