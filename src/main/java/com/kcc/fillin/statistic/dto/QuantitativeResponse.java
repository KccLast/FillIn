package com.kcc.fillin.statistic.dto;

import java.util.List;

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
public class QuantitativeResponse {
	private Long questionOrder;
	private String questionName;
	private List<QuantitativeQuestionItemDTO> questionItems;
}