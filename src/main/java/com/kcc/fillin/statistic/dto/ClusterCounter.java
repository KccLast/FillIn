package com.kcc.fillin.statistic.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ClusterCounter {
	private Integer questionOrder;
	private Integer answerOrder;
	private Long clusterId;
	private Integer clusterCount;
}
