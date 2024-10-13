package com.kcc.fillin.question.dto;

import com.kcc.fillin.question.domain.QuestionItemVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class UpdateQuestionItemRequest {
    private Long seq;
    private String content;

    private List<UpdateDropContent> dropList;


}
