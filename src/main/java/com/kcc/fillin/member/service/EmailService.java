package com.kcc.fillin.member.service;


import jakarta.mail.internet.MimeMessage;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Random;

/*@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("spring.mail.username")
    private String senderEmail;
    private final JavaMailSender mailSender ;  // JavaMailSender 주입

    public String sendEmail(String to, String subject, String text) {
        String tempCode = createCode();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail); // 발신자 이메일 주소 설정 (환경에 따라 수정 필요)
        message.setTo(to); // 수신자 이메일 주소
        message.setSubject(subject); // 이메일 제목
        message.setText(text+tempCode); // 이메일 본문 내용
        mailSender.send(message);  // 이메일 전송
        return tempCode;
    }

    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0: key.append((char) ((int) random.nextInt(26) + 97)); break;
                case 1: key.append((char) ((int) random.nextInt(26) + 65)); break;
                default: key.append(random.nextInt(9));
            }
        }
        return key.toString();
    }

}*/

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${spring.mail.username}")  // 수정: 환경 변수 바인딩
    private String senderEmail;

    private final JavaMailSender mailSender;  // JavaMailSender 주입

    public String sendEmail(String to, String subject, String text) {
        String tempCode = createCode();
//        HTML 형식의 이메일을 지원하기 위해 MimeMessage와 MimeMessageHelper 클래스를 사용
//        helper.setText(htmlContent, true)에서 두 번째 파라미터가 true이면, HTML 형식의 내용을 이메일 본문에 삽입
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(senderEmail);  // 발신자 이메일 주소
            helper.setTo(to);  // 수신자 이메일 주소
            helper.setSubject(subject);  // 이메일 제목

            // HTML 형식으로 본문 작성
            String htmlContent = "<html>" +
                    "<body>" +
                    "<h2>인증 코드 발급</h2>" +
                    "<p>안녕하세요,</p>" +
                    "<p>귀하의 인증 코드는 <strong style='color:blue;'>" + tempCode + "</strong> 입니다.</p>" +
                    "<p>인증 코드는 <strong>1분 동안 유효</strong>합니다.</p>" +
//                    "<p>아래 버튼을 클릭하여 화면으로 돌아가세요:</p>" +
//                    "<a href='http://localhost:8085/member/password?code="+tempCode +"'style='display:inline-block; padding:10px 20px; background-color:#4CAF50; color:white; text-decoration:none; border-radius:5px;'>인증 페이지로 이동</a>" +
                    "<p>감사합니다.</p>" +
                    "<hr>" +
                    "<p style='font-size:12px;color:gray;'>본 이메일은 자동 생성된 메시지입니다. 회신하지 마세요.</p>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);  // 두 번째 파라미터는 HTML 사용 여부

            mailSender.send(message);  // 이메일 전송
        } catch (Exception e) {
            e.printStackTrace();
        }

        return tempCode;
    }

    // 인증 코드 생성 메서드
    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) ((int) random.nextInt(26) + 97));  // 소문자 a-z
                    break;
                case 1:
                    key.append((char) ((int) random.nextInt(26) + 65));  // 대문자 A-Z
                    break;
                default:
                    key.append(random.nextInt(10));  // 숫자 0-9
            }
        }
        return key.toString();
    }
}



