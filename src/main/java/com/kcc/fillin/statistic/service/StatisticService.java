package com.kcc.fillin.statistic.service;

import com.kcc.fillin.statistic.dto.AnswerDTO;
import java.time.LocalDate;

import com.kcc.fillin.statistic.dto.PostDateResponse;
import com.kcc.fillin.statistic.dto.StatisticSurveyResponse;
import com.kcc.fillin.statistic.dto.WordFrequencyDTO;

import java.util.List;

public interface StatisticService {
  
	public PostDateResponse getPostDate(Long surveyId);

	public StatisticSurveyResponse getStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
		Long questionSeq, String contents);

	// public StatisticSurveyResponse getFilterStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
	// 	Long questionSeq, String contents);
  
  //키워드 분석

	// 키워드에 따라 데이터를 검색
	List<AnswerDTO> findByKeyword(String keyword);

	// 워드 클라우드 생성을 위한 빈도수 계산
	List<WordFrequencyDTO> calculateWordFrequencies(String keyword);
}
