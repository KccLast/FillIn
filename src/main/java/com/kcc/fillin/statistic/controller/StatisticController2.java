package com.kcc.fillin.statistic.controller;

import java.util.List;
import java.util.Map;

import com.kcc.fillin.member.auth.PrincipalDetail;
import com.kcc.fillin.statistic.dto.AnswerDTO;
import com.kcc.fillin.survey.service.SurveyService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kcc.fillin.statistic.service.StatisticService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/statistic")
@RequiredArgsConstructor
@Slf4j
public class StatisticController2 {

	private final StatisticService statisticService;
	private final SurveyService surveyService;
	@PostMapping("/keyword")
	public String showKeywordAnalysisPage(@RequestParam Long surveySeq, @RequestParam Long questionSeq,
		@RequestParam String clusteringData, @RequestParam("questionText") String questionName, Model model) {
		// System.out.println(clusteringData);

		// clusteringData를 파싱하여 모델에 추가
		ObjectMapper objectMapper = new ObjectMapper();
		List<Map<String, Object>> parsedData;

		model.addAttribute("surveySeq", surveySeq);
		model.addAttribute("questionSeq", questionSeq);
		model.addAttribute("clusteringData", clusteringData);
		model.addAttribute("questionName", questionName);

		log.info("qqqqqqqqqqqqn : " + questionName);

		return "/statistic/keyword";
	}

	@GetMapping({"/{surveyId}",""})
	public String getFull(@PathVariable(required = false) Long surveyId, Model model, @AuthenticationPrincipal PrincipalDetail principalDetail) {

		if(surveyId != null) {
			model.addAttribute("surveyId", surveyId);
			// PostDateResponse postDateResponse = statisticService.getPostDate(surveyId);
			model.addAttribute("postDateResponse", statisticService.getPostDate(surveyId));
		}else{

			Long lastSurveySeq = surveyService.getLastSurveySeq(principalDetail.getMember().getSeq());
			if(lastSurveySeq == null) return "redirect:/survey/dashboard";
			else{
				return "redirect:/statistic/"+lastSurveySeq;
			}
		}
		return "/statistic/full";
	}

	@GetMapping({"/clustering/{surveyId}","/clustering"})
	public String getClustering(@PathVariable(required = false) Long surveyId, Model model, @AuthenticationPrincipal PrincipalDetail principalDetail)  {

		if(surveyId != null) {
			System.out.println(surveyId);
			model.addAttribute("surveyId", surveyId);
		}else{
			Long lastSurveySeq = surveyService.getLastSurveySeq(principalDetail.getMember().getSeq());
			if(lastSurveySeq == null) return "redirect:/survey/dashboard";
			else{
				return "redirect:/statistic/clustering/"+lastSurveySeq+"";
			}
		}

		return "/statistic/kmeans";
	}



	@PostMapping("/compareClustering")
	public String findCompareClusteringPage(@RequestParam("tableData") String tableData,Model model) {
		System.out.println("tableData = " + tableData);
		model.addAttribute("tableData", tableData);
		return "/statistic/compareClustering";  // JSP 페이지 이름 반환
	}
}
