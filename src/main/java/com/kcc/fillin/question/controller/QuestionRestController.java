package com.kcc.fillin.question.controller;

import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.service.QuestionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionRestController {

	private final QuestionService questionService;
	@PostMapping("")
	public Response<String> insertQuestion(@RequestBody List<QuestionVO> questionVOList) {


		questionService.insertQuestionAndQuestionItem(questionVOList);
		return Response.setSuccess("성공적으로 질문을 등록했습니다.", 200);
	}

}
