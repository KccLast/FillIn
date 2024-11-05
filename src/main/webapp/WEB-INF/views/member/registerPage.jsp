<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!DOCTYPE html>
    <html lang="ko">

    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="/resources/common/header.css">
        <!-- Bootstrap JS 추가 -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>회원가입</title>
        <link rel="stylesheet" href="/resources/css/member/registerPage.css">
        <meta name="_csrf" content="${_csrf.token}">
        <meta name="_csrf_header" content="${_csrf.headerName}">
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

        <div id="signup-container">
            <div class="signup-container">
                <h2>회원가입</h2>
                <div class="progress-bar">
                    <div class="step active">1</div>
                    <div class="step">2</div>
                </div>
                <form id="register-form" action="/member/register" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                    <div class="form-step active">

                        <div class="form-group">
                            <label for="username">이메일<span style="color: red;">*</span></label>
                            <div class="email-box">
                                <input type="email" id="email" name="username" placeholder="이메일을 입력하세요"
                                    class="form-control" required>
                                <button type="button" id="check-email-button" class="btn btn-secondary">중복확인</button>
                            </div>
                            <span class="error-message" id="email-error">유효하지 않은 이메일 형식입니다</span>

                        </div>
                        <div class="form-group">
                            <label for="password">비밀번호<span style="color: red;">*</span></label>
                            <input type="text" id="password" name="password" placeholder="비밀번호를 입력해주세요 (8~20자)"
                                   class="form-control mt-3" required aria-describedby="passwordHelpBlock">
                            <input type="hidden" name="password" id="actual-password">
                            <span class="error-message" id="password-error">비밀번호는 8자 이상이어야 합니다</span>
                        </div>

                        <div class="form-group">
                            <label for="password-confirm">비밀번호 확인<span style="color: red;">*</span></label>
                            <input type="text" id="password-confirm" name="password-confirm"
                                placeholder="비밀번호를 확인해주세요" class="form-control mt-3" required aria-describedby="passwordHelpBlock">
                            <input type="hidden" name="confirm-password" id="actual-confirm-password">
                            <span class="error-message" id="password-confirm-error">비밀번호가 일치하지 않습니다</span>
                        </div>
                        <div class="form-group">
                            <label for="name">이름<span style="color: red;">*</span></label>
                            <input type="text" id="name" name="name" class="form-control mt-3" placeholder="이름을 입력하세요"
                                required>
                            <span class="error-message" id="name-error">이름을 입력해주세요</span>
                        </div>
                        <button type="button" class="next-btn btn btn-primary">이어서 작성</button>
                    </div>
                    <div class="form-step">
                        <!-- Second step fields -->
                        <div class="form-group">
                            <label for="phone">전화번호</label>
                            <input type="text" id="phone" name="phone" placeholder="000-0000-0000" class="form-control">
                            <span class="error-message" id="phone-error">전화번호는 000-0000-0000 형식이어야 합니다</span>
                        </div>
                        <div class="form-group">
                            <label for="birth-year">생년월일</label>
                            <div style="display: flex; gap: 5px; width: 98%;">
                                <select id="birth-year" name="birth-year"></select>
                                <select id="birth-month" name="birth-month"></select>
                                <select id="birth-day" name="birth-day"></select>
                            </div>
                            <span class="error-message" id="birth-error">생년월일을 선택해주세요</span>
                        </div>
                        <div class="form-group">
                            <label for="gender">성별</label>
                            <input type="radio" id="male" name="gender" value="male" checked> 남성
                            <input type="radio" id="female" name="gender" value="female"> 여성
                        </div>
                        <div class="form-group">
                            <label for="address">주소</label>
                            <div class="j-flex-row-center">
                                <input type="text" id="zipcode" name="postalCode" placeholder="우편번호">
                                <button type="button" class="find-zipcode" onclick="execDaumPostcode()">우편번호 찾기</button>
                            </div>
                            <input type="text" id="address" name="address" placeholder="주소">
                            <input type="text" id="detailed-address" name="detailedAddress" placeholder="상세주소">
                            <span class="error-message" id="address-error">주소를 입력해주세요</span>
                        </div>
                        <button type="button" class="prev-btn">이전</button>
                        <div class="j-flex-row-center">
                            <button type="submit" class="submit-button">가입하기</button>
                        </div>
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