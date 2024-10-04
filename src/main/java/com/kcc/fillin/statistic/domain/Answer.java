package com.kcc.fillin.statistic.domain;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class Answer {
	private Long id;
	private Long questionId;
	private Long participantId;
	private String contents;
	private LocalDateTime answerDate;
}
