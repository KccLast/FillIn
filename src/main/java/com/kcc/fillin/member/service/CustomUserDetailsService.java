/*
 * package com.kcc.fillin.member.service;
 * 
 * @Service public class CustomUserDetailsService implements UserDetailsService
 * {
 * 
 * private final UserRepository userRepository;
 * 
 * public CustomUserDetailsService(UserRepository userRepository) {
 * this.userRepository = userRepository; }
 * 
 * @Override public UserDetails loadUserByUsername(String email) throws
 * UsernameNotFoundException { User user = userRepository.findByEmail(email); if
 * (user == null) { throw new UsernameNotFoundException("이메일을 찾을 수 없습니다."); }
 * return new CustomUserDetails(user); } }
 */