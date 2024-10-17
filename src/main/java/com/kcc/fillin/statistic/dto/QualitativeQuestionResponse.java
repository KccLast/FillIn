package com.kcc.fillin.statistic.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QualitativeQuestionResponse {
	private Long questionId;
	private Long questionOrder;
	private String questionName;
}