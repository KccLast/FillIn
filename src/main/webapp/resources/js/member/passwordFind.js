/*
$(document).ready(function() {
    $('#sendCode').on('click', function() {
        var name = $('#name').val();
        var phone = $('#phoneNumber').val();
        var email = $('#email').val();

        if (name && phone && email) {
            $.ajax({
                url: '/api/member/sendVerificationCode',
                type: 'POST',
                data: { name: name, phone: phone, email: email },
                success: function(response) {
                    alert('인증 코드가 전송되었습니다.');
                },
                error: function(xhr) {
                    alert('오류: ' + xhr.responseText);
                }
            });
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    });
});
*/

/* 모달 적용 전
$(document).ready(function() {
    // 인증 코드 전송
    $('#sendCode').on('click', function() {
        var name = $('#name').val();
        // var phone = "";
        var username = $('#email').val();
        // phone &&
        if (name && username) {  // username으로 변경 (기존 email이 없던 오류 수정)
            $.ajax({
                url: '/api/member/send-verification-code',
                type: 'POST',
                contentType: 'application/json',  // Content-Type을 JSON으로 설정
                data: JSON.stringify({
                    name: name,
                     // phone: phone,
                    username: username
                }),
                success: function(response) {
                    alert('인증 코드가 전송되었습니다. 1분 내에 입력하세요.');
                    $('#verificationSection').show();  // 인증 코드 입력 창 표시
                    $('#timer').show();  // 타이머를 표시할 영역 표시
                    startTimer(60);  // 60초 타이머 시작
                },
                error: function(xhr) {
                    alert('오류: ' + xhr.responseText);
                    // console.log(xhr.responseText);
                }
            });
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    });

    // 임시 비밀번호 인증
    $('#verifyTempPassword').on('click', function() {
        var tempPassword = $('#tempPassword').val();
        var email = $('#email').val();  // 이메일도 함께 전송

        if (tempPassword && email) {
            $.ajax({
                url: '/api/member/verify-temp-password',
                type: 'POST',
                contentType: 'application/json',  // Content-Type을 JSON으로 설정
                data: JSON.stringify({
                    email: email,  // 이메일 추가
                    tempPassword: tempPassword
                }),
                success: function(response) {
                    alert('임시 비밀번호 인증 완료');
                    $('#resetPasswordSection').show();  // 비밀번호 재설정 창 표시
                    $('#timer').hide();  // 타이머 숨기기
                },
                error: function(xhr) {
                    alert('오류: ' + xhr.responseText);
                }
            });
        } else {
            alert('임시 비밀번호를 입력해주세요.');
        }
    });

    // 타이머 함수
    function startTimer(duration) {
        var timer = duration, minutes, seconds;
        var interval = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            seconds = seconds < 10 ? "0" + seconds : seconds;

            $('#timer').text(minutes + ":" + seconds);  // 타이머 업데이트

            if (--timer < 0) {
                clearInterval(interval);  // 타이머 종료
                $('#tempPassword').prop('disabled', true);  // 입력창 비활성화
                $('#verifyTempPassword').prop('disabled', true);  // 인증 버튼 비활성화
                alert('인증 코드의 유효기간이 만료되었습니다. 다시 시도해주세요.');
                $('#timer').text('시간 초과');  // 타이머 영역에 '시간 초과' 표시
            }
        }, 1000);  // 1초마다 업데이트
    }

    // 비밀번호 재설정
    $('#resetPassword').on('click', function() {
        var newPassword = $('#newPassword').val();
        var confirmNewPassword = $('#confirmNewPassword').val();
        var email = $('#email').val();  // 이메일도 함께 전송

        if (newPassword && confirmNewPassword && newPassword === confirmNewPassword && email) {
            $.ajax({
                url: '/api/member/reset-password',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: email,  // 이메일 추가
                    newPassword: newPassword
                }),
                success: function(response) {
                    alert('비밀번호가 재설정되었습니다.');
                    window.location.href = '/member/login';  // 로그인 페이지로 이동
                },
                error: function(xhr) {
                    alert('오류: ' + xhr.responseText);
                }
            });
        } else {
            alert('비밀번호가 일치하지 않거나 입력되지 않았습니다.');
        }
    });
});*/

