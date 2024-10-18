package com.kcc.fillin.question.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.dto.DeleteQuestionItemRequest;
import com.kcc.fillin.question.dto.DeleteQuestionRequest;
import com.kcc.fillin.question.dto.UpdateQuestionItemRequest;
import com.kcc.fillin.question.dto.UpdateQuestionRequest;
import com.kcc.fillin.question.service.QuestionService;
import com.kcc.fillin.survey.dto.SubmitRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionRestController {

	private final QuestionService questionService;

	@PostMapping("")
	public Response<String> insertQuestion(@RequestBody
	List<QuestionVO> questionVOList) {

		questionService.insertQuestionAndQuestionItem(questionVOList);
		return Response.setSuccess("성공적으로 질문을 등록했습니다.", 200);
	}

	@PatchMapping("")
	public Response<String> updateQuestion(@RequestBody
	List<UpdateQuestionRequest> updateRequests) {

		boolean result = questionService.updateQuestion(updateRequests);

		if (result == false) {
			return (Response<String>)Response.setError("질문을 수정하는 중 문제가 발생했습니다.", 500);
		}
		return Response.setSuccess("성공적으로 질문을 수정했습니다.", 200);
	}

	@DeleteMapping("")
	public Response<?> deleteQuestion(@RequestBody
	List<DeleteQuestionRequest> deleteList) {
		System.out.println("deleteList = " + deleteList);
		boolean deleteResult = questionService.deleteQuestion(deleteList);

		return Response.setSuccess("성공적으로 질문 항목을 제거했습니다.", 200);
	}

	@PostMapping("/item")
	public Response<?> insertQuestionItem(@RequestBody
	List<QuestionItemVO> insertItems) {

		boolean insertResult = questionService.insertQuestionItems(insertItems);
		if (insertResult == false) {
			return Response.setFail(insertItems, 500, "질문 항목 등록에 실패했습니다");
		}
		return Response.setSuccess("성공적으로 질문 항목을 등록했습니다.", 200);
	}

	@PatchMapping("/item")
	public Response<?> updateQuestionItem(@RequestBody
	List<UpdateQuestionItemRequest> list) {
		System.out.println(list);
		boolean updateResult = questionService.updateQuestionItems(list);

		return Response.setSuccess("성공적으로 질문 항목을 수정했습니다.", 200);
	}

	@DeleteMapping("/item")
	public Response<?> deleteQuestionItem(@RequestBody
	List<DeleteQuestionItemRequest> deleteList) {
		boolean deleteResult = questionService.deleteQuestionItem(deleteList);

		return Response.setSuccess("성공적으로 질문 항목을 제거했습니다.", 200);
	}

	@PostMapping("/submit")
	public Response<?> submitQuestion(@RequestBody
	List<SubmitRequest> requests) {
		System.out.println("requests = " + requests);
		questionService.insertAnswer(requests);
		return Response.setSuccess("응답 등록에 성고앴습니다", 200);
	}

	private Response<String> getStringResponse(boolean result, String successMessage, String failMessage) {
		if (result) {
			return Response.setSuccess(successMessage, 200);
		}
		return Response.setFail(failMessage, 500);
	}

}
