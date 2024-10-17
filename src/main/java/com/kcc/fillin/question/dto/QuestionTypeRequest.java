package com.kcc.fillin.question.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionTypeRequest {
	private int ccSeq;
	private int count;
}