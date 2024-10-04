<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Find Email</title>
    <link rel="stylesheet" href="/resources/css/member/emailFind.css">
</head>
<body>
<div class="navbar">
        <div class="nav-left">
            <a href="#"><img src="/resources/img/common/logo.png" alt="Logo" class="logo"></a>
        </div>
    </div>
    
<div class="form-container">
    <h2>이메일 찾기</h2>
    <form id="emailForm">
        <input type="text" id="name" name="name" placeholder="이름" required><br>
        <div class="phone-input">
            <input type="text" id="phoneNumber" placeholder="전화번호" required>
            <button type="button" id="sendCode">전송</button>
        </div>
                <button type="submit" id="verifyButton">인증</button>
    </form>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/resources/js/member/emailFind.js"></script>
</body>
</html>
