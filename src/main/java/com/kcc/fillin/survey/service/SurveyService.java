package com.kcc.fillin.survey.service;

import java.util.List;
import java.util.Map;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.dto.CommonCodeResponse;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;

public interface SurveyService {
	public List<MultiSearchSurveyResponse> getAllSurveys();

	public List<MultiSearchSurveyResponse> getFilteringSurveys(MultiSearchSurveyRequest request);

	public List<MultiSearchSurveyResponse> getSurveyListWithPaging(Criteria cri);

	public int getTotalSurveyCount();

	public Map<String, List<CommonCodeResponse>> getCommonCodes();

	public boolean createNewSurvey(SurveyVO newSurvey);

	public SurveyVO findSurveyBySurveySeq(Long surveySeq);

	/*SurveyVO getSurveyByUrl(PageDTO surveyUrl);*/
	SurveyVO getSurveyByUrl(String surveyUrl);

	public Long createNewParticipant();
}
