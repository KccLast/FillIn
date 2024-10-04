package com.kcc.fillin.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kcc.fillin.member.dto.LoginMemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;
import com.kcc.fillin.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
	private MemberService service;

	@PostMapping("/mypage")
	public ResponseEntity<MemberResponse> getMember(@RequestBody
	LoginMemberRequest request) {
		MemberResponse member = service.getMemberByEmail(request.getEmail());

		return ResponseEntity.ok(member);
	}
}
