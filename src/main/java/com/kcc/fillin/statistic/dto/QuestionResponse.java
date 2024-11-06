package com.kcc.fillin.statistic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuestionResponse {
    private Long participantSeq;
    private Long questionSeq;
    private Long questionItemSeq;  // 질문에 대한 응답 내용
    private String contents;
}
