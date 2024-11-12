package com.kcc.fillin.survey.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.domain.ParticipantVO;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.dto.*;

public interface SurveyService {
	public List<MultiSearchSurveyResponse> getAllSurveys();

	public List<MultiSearchSurveyResponse> getFilteringSurveys(MultiSearchSurveyRequest request);

	public List<MultiSearchSurveyResponse> getSurveyListWithPaging(Criteria cri);

	public int getTotalSurveyCount(String username);

	public Map<String, List<CommonCodeResponse>> getCommonCodes();


	public boolean createNewSurvey(SurveyVO newSurvey);

	public SurveyVO findSurveyBySurveySeq(Long surveySeq);

	/*SurveyVO getSurveyByUrl(PageDTO surveyUrl);*/
	SurveyVO getSurveyByUrl(String surveyUrl);

	public boolean createNewParticipant(ParticipantVO participant);

	public boolean createCheckLog(String surveyUrl);

	public PostSurveyResponse addSurveyUrl(PostSurveyRequest request);

	// 특정 설문 로그 조회
	List<SurveyLogDTO> getSurveyLogs(Long surveySeq, LocalDateTime startDate, LocalDateTime endDate);


	List<SurveyStatusDTO> getAllSurveyStatusCounts(Long surveySeq,LocalDateTime startDate, LocalDateTime endDate);

}
