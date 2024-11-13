package com.kcc.fillin.survey.controller;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kcc.fillin.member.auth.PrincipalDetail;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.domain.ParticipantVO;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.dto.CommonCodeResponse;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;
import com.kcc.fillin.survey.service.SurveyService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/survey")
@RequiredArgsConstructor
public class SurveyController {

	private final SurveyService service;


	@PostMapping("")
	public String createSurveyWithName(SurveyVO survey, @AuthenticationPrincipal PrincipalDetail principalDetail){
		survey.setMemberSeq(principalDetail.getMember().getSeq());
		service.createNewSurvey(survey);
		return "redirect:/survey/"+survey.getSeq();
	}
	@GetMapping("/dashboard")
	public String dashboard(Criteria cri, Model model, @AuthenticationPrincipal PrincipalDetail principalDetail) {
		System.out.println("Criteria: " + cri);
		int pageNum = cri.getPageNum();
		int amount = cri.getAmount();


		String username = principalDetail.getUsername();
		cri.setUsername(username);
		List<MultiSearchSurveyResponse> pagedSurveys = service.getSurveyListWithPaging(cri);

		Map<String, List<CommonCodeResponse>> commonCodes = service.getCommonCodes();
		model.addAttribute("progressStatus", commonCodes.get("progressStatus"));
		model.addAttribute("selectPeriod", commonCodes.get("selectPeriod"));

		model.addAttribute("pagedSurveys", pagedSurveys);
		model.addAttribute("pageNum", pageNum);
		model.addAttribute("amount", amount);

		System.out.println("pagedSurveys: " + pagedSurveys);
		System.out.println("pageNum: " + pageNum);
		System.out.println("amount: " + amount);

		int totalSurveyCount = service.getTotalSurveyCount(username);
		model.addAttribute("totalSurveyCount", totalSurveyCount);
		System.out.println("totalSurveyCount: " + totalSurveyCount);

		int totalPages = (int)Math.ceil((double)totalSurveyCount / amount);
		model.addAttribute("totalPages", totalPages);

		int pageBlock = 10; // 한 번에 보여줄 페이지
		int startPage = ((pageNum - 1) / pageBlock) * pageBlock + 1; // 시작 페이지
		int endPage = Math.min(startPage + pageBlock - 1, totalPages); // 마지막 페이지

		model.addAttribute("pageBlock", pageBlock);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);

		return "/survey/dashboard";
	}

	@PostMapping("/project")
	public String newProject(SurveyVO newSurvey,  @AuthenticationPrincipal PrincipalDetail principalDetail) {
		//test용으로 memberId 설정함 (추후 삭제 반드시 필요)
		newSurvey.setMemberSeq(principalDetail.getMember().getSeq());
		System.out.println("newSurvey = " + newSurvey);
		boolean result = service.createNewSurvey(newSurvey);
		//survey 등록 실패 관련 로직 필요
		return "redirect:/survey/" + newSurvey.getSeq();
	}

	// 설문 로그 및 응답 시간 페이지를 반환하는 메서드
//	@GetMapping({"/logs/{surveySeq}","/logs"})
//	public String showSurveyLogsPage(Model model) {
//
//		return "/survey/surveyLog";  // surveyLog.jsp 파일을 렌더링
//	}
	@GetMapping({"/logs/{surveySeq}", "/logs"})
	public String showSurveyLogsPage(@PathVariable(required = false) Long surveySeq, Model model, @AuthenticationPrincipal PrincipalDetail principalDetail) {
		if(surveySeq == null){
			Long lastSurveySeq = service.getLastSurveySeq(principalDetail.getMember().getSeq());
			if(lastSurveySeq == null) return "redirect:/survey/dashboard";
			return "redirect:/survey/logs/"+lastSurveySeq;

		}
		model.addAttribute("surveySeq", surveySeq);
		return "/survey/surveyLog"; // surveyLog.jsp 파일 렌더링
	}


	@GetMapping("/{surveySeq}")
	public String getSurvey(@PathVariable
							Long surveySeq, Model model,@AuthenticationPrincipal PrincipalDetail principalDetail) {

		SurveyVO findSurvey = service.findSurveyBySurveySeq(surveySeq);

		if(!findSurvey.isAuthSurvey(principalDetail.getMember().getSeq())){
			return "redirect:/survey/dashboard?auth=false";
		}
		model.addAttribute("survey", findSurvey);

		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());
		String jsonString = "";
		try {
			jsonString = objectMapper.writeValueAsString(findSurvey);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
		model.addAttribute("surveyJson", jsonString);
		return "/survey/project";
	}



	@GetMapping("/url/{surveyUrl}")
	public String getSurveyByParticipant(@PathVariable
										 String surveyUrl, Model model) {
		//응답자 생성해야함
		ParticipantVO participant = new ParticipantVO();
		service.createNewParticipant(participant);
		//surveyURL로 시작 로그 보내야함
		service.createCheckLog(surveyUrl);

		model.addAttribute("partSeq", participant.getSeq());
		return "/survey/participant";
	}

}