// 모달 적용 후(비밀번호 재설정 폼)
$(document).ready(function() {
    var timer = null;  // 타이머를 저장할 변수
    var timerExpired = false; // 타이머 만료 상태 추적

    // 인증 코드 전송
    $('#sendCode').on('click', function() {
        var name = $('#name').val();
        // var phone = "";
        var username = $('#email').val();
        // phone &&
        if (name && username) {  // username으로 변경 (기존 email이 없던 오류 수정)
            $.ajax({
                url: '/api/member/send-verification-code',
                type: 'POST',
                contentType: 'application/json',  // Content-Type을 JSON으로 설정
                data: JSON.stringify({
                    name: name,
                    // phone: phone,
                    username: username
                }),
                success: function(response) {
                    alert('인증 코드가 전송되었습니다. 1분 내에 입력하세요.');
                    $('#verificationSection').show();  // 인증 코드 입력 창 표시
                    $('#timer').show();  // 타이머를 표시할 영역 표시
                    startTimer(60);  // 60초 타이머 시작
                },
                error: function(xhr) {
                    alert('오류: ' + xhr.responseText);
                    // console.log(xhr.responseText);
                }
            });
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    });

    // 임시 비밀번호 인증
    $('#verifyTempPassword').on('click', function() {
        if (timerExpired) {
            alert('인증 시간이 만료되었습니다.');
            return;
        }

        var tempPassword = $('#tempPassword').val();
        var email = $('#email').val();  // 이메일도 함께 전송

        if (tempPassword && email) {
            $.ajax({
                url: '/api/member/verify-temp-password',
                type: 'POST',
                contentType: 'application/json',  // Content-Type을 JSON으로 설정
                data: JSON.stringify({
                    email: email,  // 이메일 추가
                    tempPassword: tempPassword
                }),
                success: function(response) {
                    alert('임시코드 인증 완료');
                    stopTimer();  // 타이머 종료
                    // 인증이 완료되면 모달 창을 띄워 비밀번호 재설정 가능하도록 함
                    $('#resetPasswordModal').modal('show');  // 모달 창 표시
                },

                // $('#timer').hide();  // 타이머 숨기기
                error: function(xhr) {
                    alert('오류: ' + xhr.responseText);
                }
            });
        } else {
            alert('인증코드를 입력해주세요.');
        }
    });

    // 타이머 함수
    function startTimer(duration) {
        var seconds = duration;
        timer = setInterval(function() {
            var minutes = parseInt(seconds / 60, 10);
            var secondsLeft = parseInt(seconds % 60, 10);
            secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

            $('#timer').text(minutes + ":" + secondsLeft);
            if (--seconds < 0) {
                timerExpired = true;
                stopTimer();
                alert('인증 코드의 유효기간이 만료되었습니다. 다시 시도해주세요.');
                $('#timer').text('시간 초과');
            }
        }, 1000);
    }

    // 타이머 중지
    function stopTimer() {
        clearInterval(timer);
        $('#tempPassword').prop('disabled', true);
        $('#verifyTempPassword').prop('disabled', true);
        $('#verifyTempPassword').css('background-color', '#ccc'); // 버튼 색상 변경
        $('#timer').hide();
    }

    // 비밀번호 재설정
    $('#resetPassword').on('click', function() {
        var newPassword = $('#newPassword').val();
        var confirmNewPassword = $('#confirmNewPassword').val();
        var email = $('#email').val();  // 이메일도 함께 전송(인증된 이메일)

        if (newPassword && confirmNewPassword && newPassword === confirmNewPassword && email) {
            $.ajax({
                url: '/api/member/reset-password',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: email,  // 이메일 추가
                    newPassword: newPassword
                }),
                success: function(response) {
                    alert('비밀번호가 재설정되었습니다.');
                    window.location.href = '/member/login';  // 로그인 페이지로 이동
                },
                error: function(xhr) {
                    alert('오류: ' + xhr.responseText);
                }
            });
        } else {
            alert('비밀번호가 일치하지 않거나 입력되지 않았습니다.');
        }
    });
});
