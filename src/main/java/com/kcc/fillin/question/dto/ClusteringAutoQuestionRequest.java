package com.kcc.fillin.question.dto;

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
public class ClusteringAutoQuestionRequest {
	private String question1;
	private String question2;
	private List<ClusterKeyword> clusterKeywords;
	private List<ClusterResponse> clusterResponses;

	public String generateSummary() {
		StringBuilder summary = new StringBuilder();

		// 첫 번째 질문에 대한 군집 키워드 설명
		summary.append("k 평균 군집화를 진행했는데 ");
		summary.append(question1).append("이라는 질문에 ");

		for (int i = 0; i < clusterKeywords.size(); i++) {
			ClusterKeyword clusterKeyword = clusterKeywords.get(i);
			summary.append(clusterKeyword.getClusterNumber()).append("은 대체로 ");
			List<String> keywords = clusterKeyword.getKeywords();
			for (int j = 0; j < keywords.size(); j++) {
				if (j > 0) summary.append(", ");
				summary.append(keywords.get(j));
			}
			if (i < clusterKeywords.size() - 1) {
				summary.append(", ");
			} else {
				summary.append("는 응답이 지배적이었어 ");
			}
		}

		// 두 번째 질문에 대한 군집 응답 설명
		summary.append("그리고 다음 ").append(question2).append("이라는 질문에 ");
		for (int i = 0; i < clusterResponses.size(); i++) {
			ClusterResponse clusterResponse = clusterResponses.get(i);
			summary.append(clusterResponse.getClusterNumber()).append("은 대체로 ");
			summary.append(clusterResponse.getResponse());
			if (i < clusterResponses.size() - 1) {
				summary.append(", ");
			} else {
				summary.append("다고 응답했는데 ");
			}
		}

		// 전체 인사이트 요약
		summary.append("이 데이터를 통해 얻을 수 있는 전체 인사이트를 요약해서 3문단 정도로 나눠서 말해줘. 기타 설명없이 html p 태그 안에 텍스트 추가할 수 있도록 텍스트만 응답해줘. 강조 처리는 <strong>으로 알아서해줘. html, p 같은 태그 절대 넣지말아줘.");

		return summary.toString();
	}
}
