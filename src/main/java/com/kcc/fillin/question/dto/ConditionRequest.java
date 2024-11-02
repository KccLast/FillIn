package com.kcc.fillin.question.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ConditionRequest {
    @NotNull(message = "질문번호는 필수입니다.")
    private Long from;
    @NotNull(message = "다음질문 번호는 필수입니다.")
    private Long to;
    private String operation;
    private String condition;
    @NotNull(message = "조건의 번호는 필수입니다.")
    private Long id;


}
