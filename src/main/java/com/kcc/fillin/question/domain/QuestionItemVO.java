package com.kcc.fillin.question.domain;

import com.kcc.fillin.global.Common.CommonVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionItemVO extends CommonVO {
	private Long seq;
	private Long questionSeq;
	private String content;
	private Integer orderNum;

}
