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

@Service
public class FileService {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(FileService.class);
	@Autowired ArticleService articleService;
	public void makeFile(ArticleEntity article) {

		StringBuilder articleText = new StringBuilder(scrapeArticle(article));
		article.setArticleText(articleText.toString());
		articleService.updateArticle(article);
		
		//		StringBuilder fn = new StringBuilder("/temp/");
		//		fn.append(article.getUrl() + ".txt");		
		
		// strip off https:// or http://
		String u = article.getUrl();
		String u2 = u.replace("https://", "");
		String u3 = u2.replace("http://","");

		StringBuilder f = new StringBuilder();
		f.append("/temp/");
		f.append(u3);
		f.append(".txt");
		File fn = new File(f.toString());
		
		//*******************************************************
		// CREATE ARTICLE FILE (text.txt)
		//articleText.append(article.getArticleText());
		//articleText.append(System.currentTimeMillis());
		String sha256hex = DigestUtils.sha256Hex(articleText.toString());

		File articleFile = new File(fn.getAbsoluteFile() + "/text.txt");
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
		metadata.put("filename", fn.getName());

		File metadataFile = new File(fn.getAbsoluteFile() + "/metadata.json");
		try {
			FileUtils.writeStringToFile(metadataFile, metadata.toString(4), false);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//*******************************************************
		// CREATE tgz 
		
//		String archiveName = "archive";
		String archiveName = fn.getName();
		File destination = new File(fn.getParent());
		if (destination.getName().length() < 3) {
			destination = new File(fn.getParent() + "zzz");
		}
		//File destination = new File(fn.getPath() + ".tgz");
		File source = new File(fn.getPath());
		
		Archiver archiver = ArchiverFactory.createArchiver(ArchiveFormat.TAR, CompressionType.GZIP);
		
		try {
			logger.info("gzipping archiveName " + archiveName);
			logger.info("destination " + destination.getAbsolutePath());
			logger.info("source " + source.getAbsolutePath());
			
			File archive = archiver.create(archiveName, destination, source);
			logger.info("moving");
			logger.info("archive " + archive.toPath().toString());
			logger.info("dest " + source.toPath().toString());
			Path temp2 = Paths.get(source.getParent(), archive.getName());
			Path temp = Files.move(archive.toPath(), temp2, StandardCopyOption.REPLACE_EXISTING);
			if (temp != null) {
				//success
				logger.info("success: moved file from " + archive.getAbsolutePath() + " to " + source.getAbsolutePath());
				logger.info("aaaaaa" + temp.toString());
			} else {
				logger.info("file move failed");
				logger.info("source " + archive.toPath().toString());
				logger.info("dest " + source.toPath().toString());
				
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	Process mProcess;
	Process nProcess;
	public String scrapeArticle(ArticleEntity article) {

		Runtime r = Runtime.getRuntime();
		StringBuilder s = new StringBuilder();
		s.append("cmd /c c:\\aa\\software-dev\\py\\try4.py ");
		s.append(article.getUrl());
		try {
			Process p = r.exec(s.toString());
			mProcess = p;
			nProcess = p;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		InputStream stdout = mProcess.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(stdout,StandardCharsets.UTF_8));
		String line;
		try{
			while((line = reader.readLine()) != null){
				System.out.println("stdout: "+ line);
			}
		}catch(IOException e){
			System.out.println("Exception in reading output"+ e.toString());
		}
		
		InputStream stderr = nProcess.getInputStream();
		BufferedReader reader2 = new BufferedReader(new InputStreamReader(stderr,StandardCharsets.UTF_8));
		String line2;
		try{
			while((line2 = reader2.readLine()) != null){
				System.out.println("stderr: "+ line2);
			}
		}catch(IOException e){
			System.out.println("Exception in reading stderr "+ e.toString());
		}
		
		
		File file = new File("C:\\temp\\article.txt"); 
		  
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
		
		return a.toString();
	}
	
}
