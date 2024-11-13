package com.kcc.fillin.survey.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.survey.domain.ParticipantVO;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.dto.CommonCodeResponse;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;
import com.kcc.fillin.survey.dto.PostSurveyRequest;

@Mapper
public interface SurveyDao {
	SurveyVO selectSurveyBySurveySeq = null;

	public List<MultiSearchSurveyResponse> getAllSurveys();

	public List<MultiSearchSurveyResponse> getFilteringSurveys(MultiSearchSurveyRequest request);

	public List<MultiSearchSurveyResponse> getSurveyListWithPaging(int startRow, int endRow, String username);

	public int getTotalSurveyCount(String username);

	public List<CommonCodeResponse> getCommonCodes();

	public boolean insertNewSurvey(SurveyVO newSurvey);

	public SurveyVO selectSurveyBySurveySeq(Long surveySeq);

	/*public SurveyVO selectSurveyByurl(PageDTO page);*/
	public SurveyVO selectSurveyByurl(String url);

	public int getTotalQuestionCount(String surveyUrl);

	public boolean insertNewParticipant(ParticipantVO newParticipantVO);

	public boolean insertCheckLog(String surveyUrl);

	public boolean updateSurveyInfo(PostSurveyRequest postSurveyRequest);

	Long getLastSurveySeq(Long seq);

}
