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
import com.kcc.fillin.question.dto.ChatGptResponse;
import com.kcc.fillin.question.dto.QuestionTypeRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/question/")
@RequiredArgsConstructor
public class QuestionRestController_JA {
	private final OpenAiChatModel openAiChatModel;
	private final ChatModel chatModel;

//	@PostMapping("/make-auto-question")
//	public ChatGptResponse makeChatGptQuestion(@RequestBody ChatGptRequest chatGptRequest) {
//		String response = openAiChatModel.call(chatGptRequest.getPrompt());
//		
//		return new ChatGptResponse(response);
//	}

	@PostMapping("/make-auto-question")
	public Response makeAutoQuestion(@RequestBody List<ChatGptRequest> requestList) {
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

		for (ChatGptRequest request : requestList) {
			List<QuestionTypeRequest> questions = request.getQuestions();
			for (QuestionTypeRequest questionTypeRequest : questions) {
				String questionType = questionTypeRequest.getQuestionType();
				int count = questionTypeRequest.getCount();

				for (int i = 1; i <= count; i++) {
					if (!firstQuestion) {
						gptInputBuilder.append(", ");
					}
					firstQuestion = false;

					String variableName = questionType.equals("객관식") ? "multiple_choice"
							: questionType.equals("체크박스") ? "checkbox"
									: questionType.equals("단답형") ? "short_answer" : "descriptive_form";

					gptInputBuilder.append("{").append("\"type\": \"").append(variableName).append("\", ")
							.append("\"question\": \"질문명 ").append(i).append("\", ").append("\"description\": \"질문 설명 ")
							.append(i).append("\"");

					if (questionType.equals("객관식") || questionType.equals("체크박스")) {
						// 예시 옵션 추가
						gptInputBuilder.append(", \"options\": [\"옵션 1\", \"옵션 2\", \"옵션 3\"]");
					}

					gptInputBuilder.append("}");
				}
			}
		}

		gptInputBuilder.append("] }");

		// 이스케이프 처리 없이 그대로 사용
		String jsonInput = gptInputBuilder.toString();

		String command = "사용자가 입력한 내용: " + requestList.get(0).getDescription() + ", 다음과 같은 질문 유형에 맞춰 질문지를 추천해줘: \n"
				+ gptInputBuilder.toString().replace("{", "\\{").replace("}", "\\}")
				+ "각 질문 유형에 대해 적절한 질문명과 질문에 대한 설명을 추가하고, 객관식/체크박스의 경우 선택할 수 있는 옵션도 포함해줘. 아무 설명 없이 json으로 출력해줘.";
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
	
	@GetMapping("/get-added-questions")
	public Response getAddedQuestions() {
		
		
		return Response.setSuccess(null, 200);
	}

}
