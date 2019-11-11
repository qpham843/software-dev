package com.example.demo.service;

import java.io.File;
import java.io.IOException;
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
import org.springframework.stereotype.Service;

import com.example.demo.controller.BuzzController;
import com.example.demo.entities.ArticleEntity;

@Service
public class FileService {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(FileService.class);
	public void makeFile(ArticleEntity article) {

//		StringBuilder fn = new StringBuilder("/temp/");
//		fn.append(article.getUrl() + ".txt");		
		File fn = new File("/temp/" + article.getUrl() + ".txt");
		
		//*******************************************************
		// CREATE ARTICLE FILE (text.txt)
		StringBuilder articleText = new StringBuilder();
		articleText.append(article.getArticleText());
		articleText.append(System.currentTimeMillis());
		String sha256hex = DigestUtils.sha256Hex(articleText.toString());

		File articleFile = new File(fn.getAbsoluteFile() + "/text.txt");
		try {
			FileUtils.writeStringToFile(articleFile, articleText.toString(), false);
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
		File source = new File(fn.getPath());
		
		Archiver archiver = ArchiverFactory.createArchiver(ArchiveFormat.TAR, CompressionType.GZIP);
		try {
			logger.info("gzipping archiveName " + archiveName);
			logger.info("destination " + destination.getAbsolutePath());
			logger.info("source " + source.getAbsolutePath());
			
			File archive = archiver.create(archiveName, destination, source);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
