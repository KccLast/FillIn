package com.kcc.fillin.question.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DeleteQuestionItemRequest {
	private Long seq;
	private Long questionSeq;
}
