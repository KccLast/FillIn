package com.kcc.fillin.survey.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyVO {
	private long seq;
	private String name;
	private LocalDateTime postDate;
	private LocalDateTime endDate;
	private String url;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private int targetPeople;
	private int ccSeq;
	private long memberSeq;

}
