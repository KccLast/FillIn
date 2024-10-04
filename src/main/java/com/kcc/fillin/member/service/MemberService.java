package com.kcc.fillin.member.service;

import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;

public interface MemberService {
	public MemberResponse getMemberByEmail(String email);

	public void updateMemberByEmail(MemberRequest request);
}
