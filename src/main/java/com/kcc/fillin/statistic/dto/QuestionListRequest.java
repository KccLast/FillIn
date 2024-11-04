package com.kcc.fillin.statistic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionListRequest {
    private Long surveySeq;
    private Long dependentQuestion;
    private List<Long> seqList;
}
