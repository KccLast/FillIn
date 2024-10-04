package com.kcc.fillin.member.dao;
import org.apache.ibatis.annotations.Mapper;
import com.kcc.fillin.member.dto.MemberDTO;


import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;

@Mapper
public interface MemberMapper {
	public MemberResponse getMemberByEmail(String email);

	public void updateMemberByEmail(MemberRequest request);

	int emailExists(String name);

	void insertMember(MemberDTO memberDTO);  // 회원 정보 저장

	// 회원 정보를 등록하는 메서드 추가
	void registerMember(MemberDTO memberDTO);  // 반환형은 필요하지 않으므로 void로 설정
}
