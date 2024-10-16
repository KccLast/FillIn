package com.kcc.fillin.statistic.controller;

import com.kcc.fillin.statistic.dto.AnswerDTO;
import com.kcc.fillin.statistic.dto.WordFrequencyDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    getFull : return "full"
    getFullStatistic : return statisticSurveyResponse;
     */
    @GetMapping("/{surveyId}")
    public Response getFullStatistic(@PathVariable Long surveyId) {
        return Response.setSuccess(statisticService.getStatisticSurvey(surveyId), 200);
    }

    //키워드 분석

    // 키워드 필터링
    @GetMapping("/search")
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


}