package com.kcc.fillin.statistic.domain;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class Answer {
	private Long seq;
	private Long questionSeq;
	private Long participantSeq;
	private String contents;
	private LocalDateTime answerDate;
}
