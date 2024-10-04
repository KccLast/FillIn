package com.kcc.fillin.member.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

	private String username;
	private String password;
	private String name;
	private String phone;
	private Date birth; // 생년월일 (DATE 타입)
	private String address; // 주소 (주소 + 상세주소가 합쳐져 저장)
	private String postalCode; // 우편번호
	private int ccSeq;

}
