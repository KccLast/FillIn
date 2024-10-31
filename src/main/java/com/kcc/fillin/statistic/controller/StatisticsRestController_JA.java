package com.kcc.fillin.statistic.controller;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.statistic.dto.QuestionListResponse;
import com.kcc.fillin.statistic.service.StatisticsService_JA;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistics")
public class StatisticsRestController_JA {
    private final StatisticsService_JA service;

    @GetMapping("/question-list/{surveyId}")
    public Response getQuestionList(@PathVariable Long surveyId) {
        List<QuestionListResponse> questionsBySurveySeq = service.getQuestionsBySurveySeq(surveyId);
        return Response.setSuccess(questionsBySurveySeq,200);
    }
}
