package com.kcc.fillin.statistic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuantityQuestionsResponse {
    private Long surveySeq;
    private String surveyName;
    private Long questionSeq;
    private String questionName;
    private int ccSeq;
}
