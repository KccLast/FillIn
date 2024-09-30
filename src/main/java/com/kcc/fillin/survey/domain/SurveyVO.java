package com.kcc.fillin.survey.domain;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyVO {
	private long id;
	private String name;
	private Timestamp postDate;
	private Timestamp endDate;
	private String url;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private int targetPeople;
	private int ccId;
	private long memberId;
}
