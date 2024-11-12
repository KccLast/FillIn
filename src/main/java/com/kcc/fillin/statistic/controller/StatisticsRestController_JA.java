package com.kcc.fillin.statistic.controller;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.statistic.dto.*;
import com.kcc.fillin.statistic.service.StatisticsService_JA;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistics")
public class StatisticsRestController_JA {
    private final StatisticsService_JA service;
    private final RestTemplate restTemplate = new RestTemplate();
    private RegressionResponse latestRegressionData;

    private List<QuestionResponse> questionResponses;
    private List<ParticipantAnswer> participantAnswers;

    @GetMapping("/question-list/{surveySeq}")
    public Response getQuestionList(@PathVariable Long surveySeq) {
        List<QuantityQuestionsResponse> quantityQuestionsBySurvey = service.getQuantityQuestionsBySurvey(surveySeq);
        return Response.setSuccess(quantityQuestionsBySurvey,200);
    }

    @PostMapping("/regression-analysis")
    public Response getSelectedQuestionsByRegression(@RequestBody QuestionListRequest request) {
        System.out.println("independentQuestions: " + request.getIndependentQuestions() + ", dependentQuestion: " + request.getDependentQuestion());
        // 참여자 응답 가져오기
        participantAnswers = service.getParticipantAnswers(request.getSurveySeq());
        // 질문 응답 가져오기
        questionResponses = service.getResponsesByQuestions(request);

        System.out.println("Participant Answers: " + participantAnswers);
        System.out.println("Question Responses: " + questionResponses);

        // FastAPI 서버에 전송할 데이터 준비
        RegressionAnalysisData analysisData = new RegressionAnalysisData();
        analysisData.setIndependentQuestions(request.getIndependentQuestions());
        analysisData.setDependentQuestion(request.getDependentQuestion());
        analysisData.setQuestionResponses(questionResponses);

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // JSON 데이터를 담은 HttpEntity 생성
        HttpEntity<RegressionAnalysisData> entity = new HttpEntity<>(analysisData, headers);

        // FastAPI 서버의 URL
        String pythonServerUrl = "http://localhost:8000/regression-request-data";  // FastAPI 서버 주소

        // FastAPI 서버로 POST 요청 보내기
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    pythonServerUrl,
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            System.out.println("FastAPI Server Response: " + response.getBody());

            // 응답 반환
            return Response.setSuccess(response.getBody(), 200);
        } catch (HttpServerErrorException e) {
            System.out.println("서버 오류 발생: " + e.getStatusCode());
            System.out.println("오류 메시지: " + e.getResponseBodyAsString());
            return Response.setError("서버 오류 발생", e.getStatusCode().value());
        }
    }

    @GetMapping("/answer-data")
    public Response getAnswerData() {
        System.out.println("출렴됨? getAnswerData");
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("participantAnswers", participantAnswers);
        responseData.put("questionResponses", questionResponses);

        System.out.println("responseData: " + responseData);

        return Response.setSuccess(responseData, 200);
    }

    @PostMapping("/regression-result-data")
    public Response receiveRegressionData(@RequestBody RegressionResponse regressionResponse) {
        System.out.println("Received data from FastAPI: " + regressionResponse);
        latestRegressionData = regressionResponse;

        return Response.setSuccess(regressionResponse, 200);
    }

    @GetMapping("/regression-result-data")
    public Response sendRegressionData() {
        if(latestRegressionData != null) {
            return Response.setSuccess(latestRegressionData, 200);
        }

        return Response.setError("No regression data available", 404);
    }

    @GetMapping("/regression-result-gpt")
    public Response regressionWithGpt() {


        return Response.setSuccess(null, 200);
    }

}
