package com.kcc.fillin.statistic.dao;

import com.kcc.fillin.statistic.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StatisticsDao_JA {
    public List<QuestionListResponse> getQuestionsBySurveySeq(Long surveySeq);
    public List<QuantityQuestionsResponse> getQuantityQuestionsBySurvey(Long surveySeq);
    public List<QuestionListResponse> getQuestionAndAnswerByParticipant(QuestionListRequest request);
    public List<ParticipantAnswer> getParticipantAnswers(Long surveySeq);
    public List<QuestionResponse> getResponsesByQuestions(@Param("request") QuestionListRequest request);
}