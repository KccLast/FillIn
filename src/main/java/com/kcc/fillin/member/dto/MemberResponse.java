package com.kcc.fillin.member.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponse {
	// 파일 아이디
	private String email;
	private String name;
	private Date birth;
	private int status;
	private int postalCode;
	private String address;
}
