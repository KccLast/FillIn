package com.kcc.fillin.statistic.service;

import com.kcc.fillin.statistic.dao.StatisticsDao_JA;
import com.kcc.fillin.statistic.dto.QuantityQuestionsResponse;
import com.kcc.fillin.statistic.dto.QuestionListRequest;
import com.kcc.fillin.statistic.dto.QuestionListResponse;
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
}
