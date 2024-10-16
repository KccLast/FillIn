package com.kcc.fillin.statistic.service;

import com.kcc.fillin.statistic.dto.AnswerDTO;
import com.kcc.fillin.statistic.dto.StatisticSurveyResponse;
import com.kcc.fillin.statistic.dto.WordFrequencyDTO;

import java.util.List;

public interface StatisticService {
	public StatisticSurveyResponse getStatisticSurvey(Long surveyId);

	//키워드 분석

	// 키워드에 따라 데이터를 검색
	List<AnswerDTO> findByKeyword(String keyword);

	// 워드 클라우드 생성을 위한 빈도수 계산
	List<WordFrequencyDTO> calculateWordFrequencies(String keyword);




}
