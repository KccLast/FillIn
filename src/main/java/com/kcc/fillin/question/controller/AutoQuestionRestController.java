package com.kcc.fillin.question.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.kcc.fillin.question.dto.ChatGptRequest;
import com.kcc.fillin.question.dto.ChatGptResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AutoQuestionRestController {
//	@Valid("${openai.model}")
	private String model;

//    @Value("${openai.api.url}")
	private String apiURL;
	private RestTemplate template;

	@GetMapping("/chat")
	public String chat(@RequestParam(name = "prompt") String prompt) {
		ChatGptRequest chatGptRequest = new ChatGptRequest(model, prompt);
		// RestTemplate의 postForObject 메소드를 사용하여, apiURL 주소로 chatGptRequest 객체를 JSON 형태로 전송하고, ChatGptResponse 클래스의 인스턴스로 응답을 받는다.
		// apiURL은 OpenAI의 ChatGPT API 엔드포인트 주소를 나타낸다.
		// 이 메소드는 요청을 보내고, 응답을 받아 ChatGptResponse 타입의 객체로 변환한다.
		ChatGptResponse chatGptResponse =  template.postForObject(apiURL, chatGptRequest, ChatGptResponse.class);
		return chatGptResponse.getChoices().get(0).getMessage().getContent();
	}
}
