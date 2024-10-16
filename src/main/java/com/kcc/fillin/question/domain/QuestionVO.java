package com.kcc.fillin.question.domain;

import java.util.List;

import com.kcc.fillin.global.Common.CommonVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionVO extends CommonVO {
	private Long seq;
	private Long surveySeq;
	private Long tbFileSeq;
	private String name;
	private String description;
	private Integer order;
	private Character isEssential;
	private Long ccSeq;

	private List<QuestionItemVO> questionItems;
	private List<ConditionVO> conditions;

	public boolean isQuestionItemExist() {
		if (this.questionItems != null && questionItems.size() > 0) {
			return true;
		}
		return false;
	}

	public boolean compareQuestionItemCnt(int questionItemInsertResult) {
		return questionItems.size() == questionItemInsertResult;
	}

	public static QuestionVO getQuestionVOFrom(String name, String description, Long seq){
		QuestionVO converted = new QuestionVO();
		converted.name = name;
		converted.description = description;
		converted.seq=seq;
		return converted;
	}
}
