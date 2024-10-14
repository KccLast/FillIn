package com.kcc.fillin.question.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionTypeRequest {
	private String questionType; // ccSeq로 변경 가능
	private int count;
}