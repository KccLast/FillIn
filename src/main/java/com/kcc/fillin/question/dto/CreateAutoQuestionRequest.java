package com.kcc.fillin.question.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class CreateAutoQuestionRequest {

    private Long seq;
    private List<CreateQuestionRequest> questions;

    public List<QuestionVO> getConvertedCreateQuestionToQuestionVO(){
        List<QuestionVO> questionVOList = new ArrayList<>();
        for(int i=0; i<questions.size();i++){
           questionVOList.add( questions.get(i).getConvertedQuestionVO(this.seq,(i+1),'Y'));
        }

        return questionVOList;
    }



}
