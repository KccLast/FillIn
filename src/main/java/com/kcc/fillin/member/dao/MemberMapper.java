package com.kcc.fillin.member.dao;
import com.kcc.fillin.member.dto.ResetPasswordDTO;
import org.apache.ibatis.annotations.Mapper;
import com.kcc.fillin.member.dto.MemberDTO;


import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {


	// 회원 이메일로 사용자 정보 가져오기
	MemberDTO getMemberByEmail(String username);

	// 이메일을 통해 비밀번호 업데이트
	void updatePassword(ResetPasswordDTO target);

	// 이메일 중복 확인
	int emailExists(String username);

	// 회원 정보 저장
	void insertMember(MemberDTO memberDTO);

	// 회원 등록 (중복된 메소드 제거)
	void registerMember(MemberDTO memberDTO);

	// 이름과 전화번호로 이메일 찾기
	String findEmailByNameAndPhone(@Param("name") String name, @Param("phone") String phone);

	// 이름, 전화번호, 이메일로 사용자가 존재하는지 확인
	int existsByNamePhoneAndEmail(@Param("name") String name, @Param("email") String email);
}

