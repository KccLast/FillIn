package com.kcc.fillin.member.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.member.auth.PrincipalDetail;
import com.kcc.fillin.member.dto.MemberDTO;
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
	public Response getMemberInfo(@AuthenticationPrincipal PrincipalDetail principalDetail) {
		MemberDTO loginMember = principalDetail.getMember();
		System.out.println("로그인 회원: " + loginMember);
		
		if(loginMember == null) {
			return Response.setError("로그인한 회원 정보를 찾을 수 없습니다.", 404);
		}
		
		MemberResponse member = memberService.getMemberByUsername(loginMember.getUsername());
		
		return Response.setSuccess(member, 200);
	}
	
	@PatchMapping("/mypage")
	public Response updateMemberInfo(@AuthenticationPrincipal PrincipalDetail principalDetail, @Valid @RequestBody MemberRequest request,
			BindingResult bindingResult) {
		// 유효성 검사 실패 시 에러 반환
		if(bindingResult.hasErrors()) {
			return Response.setError(bindingResult.getFieldError().getDefaultMessage(), 400);
		}
		
		String username = principalDetail.getUsername();
		System.out.println("회원정보수정 로그인 멤버: " + username);
		System.out.println("요청 데이터" + request);
		
		memberService.updateMemberByUsername(username, request);
		return Response.setSuccess(request, 204);
	}
	
}
