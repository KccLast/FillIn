package com.kcc.fillin.question.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.dto.UpdateQuestionRequest;
import com.kcc.fillin.question.service.QuestionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionRestController {

	private final QuestionService questionService;

	@PostMapping("")
	public Response<String> insertQuestion(@RequestBody
	List<QuestionVO> questionVOList) {

		System.out.println(questionVOList);
		questionService.insertQuestionAndQuestionItem(questionVOList);
		return Response.setSuccess("성공적으로 질문을 등록했습니다.", 200);
	}

	@PatchMapping("")
	public Response<String> updateQuestion(@RequestBody
	List<UpdateQuestionRequest> updateRequests) {
		System.out.println(updateRequests);
		boolean result = questionService.updateQuestion(updateRequests);

		if (result == false) {
			return (Response<String>)Response.setError("질문을 수정하는 중 문제가 발생했습니다.", 500);
		}
		return Response.setSuccess("성공적으로 질문을 수정했습니다.", 200);
	}

}
