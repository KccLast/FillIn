package com.kcc.fillin.survey.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MultiSearchSurveyResponse {
	private int ccSeq;
	private String name;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private Timestamp postDate;
	private Timestamp endDate;
	private int answerCount;

	/*public String getFormattedLocaldate() {
		return createdAt.toLocalDateTime().format(null);
	}*/
}
