package com.kcc.fillin.statistic.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;
import com.kcc.fillin.survey.service.SurveyService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.kcc.fillin.statistic.service.StatisticService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StatisticRestController {
	private final StatisticService statisticService;

	@GetMapping("/statistic/{surveyId}")
	public ModelAndView getFullStatistic(@PathVariable Long surveyId) {
		ModelAndView mav = new ModelAndView();

		mav.setViewName("statistic/full");
		mav.addObject("statisticSurveyResponse", statisticService.getStatisticSurvey(surveyId));

		log.info(mav.getModel().get("statisticSurveyResponse").toString());

		return mav;
	}
}

