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
public class QuestionListResponse {
    private Long surveySeq;
    private Long participantSeq;
    private Long independentQuestion; // 독립 질문
    private Long dependentQuestion; // 종속 질문
    private Long independentQuestionItemSeq; // 독립 질문에 대한 응답 항목 번호
    private Long dependentQuestionItemSeq; // 종속 질문에 대한 응답 항목 번호
    private String content;
//
//    private List<IndependentQuestion> independentQuestions;
//    private DependentQuestion dependentQuestion;
}
