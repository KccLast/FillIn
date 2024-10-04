package com.kcc.fillin.member.auth;

import java.util.Collection;
import java.util.List;

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
        return List.of();  // 권한 설정이 필요하다면 이곳에서 추가 가능
    }

    @Override
    public String getPassword() {
        return member.getPassword();  // 비밀번호 가져오기
    }

    @Override
    public String getUsername() {
        return member.getUsername();  // 이메일을 사용자 이름으로 사용
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
