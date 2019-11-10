package com.example.demo.service;

import java.io.File;
import java.io.IOException;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.*;
import org.springframework.stereotype.Service;

@Service
public class FileService {
	public void makeFile() {
//		File j = new File("/temp/temp.txt");
		StringBuilder fn = new StringBuilder("/temp/");
		fn.append("www.washingtonpost.com/politics/as-warren-and-buttigieg-rise-the-democratic-presidential-race-is-competitive-and-fluid-a-washington-post-abc-news-poll-finds/2019/11/02/4b7aca3c-fccd-11e9-8906-ab6b60de9124_story.html");
		
		StringBuilder s = new StringBuilder("aaaaaaaaaaaaaa");
		s.append(System.currentTimeMillis());
		
		String sha256hex = DigestUtils.sha256Hex(s.toString());
		
		fn.append("/" + sha256hex + ".txt");

		File j = new File(fn.toString());

		try {
			FileUtils.writeStringToFile(j, s.toString(), true);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
}
