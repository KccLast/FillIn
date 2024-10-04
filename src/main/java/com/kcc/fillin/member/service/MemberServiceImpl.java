
package com.kcc.fillin.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kcc.fillin.member.dto.MemberDTO;
import com.kcc.fillin.member.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberMapper memberMapper;

    @Override
    public int emailExists(String name) {
        return memberMapper.emailExists(name);
    }

    @Override
    public void registerMember(MemberDTO memberDTO) {
        memberMapper.registerMember(memberDTO);  // return 문을 제거
    }
}
