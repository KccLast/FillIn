package com.kcc.fillin.member.domain;

import java.sql.Timestamp;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberVO {
	private long id;
	private long fileId;
	private String email;
	private String password;
	private String name;
	private Date birth;
	private String address;
	private Timestamp createdAt;
	private Timestamp updateAt;
	private int status;
	private int postalCode;
	private String phone;
}
