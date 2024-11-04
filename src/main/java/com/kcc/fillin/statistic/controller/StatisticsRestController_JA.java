package com.kcc.fillin.statistic.controller;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.statistic.dto.QuantityQuestionsResponse;
import com.kcc.fillin.statistic.dto.QuestionListRequest;
import com.kcc.fillin.statistic.dto.QuestionListResponse;
import com.kcc.fillin.statistic.service.StatisticsService_JA;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;


import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistics")
public class StatisticsRestController_JA {
    private final StatisticsService_JA service;
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/question-list/{surveySeq}")
    public Response getQuestionList(@PathVariable Long surveySeq) {
        List<QuantityQuestionsResponse> quantityQuestionsBySurvey = service.getQuantityQuestionsBySurvey(surveySeq);
        return Response.setSuccess(quantityQuestionsBySurvey,200);
    }

    @PostMapping("/regression-analysis")
    public Response getSelectedQuestionsByRegression(@RequestBody QuestionListRequest request) {
        List<QuestionListResponse> questionAndAnswerByParticipant = service.getQuestionAndAnswerByParticipant(request);
        System.out.println(questionAndAnswerByParticipant);
        System.out.println("Seq List: " + request.getSeqList());

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        // JSON 데이터를 담은 HttpEntity 생성
        HttpEntity<List<QuestionListResponse>> entity = new HttpEntity<>(questionAndAnswerByParticipant, headers);

        // FastAPI 서버의 URL
        String pythonServerUrl = "http://localhost:8000/receive-data";  // FastAPI의 주소 및 포트 설정

        // FastAPI 서버로 POST 요청 보내기
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    pythonServerUrl,
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            System.out.println("FastAPI Server Response: " + response.getBody());
        } catch (HttpServerErrorException e) {
            System.out.println("서버 오류 발생: " + e.getStatusCode());
            System.out.println("오류 메시지: " + e.getResponseBodyAsString());
        }



        return Response.setSuccess(questionAndAnswerByParticipant, 200);
    }

}
