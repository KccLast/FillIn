package com.kcc.fillin.survey.service;

import java.util.List;

import com.kcc.fillin.survey.dto.multiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.multiSearchSurveyResponse;

public interface SurveyService {
	public List<multiSearchSurveyResponse> getAllSurveys();

	public List<multiSearchSurveyResponse> getFilteringSurveys(multiSearchSurveyRequest request);
}
