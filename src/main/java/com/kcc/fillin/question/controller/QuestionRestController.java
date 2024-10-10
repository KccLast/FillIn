package com.kcc.fillin.question.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionRestController {

	@PostMapping("")
	public Response<String> insertQuestion() {

		return Response.setSuccess("성공적으로 질문을 등록했습니다.", 200);
	}

}
