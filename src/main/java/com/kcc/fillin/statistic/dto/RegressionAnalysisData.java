package com.kcc.fillin.statistic.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegressionAnalysisData {
    private List<Long> independentQuestions;  // 독립 질문 리스트
    private Long dependentQuestion;            // 종속 질문
    private List<QuestionResponse> questionResponses; // 질문 응답 리스트
}
