package com.kcc.fillin.survey.controller;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kcc.fillin.survey.dto.PageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kcc.fillin.survey.Criteria;
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

	@GetMapping("/dashboard")
	public String dashboard(Criteria cri, Model model) {
		System.out.println("Criteria: " + cri);
		int pageNum = cri.getPageNum();
		int amount = cri.getAmount();
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

		int totalSurveyCount = service.getTotalSurveyCount();
		model.addAttribute("totalSurveyCount", totalSurveyCount);
		System.out.println("totalSurveyCount: " + totalSurveyCount);

		int totalPages = (int)Math.ceil((double)totalSurveyCount / amount);
		model.addAttribute("totalPages", totalPages);

		return "/survey/dashboard";
	}

	@PostMapping("/project")
	public String newProject(SurveyVO newSurvey) {

		//test용으로 memberId 설정함 (추후 삭제 반드시 필요)
		newSurvey.setMemberSeq(1);

		boolean result = service.createNewSurvey(newSurvey);

		//survey 등록 실패 관련 로직 필요

		return "redirect:/survey/" + newSurvey.getSeq();
	}

	@GetMapping("/{surveySeq}")
	public String getSurvey(@PathVariable
	Long surveySeq, Model model) {

		SurveyVO findSurvey = service.findSurveyBySurveySeq(surveySeq);
		model.addAttribute("survey", findSurvey);
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonString = "";
		try {
			 jsonString = objectMapper.writeValueAsString(findSurvey);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
		model.addAttribute("surveyJson",jsonString);
		return "/survey/project";
	}

	@PostMapping("/api/question")
	@ResponseBody
	public String insertQuestion() {

		return "성공";
	}

	@GetMapping("/url/{surveyUrl}")
	public String getSurveyByParticipant(@PathVariable String surveyUrl, Model model){
		return "/survey/participant";
	}
}
