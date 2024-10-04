/*
 * package com.kcc.fillin.member.auth;
 * 
 * import org.springframework.security.core.userdetails.UserDetails; import
 * org.springframework.security.core.userdetails.UserDetailsService; import
 * org.springframework.security.core.userdetails.UsernameNotFoundException;
 * import org.springframework.stereotype.Service;
 * 
 * import com.kcc.fillin.member.dto.MemberDTO; import
 * com.kcc.fillin.member.service.MemberService;
 * 
 * import lombok.RequiredArgsConstructor;
 * 
 * @Service
 * 
 * @RequiredArgsConstructor public class PrincipalDetailService implements
 * UserDetailsService {
 * 
 * private final MemberService memberService;
 * 
 * @Override public UserDetails loadUserByUsername(String username) throws
 * UsernameNotFoundException { // 이메일을 이용해 회원 정보를 가져옴 MemberDTO member =
 * memberService.findByEmail(username); if (member != null) { return new
 * PrincipalDetail(member); } throw new
 * UsernameNotFoundException("User not found with email: " + username); } }
 */