package com.kcc.fillin.statistic.dao;

import com.kcc.fillin.statistic.dto.QuestionListResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StatisticsDao_JA {
    public List<QuestionListResponse> getQuestionsBySurveySeq(Long surveySeq);
}
