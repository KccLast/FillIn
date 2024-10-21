package com.kcc.fillin.question.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
	@JsonIgnore
	private Long surveySeq;
	private Long ccSeq;
	private String name;
	private String description;
	/*@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonSetter(nulls = Nulls.AS_EMPTY)*/
	private List<String> options=new ArrayList<>();

	public QuestionVO getConvertedQuestionVO(Long surveySeq, int orderNum, char isEssential){
		QuestionVO questionVOFrom = QuestionVO.builder().surveySeq(surveySeq)
				.name(this.name)
				.description(this.description)
				.ccSeq(this.ccSeq)
				.order(orderNum)
				.isEssential(isEssential).
				build();

		questionVOFrom.setQuestionItems(new ArrayList<>());
		if(!options.isEmpty()){
			for(int i=0; i<options.size();i++){
				questionVOFrom.getQuestionItems().add(QuestionItemVO.getInstanceFromContentOrderNum(options.get(i),(i+1)));
			}
		}
		return questionVOFrom;
	}

}
