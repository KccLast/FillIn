package com.kcc.fillin.statistic.service;

import com.kcc.fillin.statistic.dto.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface StatisticsService_JA {
    public List<QuestionListResponse> getQuestionsBySurveySeq(Long surveySeq);
    public List<QuantityQuestionsResponse> getQuantityQuestionsBySurvey(Long seq);
    public List<QuestionListResponse> getQuestionAndAnswerByParticipant(QuestionListRequest request);
    public List<ParticipantAnswer> getParticipantAnswers(Long surveySeq);
    public List<QuestionResponse> getResponsesByQuestions(QuestionListRequest request);
}
