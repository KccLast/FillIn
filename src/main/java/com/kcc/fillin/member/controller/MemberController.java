package com.kcc.fillin.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
public class MemberController {
	@GetMapping("/mypage")
	public String mypage() {
		return "/member/modal-mypage";
	}

	@GetMapping("/update-mypage")
	public String updateMypage() {
		return "/member/updateInfo";
	}
}
