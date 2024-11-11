package com.kcc.fillin.survey.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import com.kcc.fillin.survey.dto.*;
import org.springframework.format.annotation.DateTimeFormat;
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


    @PostMapping("/post")
    public Response postSurvey(@RequestBody PostSurveyRequest request) {
        return Response.setSuccess(service.addSurveyUrl(request), 200, "게시 완료");
    }

    //	응답시간분석에서 날짜 범위에 따라 필터링
//@GetMapping("/logs")
//public ResponseEntity<List<SurveyLogDTO>> getSurveyLogs(
//		@RequestParam("startDate") String startDateStr,
//		@RequestParam("endDate") String endDateStr) {
//	LocalDateTime startDate = LocalDateTime.parse(startDateStr);
//	LocalDateTime endDate = LocalDateTime.parse(endDateStr);
//	List<SurveyLogDTO> logs = service.getSurveyLogs(startDate, endDate);
//	return ResponseEntity.ok(logs);
//}
//
//	@GetMapping("/status-counts")
//	public ResponseEntity<List<SurveyStatusDTO>> getSurveyStatusCounts(
//			@RequestParam("startDate") String startDateStr,
//			@RequestParam("endDate") String endDateStr) {
//		// 문자열로 받은 날짜를 LocalDateTime으로 변환
//		LocalDateTime startDate = LocalDateTime.parse(startDateStr);
//		LocalDateTime endDate = LocalDateTime.parse(endDateStr);
//
//		// 서비스 계층에 startDate와 endDate를 전달하여 데이터 조회
//		List<SurveyStatusDTO> statusCounts = service.getSurveyStatusCounts(startDate, endDate);
//		return ResponseEntity.ok(statusCounts);
//	}
// 설문 로그 조회 API
    @GetMapping("/logs/{surveySeq}")
    public ResponseEntity<List<SurveyLogDTO>> getSurveyLogs(
            @RequestParam("startDate") String startDateStr,
            @RequestParam("endDate") String endDateStr,
            @RequestParam("surveySeq") Long surveySeq) {

        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59);

        List<SurveyLogDTO> logs = service.getSurveyLogs(surveySeq, startDateTime, endDateTime);

        return ResponseEntity.ok(logs);
    }

    @GetMapping("/status-counts")
    public ResponseEntity<List<SurveyStatusDTO>> getSurveyStatusCounts(
            @RequestParam("startDate") String startDateStr,
            @RequestParam("endDate") String endDateStr) {

        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59);

        List<SurveyStatusDTO> statusCounts = service.getAllSurveyStatusCounts(startDateTime, endDateTime);

        return ResponseEntity.ok(statusCounts);
    }
}
