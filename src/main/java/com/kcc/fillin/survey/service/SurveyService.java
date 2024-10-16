package com.kcc.fillin.survey.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.dto.CommonCodeResponse;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;
import com.kcc.fillin.survey.dto.SurveyLogDTO;


public interface SurveyService {
	public List<MultiSearchSurveyResponse> getAllSurveys();

	public List<MultiSearchSurveyResponse> getFilteringSurveys(MultiSearchSurveyRequest request);

	public List<MultiSearchSurveyResponse> getSurveyListWithPaging(Criteria cri);

	public int getTotalSurveyCount();

	public Map<String, List<CommonCodeResponse>> getCommonCodes();



	// 설문 로그를 가져오는 메서드 정의(, int page, int size)
	List<SurveyLogDTO> getSurveyLogs(LocalDate startDate, LocalDate endDate);

	public boolean createNewSurvey(SurveyVO newSurvey);

	public SurveyVO findSurveyBySurveySeq(Long surveySeq);

}
