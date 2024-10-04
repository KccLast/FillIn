<%@ page contentType="text/html;charset=UTF-8" language="java" %>

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
    
    <div class="login-container">
        <!-- 로그인 폼 -->
        <form class="login-form" method="post" action="/member/login">
            <h2>로그인</h2>
            
            <!-- 이메일 입력 -->
            <div class="input-container">
                <input type="username" id="username" name="username" placeholder="이메일" required>
            </div>
            
            <!-- 비밀번호 입력 -->
            <div class="input-container">
                <input type="password" id="password" name="password" placeholder="비밀번호" required>
            </div>
            
            <!-- 로그인 버튼 -->
            <button type="submit" id="login-btn">로그인</button>
        </form>
        
        <!-- 추가 링크 -->
        <div class="links">
            <a href="#" id="find-email">이메일 찾기</a> |
            <a href="#" id="find-password">비밀번호 찾기</a> |
            <a href="/member/register" id="signup">회원가입</a>
        </div>
    </div>

    <!-- jQuery 및 로그인 관련 JS -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/resources/js/member/loginPage.js"></script>
</body>

</html>
