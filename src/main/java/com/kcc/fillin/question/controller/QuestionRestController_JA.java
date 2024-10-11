package com.kcc.fillin.question.controller;

import java.util.Map;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.question.dto.ChatGptRequest;
import com.kcc.fillin.question.dto.ChatGptResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/question/")
@RequiredArgsConstructor
public class QuestionRestController_JA {
	private final OpenAiChatModel openAiChatModel;

	@PostMapping("/make-auto-question")
	public ChatGptResponse makeChatGptQuestion(@RequestBody ChatGptRequest chatGptRequest) {
		String response = openAiChatModel.call(chatGptRequest.getPrompt());
		
		return new ChatGptResponse(response);
	}
}
