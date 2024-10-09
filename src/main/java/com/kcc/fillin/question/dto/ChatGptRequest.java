package com.kcc.fillin.question.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ChatGptRequest {
	private String model;
	private List<Message> messages;
	
	public ChatGptRequest(String model, String prompt) {
		this.model = model;
		this.messages = new ArrayList<>();
		this.messages.add(new Message("member", prompt));
	}
}
