package com.kcc.fillin.survey.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonCodeResponse {
	private Long seq;
	private Long parentSeq;
	private String name;
}
