package com.kcc.fillin.member.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;

@Mapper
public interface MemberDao_JA {
	public MemberResponse getMemberByUsername(String username);
	public void updateMemberByUsername(MemberRequest request);
}
