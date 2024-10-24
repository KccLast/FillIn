package com.kcc.fillin.statistic.controller;

import java.util.List;
import java.util.Map;

import com.kcc.fillin.statistic.dto.ClusterDataRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kcc.fillin.statistic.service.StatisticService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/statistic")
@RequiredArgsConstructor
public class StatisticController2 {

	private final StatisticService statisticService;

	@PostMapping("/keyword")
	public String showKeywordAnalysisPage(@RequestParam Long surveySeq, @RequestParam Long questionSeq,
		@RequestParam String clusteringData, Model model) {
		// System.out.println(clusteringData);

		// clusteringData를 파싱하여 모델에 추가
		ObjectMapper objectMapper = new ObjectMapper();
		List<Map<String, Object>> parsedData;

		model.addAttribute("surveySeq", surveySeq);
		model.addAttribute("questionSeq", questionSeq);
		model.addAttribute("clusteringData", clusteringData);

		return "/statistic/keyword";
	}

	@GetMapping("/keyword")
	public String showKeywordAnalysisPage(Long surveySeq, Long questionSeq, String clusteringData) {

		 System.out.println(clusteringData);

		// clusteringData를 파싱하여 모델에 추가
		/*ObjectMapper objectMapper = new ObjectMapper();
		List<Map<String, Object>> parsedData;

		model.addAttribute("surveySeq", surveySeq);
		model.addAttribute("questionSeq", questionSeq);
		model.addAttribute("clusteringData", clusteringData);*/

		return "/statistic/keyword";
	}

	@GetMapping("/{surveyId}")
	public String getFull(@PathVariable Long surveyId, Model model) {
		model.addAttribute("surveyId", surveyId);

		// PostDateResponse postDateResponse = statisticService.getPostDate(surveyId);
		model.addAttribute("postDateResponse", statisticService.getPostDate(surveyId));

		return "/statistic/full";
	}

	@GetMapping("/clustering/{surveyId}")
	public String getClustering(@PathVariable Long surveyId, Model model) {
		model.addAttribute("surveyId", surveyId);

		return "/statistic/kmeans";
	}
}
