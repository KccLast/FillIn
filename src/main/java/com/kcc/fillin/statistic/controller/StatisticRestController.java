package com.kcc.fillin.statistic.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.statistic.dto.AnswerDTO;
import com.kcc.fillin.statistic.dto.EmotionRequest;
import com.kcc.fillin.statistic.dto.QuantitativeAnswersRequest;
import com.kcc.fillin.statistic.dto.SentimentAnalysisResponse;
import com.kcc.fillin.statistic.dto.SentimentAnalysisResult;
import com.kcc.fillin.statistic.dto.WordFrequencyDTO;
import com.kcc.fillin.statistic.service.StatisticService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistic")
@Slf4j
public class StatisticRestController {
	private final StatisticService statisticService;

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

	@PostMapping("/comparison")
	public Response getQuantitativeAnswers(@RequestBody QuantitativeAnswersRequest quantitativeAnswersRequest) {
		return Response.setSuccess(statisticService.getQuantitativeAnswer(quantitativeAnswersRequest), 200);
		// log.info(quantitativeAnswersRequest.toString());
		// return Response.setSuccess(quantitativeAnswersRequest, 200);
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

	//    가중치 적용 수정 후
	@PostMapping("/analyzeEmotion")
	public ResponseEntity<SentimentAnalysisResult> analyzeEmotion(@RequestBody EmotionRequest request) {
		System.out.println("request = " + request);
		SentimentAnalysisResult result = statisticService.analyzeSentiment(request.getText());
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	//군집별 비교분석 예시
	@PostMapping("/compareClustering")
	public List<AnswerDTO> compareClustering(@RequestBody List<AnswerDTO> tableData, Model model) {
		return tableData;
	}

	//    @PostMapping("/analyzeClusterSentiment")
	//    public ResponseEntity<List<ClusterSentimentResult>> analyzeClusterSentiment(
	//            @RequestBody ClusterSentimentRequest clusterSentimentRequest) {
	//        List<ClusterSentimentResult> results = statisticService.analyzeClusterSentiment(clusterSentimentRequest);
	//        return ResponseEntity.ok(results);
	//    }

	//전체 감정분석 보기 버튼
	@PostMapping("/analyzeAllEmotions")
	public ResponseEntity<List<SentimentAnalysisResponse>> analyzeAllEmotions(
		@RequestBody List<EmotionRequest> requestList) {
		//SentimentAnalysisResult result = statisticService.analyzeSentiment(request.getText());
		System.out.println("Received request list: " + requestList);
		List<SentimentAnalysisResponse> sentiResponse = new ArrayList<SentimentAnalysisResponse>();
		for (EmotionRequest request : requestList) {
			SentimentAnalysisResult sentimentAnalysisResult = statisticService.analyzeSentiment(request.getText());
			String maxConfidenceName = sentimentAnalysisResult.getDocument().getConfidence().getMaxConfidenceName();
			Integer order = request.getOrder();
			sentiResponse.add(new SentimentAnalysisResponse(maxConfidenceName, order));
		}

		return ResponseEntity.ok(sentiResponse);
	}

}
