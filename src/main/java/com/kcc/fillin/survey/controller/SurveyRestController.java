package com.kcc.fillin.survey.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import com.kcc.fillin.member.auth.PrincipalDetail;
import com.kcc.fillin.survey.dto.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.service.SurveyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/survey")
@RequiredArgsConstructor
public class SurveyRestController {

	private final SurveyService service;

	@PostMapping("/dashboard")
	public Response filterDashboard(@RequestBody
	MultiSearchSurveyRequest request, @AuthenticationPrincipal PrincipalDetail principalDetail) {
		if (request == null) {
			System.out.println("받은 요청이 null입니다.");
		} else {
			System.out.println("받은 요청: " + request);
		}
		String username = principalDetail.getUsername();
		request.setUsername(username);

		List<MultiSearchSurveyResponse> filteringSurveys = service.getFilteringSurveys(request);
		System.out.println("필터링된 결과 크기: " + filteringSurveys.size());

		return Response.setSuccess(filteringSurveys, 200);
	}

	@PostMapping("/create-survey")
	public Response createSurvey(@RequestBody CreateSurveyRequest request) {
		String surveyName = request.getSurveyName();
		return Response.setSuccess(surveyName, 200);
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

	// 설문 로그 조회 API
    @GetMapping("/logs")
    public ResponseEntity<List<SurveyLogDTO>> getSurveyLogs(
            @RequestParam("surveySeq") Long surveySeq,
            @RequestParam("startDate") String startDateStr,
            @RequestParam("endDate") String endDateStr
            ) {


        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59);

        List<SurveyLogDTO> logs = service.getSurveyLogs(surveySeq, startDateTime, endDateTime);

        return ResponseEntity.ok(logs);
    }

    @GetMapping("/status-counts")
    public ResponseEntity<List<SurveyStatusDTO>> getSurveyStatusCounts(
            @RequestParam("surveySeq") Long surveySeq,
            @RequestParam("startDate") String startDateStr,
            @RequestParam("endDate") String endDateStr) {
//
		System.out.println(" 여기 오냐 안오냐 제발 부탁해 와바바 ");
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59);


        List<SurveyStatusDTO> statusCounts = service.getAllSurveyStatusCounts(surveySeq,startDateTime, endDateTime);
		System.out.println("statusCounts = " + statusCounts);
		System.out.println("여기까지도 왔다 이러면 진짜 이유를 몰라");
        return ResponseEntity.ok(statusCounts);
    }

	@PostMapping("/post")
	public Response postSurvey(@RequestBody PostSurveyRequest request) {
		return Response.setSuccess(service.addSurveyUrl(request), 200, "게시 완료");
	}

}
