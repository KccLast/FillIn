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
}
