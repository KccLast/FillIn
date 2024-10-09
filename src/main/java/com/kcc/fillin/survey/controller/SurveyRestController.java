package com.kcc.fillin.survey.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;
import com.kcc.fillin.survey.service.SurveyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/survey")
@RequiredArgsConstructor
public class SurveyRestController {
	private final SurveyService service;
	
	@PostMapping("/dashboard")
	public Response filterDashboard(@RequestBody MultiSearchSurveyRequest request) {
		 if (request == null) {
		        System.out.println("받은 요청이 null입니다.");
		    } else {
		        System.out.println("받은 요청: " + request);
		    }
		    
		    List<MultiSearchSurveyResponse> filteringSurveys = service.getFilteringSurveys(request);
		    System.out.println("필터링된 결과 크기: " + filteringSurveys.size());
		    
		    return Response.setSuccess(filteringSurveys, 200);
	}

}
