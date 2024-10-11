package com.kcc.fillin.survey.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MultiSearchSurveyResponse {
<<<<<<< HEAD
=======
	private Long seq;
>>>>>>> 376a11bcecc2674be83d01e8cfb1f49d961bd386
	private int ccSeq;
	private String name;
	private LocalDate createdAt;
	private LocalDate updatedAt;
	private LocalDate postDate;
	private LocalDate endDate;
	private int answerCount;
}
