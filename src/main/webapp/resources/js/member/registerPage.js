$(document).ready(function() {
    // 유효성 검사를 위한 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/;
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

    // 이메일 입력 시 실시간 유효성 검사
    $("#email").on("input", function() {
        const email = $(this).val();
        if (!emailRegex.test(email)) {
            $("#email-error").text("유효한 이메일 주소를 입력해주세요.").show();
        } else {
            $("#email-error").hide();  // 유효한 이메일일 경우 에러 메시지 숨김
        }
    });
    
    //이메일 중복체크
    $(".check-button").click(function() {
        const email = $("#email").val();
        if (!emailRegex.test(email)) {
            $("#email-error").text("유효한 이메일 주소를 입력해주세요.").show();
            return;
        }

        $.ajax({
            url: '/api/member/register/emailcheck',
            type: 'GET',
            data: { email: email },
            success: function(response) {
                if (response) {
                    $("#email-error").text("이미 사용 중인 이메일입니다.").show();
                } else {
                    $("#email-error").text("사용 가능한 이메일입니다.").show();
                }
            },
            error: function() {
                alert("이메일 중복 확인 중 오류가 발생했습니다.");
            }
        });
    });

    
    // 비밀번호 입력 시 실시간 형식 유효성 검사
    $("#password").on("input", function() {
        const password = $(this).val();
        if (!passwordRegex.test(password)) {
            $("#password-error").text("비밀번호는 8자 이상, 20자 이하이며, 문자, 숫자, 특수문자를 포함해야 합니다.").show();
        } else {
            $("#password-error").hide();
        }
    });

    // 비밀번호 확인
    $("#password-confirm").on("keyup", function() {
        const password = $("#password").val();
        const confirmPassword = $("#password-confirm").val();

        if (password !== confirmPassword) {
            $("#password-confirm-error").text("비밀번호가 일치하지 않습니다.").show();
        } else {
            $("#password-confirm-error").hide();
        }
    });

    // 전화번호 유효성 검사
    $("#phone").on("input", function() {
        const phone = $(this).val();
        if (!phoneRegex.test(phone)) {
            $("#phone-error").text("전화번호는 000-0000-0000 형식이어야 합니다.").show();
        } else {
            $("#phone-error").hide();
        }
    });
    
    
 $(document).ready(function() {
    // 현재 연도부터 1900년까지의 연도를 드롭다운에 추가
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    for (let year = currentYear; year >= startYear; year--) {
        $('#birth-year').append(new Option(year, year));
    }

    // 1월부터 12월까지 월을 드롭다운에 추가
    for (let month = 1; month <= 12; month++) {
        $('#birth-month').append(new Option(month + '월', month));
    }

    // 윤년 확인 함수
    function isLeapYear(year) {
        return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0));
    }

    // 선택한 연도와 월에 맞는 일수를 드롭다운에 추가
    function populateDays(month, year) {
        $('#birth-day').empty();
        let lastDay;

        if (month == 2 && !isLeapYear(year)) {
            lastDay = 28;
        } else {
            lastDay = new Date(year, month, 0).getDate(); // 마지막 일 계산
        }

        for (let day = 1; day <= lastDay; day++) {
            $('#birth-day').append(new Option(day + '일', day));
        }
    }

    // 초기값: 현재 날짜로 설정
    const currentDate = new Date();
    $('#birth-year').val(currentDate.getFullYear());
    $('#birth-month').val(currentDate.getMonth() + 1);
    populateDays(currentDate.getMonth() + 1, currentDate.getFullYear());
    $('#birth-day').val(currentDate.getDate());

    // 연도나 월이 변경될 때마다 일수를 다시 설정
    $('#birth-year, #birth-month').on('change', function() {
        const selectedYear = $('#birth-year').val();
        const selectedMonth = $('#birth-month').val();
        populateDays(selectedMonth, selectedYear);
    });

    // 폼 제출 시 생년월일을 yyyy-MM-dd 형식으로 조합하여 전송
   $("form").submit(function(event) {
        // 생년월일 조합
        const birthYear = $('#birth-year').val();
        const birthMonth = $('#birth-month').val();
        const birthDay = $('#birth-day').val();

        // 생년월일을 yyyy-MM-dd 형식으로 조합
        const fullBirthDate = birthYear + '-' + ('0' + birthMonth).slice(-2) + '-' + ('0' + birthDay).slice(-2);

        // 이미 존재하는 birth input이 있는지 확인하고, 없다면 추가
        if ($('#birth').length === 0) {
            $('<input>').attr({
                type: 'hidden',
                id: 'birth',
                name: 'birth',
                value: fullBirthDate
            }).appendTo('form');
        } else {
            $('#birth').val(fullBirthDate);  // 이미 있으면 값만 업데이트
        }
    });
    });


    // Kakao 우편번호 찾기 API 실행 함수
    window.execDaumPostcode = function() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 도로명 주소와 지번 주소를 가져옴
                var address = ''; 
                var extraAddress = ''; 

                if (data.userSelectedType === 'R') { // 도로명 주소 선택
                    address = data.roadAddress;
                } else { // 지번 주소 선택
                    address = data.jibunAddress;
                }

                // 우편번호와 주소를 입력 필드에 넣음
                document.getElementById('zipcode').value = data.zonecode;
                document.getElementById('address').value = address;

                if (data.userSelectedType === 'R') {
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddress += data.bname;
                    }
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    if (extraAddress !== '') {
                        extraAddress = ' (' + extraAddress + ')';
                    }
                    document.getElementById("address").value += extraAddress;
                }

                // 상세주소 필드에 포커스
                document.getElementById("detailed-address").focus();
            }
        }).open();
    };

    // 회원가입 폼 제출 전 검증
    $("form").submit(function(event) {
        let isValid = true;

        const email = $("#email").val();
        const password = $("#password").val();
        const confirmPassword = $("#password-confirm").val();
        const name = $("#name").val();
        const phone = $("#phone").val();
        const zipcode = $("#zipcode").val();
        const address = $("#address").val();
        const detailedAddress = $("#detailed-address").val();

        // 이메일 형식 검증
        if (!emailRegex.test(email)) {
            $("#email-error").text("유효한 이메일 주소를 입력해주세요.").show();
            isValid = false;
        }

        // 비밀번호 형식 검증 (8자 이상 20자 이하, 특수문자 포함)
        if (!passwordRegex.test(password)) {
            $("#password-error").text("비밀번호는 8자 이상, 20자 이하이며, 문자, 숫자, 특수문자를 포함해야 합니다.").show();
            isValid = false;
        } else {
            $("#password-error").hide();
        }

        // 비밀번호 확인 검증
        if (password !== confirmPassword) {
            $("#password-confirm-error").text("비밀번호가 일치하지 않습니다.").show();
            isValid = false;
        }

        // 이름 검증
        if (name.trim() === "") {
            $("#name-error").text("이름을 입력해주세요.").show();
            isValid = false;
        } else {
            $("#name-error").hide();
        }

        // 전화번호 검증
        if (!phoneRegex.test(phone)) {
            $("#phone-error").text("전화번호는 000-0000-0000 형식이어야 합니다.").show();
            isValid = false;
        } else {
            $("#phone-error").hide();
        }

        // 주소 검증
        if (zipcode.trim() === "" || address.trim() === "" || detailedAddress.trim() === "") {
            $("#address-error").text("주소를 모두 입력해주세요.").show();
            isValid = false;
        } else {
            $("#address-error").hide();
        }

        // 최종 검증 후 제출 방지
        if (!isValid) {
            event.preventDefault();
        } else {
            alert("회원가입이 완료되었습니다.");
        }
    });

// 프로필 이미지 미리보기
function previewProfileImage(event) {
    var reader = new FileReader();
    reader.onload = function(e) {
        $('#profile-image').attr('src', e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
}
});
