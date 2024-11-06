package com.kcc.fillin.statistic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuestionListRequest {
    private Long surveySeq;
    private Long dependentQuestion;
    private List<Long> independentQuestions;
}
