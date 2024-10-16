package com.kcc.fillin.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;

import lombok.RequiredArgsConstructor;

//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http
//				.authorizeHttpRequests(authz -> authz
//						.requestMatchers("/member/register", "/member/login").permitAll() // 회원가입과 로그인은 허용
//						.anyRequest().authenticated() // 그 외는 로그인 필요
//				)
//				.formLogin(form -> form
//						.loginPage("/member/login")
//						.loginProcessingUrl("/member/login")
//						.defaultSuccessUrl("/survey/dashboard", true)// 로그인 성공 시
//						.failureUrl("/member/login?error=true") // 로그인 실패 시
//						.permitAll()
//				)
//
//				.logout(logout -> logout
//						.logoutUrl("/member/logout")
//						.logoutSuccessUrl("/member/login") // 로그아웃 성공 시 로그인 페이지로 이동
//						.permitAll());
//
//		return http.build();
//	}
//
//	// 비밀번호 암호화를 위한 빈 추가
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//
//	@Bean
//	public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
//		StrictHttpFirewall firewall = new StrictHttpFirewall();
//		firewall.setAllowUrlEncodedSlash(true); // URL 인코딩된 슬래시 허용
//		firewall.setAllowUrlEncodedDoubleSlash(true); // 연속된 슬래시 허용
//		return firewall;
//	}
//
//	@Bean
//	public WebSecurityCustomizer webSecurityCustomizer() {
//		return (web) -> web.httpFirewall(allowUrlEncodedSlashHttpFirewall()); // 수정된 방화벽 적용
//	}
//}

//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//   @Bean
//   public BCryptPasswordEncoder encodePwd() {
//       return new BCryptPasswordEncoder();
//   }
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return NoOpPasswordEncoder.getInstance();
//	}
//
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.csrf(csrf -> csrf
//				.ignoringRequestMatchers("/**") // 모든 경로에 대해 기본적으로 CSRF 비활성화
//				.requireCsrfProtectionMatcher(request -> {
//					String uri = request.getRequestURI();
//					// 로그인, 회원가입 페이지에서만 CSRF 활성화
//					return uri.equals("/member/login") || uri.equals("/member/register");
//				})
//		);
//		http.authorizeHttpRequests(authorizeRequests ->
//						authorizeRequests
//								.requestMatchers("/member/register", "/member/login","/login/**","/").permitAll() // 회원가입과 로그인은 허용
//								.anyRequest().authenticated() // 그 외는 로그인 필요
//				).formLogin(formLogin -> formLogin.loginPage("/member/login").permitAll() // 로그인 페이지 지정
//
//.loginProcessingUrl("/login").permitAll() // 컨트롤러 지정 없이 시큐리티에서 로그인 진행
//						.successHandler((request, response, authentication) -> {
//							String prevPage = (String) request.getSession().getAttribute("prevPage");
//							if (prevPage != null && prevPage.contains("meetups")) {
//								response.sendRedirect(prevPage);
//							} else {
//								// 기본 페이지로 리다이렉트
//								response.sendRedirect("/");  // 기본 페이지로 설정
//							}
//						})
//)
//						.failureHandler(authenticationFailureHandler())) // 로그인 실패 시 처리할 핸들러 설정
//				.logout(logout -> logout
//						.logoutUrl("/logout").permitAll()// 로그아웃 요청 경로
//						.logoutSuccessUrl("/fillin/landingPage").permitAll()// 로그아웃 성공 시 이동할 경로
//						.invalidateHttpSession(true)
//				)
//				.headers(headers -> headers
//						.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)) ;// 보안 헤더 설정 추가
//				인증되지 않은 AJAX 요청에 대해 401 반환
//
//.exceptionHandling(exceptionHandling -> exceptionHandling
//						.authenticationEntryPoint((request, response, authException) -> {
//							// AJAX 요청 여부 확인
//							if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
//								// AJAX 요청에 대해서는 401 Unauthorized 상태 코드 반환
//								response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//								response.setContentType("application/json");
//								response.getWriter().write("{\"error\": \"Unauthorized\", \"loginUrl\": \"/members/login\"}");
//							} else {
//								// 일반 요청에 대해서는 로그인 페이지로 리디렉션
//								response.sendRedirect("/member/login");
//							}
//						})
//				);*//*
//
//
//		return http.build();
//	}
//
//
//@Bean
//	public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
//		StrictHttpFirewall firewall = new StrictHttpFirewall();
//		firewall.setAllowUrlEncodedDoubleSlash(true); // 이중 슬래시 허용
//		return firewall;
//	}
//
//	@Bean
//	public AuthenticationFailureHandler authenticationFailureHandler() {
//		return new SimpleUrlAuthenticationFailureHandler() {
//			@Override
//			public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, IOException {
//				// 로그인 실패 시 메시지를 설정하고 리디렉션
//				response.sendRedirect("/members/loginForm?error=true");
//			}
//		};
//	}

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf
			.ignoringRequestMatchers("/**") // 모든 경로에 대해 기본적으로 CSRF 비활성화
			.requireCsrfProtectionMatcher(request -> {
				String uri = request.getRequestURI();
				// 로그인, 회원가입 페이지에서만 CSRF 활성화
				return uri.equals("/member/login") || uri.equals("/member/register");
			})
		);
		http.authorizeHttpRequests(authz -> authz
					.requestMatchers("/question/**").authenticated()
					.requestMatchers("/statistic/**").authenticated()
					.requestMatchers("/survey/**").authenticated()
					.anyRequest().permitAll()
				//						.requestMatchers("/member/login", "/member/register", "/resources/**").permitAll() // 정적 리소스나 로그인 관련 경로 인증 없이 허용
				//						.anyRequest().authenticated() // 그 외 모든 요청은 인증 필요
			)
			.formLogin(form -> form
				.loginPage("/member/login")  // 로그인 페이지 설정
				.loginProcessingUrl("/login") // 로그인 처리 경로
				.defaultSuccessUrl("/survey/dashboard", true) // 로그인 성공 후 이동할 페이지
				.failureUrl("/member/login?error=true") // 로그인 실패 시 리다이렉트 경로
				.permitAll()
			)
			.headers(headers -> headers
				.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)) // 보안 헤더 설정 추가
			.logout(logout -> logout
				.logoutUrl("/logout") // 로그아웃 처리 경로
				.logoutSuccessUrl("/member/login") // 로그아웃 성공 시 리다이렉트 경로
				.invalidateHttpSession(true)
				.permitAll()
			);

		return http.build();
	}

	// 비밀번호 암호화를 위한 빈 추가
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// URL 인코딩된 슬래시 허용 설정
	@Bean
	public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
		StrictHttpFirewall firewall = new StrictHttpFirewall();
		firewall.setAllowUrlEncodedSlash(true); // URL 인코딩된 슬래시 허용
		firewall.setAllowUrlEncodedDoubleSlash(true); // 연속된 슬래시 허용
		return firewall;
	}

	// 방화벽 설정을 WebSecurity에 적용
	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.httpFirewall(allowUrlEncodedSlashHttpFirewall()); // 수정된 방화벽 적용
	}

}
