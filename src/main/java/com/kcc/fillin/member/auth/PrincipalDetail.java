package com.kcc.fillin.member.auth;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import com.kcc.fillin.member.domain.MemberVO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.kcc.fillin.member.dto.MemberDTO;

import lombok.Data;

@Data
public class PrincipalDetail implements UserDetails {
    private MemberDTO member;

    public PrincipalDetail(MemberDTO member) {
        this.member = member;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();  // 권한 정보가 필요하면 이곳에 추가할 수 있습니다.
    }

    @Override
    public String getPassword() {
        return member.getPassword();  // 비밀번호를 반환
    }

    @Override
    public String getUsername() {
        return member.getUsername();  // 사용자 이름(이메일)을 반환
    }

    public String getUser(){
        return member.getName(); // 사용자 이름 반환
    }

    public LocalDate getBirth(){
        return member.getBirth();
    }

    public String getPostalCode(){
        return member.getPostalCode();
    }

    public String getAddress(){
        return member.getAddress();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // 계정 만료 여부
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // 계정 잠김 여부
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // 자격 증명 만료 여부
    }

    @Override
    public boolean isEnabled() {
        return true;  // 계정 활성화 여부
    }
}
