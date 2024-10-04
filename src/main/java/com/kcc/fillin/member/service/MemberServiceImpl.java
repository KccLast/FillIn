
package com.kcc.fillin.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kcc.fillin.member.dao.MemberMapper;
import com.kcc.fillin.member.dto.MemberDTO;

import org.springframework.stereotype.Service;

import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;

	@Override
	public MemberResponse getMemberByEmail(String email) {
		return memberMapper.getMemberByEmail(email);
	}

	@Override
	public void updateMemberByEmail(MemberRequest request) {
		memberMapper.updateMemberByEmail(request);
	}

    @Override
    public int emailExists(String name) {
        return memberMapper.emailExists(name);
    }

    @Override
    public void registerMember(MemberDTO memberDTO) {
        memberMapper.registerMember(memberDTO); }

}
