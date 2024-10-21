package com.kcc.fillin.question.domain;

import java.util.List;

import com.kcc.fillin.global.Common.CommonVO;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

	public static QuestionVO getQuestionVOFrom(Long surveySeq,String name, String description, Long ccSeq){
		QuestionVO converted = new QuestionVO();
		converted.surveySeq = surveySeq;
		converted.name = name;
		converted.description = description;
		converted.ccSeq=ccSeq;

		return converted;
	}
}
