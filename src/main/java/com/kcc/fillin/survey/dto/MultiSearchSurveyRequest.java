package com.kcc.fillin.survey.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MultiSearchSurveyRequest {
	private int ccSeq;
	private LocalDate startCreatedAt;
	private LocalDate endCreatedAt;
	private LocalDate startUpdatedAt;
	private LocalDate endUpdatedAt;
	private String name;
	private int minAnswerCount;
	private int maxAnswerCount;

	// 페이징 처리
	private int page; // 요청하는 페이지 번호
	private int pageSize; // 페이지당 항목 수

}
