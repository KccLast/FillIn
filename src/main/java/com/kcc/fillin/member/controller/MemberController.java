package com.kcc.fillin.member.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kcc.fillin.member.dto.LoginMemberRequest;
import com.kcc.fillin.member.dto.MemberDTO;
import com.kcc.fillin.member.dto.MemberResponse;
import com.kcc.fillin.member.service.MemberService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;

	// 이메일 찾기 페이지
	@GetMapping("/email")
	public String emailFind() {
		return "/member/emailFind";
	}

	// 로그인 페이지 이동
	@GetMapping("/login")
	public String showLoginPage() {
		return "/member/loginPage";  // 로그인 페이지
	}

	// 비밀번호 찾기 페이지
	@GetMapping("/password")
	public String passwordFind(@RequestParam(required = false) String code, Model model) {
		model.addAttribute("code", code);
		return "/member/passwordFind";
	}


	// 회원가입 폼 화면 이동
	@GetMapping("/register")
	public String showRegisterPage() {
		return "/member/registerPage";  // 회원가입 폼 JSP 경로
	}

	// 회원가입 처리 (POST 요청)
	@PostMapping("/register")
	public String registerMember(@ModelAttribute MemberDTO memberDTO) {
		// 비밀번호 암호화 후 회원 저장
		memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
		memberService.registerMember(memberDTO);
		return "redirect:/member/login";  // 회원가입 완료 후 로그인 페이지로 리다이렉트
	}

	// 로그인 처리 (POST 요청)
//	@PostMapping("/login")
//	public String login(@RequestParam String username, @RequestParam String password, Model model) {
//		MemberDTO member = memberService.findByEmail(username);
//
//		if (member != null && passwordEncoder.matches(password, member.getPassword())) {
//			// 로그인 성공 시 대시보드로 리다이렉트
//			model.addAttribute("member", member);
//			return "redirect:/survey/dashboard";
//		} else {
//			// 로그인 실패 시 에러 메시지와 함께 로그인 페이지로 리턴
//			model.addAttribute("error", "이메일 또는 비밀번호가 잘못되었습니다.");
//			return "/member/login";
//		}
//	}


//	@PostMapping("/login")
//	public String login(@RequestParam String username, @RequestParam String password, Model model) {
//		// 로그인 처리는 SecurityConfig에서 처리하므로 여기에 추가 로직이 필요 없음.
//		return "redirect:/survey/dashboard";
//	}


	// 마이페이지 접근 (로그인 후 접근 가능)
	@GetMapping("/mypage")
	public String myPage() {
		return "/member/myPage";  // 마이페이지 경로
	}

	// 마이페이지 데이터 가져오기
//	@PostMapping("/mypage")
//	public ResponseEntity<MemberResponse> getMember(@RequestBody LoginMemberRequest request) {
//		MemberResponse member = memberService.getMemberByEmail(request.getUsername());
//		return ResponseEntity.ok(member);
//	}

	// 로그아웃 처리 (SecurityConfig에서 처리 중)
//	@GetMapping("/logout")
//	public void logOut() {
//		// 로그아웃 로직은 Spring Security가 자동 처리
//	}




}

