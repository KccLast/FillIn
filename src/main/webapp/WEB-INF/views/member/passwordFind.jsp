<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Find Password</title>

    <!-- Bootstrap 모달에 필요한 CSS만 로드 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- 여기에 기존의 커스텀 CSS 파일도 그대로 유지 -->
    <link rel="stylesheet" href="/resources/css/member/passwordFind.css">


</head>
<body>

<div class="navbar">
    <div class="nav-left">
        <a href="#"><img src="/resources/img/common/logo.png" alt="Logo" class="logo"></a>
    </div>
    <div class="links">
        <a href="/member/login" id="login-page">로그인 페이지</a>
    </div>
</div>


<div class="form-container">
    <h2>비밀번호 찾기</h2>
    <form id="passwordForm">

        <div class="input-group">
            <input type="text" id="name" name="name" placeholder="이름 입력" required>

            <div class="phone-input">
                <input type="text" id="email" name="username" placeholder="이메일" required>
                <button type="button" id="sendCode">전송</button>
            </div>

        <div id="verificationSection" style="display:none;">
            <input type="text" id="tempPassword" placeholder="인증코드 입력" required>
            <button type="button" id="verifyTempPassword">인증</button>
            <div id="timer" style="display:none; font-size:23px; color:red; margin-top:10px;"></div>
        </div>

    </form>
</div>

<!-- 비밀번호 재설정 모달 -->
<div class="modal fade" id="resetPasswordModal" tabindex="-1" role="dialog" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="resetPasswordModalLabel">비밀번호 재설정</h5>
                <button type="button" id="resetPasswordClose" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <form id="resetPasswordForm">
                    <div class="form-group">
                        <label for="newPassword">새 비밀번호</label>
                        <input type="password" class="form-control" id="newPassword" placeholder="새 비밀번호 입력" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmNewPassword">새 비밀번호 확인</label>
                        <input type="password" class="form-control" id="confirmNewPassword" placeholder="새 비밀번호 확인" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                <button type="button" class="btn btn-primary" id="resetPassword">비밀번호 재설정</button>
            </div>
        </div>
    </div>
</div>

<!-- 모달 관련 Bootstrap JS만 로드 -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<!-- 나머지 자바스크립트 파일 유지 -->
<script src="/resources/js/member/passwordFind.js"></script>

<%--<script>--%>
<%--    window.onload = function() {--%>
<%--        var tempCode = '<%= session.getAttribute("tempCode") %>';--%>
<%--        if (tempCode) {--%>
<%--            document.getElementById('tempPassword').value = tempCode;--%>
<%--            document.getElementById('verificationSection').style.display = 'none';--%>
<%--        }--%>
<%--    }--%>
<%--</script>--%>



</body>
</html>
