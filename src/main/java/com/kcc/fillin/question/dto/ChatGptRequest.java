package com.kcc.fillin.question.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatGptRequest {
	private String prompt;
//	private String model;
//	private List<Message> messages;
//
//	public ChatGptRequest(String model, String prompt) {
//		this.model = model;
//		this.messages = new ArrayList<>();
//		this.messages.add(new Message("member", prompt));
//	}
}
