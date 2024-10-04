package com.kcc.fillin.survey.service;

import java.util.List;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;

public interface SurveyService {
	public List<MultiSearchSurveyResponse> getAllSurveys();

	public List<MultiSearchSurveyResponse> getFilteringSurveys(MultiSearchSurveyRequest request);

	public List<MultiSearchSurveyResponse> getSurveyListWithPaging(Criteria cri);

	public int getTotalSurveyCount();
}
