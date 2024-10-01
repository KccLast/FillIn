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
public class StatisticSurveyResponse {
	private int targetCount;
	private int participantsCount;
	private List<HitsDTO> hitsResponseList;
	private List<QuantitativeResponse> quantitativeResponseList;
	private List<QualitativeResponse> qualitativeResponseList;
}
