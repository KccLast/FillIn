<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>
    <link rel="stylesheet" href="/resources/css/member/registerPage.css">
</head>
<body>
    <div class="navbar">
        <div class="nav-left">
            <a href="#"><img src="/resources/img/common/logo.png" alt="Logo" class="logo"></a>
        </div>
    </div>

    <div id="signup-container">
        <div class="signup-container">
            <h2>회원가입</h2>
            <form id="register-form" action="/member/register" method="post" enctype="multipart/form-data">
                
                <!-- 프로필 이미지 업로드 -->
                <div class="profile-container">
                    <label for="profile-image-input">
                        <img id="profile-image" class="profile-image" src="/resources/img/member/profile.png" alt="프로필">
                        <img class="camera-icon" src="/resources/img/member/camera.png" alt="카메라">
                    </label>
                    <input type="file" id="profile-image-input" name="profileImage" style="display: none;" onchange="previewProfileImage(event)">
                </div>

                <!-- 이메일 입력 -->
                <div class="form-group">
                    <label for="username">이메일</label>
                    <input type="email" id="email" name="username" placeholder="이메일을 입력하세요">
                    <span class="error-message" id="email-error">유효하지 않은 이메일 형식입니다</span>
                    <button type="button" class="check-button">중복확인</button>
                </div>

                <!-- 비밀번호 입력 -->
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요 (8~20자)">
                    <span class="error-message" id="password-error">비밀번호는 8자 이상이어야 합니다</span>
                </div>

                <!-- 비밀번호 확인 -->
                <div class="form-group">
                    <label for="password-confirm">비밀번호 확인</label>
                    <input type="password" id="password-confirm" name="password-confirm" placeholder="비밀번호를 확인해주세요">
                    <span class="error-message" id="password-confirm-error">비밀번호가 일치하지 않습니다</span>
                </div>

                <!-- 이름 입력 -->
                <div class="form-group">
                    <label for="name">이름</label>
                    <input type="text" id="name" name="name" placeholder="이름을 입력하세요">
                    <span class="error-message" id="name-error">이름을 입력해주세요</span>
                </div>
                
                <!-- 전화번호 입력 -->
                <div class="form-group">
                    <label for="phone">전화번호</label>
                    <input type="text" id="phone" name="phone" placeholder="000-0000-0000">
                    <span class="error-message" id="phone-error">전화번호는 000-0000-0000 형식이어야 합니다</span>
                </div>

                <!-- 생년월일 입력 -->
                <div class="form-group">
                    <label for="birth-year">생년월일</label>
                    <select id="birth-year" name="birth-year"></select>
                    <select id="birth-month" name="birth-month"></select>
                    <select id="birth-day" name="birth-day"></select>
                    <span class="error-message" id="birth-error">생년월일을 선택해주세요</span>
                </div>

                <!-- 성별 입력 -->
                <div class="form-group">
                    <label for="gender">성별</label>
                    <input type="radio" id="male" name="gender" value="male" checked> 남성
                    <input type="radio" id="female" name="gender" value="female"> 여성
                </div>

                <!-- 주소 입력 -->
                <div class="form-group">
                    <label for="address">주소</label>
                    <input type="text" id="zipcode" name="zipcode" placeholder="우편번호">
                    <button type="button" class="find-zipcode" onclick="execDaumPostcode()">우편번호 찾기</button>
                    <input type="text" id="address" name="address" placeholder="주소">
                    <input type="text" id="detailed-address" name="detailed-address" placeholder="상세주소">
                    <span class="error-message" id="address-error">주소를 입력해주세요</span>
                </div>

                <!-- 가입 버튼 -->
                <div class="form-group">
                    <button type="submit" class="submit-button">가입하기</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Kakao Postcode API 스크립트 추가 -->
    <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/resources/js/member/registerPage.js"></script>
</body>
</html>