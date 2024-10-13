package com.kcc.fillin.statistic.service;

import java.time.LocalDate;

import com.kcc.fillin.statistic.dto.PostDateResponse;
import com.kcc.fillin.statistic.dto.StatisticSurveyResponse;

public interface StatisticService {
	public PostDateResponse getPostDate(Long surveyId);

	public StatisticSurveyResponse getStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
		Long questionSeq, String contents);

	// public StatisticSurveyResponse getFilterStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
	// 	Long questionSeq, String contents);
}
