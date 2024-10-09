package com.kcc.fillin.member.service;

import java.util.Map;

import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;

public interface MemberService_JA {
	public MemberResponse getMemberByUsername(String username);
	public void updateMemberByUsername(String username, MemberRequest request);
}
