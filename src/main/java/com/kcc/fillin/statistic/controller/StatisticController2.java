package com.kcc.fillin.statistic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kcc.fillin.statistic.service.StatisticService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/statistic")
@RequiredArgsConstructor
public class StatisticController2 {
  
	private final StatisticService statisticService;
  
	@GetMapping("/keyword")
	public String showKeywordAnalysisPage() {
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
