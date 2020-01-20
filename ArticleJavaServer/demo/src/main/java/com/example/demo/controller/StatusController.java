package com.example.demo.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.entities.StatusEntity;
import com.example.demo.repository.StatusRepository;
import com.example.demo.service.ArticleService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/status")
public class StatusController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(StatusController.class);
	@Autowired StatusRepository statusRepository;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public List<StatusEntity> getAllStatuses() {
		List<StatusEntity> statuses = new ArrayList<StatusEntity>();
		statusRepository.findAll().forEach(statuses::add);
		return statuses;
 	}
}
