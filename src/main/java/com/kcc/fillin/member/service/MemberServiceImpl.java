package com.kcc.fillin.member.service;

import org.springframework.stereotype.Service;

import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;
import com.kcc.fillin.member.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberMapper mapper;

	@Override
	public MemberResponse getMemberByEmail(String email) {
		return mapper.getMemberByEmail(email);
	}

	@Override
	public void updateMemberByEmail(MemberRequest request) {
		mapper.updateMemberByEmail(request);
	}
}
