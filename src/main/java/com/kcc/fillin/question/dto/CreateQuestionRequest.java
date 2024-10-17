package com.kcc.fillin.question.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateQuestionRequest {
	private int ccSeq;
	private String name;
	private String description;
	private List<String> options;
}
