
package com.kcc.fillin.member.service;


import com.kcc.fillin.member.dao.MemberMapper;
import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.ResetPasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kcc.fillin.member.dto.MemberDTO;


import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    // 임시 비밀번호 저장소 (메모리 기반이 아닌 DB 기반 사용 권장)
    private Map<String, String> tempPasswordStore = new HashMap<>();

    @Override
    public void registerMember(MemberDTO memberDTO) {
        // 비밀번호 암호화
        memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
        // 회원 정보 저장
        memberMapper.insertMember(memberDTO);
    }

    @Override
    public MemberDTO getMemberByEmail(String username) {
        return memberMapper.getMemberByEmail(username);
    }

    @Override
    public boolean isEmailExists(String username) {
        return memberMapper.emailExists(username) > 0;
    }

    @Override
    public String findEmailByNameAndPhone(String name, String phone) {
        return memberMapper.findEmailByNameAndPhone(name, phone);
    }

    // 회원 정보 검증
    @Override
    public boolean validateMemberDetails(String name,String email) {
        return memberMapper.existsByNamePhoneAndEmail(name, email) > 0;
    }

    // 임시 비밀번호 생성
    @Override
    public String generateTempPassword() {
        // UUID를 활용한 8자리 임시 비밀번호 생성
        return UUID.randomUUID().toString().replace("-", "").substring(0, 8);
    }

    // 이메일로 인증 코드(임시 비밀번호) 발송
    @Override
    public void sendVerificationCode(String email, String code) {
        emailService.sendEmail(email, "비밀번호 재설정 인증", "귀하의 임시 비밀번호는: " + code + " 입니다.");
        tempPasswordStore.put(email, code);  // 메모리에 임시 비밀번호 저장 (DB 사용 권장)
    }

    // 임시 비밀번호 검증
    @Override
    public boolean verifyTempPassword(String email, String tempPassword) {
        return tempPasswordStore.containsKey(email) && tempPasswordStore.get(email).equals(tempPassword);
    }

    // 비밀번호 재설정
    @Override
    public void updatePassword(ResetPasswordDTO target) {
        String encodedPassword = passwordEncoder.encode(target.getNewPassword());  // 비밀번호 암호화
        target.setNewPassword(encodedPassword);  // DTO에 암호화된 것 저장
        memberMapper.updatePassword(target);  // DB에서 비밀번호 업데이트
    }

//        memberMapper.updatePasswordByEmail(email, encodedPassword);  // DB에서 비밀번호 업데이트
//        tempPasswordStore.remove(email);  // 임시 비밀번호 삭제

    }


