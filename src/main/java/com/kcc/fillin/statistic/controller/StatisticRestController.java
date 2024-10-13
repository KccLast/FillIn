package com.kcc.fillin.statistic.controller;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	getFull : return "full" -> surveyId, postDate, endDate 담아줘야함
	getFullStatistic : return statisticSurveyResponse;
	 */
	// @GetMapping("/{surveyId}")
	// public Response getFullStatistic(@PathVariable Long surveyId) {
	// 	return Response.setSuccess(statisticService.getStatisticSurvey(surveyId), 200);
	// }

	@GetMapping("/{surveyId}")
	public Response getFullStatistic(@PathVariable Long surveyId,
		@RequestParam LocalDate startDate,
		@RequestParam LocalDate endDate,
		@RequestParam Long questionSeq,
		@RequestParam String contents) {
		return Response.setSuccess(
			statisticService.getStatisticSurvey(surveyId, startDate, endDate, questionSeq, contents), 200);
	}
}

