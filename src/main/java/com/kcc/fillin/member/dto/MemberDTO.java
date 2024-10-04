package com.kcc.fillin.member.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

	private String username;
    private String password;
    private String name;
    private String phone;
    private java.sql.Date birth;  // 생년월일 (DATE 타입)
    private String address;    // 주소 (주소 + 상세주소가 합쳐져 저장)
    private int postalCode; // 우편번호
    private int ccId;  
    // 성별 저장 (1: 남성, 2: 여성)
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = this.birth;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getCcId() {
		return ccId;
	}
	public void setCcId(int ccId) {
		this.ccId = ccId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	

   
}
