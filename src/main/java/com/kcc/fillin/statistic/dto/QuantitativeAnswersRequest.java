package com.kcc.fillin.statistic.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuantitativeAnswersRequest {
	private Long surveySeq;
	private List<ClusterDto> clusterList;

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	public static class ClusterDto {
		private Long clusterId;
		private List<Long> participantList;
	}

	// @Getter
	// @Builder
	// @AllArgsConstructor
	// @NoArgsConstructor
	// @ToString
	// public static class AnswerDto {
	// 	private Long answerSeq;
	// 	private Long participantSeq;
	// }
}
