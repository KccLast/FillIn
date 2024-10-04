/*$(document).ready(function() {
    $('#login-btn').click(function(event) {
        event.preventDefault();  // Prevent the form from submitting normally
        let email = $('#email').val();
        let password = $('#password').val();

        if (email && password) {
            alert("로그인 시도 중... 이메일: " + email + ", 비밀번호: " + password);
        } else {
            alert("모든 필드를 입력해 주세요.");
        }
    });

    $('#find-email').click(function() {
        alert("이메일 찾기 기능은 준비 중입니다.");
    });

    $('#find-password').click(function() {
        alert("비밀번호 찾기 기능은 준비 중입니다.");
    });

    $('#signup').click(function() {
        alert("회원가입 페이지로 이동합니다.");
    });
});

*/

$(document).ready(function() {
    $('#login-btn').click(function(event) {
        event.preventDefault();  // 기본 폼 제출 방지
        
        let email = $('#email').val();
        let password = $('#password').val();

        // 폼 필드가 모두 입력되었는지 확인
        if (email && password) {
            // 로그인 요청 AJAX
            $.ajax({
                url: '/api/member/login',  // 실제 로그인 API 엔드포인트
                type: 'POST',
                contentType: 'application/json',  // JSON 데이터 전송
                data: JSON.stringify({
                    email: email,
                    password: password
                }),
                success: function(response) {
                    if (response.success) {
                        alert("로그인 성공! 대시보드로 이동합니다.");
                        window.location.href = '/dashboard';  // 로그인 성공 시 대시보드로 이동
                    } else {
                        alert("로그인 실패: " + response.message);
                    }
                },
                error: function() {
                    alert("로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
                }
            });
        } else {
            alert("모든 필드를 입력해 주세요.");
        }
    });

    $('#find-email').click(function() {
        alert("이메일 찾기 기능은 준비 중입니다.");
    });

    $('#find-password').click(function() {
        alert("비밀번호 찾기 기능은 준비 중입니다.");
    });

    $('#signup').click(function() {
        window.location.href = '/member/register';  // 회원가입 페이지로 이동
    });
});
