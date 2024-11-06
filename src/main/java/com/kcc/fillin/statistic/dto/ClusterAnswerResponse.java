package com.kcc.fillin.statistic.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClusterAnswerResponse {
	private Long questionSeq;
	private int questionOrderNum;
	private String questionName;
	private Long ccSeq;
	private String ccName;
	private List<ClusterAnswerDto> answerList;
}
