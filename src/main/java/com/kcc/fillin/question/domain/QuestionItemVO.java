package com.kcc.fillin.question.domain;

import com.kcc.fillin.global.Common.CommonVO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class QuestionItemVO extends CommonVO {
	private Long seq;
	private Long questionSeq;
	private String content;
	private Integer orderNum;

	public QuestionItemVO(Long questionSeq, String dropContent, Integer orderNum) {
		this.questionSeq = questionSeq;
		this.content = dropContent;
		this.orderNum = orderNum;
	}

	public static QuestionItemVO getInstanceFromContentOrderNum(String content, int orderNum){
		QuestionItemVO questionItemVO = new QuestionItemVO();
		questionItemVO.content = content;
		questionItemVO.orderNum = orderNum;
		return questionItemVO;
	}
}
