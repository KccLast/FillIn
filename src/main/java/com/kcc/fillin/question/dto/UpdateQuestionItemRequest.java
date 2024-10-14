package com.kcc.fillin.question.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UpdateQuestionItemRequest {
	private Long seq;
	private String content;

	private List<UpdateDropContent> dropdownOptionList = new ArrayList<>();

}
