package com.kcc.fillin.survey.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ParticipantVO {
	private Long seq;
	private String email;
	private String phone;
	private String address;
	private Character gender;
	private Integer age;
}
