<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>
    <link rel="stylesheet" href="/resources/css/member/loginPage.css">
</head>
<body>
<div class="navbar">
    <div class="nav-left">
        <a href="#"><img src="/resources/img/common/logo.png" alt="Logo" class="logo"></a>
    </div>

</div>

<div class="page-container" style="display: flex; width: 100%; height: 100vh;">
    <div class="welcome-section">
        <h2>Welcome</h2>
        <p>회원님을 환영합니다!</p>
    </div>

<div class="login-container">

    <!-- 로그인 폼 -->
    <form class="login-form" method="post" action="/login">
        <h2>Login</h2>

        <!-- 이메일 입력 -->
        <div class="input-container">
            <input type="email" id="username" name="username" placeholder="이메일" required>
        </div>

        <!-- 비밀번호 입력 -->
        <div class="input-container">
            <input type="password" id="password" name="password" placeholder="비밀번호" required>
        </div>

        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

        <!-- 로그인 버튼 -->
        <button type="submit" id="login-btn">로그인</button>
    </form>

    <!-- 로그인 실패 시 에러 메시지 표시 -->
    <c:if test="${param.error != null}">
        <p style="color:red; text-align: center;">로그인 실패: 이메일 또는 비밀번호를 확인하세요.</p>
    </c:if>

    <!-- 추가 링크 -->
    <div class="links">
        <a href="/member/email" id="find-email">이메일 찾기</a> |
        <a href="/member/password" id="find-password">비밀번호 찾기</a> |
        <a href="/member/register" id="signup">회원가입</a>
    </div>
</div>

<!-- jQuery 및 로그인 관련 JS -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/resources/js/member/loginPage.js"></script>
</body>
</html>
