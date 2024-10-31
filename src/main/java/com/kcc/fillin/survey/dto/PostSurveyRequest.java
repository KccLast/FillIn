package com.kcc.fillin.survey.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PostSurveyRequest {
	private Long surveyId;
	private LocalDate startDate;
	private LocalDate endDate;
	private Integer sampleSize;
	private Integer reliability;
	private Integer allowableError;
	private String url;
}
