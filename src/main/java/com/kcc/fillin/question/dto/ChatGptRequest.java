package com.kcc.fillin.question.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatGptRequest {
	private String description;
	private List<QuestionTypeRequest> questions;
}