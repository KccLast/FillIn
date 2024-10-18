package com.kcc.fillin.statistic.controller;

import com.kcc.fillin.statistic.dto.AnswerDTO;
import com.kcc.fillin.statistic.dto.EmotionRequest;
import com.kcc.fillin.statistic.dto.SentimentAnalysisResult;
import com.kcc.fillin.statistic.dto.WordFrequencyDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.statistic.service.StatisticService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistic")
@Slf4j
public class StatisticRestController {
    private final StatisticService statisticService;

	/*
	화면 띄우고 ajax 통신
	getFull : return "full" -> surveyId, postDate, endDate 담아줘야함
	getFullStatistic : return statisticSurveyResponse;
	 */
    // @GetMapping("/{surveyId}")
    // public Response getFullStatistic(@PathVariable Long surveyId) {
    // 	return Response.setSuccess(statisticService.getStatisticSurvey(surveyId), 200);
    // }

    @GetMapping("/{surveyId}")
    public Response getFullStatistic(@PathVariable Long surveyId,
                                     @RequestParam LocalDate startDate,
                                     @RequestParam LocalDate endDate,
                                     @RequestParam Long questionSeq,
                                     @RequestParam String contents) {
        return Response.setSuccess(
                statisticService.getStatisticSurvey(surveyId, startDate, endDate, questionSeq, contents), 200);
    }

    @GetMapping("/clustering/{surveyId}")
    public Response getQualitativeQuestions(@PathVariable Long surveyId) {
        return Response.setSuccess(statisticService.getQualitativeQuestion(surveyId), 200);
    }

    /**
     * surveyId, questionId, cluster
     * List<QualitativeAnswerDTO>
     */
    @GetMapping("/clustering")
    public Response getQualitativeAnswers(@RequestParam Long questionId) {
        return Response.setSuccess(statisticService.getQualitativeAnswer(questionId), 200);
    }


    //키워드 분석

    // 키워드 필터링
    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AnswerDTO>> searchByKeyword(@RequestParam("keyword") String keyword) {
        List<AnswerDTO> answers = statisticService.findByKeyword(keyword);
        return new ResponseEntity<>(answers, HttpStatus.OK);
    }

    // 워드 클라우드 데이터 생성
    @GetMapping("/wordcloud")
    public ResponseEntity<List<WordFrequencyDTO>> generateWordCloud(@RequestParam("keyword") String keyword) {
        List<WordFrequencyDTO> wordFrequencies = statisticService.calculateWordFrequencies(keyword);
        return new ResponseEntity<>(wordFrequencies, HttpStatus.OK);
    }

    //	감정분석
//    @GetMapping("/analyzeEmotion")
//    public ResponseEntity<SentimentAnalysisResult> analyzeEmotion(@RequestParam("text") String text) {
//        SentimentAnalysisResult result = statisticService.analyzeSentiment(text);
//
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
    // 감정분석을 POST 요청으로 처리
    @PostMapping("/analyzeEmotion")
    public ResponseEntity<SentimentAnalysisResult> analyzeEmotion(@RequestBody EmotionRequest request) {
        SentimentAnalysisResult result = statisticService.analyzeSentiment(request.getText());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}