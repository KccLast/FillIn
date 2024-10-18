package com.kcc.fillin.question.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kcc.fillin.question.domain.QuestionVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CreateAutoQuestionRequest {
    @JsonIgnore
    private Long seq;
    @JsonIgnore
    private Long memberSeq;
    private String surveyName;
    private List<CreateQuestionRequest> questions;

    public List<QuestionVO> getConvertedCreateQuestionToQuestionVO(){
        //for()
        return null;
    }

}
