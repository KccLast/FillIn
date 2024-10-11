package com.kcc.fillin.member.dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityScan
public class MemberDTO {
	private String username;
	private String password;
	private String name;
	private String phone;
    private Character status;
	private LocalDate birth; // 생년월일 (DATE 타입)
	private String address; // 주소 (주소 + 상세주소가 합쳐져 저장)
	private String postalCode; // 우편번호
	private int ccSeq;
}
