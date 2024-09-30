package com.kcc.fillin.statistic.dto;

import java.util.List;

import com.kcc.fillin.statistic.domain.QuestionItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuantitativeResponse {
	private Long questionOrder;
	private String questionName;
	private List<QuestionItem> questionItemList;
}
