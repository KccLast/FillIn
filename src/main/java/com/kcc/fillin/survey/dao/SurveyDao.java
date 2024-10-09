package com.kcc.fillin.survey.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;
import com.kcc.fillin.survey.dto.CommonCodeResponse;

@Mapper
public interface SurveyDao {
	public List<MultiSearchSurveyResponse> getAllSurveys();

	public List<MultiSearchSurveyResponse> getFilteringSurveys(MultiSearchSurveyRequest request);

	public List<MultiSearchSurveyResponse> getSurveyListWithPaging(int startRow, int endRow);

	public int getTotalSurveyCount();
	
	public List<CommonCodeResponse> getCommonCodes();
}
