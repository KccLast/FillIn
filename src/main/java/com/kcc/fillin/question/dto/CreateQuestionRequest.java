package com.kcc.fillin.question.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CreateQuestionRequest {
	private Long ccSeq;
	private String name;
	private String description;
	/*@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonSetter(nulls = Nulls.AS_EMPTY)*/
	private List<String> options=new ArrayList<>();

	public QuestionVO geConvertedQuestionVO(){
		QuestionVO questionVOFrom = QuestionVO.getQuestionVOFrom(this.name, this.description, this.ccSeq);

		if(!options.isEmpty()){
			for(int i=1; i<=options.size();i++){

			}
		}
		return null;
	}

}
