package com.kcc.fillin.question.dto;

import com.kcc.fillin.question.domain.QuestionItemVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateDropContent {
    private Long questionSeq;
    private String dropContent ;

    private Integer orderNum;
    public QuestionItemVO transferQuestItemVO() {
        return new QuestionItemVO(this.questionSeq, this.dropContent, this.orderNum);
    }
}
