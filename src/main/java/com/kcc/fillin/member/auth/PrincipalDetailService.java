package com.kcc.fillin.member.auth;


import com.kcc.fillin.member.dao.MemberMapper;
import com.kcc.fillin.member.domain.MemberVO;
import com.kcc.fillin.member.dto.MemberDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService {

    private final MemberMapper memberMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 회원있는지체크
        int memberExists = memberMapper.emailExists(username);

        if (memberExists == 0) {  // 0이면 사용자 없음
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // 이메일로 사용자 정보 가져오기
        MemberDTO member = memberMapper.getMemberByEmail(username);

        // PrincipalDetail 객체로 반환하여 Spring Security 인증에 사용
        return new PrincipalDetail(member);
    }
}

