package com.kcc.fillin.question.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ConditionRequest {
    private Long from;
    private Long to;
    private String operation;
    private String condition;

    private Long id;
}
