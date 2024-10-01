package com.kcc.fillin.survey.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.survey.dto.multiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.multiSearchSurveyResponse;

@Mapper
public interface SurveyMapper {
	public List<multiSearchSurveyResponse> getAllSurveys();

	public List<multiSearchSurveyResponse> getFilteringSurveys(multiSearchSurveyRequest request);

	public List<multiSearchSurveyResponse> getSurveyListWithPaging(int startRow, int endRow);

	public int getTotalSurveyCount();
}
