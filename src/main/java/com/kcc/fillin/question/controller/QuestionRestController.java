package com.kcc.fillin.question.controller;

import java.util.List;

import com.kcc.fillin.question.dto.*;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.service.SurveyService;
import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.service.QuestionService;
import com.kcc.fillin.survey.dto.SubmitRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionRestController {

	private final QuestionService questionService;
	private final SurveyService surveyService;
	@PostMapping("")
	public Response<QuestionVO> insertQuestion(@RequestBody
	List<QuestionVO> questionVOList) {
		System.out.println("questionVOList 1 = " + questionVOList);
		questionService.insertQuestionAndQuestionItem(questionVOList);
		System.out.println("questionVOList 2 = " + questionVOList.get(0));
		return Response.<QuestionVO>setSuccess(questionVOList.get(0),200,"질문을 성공적으로 등록했습니다.");
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
		System.out.println("deleteList = " + deleteList);
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

	@PostMapping("/condition")
	public Response<?> saveCondition(@RequestBody  ConditionRequest conditionRequest){
		System.out.println("conditionRequest = " + conditionRequest);
		boolean result = questionService.insertCondition(conditionRequest);
		if(result) {
			return Response.setSuccess(conditionRequest, 200);
		}
		else{
			return Response.setFail("조건 등록에 실패했습니다.",500);
		}
	}

	@DeleteMapping("/condition")
	public Response<?> deleteCondition(@RequestBody @Valid ConditionRequest conditionRequest, BindingResult br){
		System.out.println("conditionRequest = " + conditionRequest);
		if(br.hasErrors()){
			return Response.setFail("조건 삭제에 실패했습니다. 입력값을 확인해주세요",400);
		}
		boolean result = questionService.deleteCondition(conditionRequest);
		if(result) {
			return Response.setSuccess(" 조건을 성공적으로 삭제했습니다.", 200);
		}
//		else{
//			return Response.setFail("조건 등록에 실패했습니다.",500);
//		}
		return Response.setError("알 수 없는 오류로 조건 삭제에 실패했습니다. 잠시후 다시 시도해주세요",500);
	}

	@PatchMapping("/order")
	public Response<?> patchNewSurveyQuestionOrder(@RequestBody List<UpdateQuestionRequest> request){
		boolean result = questionService.updateQuestion(request);
		SurveyVO findSurvey=null;
		if(result){
			findSurvey = surveyService.findSurveyBySurveySeq(request.get(0).getSurveySeq());
		}
		if(findSurvey != null)
		return Response.setSuccess(findSurvey,200,"질문 순서를 성공적으로 변경했습니다.");

		return Response.setError("질문순서 변경에 실패",500,"/api/question/order");
	}

	@PatchMapping("/auto")
	public Response<?> updateAutoQuestionAutoSave(@ModelAttribute QuestionAutoUpdateRequest questionAutoUpdateRequest){
		questionService.updateQuestionAuto(questionAutoUpdateRequest);
		return Response.setSuccess("성공적으로 질문 수정",200);
	}
	@PatchMapping("/item/auto")
	public Response<?> updateAutoQuestionItemAutoSave(@ModelAttribute QuestionAutoUpdateRequest questionAutoUpdateRequest){
		questionService.updateQuestionItemAuto(questionAutoUpdateRequest);
		return  null;
	}
	@PostMapping("/item/auto")
	public Response<?> insertAutoQuestionItemAutoSave(@RequestBody List<QuestionItemInsertRequest> questionAutoUpdateRequest){
		System.out.println("questionAutoUpdateRequest = " + questionAutoUpdateRequest);
		if(questionAutoUpdateRequest.size() < 1) return Response.setFail("업데이트할 데이터가 전달오류",400);
		questionService.InsertQuestionItemAuto(questionAutoUpdateRequest);
		return  Response.setSuccess(questionAutoUpdateRequest,200);
	}

	@DeleteMapping("/item/auto")
	public Response<?> deleteQuestionItemAuto(@ModelAttribute QuestionAutoUpdateRequest questionAutoUpdateRequest){
		DeleteQuestionItemRequest deleteQuestionRequest = new DeleteQuestionItemRequest();
		deleteQuestionRequest.setSeq(questionAutoUpdateRequest.getQuestionItemSeq());

		questionService.deleteQuestionItem(List.of(deleteQuestionRequest));
		return  Response.setSuccess(questionAutoUpdateRequest.getQuestionItemSeq(),200);
	}
	@DeleteMapping("/auto")
	public Response<?> deleteAutoQuestionAutoSave(@ModelAttribute	DeleteQuestionRequest questionAutoUpdateRequest){
		System.out.println("questionAutoUpdateRequest = " + questionAutoUpdateRequest);
		questionService.deleteQuestion(List.of( questionAutoUpdateRequest));
		return  Response.setSuccess(questionAutoUpdateRequest,200);
	}
}
