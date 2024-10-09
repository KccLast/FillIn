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
	private String username;
	private String name;
	private Date birth;
	private int ccSeq;
	private String phone;
	private String postalCode;
	private String address;
}
