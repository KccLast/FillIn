package com.kcc.fillin.survey.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MultiSearchSurveyResponse {
	private Long seq;
	private int ccSeq;
	private String name;
	private LocalDate createdAt;
	private LocalDate updatedAt;
	private LocalDate postDate;
	private LocalDate endDate;
	private int answerCount;
}
