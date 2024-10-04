
package com.kcc.fillin.member.service;

import org.apache.ibatis.javassist.compiler.ast.Member;

import com.kcc.fillin.member.dto.MemberDTO;

public interface MemberService {
	int emailExists(String name);

	void registerMember(MemberDTO memberDTO);  // 회원가입 로직
}
