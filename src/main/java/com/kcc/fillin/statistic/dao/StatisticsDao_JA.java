package com.kcc.fillin.statistic.dao;

import com.kcc.fillin.statistic.dto.ParticipantAnswer;
import com.kcc.fillin.statistic.dto.QuantityQuestionsResponse;
import com.kcc.fillin.statistic.dto.QuestionListRequest;
import com.kcc.fillin.statistic.dto.QuestionListResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StatisticsDao_JA {
    public List<QuestionListResponse> getQuestionsBySurveySeq(Long surveySeq);
    public List<QuantityQuestionsResponse> getQuantityQuestionsBySurvey(Long surveySeq);
    public List<QuestionListResponse> getQuestionAndAnswerByParticipant(QuestionListRequest request);
    public List<ParticipantAnswer> getParticipantAnswers(Long surveySeq);
}