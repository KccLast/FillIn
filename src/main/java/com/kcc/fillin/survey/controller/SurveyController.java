package com.kcc.fillin.survey.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kcc.fillin.survey.dto.multiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.multiSearchSurveyResponse;
import com.kcc.fillin.survey.service.SurveyService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/survey")
@RequiredArgsConstructor
public class SurveyController {
	private final SurveyService service;

	@GetMapping("/dashboard")
	public String dashboard(Model model) {
		List<multiSearchSurveyResponse> allSurveys = service.getAllSurveys();
		/*System.out.println("전체 설문: " + allSurveys);*/
		model.addAttribute("allSurveys", allSurveys);
		return "/survey/dashboard";
	}

	@PostMapping("/dashboard")
	public ResponseEntity<List<multiSearchSurveyResponse>> filterDashboard(@RequestBody
	multiSearchSurveyRequest request) {
		List<multiSearchSurveyResponse> filteringSurveys = service.getFilteringSurveys(request);
		System.out.println("필터링 결과: " + filteringSurveys);

		return ResponseEntity.ok(filteringSurveys);
	}

}
