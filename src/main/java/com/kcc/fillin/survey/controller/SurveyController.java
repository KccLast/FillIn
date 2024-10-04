package com.kcc.fillin.survey.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;
import com.kcc.fillin.survey.service.SurveyService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/survey")
@RequiredArgsConstructor
public class SurveyController {

	private final SurveyService service;

	@GetMapping("/dashboard")
	public String dashboard(Criteria cri, Model model) {
		System.out.println("Criteria: " + cri);
		int pageNum = cri.getPageNum();
		int amount = cri.getAmount();
		List<MultiSearchSurveyResponse> pagedSurveys = service.getSurveyListWithPaging(cri);

		model.addAttribute("pagedSurveys", pagedSurveys);
		model.addAttribute("pageNum", pageNum);
		model.addAttribute("amount", amount);

		System.out.println("pagedSurveys: " + pagedSurveys);
		System.out.println("pageNum: " + pageNum);
		System.out.println("amount: " + amount);

		int totalSurveyCount = service.getTotalSurveyCount();
		model.addAttribute("totalSurveyCount", totalSurveyCount);
		System.out.println("totalSurveyCount: " + totalSurveyCount);

		int totalPages = (int)Math.ceil((double)totalSurveyCount / amount);
		model.addAttribute("totalPages", totalPages);

		return "/survey/dashboard";
	}

	@PostMapping("/dashboard")
	public ResponseEntity<List<MultiSearchSurveyResponse>> filterDashboard(@RequestBody
	MultiSearchSurveyRequest request) {
		List<MultiSearchSurveyResponse> filteringSurveys = service.getFilteringSurveys(request);
		System.out.println("필터링 결과: " + filteringSurveys);

		return ResponseEntity.ok(filteringSurveys);
	}

	@GetMapping("/project")
	public void newProject() {}

}
