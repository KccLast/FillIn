package com.kcc.fillin.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(authz -> authz
				.requestMatchers("/member/register", "/member/login").permitAll() // 회원가입과 로그인은 허용
				.anyRequest().permitAll() // 그 외는 로그인 필요
			)
			.formLogin(form -> form
				.loginPage("/member/login") // 로그인 페이지 경로 설정
				.loginProcessingUrl("/member/login") // 로그인 처리 경로 설정
				.defaultSuccessUrl("/survey/dashboard", true) // 로그인 성공 시 이동 경로
				.permitAll())
			.logout(logout -> logout
				.logoutUrl("/member/logout")
				.logoutSuccessUrl("/member/login") // 로그아웃 성공 시 로그인 페이지로 이동
				.permitAll());

		return http.build();
	}

	@Bean
	public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
		StrictHttpFirewall firewall = new StrictHttpFirewall();
		firewall.setAllowUrlEncodedSlash(true); // URL 인코딩된 슬래시 허용
		firewall.setAllowUrlEncodedDoubleSlash(true); // 연속된 슬래시 허용
		return firewall;
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.httpFirewall(allowUrlEncodedSlashHttpFirewall()); // 수정된 방화벽 적용
	}

}
