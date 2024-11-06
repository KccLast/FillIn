package com.kcc.fillin.statistic.service;

import java.time.LocalDate;
import java.util.List;

import com.kcc.fillin.statistic.dto.AnswerDTO;
import com.kcc.fillin.statistic.dto.ClusterAnswerResponse;
import com.kcc.fillin.statistic.dto.PostDateResponse;
import com.kcc.fillin.statistic.dto.QualitativeAnswerDTO;
import com.kcc.fillin.statistic.dto.QualitativeQuestionResponse;
import com.kcc.fillin.statistic.dto.QuantitativeAnswersRequest;
import com.kcc.fillin.statistic.dto.SentimentAnalysisResult;
import com.kcc.fillin.statistic.dto.StatisticSurveyResponse;
import com.kcc.fillin.statistic.dto.WordFrequencyDTO;

public interface StatisticService {

	public PostDateResponse getPostDate(Long surveyId);

	public StatisticSurveyResponse getStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
		Long questionSeq, String contents);

	public List<QualitativeQuestionResponse> getQualitativeQuestion(Long surveyId);

	public List<QualitativeAnswerDTO> getQualitativeAnswer(Long questionId);

	// public StatisticSurveyResponse getFilterStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
	// 	Long questionSeq, String contents);

	public List<ClusterAnswerResponse> getQuantitativeAnswer(QuantitativeAnswersRequest quantitativeAnswersRequest);

	//키워드 분석

	// 키워드에 따라 데이터를 검색
	List<AnswerDTO> findByKeyword(String keyword);

	// 워드 클라우드 생성을 위한 빈도수 계산
	List<WordFrequencyDTO> calculateWordFrequencies(String keyword);

	//	감정분석 기능
	SentimentAnalysisResult analyzeSentiment(String text);
}
