$(document).ready(function() {
    // 이메일 찾기 및 비밀번호 찾기 알림
    $('#find-email').click(function() {
        window.location.href = '/member/email';
    });

    $('#find-password').click(function() {
        window.location.href = '/member/password';
    });

    $('#signup').click(function() {
        window.location.href = '/member/register';  // 회원가입 페이지로 이동
    });
});
