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
public class ScrapeService {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ScrapeService.class);
	@Autowired ArticleService articleService;
	@Autowired ArticleRepository articleRepository;
	
	public String scrapeArticle() {

		logger.info("scraping article ");		
		ProcessBuilder pb = new ProcessBuilder("/home/python3_env/bin/python3", "/home/scraper/scrape.py");
		pb.redirectErrorStream(true); // equivalent of 2>&1
		StringBuffer x = new StringBuffer();
		try {
			Process p = pb.start();
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream(),StandardCharsets.UTF_8));
			String l = "";
			while ((l = reader.readLine()) != null) {
				logger.info("qqqqqqqqqqqqqqqqq "  + l);
				x.append(l);
			}
		} catch (IOException e2) {
//			 TODO Auto-generated catch block
			e2.printStackTrace();
		}
		
		
		
		return "a " + x.toString();
	}
	
}
