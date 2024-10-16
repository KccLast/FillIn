package com.kcc.fillin.survey.controller;

import java.util.List;

import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.dto.PageDTO;
import com.kcc.fillin.survey.dto.SubmitPageResponseDTO;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

/*	@GetMapping("/{surveyUrl}/{curPage}")
	public Response<SubmitPageResponseDTO> getSurveyByParticipant(@PathVariable String surveyUrl, @PathVariable Integer curPage){


		PageDTO page = new PageDTO(curPage,surveyUrl);
		SurveyVO findSurvey = service.getSurveyByUrl(page);

		page.setEnd(findSurvey.getTotalCnt());
		SubmitPageResponseDTO responseDTO = new SubmitPageResponseDTO(findSurvey,page);
		
		return Response.setSuccess(responseDTO,200);
	}*/
	@GetMapping("/{surveyUrl}")
	public Response<SurveyVO> getSurveyByParticipant(@PathVariable String surveyUrl){


		//PageDTO page = new PageDTO(curPage,surveyUrl);
		SurveyVO findSurvey = service.getSurveyByUrl(surveyUrl);

//		page.setEnd(findSurvey.getTotalCnt());
//		SubmitPageResponseDTO responseDTO = new SubmitPageResponseDTO(findSurvey,page);

		return Response.setSuccess(findSurvey,200);
	}


}
