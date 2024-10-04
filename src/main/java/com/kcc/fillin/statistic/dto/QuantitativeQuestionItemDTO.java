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
public class QuantitativeQuestionItemDTO {
	private String itemContent;
	private Double itemRatio;
}
