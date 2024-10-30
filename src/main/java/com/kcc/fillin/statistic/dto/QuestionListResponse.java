package com.kcc.fillin.statistic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionListResponse {
    private Long surveySeq;
    private Long questionSeq;
    private String name;
    private Long answerSeq;
    private String contents;
}
