package com.kcc.fillin.statistic.service;

import com.kcc.fillin.statistic.dao.StatisticsDao_JA;
import com.kcc.fillin.statistic.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl_JA implements StatisticsService_JA {
    private final StatisticsDao_JA dao;
    @Override
    public List<QuestionListResponse> getQuestionsBySurveySeq(Long surveySeq) {
        return dao.getQuestionsBySurveySeq(surveySeq);
    }

    @Override
    public List<QuantityQuestionsResponse> getQuantityQuestionsBySurvey(Long surveySeq) {
        return dao.getQuantityQuestionsBySurvey(surveySeq);
    }

    @Override
    public List<QuestionListResponse> getQuestionAndAnswerByParticipant(QuestionListRequest request) {
        return dao.getQuestionAndAnswerByParticipant(request);
    }

    @Override
    public List<ParticipantAnswer> getParticipantAnswers(Long surveySeq) {
        return dao.getParticipantAnswers(surveySeq);
    }

    @Override
    public List<QuestionResponse> getResponsesByQuestions(QuestionListRequest request) {
        System.out.println("request 출력됨?: " + request);
        return dao.getResponsesByQuestions(request);
    }
}
