package com.kcc.fillin.question.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionItemInsertRequest {
    private Long seq;
    private Long questionSeq;

    private Integer orderNum;
    private String description;
    private Long ccSeq;

    public boolean isDropDown() {
        return ccSeq != null && ccSeq == 10L;
    }
}
