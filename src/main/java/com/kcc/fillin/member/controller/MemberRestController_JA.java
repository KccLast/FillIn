package com.kcc.fillin.member.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.member.dto.MemberRequest;
import com.kcc.fillin.member.dto.MemberResponse;
import com.kcc.fillin.member.service.MemberService_JA;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberRestController_JA {
	private final MemberService_JA memberService;
	
	@GetMapping("/mypage")
	public Response getMemberInfo() { // 추후 username은 principal에서 받아오기
		MemberResponse loginMember = memberService.getMemberByUsername("mimi1@gmail.com");
		System.out.println("회원정보조회 로그인 멤버: " + loginMember);
		return Response.setSuccess(loginMember, 200);
	}
	
	@PatchMapping("/mypage")
	// 추후 username은 principal에서 받아오기
	public Response updateMemberInfo(String username, @Valid @RequestBody MemberRequest request,
			BindingResult bindingResult) {
		// 유효성 검사 실패 시 에러 반환
		if(bindingResult.hasErrors()) {
			return Response.setError(bindingResult.getFieldError().getDefaultMessage(), 400);
		}
		
		MemberResponse loginMember = memberService.getMemberByUsername("mimi1@gmail.com");
		username = loginMember.getUsername();
		System.out.println("회원정보수정 로그인 멤버: " + loginMember);
		System.out.println(request);
		
		memberService.updateMemberByUsername(username, request);
		return Response.setSuccess(request, 204);
	}
	
}
