package com.kcc.fillin.survey.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;
import com.kcc.fillin.survey.dto.SurveyLogDTO;
import com.kcc.fillin.survey.service.SurveyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/survey")
@RequiredArgsConstructor
public class SurveyRestController {
	private final SurveyService service;

	@PostMapping("/dashboard")
	public Response filterDashboard(@RequestBody
	MultiSearchSurveyRequest request) {
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
	public Response<SurveyVO> getSurveyByParticipant(@PathVariable
	String surveyUrl) {

		//PageDTO page = new PageDTO(curPage,surveyUrl);
		SurveyVO findSurvey = service.getSurveyByUrl(surveyUrl);

		//		page.setEnd(findSurvey.getTotalCnt());
		//		SubmitPageResponseDTO responseDTO = new SubmitPageResponseDTO(findSurvey,page);

		return Response.setSuccess(findSurvey, 200);
	}

	// 설문 로그를 필터링하는 API
	@GetMapping("/logs")
	public ResponseEntity<List<SurveyLogDTO>> getSurveyLogs(@RequestParam("startDate")
	String startDateStr,
		@RequestParam("endDate")
		String endDateStr
	/*@RequestParam("page") int page,
	@RequestParam("size") int size*/) {
		System.out.println("startDateStr = " + startDateStr);
		System.out.println("endDateStr = " + endDateStr);
		// 문자열을 LocalDate로 변환
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate startDate = LocalDate.parse(startDateStr, formatter);
		LocalDate endDate = LocalDate.parse(endDateStr, formatter);

		// 서비스를 호출하여 로그를 가져옴(, page, size)
		List<SurveyLogDTO> logs = service.getSurveyLogs(startDate, endDate);
		return ResponseEntity.ok(logs);
	}

}
