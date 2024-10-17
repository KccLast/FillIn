package com.kcc.fillin.question.controller;

import java.util.List;

import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.question.dto.ChatGptRequest;
import com.kcc.fillin.question.dto.CreateQuestionRequest;
import com.kcc.fillin.question.dto.QuestionCommonCodeResonse;
import com.kcc.fillin.question.dto.QuestionTypeRequest;
import com.kcc.fillin.question.service.QuestionService_JA;
import com.kcc.fillin.util.jina.QuestionType;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/question/")
@RequiredArgsConstructor
public class QuestionRestController_JA {
	private final OpenAiChatModel openAiChatModel;
	private final QuestionService_JA questionService;
	private final ChatModel chatModel;

//	@PostMapping("/make-auto-question")
//	public ChatGptResponse makeChatGptQuestion(@RequestBody ChatGptRequest chatGptRequest) {
//		String response = openAiChatModel.call(chatGptRequest.getPrompt());
//		
//		return new ChatGptResponse(response);
//	}

	@GetMapping("/get-common-code")
	public List<QuestionCommonCodeResonse> getCommonCode() {
		return questionService.getCommonCode();
	}

	@PostMapping("/make-auto-question")
	public Response makeAutoQuestion(@RequestBody List<ChatGptRequest> requestList) {
		System.out.println("requestList: " + requestList);
		if (requestList == null || requestList.isEmpty()) {
			return Response.setError("요청 데이터가 없습니다.", 400);
		}

		for (ChatGptRequest request : requestList) {
			if (request.getQuestions() == null) {
				return Response.setError("질문 유형이 없습니다.", 400);
			}
		}

		StringBuilder gptInputBuilder = new StringBuilder();
		gptInputBuilder.append("{ \"questions\": [ ");

		boolean firstQuestion = true;

		// 질문 유형 및 개수 처리
		List<QuestionTypeRequest> questionRequests = requestList.get(0).getQuestions();
		int totalCount = 0;

		for (QuestionTypeRequest questionTypeRequest : questionRequests) {
			totalCount += questionTypeRequest.getCount();
		}

		for (QuestionTypeRequest questionTypeRequest : questionRequests) {
			int ccSeq = questionTypeRequest.getCcSeq();
			int count = questionTypeRequest.getCount();

			System.out.println("ccSeq: " + ccSeq + "count: " + count);

			for (int i = 1; i <= count; i++) {
				if (!firstQuestion) {
					gptInputBuilder.append(", ");
				}
				firstQuestion = false;

				QuestionType questionType = QuestionType.fromSeq(ccSeq);

				gptInputBuilder.append("{")
                	.append("\"ccSeq\": \"").append(questionType.getCcSeq()).append("\", ")
                	.append("\"name\": \"질문명 ").append(i).append("\", ")
                	.append("\"description\": \"").append(questionType.getDisplayName()).append("질문 설명 ").append(i).append("\"");

				if (questionType == QuestionType.CCSEQ_7 || questionType == QuestionType.CCSEQ_8) {
					// 예시 옵션 추가
					gptInputBuilder.append(", \"options\": [\"옵션 1\", \"옵션 2\", \"옵션 3\"]");
				}

				gptInputBuilder.append("}");
			}
		}

		gptInputBuilder.append("] }");
		
		StringBuilder questionTypesBuilder = new StringBuilder();
		for (QuestionType type : QuestionType.values()) {
		    questionTypesBuilder.append(type.getDisplayName()).append("(").append(type.getCcSeq()).append("), ");
		}

		// 이스케이프 처리 없이 그대로 사용
		String jsonInput = gptInputBuilder.toString();

		String command = "사용자가 입력한 내용: " + requestList.get(0).getDescription() + ", 다음과 같은 질문 유형에 맞춰 질문지를 추천해줘: \n"
		        + gptInputBuilder.toString().replace("{", "\\{").replace("}", "\\}") 
		        + "각 질문 유형에 대해 적절한 질문명(name)과 질문에 대한 설명(description)을 추가하고, "
		        + questionTypesBuilder.toString() + " 질문의 경우 해당 질문 유형에 맞는 선택할 수 있는 옵션(options)도 포함해줘. "
		        + "전체 총 " + totalCount + "개의 질문을 생성하되, 각 질문의 ccSeq는 고정하고, 나머지 항목은 자유롭게 구성해줘. "
		        + "아무 설명 없이 json 형식으로 출력해줘.";

		System.out.println("질문 유형 / 개수 : " + gptInputBuilder.toString());
		System.out.println("command: " + command);

		// GPT 호출 준비
		PromptTemplate template = new PromptTemplate(command);
		template.add("userInput", requestList.get(0).getDescription());
		template.add("questionTypes", jsonInput);

		// GPT 모델 호출
		String message = template.render();
		Message userMessage = new UserMessage(message);
		String response = chatModel.call(userMessage);
		System.out.println("response = " + response);

		// 결과 반환
		return Response.setSuccess(response, 200);
	}

	// 테스트용
	@PostMapping("/create-survey")
	public Response createSurvey(@RequestBody List<CreateQuestionRequest> selectedQuestions) {
		System.out.println("Received questions: " + selectedQuestions);

		return Response.setSuccess(selectedQuestions, 200);
	}

}
