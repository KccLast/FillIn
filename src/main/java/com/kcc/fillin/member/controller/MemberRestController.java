package com.kcc.fillin.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kcc.fillin.member.service.MemberService;

@RestController
@RequestMapping("/api/member/register")
public class MemberRestController {

    @Autowired
    private MemberService memberService;

    // 이메일 중복 확인
    @GetMapping("/emailcheck")
    @ResponseBody
    public boolean checkEmail(@RequestParam("email") String email) {
        return memberService.emailExists(email) > 0;
    }
}
