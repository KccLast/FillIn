package com.kcc.fillin.statistic.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.List;

import com.kcc.fillin.statistic.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kcc.fillin.statistic.dao.StatisticMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.fasterxml.jackson.databind.ObjectMapper;




@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class StatisticServiceImpl implements StatisticService {

    @Value("${api.clova.client_id}")
    private String client_id;
    @Value("${api.clova.client_secret}")
    private String client_secret;

    private final StatisticMapper statisticMapper;

    @Override
    public PostDateResponse getPostDate(Long surveyId) {
        return statisticMapper.selectPostDate(surveyId);
    }

    @Override
    public StatisticSurveyResponse getStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
                                                      Long questionSeq, String contents) {

        return StatisticSurveyResponse.builder() // 참여자 수 그래프 데이터
                // 목표 인원
                .targetCount(statisticMapper.selectTargetCount(surveyId))
                // 참여 인원
                .participantsCount(statisticMapper.selectParticipantsCount(surveyId, startDate, endDate))
                // // 조회수
                .hitsResponseList(statisticMapper.selectHits(surveyId, startDate, endDate))
                // // 정량 평가 응답
                .quantitativeResponseList(
                        statisticMapper.selectQuantitativeList(surveyId, startDate, endDate, questionSeq, contents))
                // // 정성 평가 응답
                .qualitativeResponseList(
                        statisticMapper.selectQualitativeList(surveyId, startDate, endDate, questionSeq, contents))
                .build();
    }

    @Override
    public List<QualitativeQuestionResponse> getQualitativeQuestion(Long surveyId) {
        return statisticMapper.selectQualitativeQuestions(surveyId);
    }

    @Override
    public List<QualitativeAnswerDTO> getQualitativeAnswer(Long questionId) {
        return statisticMapper.selectQualitativeAnswerList(questionId);
    }

    // @Override
    // public StatisticSurveyResponse getFilterStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
    // 	Long questionSeq, String contents) {
    //
    // 	// 조회 기간, 질문&문항
    //
    // 	return StatisticSurveyResponse.builder()
    // 		.targetCount(statisticMapper.selectTargetCount(surveyId));
    // }

    //	키워드 분석
    @Override
    public List<AnswerDTO> findByKeyword(String keyword) {
        // StatisticMapper를 통해 데이터베이스에서 데이터를 가져옴
        return statisticMapper.findByContentsContaining(keyword);
    }

    @Override
    public List<WordFrequencyDTO> calculateWordFrequencies(String keyword) {
        List<AnswerDTO> answers = findByKeyword(keyword);

        // 빈도수 계산 로직 (예시)
        Map<String, Integer> frequencyMap = new HashMap<>();
        for (AnswerDTO answer : answers) {
            String[] words = answer.getContents().split("\\s+");
            for (String word : words) {
                frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
            }
        }

        // 빈도 데이터를 WordFrequency 객체로 변환
        return frequencyMap.entrySet().stream()
                .map(entry -> new WordFrequencyDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    //	감정분석
    @Override
    public SentimentAnalysisResult analyzeSentiment(String text) {
        System.out.println(client_id);
        System.out.println(client_secret);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"))
                .header("Content-Type", "application/json")
                .header("X-NCP-APIGW-API-KEY-ID", client_id)
                .header("X-NCP-APIGW-API-KEY", client_secret)
                .POST(HttpRequest.BodyPublishers.ofString("{\"content\":\"" + text + "\"}"))
                .build();

        try {

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("response.body() = " + response.body());
            return parseSentimentResponse(response.body());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            // 여기서 적절한 오류 처리 로직을 추가하거나, 오류 정보를 리턴할 수 있다... 아오..
            return null;  // 예를 들어 null을 반환하거나, 오류 상태를 나타내는 SentimentAnalysisResult 객체를 반환할 수 있음
        }
    }


    private SentimentAnalysisResult parseSentimentResponse(String jsonResponse) {
       // ObjectMapper 인스턴스 생성
        ObjectMapper mapper = new ObjectMapper();
        try {
            SentimentAnalysisResult result = mapper.readValue(jsonResponse, SentimentAnalysisResult.class);
            System.out.println("Document Sentiment: " + result.getDocument().getSentiment());
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}

