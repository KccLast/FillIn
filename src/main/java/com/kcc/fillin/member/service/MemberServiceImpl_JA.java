package com.kcc.fillin.member.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kcc.fillin.member.dao.MemberDao_JA;
import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl_JA implements MemberService_JA{
	private final MemberDao_JA mapper;
	
	@Override
	public MemberResponse getMemberByUsername(String username) {
		System.out.println(username);
		return mapper.getMemberByUsername(username);
	}

	@Override
	public void updateMemberByUsername(String username, MemberRequest request) {
		request.setUsername(username);
		System.out.println("serviceImpl request: " + request);
		mapper.updateMemberByUsername(request);
	}

}
