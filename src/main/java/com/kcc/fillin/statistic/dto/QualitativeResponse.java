package com.kcc.fillin.statistic.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QualitativeResponse {
	private Long questionOrder;
	private String questionName;
	private List<QualitativeAnswerDTO> answerList;
}
