package com.kcc.fillin.member.controller;

import com.kcc.fillin.global.Common.Response;
import com.kcc.fillin.member.auth.PrincipalDetail;
import com.kcc.fillin.member.dao.MemberMapper;
import com.kcc.fillin.member.dto.MemberDTO;
//import com.kcc.fillin.member.service.EmailService;
import com.kcc.fillin.member.dto.ResetPasswordDTO;
import com.kcc.fillin.member.dto.TempPasswordDTO;
import com.kcc.fillin.member.service.EmailService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.kcc.fillin.member.service.MemberService;
import org.springframework.web.servlet.ModelAndView;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberRestController {



    private final MemberService memberService;


    private final EmailService emailService;


    private final MemberMapper memberMapper;

    // 이메일 중복 확인
    @GetMapping("/register/emailcheck")
    @ResponseBody
    public boolean checkEmail(@RequestParam("username") String username) {
        System.out.println("Received username: " + username);  // 로그 확인
        // 서비스에서 이메일 중복 체크 호출
        boolean isEmailExists = memberService.isEmailExists(username);
        System.out.println("Email check result: " + isEmailExists);  // 결과 로그
        return !isEmailExists;  // 이메일이 존재하지 않으면 사용 가능(true)
    }

    // 회원가입 처리
    @PostMapping("/register")
    public ResponseEntity<String> registerMember(@RequestBody MemberDTO memberDTO) {
        try {
            // 생년월일, 주소, 성별 등 DTO에 포함된 필드들을 처리
            System.out.println("멤버에서 받은 데이터: " + memberDTO);

            // 회원 등록 서비스 호출
            memberService.registerMember(memberDTO);

            return ResponseEntity.ok("회원가입이 완료되었습니다.");  // 성공 메시지 반환
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("회원가입 중 오류가 발생했습니다.");
        }
    }

    //이메일 찾기 처리
    @PostMapping("/email")
    public ResponseEntity<?> findEmail(@RequestBody MemberDTO memberDTO) {
        try {
            String email = memberService.findEmailByNameAndPhone(memberDTO.getName(), memberDTO.getPhone());
            if (email != null && !email.isEmpty()) {
                // 이메일 마스킹 처리 (예: j***@gmail.com)
                String maskedEmail = email.replaceAll("(\\w{2})\\w+(\\w{2}@\\w+\\.\\w+)", "$1****$2");
                return ResponseEntity.ok(maskedEmail);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while finding the email.");
        }
    }

    /*// 임시 비밀번호 발송
    @PostMapping("/send-verification-code")
    public ResponseEntity<?> sendVerificationCode(@RequestParam String name, @RequestParam String phone, @RequestParam String email) {
        if (memberService.validateMemberDetails(name, phone, email)) {
            String tempPassword = memberService.generateTempPassword();
            memberService.sendVerificationCode(email, tempPassword);
            return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
        }
        return ResponseEntity.badRequest().body("입력한 정보와 일치하는 회원이 없습니다.");
    }

    // 임시 비밀번호 인증
    @PostMapping("/verify-temp-password")
    public ResponseEntity<?> verifyTempPassword(@RequestParam String email, @RequestParam String tempPassword) {
        if (memberService.verifyTempPassword(email, tempPassword)) {
            return ResponseEntity.ok("임시 비밀번호 인증이 완료되었습니다.");
        }
        return ResponseEntity.badRequest().body("잘못된 임시 비밀번호입니다.");
    }

    // 비밀번호 재설정
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String newPassword) {
        memberService.updatePassword(email, newPassword);
        return ResponseEntity.ok("비밀번호가 성공적으로 재설정되었습니다.");
    }*/

    // 임시 비밀번호 발송
    @PostMapping("/send-verification-code")
    public ResponseEntity<?> sendVerificationCode(@RequestBody MemberDTO memberDTO, HttpSession session) {

        System.out.println(memberDTO.getName());
        System.out.println(memberDTO.getUsername());

        if (memberService.validateMemberDetails(memberDTO.getName(), memberDTO.getUsername())) {


            //수신자 email, 나중에 "dhsong11@gmail.com -> 실제 팀원들 메일 주소로 바꿔야 함"
            //String tempCode = emailService.sendEmail(memberDTO.getUsername(),"임시비밀번호 발급","임시 비밀번호는 ");
            String tempCode = emailService.sendEmail("dhsong11@gmail.com","임시비밀번호 발급","임시 비밀번호는 ");
            session.setAttribute("tempCode", tempCode);
            session.setMaxInactiveInterval(60);
            return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
        }
        return ResponseEntity.badRequest().body("입력한 정보와 일치하는 회원이 없습니다.");
    }

    // 임시 비밀번호 인증
    @PostMapping("/verify-temp-password")
    public ResponseEntity<?> verifyTempPassword(@RequestBody TempPasswordDTO tempPasswordDTO,HttpSession session) {
        /*if (memberService.verifyTempPassword(tempPasswordDTO.getEmail(), tempPasswordDTO.getTempPassword())) {
            return ResponseEntity.ok("임시 비밀번호 인증이 완료되었습니다.");
        }*/
        String tempCode = (String) session.getAttribute("tempCode");
        System.out.println("tempCode = " + tempCode);
        if(tempCode.equals(tempPasswordDTO.getTempPassword().trim())) {
            session.setMaxInactiveInterval(0);
            return ResponseEntity.ok("인증이 완료되었습니다.");
        }
        session.setMaxInactiveInterval(0);
        return ResponseEntity.badRequest().body("잘못된 임시 비밀번호입니다.");
    }

    // 비밀번호 재설정
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO,HttpSession session) {


        // 비밀번호 업데이트
        memberService.updatePassword(resetPasswordDTO);
        System.out.println(resetPasswordDTO);
//return null;
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");

    }

    @GetMapping("/info")
    public Response<String> getUser(@AuthenticationPrincipal PrincipalDetail  user) {


       return Response.setSuccess(user.getUser(),200);
    }


}



