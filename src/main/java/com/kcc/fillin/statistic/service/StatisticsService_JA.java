package com.kcc.fillin.statistic.service;

import com.kcc.fillin.statistic.dto.QuantityQuestionsResponse;
import com.kcc.fillin.statistic.dto.QuestionListRequest;
import com.kcc.fillin.statistic.dto.QuestionListResponse;

import java.util.List;

public interface StatisticsService_JA {
    public List<QuestionListResponse> getQuestionsBySurveySeq(Long surveySeq);
    public List<QuantityQuestionsResponse> getQuantityQuestionsBySurvey(Long seq);
    public List<QuestionListResponse> getQuestionAndAnswerByParticipant(QuestionListRequest request);
}
