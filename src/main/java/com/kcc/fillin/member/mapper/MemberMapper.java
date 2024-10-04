package com.kcc.fillin.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;

@Mapper
public interface MemberMapper {
	public MemberResponse getMemberByEmail(String email);

	public void updateMemberByEmail(MemberRequest request);
}
