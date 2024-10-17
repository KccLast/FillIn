package com.kcc.fillin.question.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateQuestionRequest {
	private Long seq;
	private Long surveySeq;
	private Long tbFileSeq;
	private String name;
	private String description;
	private Integer order;
	private Character isEssential;
	private Long ccSeq;
}
