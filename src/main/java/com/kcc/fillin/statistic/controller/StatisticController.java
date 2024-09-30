package com.kcc.fillin.statistic.controller;

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
public class StatisticController {

	private final StatisticService statisticService;

	@GetMapping("/statistic/{surveyId}")
	public ModelAndView getFullStatistic(@PathVariable Long surveyId) {
		ModelAndView mav = new ModelAndView();

		mav.setViewName("statistic/full");
		mav.addObject("statisticSurveyResponse", statisticService.getStatisticSurvey(surveyId));

		log.info(statisticService.getStatisticSurvey(surveyId).toString());

		return mav;
	}
}
