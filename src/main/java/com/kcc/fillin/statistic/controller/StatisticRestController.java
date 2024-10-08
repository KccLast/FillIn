package com.kcc.fillin.statistic.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.statistic.service.StatisticService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistic")
@Slf4j
public class StatisticRestController {
	private final StatisticService statisticService;

	/*
	화면 띄우고 ajax 통신
	getFull : return "full"
	getFullStatistic : return statisticSurveyResponse;
	 */
	@GetMapping("/{surveyId}")
	public Response getFullStatistic(@PathVariable Long surveyId) {
		return Response.setSuccess(statisticService.getStatisticSurvey(surveyId), 200);
	}
}

