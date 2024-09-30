package com.kcc.fillin.statistic.service;

import com.kcc.fillin.statistic.dto.StatisticSurveyResponse;

public interface StatisticService {
	public StatisticSurveyResponse getStatisticSurvey(Long surveyId);
}
