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
public class ClusterAnswerDto {
	// private Long answerSeq;
	private Integer answerOrderNum;
	private String answerName;
	private List<Long> clusterList;
	// private List<ClusterDto> clusterList;
}
