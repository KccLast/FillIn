package com.kcc.fillin.member.controller;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

import org.apache.ibatis.javassist.compiler.ast.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.member.dto.MemberDTO;
import com.kcc.fillin.member.service.MemberService;

@Controller
@RequestMapping("/member")
public class MemberController {
	// 이메일 찾기, 비밀번호 찾기 등은 로그인 없이 접근 가능하게 설정
	@GetMapping("/email")
	public String emailFind() {
		return "/member/emailFind";
	}

	@GetMapping("/login")
	public String showLoginPage() {
		return "/member/loginPage"; // 로그인 페이지
	}

	@GetMapping("/password")
	public String passwordFind() {
		return "/member/passwordFind";
	}

	@Autowired
	private MemberService memberService;

	// 회원가입 폼 화면 이동
	@GetMapping("/register")
	public String showRegisterPage() {
		return "/member/registerPage"; // 회원가입 폼 JSP 경로
	}

	// 회원가입 처리
	@PostMapping("/register")
	public String registerMember(@ModelAttribute MemberDTO memberDTO, @RequestParam("gender") String gender,
			@RequestParam("address") String address, @RequestParam("detailed-address") String detailedAddress,
			@RequestParam("birth") String birth) {

		// 생년월일을 java.sql.Date로 변환
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			java.sql.Date birthDate = new java.sql.Date(format.parse(birth).getTime());
			memberDTO.setBirth(birthDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		// 주소와 상세 주소를 합침
		String fullAddress = address + " " + detailedAddress;
		memberDTO.setAddress(fullAddress);

		// 성별 처리: 남성일 경우 1, 여성일 경우 2
		if ("male".equals(gender)) {
			memberDTO.setCcId(1);
		} else if ("female".equals(gender)) {
			memberDTO.setCcId(2);
		}

		// 회원 등록 서비스 호출
		memberService.registerMember(memberDTO); // 회원 정보 저장

		// 회원가입 후 로그인 페이지로 리다이렉트
		return "redirect:/member/login";
	}

	// 그 외의 페이지는 로그인 후 접근 가능하도록 설정
	@GetMapping("/mypage")
	public String myPage() {
		return "/member/myPage"; // 예: 마이페이지
	}
}