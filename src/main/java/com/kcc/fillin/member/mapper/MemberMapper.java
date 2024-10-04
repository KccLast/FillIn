
package com.kcc.fillin.member.mapper;

import org.apache.ibatis.annotations.Mapper;


import com.kcc.fillin.member.dto.MemberDTO;

@Mapper
public interface MemberMapper {
	int emailExists(String name);

	void insertMember(MemberDTO memberDTO);  // 회원 정보 저장
	
	 // 회원 정보를 등록하는 메서드 추가
    void registerMember(MemberDTO memberDTO);  // 반환형은 필요하지 않으므로 void로 설정
}
