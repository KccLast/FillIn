package com.kcc.fillin.statistic.domain;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class QuestionItem {
	private Long id;
	private Long questionId;
	private String content;
	private Integer orderNum;
	private boolean isActive;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
