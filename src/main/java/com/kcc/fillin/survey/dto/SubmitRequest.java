package com.kcc.fillin.survey.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
@ToString
@Getter
@Setter
public class SubmitRequest {
    private Long questionSeq;
    private Long ccSeq;
    private Long participantSeq;
    private List<String> contents; // 체크된 값들의 배열
    private LocalDateTime answerDate;
}
