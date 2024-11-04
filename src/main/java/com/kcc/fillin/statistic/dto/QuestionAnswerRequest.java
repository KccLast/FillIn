package com.kcc.fillin.statistic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuestionAnswerRequest {
    private Long questionSeq;
    private Long questionItemSeq;
}
