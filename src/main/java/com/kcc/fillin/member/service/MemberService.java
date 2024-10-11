

package com.kcc.fillin.member.service;

import com.kcc.fillin.member.dao.MemberMapper;
import com.kcc.fillin.member.dto.ResetPasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kcc.fillin.member.dto.MemberDTO;
// 회원가입 로직


@Service
public interface MemberService {

	MemberDTO getMemberByEmail(String username);

	void registerMember(MemberDTO memberDTO);  // 회원가입 로직

	boolean isEmailExists(String username);

	String findEmailByNameAndPhone(String name, String phone);

	// 비밀번호 찾기
	boolean validateMemberDetails(String name, String email);

	String generateTempPassword();  // 임시 비밀번호 생성

	void sendVerificationCode(String email, String code);  // 인증 코드 발송

	boolean verifyTempPassword(String email, String tempPassword);  // 임시 비밀번호 인증

	void updatePassword(ResetPasswordDTO target);  // 비밀번호 재설정
}
