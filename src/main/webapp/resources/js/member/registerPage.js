/*
$(document).ready(function() {
    // 유효성 검사를 위한 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/;
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    let isSubmitting = false;  // 중복 제출 방지 변수

    // 이메일 입력 시 실시간 유효성 검사
    $("#email").on("input", function() {
        const email = $(this).val();
        if (!emailRegex.test(email)) {
            $("#email-error").text("유효한 이메일 주소를 입력해주세요.").show();
        } else {
            $("#email-error").hide();  // 유효한 이메일일 경우 에러 메시지 숨김
        }
    });

    // 이메일 중복 체크
    $("#check-email-button").click(function() {
        const email = $("#email").val();
        console.log("Sending email: " + email);  // email 값 확인

        if (!emailRegex.test(email)) {
            $("#email-error").text("유효한 이메일 주소를 입력해주세요.").show();
            return;
        }

        $.ajax({
            url: '/api/member/register/emailcheck',
            type: 'GET',
            data: { username: email },
            cache: false,
            success: function(response) {
                console.log("Response: " + response);  // 서버 응답 로그 확인
                if (response) {
                    $("#email-error").text("사용 가능한 이메일입니다.").show();
                } else {
                    $("#email-error").text("이미 사용 중인 이메일입니다.").show();
                }
            },
            error: function(xhr, status, error) {
                console.error("Error: " + error);
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

    // 전화번호 유효성 검사 및 숫자 외 문자 제거
    $("#phone").on("input", function() {
        $(this).val($(this).val().replace(/[^0-9-]/g, ''));  // 숫자와 '-'만 허용
        const phone = $(this).val();
        if (!phoneRegex.test(phone)) {
            $("#phone-error").text("전화번호는 000-0000-0000 형식이어야 합니다.").show();
        } else {
            $("#phone-error").hide();
        }
    });

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

    // 윤년 확인 함수 및 일자 계산
    function populateDays(month, year) {
        $('#birth-day').empty();
        let lastDay = new Date(year, month, 0).getDate(); // 마지막 일 계산

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
        if (isSubmitting) {
            event.preventDefault();
            return;
        }
        isSubmitting = true;

        // 생년월일 조합
        const birthYear = $('#birth-year').val();
        const birthMonth = $('#birth-month').val();
        const birthDay = $('#birth-day').val();

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

        // 유효성 검사
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

        // 비밀번호 형식 검증
        if (!passwordRegex.test(password)) {
            $("#password-error").text("비밀번호는 8자 이상, 20자 이하이며, 문자, 숫자, 특수문자를 포함해야 합니다.").show();
            isValid = false;
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
        }

        // 전화번호 검증
        if (!phoneRegex.test(phone)) {
            $("#phone-error").text("전화번호는 000-0000-0000 형식이어야 합니다.").show();
            isValid = false;
        }

        // 주소 검증
        if (zipcode.trim() === "" || address.trim() === "" || detailedAddress.trim() === "") {
            $("#address-error").text("주소를 모두 입력해주세요.").show();
            isValid = false;
        }

        // 최종 검증 후 제출 방지
        if (!isValid) {
            isSubmitting = false;  // 제출 방지 후 중복 제출 방지 플래그 리셋
            event.preventDefault();
        } else {
            alert("회원가입이 완료되었습니다.");
        }
    });

    // Kakao 우편번호 찾기 API 실행 함수
    window.execDaumPostcode = function() {
        new daum.Postcode({
            oncomplete: function(data) {
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

    // 프로필 이미지 미리보기
    function previewProfileImage(event) {
        var file = event.target.files[0];
        var fileSizeLimit = 2 * 1024 * 1024; // 2MB 제한

        if (!file.type.startsWith('image/')) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
        }

        if (file.size > fileSizeLimit) {
            alert("파일 크기가 너무 큽니다. 2MB 이하로 업로드해주세요.");
            return;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            $('#profile-image').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // 프로필 이미지 업로드 이벤트 연결
    $("#profile-image-input").change(previewProfileImage);
});
*/
$(document).ready(function () {
  // 유효성 검사를 위한 정규 표현식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/;
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
  let isSubmitting = false; // 중복 제출 방지 변수

  // CSRF 토큰을 가져오는 함수
  const csrfToken = $("input[name='_csrf']").val();
  const csrfHeader = $("meta[name='_csrf_header']").attr('content');

  let currentStep = 0;

  // 단계바 업데이트 함수
  function updateProgressBar() {
    $('.progress-bar .step').removeClass('active');
    $('.progress-bar .step').eq(currentStep).addClass('active');
  }

  // 이메일 입력 시 실시간 유효성 검사
  $('#email').on('input', function () {
    const email = $(this).val();
    if (!emailRegex.test(email)) {
      $('#email-error').text('유효한 이메일 주소를 입력해주세요.').show();
    } else {
      $('#email-error').hide(); // 유효한 이메일일 경우 에러 메시지 숨김
    }
  });

  // 이메일 중복 체크
  $('#check-email-button').click(function () {
    const email = $('#email').val();
    console.log('Sending email: ' + email); // email 값 확인

    if (!emailRegex.test(email)) {
      $('#email-error').text('유효한 이메일 주소를 입력해주세요.').show();
      return;
    }

    $.ajax({
      url: '/api/member/register/emailcheck',
      type: 'GET',
      data: { username: email },

      beforeSend: function (xhr) {
        if (csrfHeader && csrfToken) {
          xhr.setRequestHeader(csrfHeader, csrfToken); // CSRF 토큰 추가
        }
      },

      cache: false,
      success: function (response) {
        console.log('Response: ' + response); // 서버 응답 로그 확인
        if (response) {
          $('#email-error').text('사용 가능한 이메일입니다.').show();
          $('#email-error').addClass('success-font');
          if ($('#email-error').hasClass('error-font')) {
            $('#email-error').removeClass('error-font');
          }
        } else {
          $('#email-error').text('이미 사용 중인 이메일입니다.').show();
          $('#email-error').addClass('error-font');
          if ($('#email-error').hasClass('success-font')) {
            $('#email-error').removeClass('success-font');
          }
        }
      },
      error: function (xhr, status, error) {
        console.error('Error: ' + error);
        alert('이메일 중복 확인 중 오류가 발생했습니다.');
      },
    });
  });

  // 실제 비밀번호를 저장할 변수
  let actualPassword = ""; // 실제 비밀번호를 저장할 변수

  // 비밀번호 입력 시 실시간 형식 유효성 검사
  $('#password').on('input', function () {
    const password = $(this).val();

    // 입력된 비밀번호 길이만큼 '*'로 마스킹
    const maskedPassword = '*'.repeat(password.length);
    $(this).val(maskedPassword); // 입력 필드에 마스킹된 비밀번호 설정

    // 비밀번호의 마지막 문자를 actualPassword에 추가
    if (password.length > actualPassword.length) {
      actualPassword += password[password.length - 1];
    } else {
      actualPassword = actualPassword.slice(0, -1); // 뒷 문자 삭제
    }

    // 유효성 검사
    if (!passwordRegex.test(actualPassword)) {
      $('#password-error')
          .text('비밀번호는 8자 이상, 20자 이하이며, 문자, 숫자, 특수문자를 포함해야 합니다.')
          .show();
    } else {
      $('#password-error').hide(); // 유효성 검사 통과 시 에러 메시지 숨김
    }

    // 숨겨진 필드에 실제 비밀번호 설정
    $("#actual-password").val(actualPassword);
  });

  // 비밀번호 확인을 위한 변수
  let actualConfirmPassword = ""; // 실제 비밀번호 확인 값을 저장할 변수

  // 비밀번호 확인 입력 시 실시간 처리
  $('#password-confirm').on('input', function () {
    const confirmPassword = $(this).val();

    // 입력된 비밀번호 확인 길이만큼 '*'로 마스킹
    const maskedConfirmPassword = '*'.repeat(confirmPassword.length);
    $(this).val(maskedConfirmPassword); // 입력 필드에 마스킹된 비밀번호 확인 설정

    // 비밀번호 확인의 마지막 문자를 actualConfirmPassword에 추가
    if (confirmPassword.length > actualConfirmPassword.length) {
      actualConfirmPassword += confirmPassword[confirmPassword.length - 1];
    } else {
      actualConfirmPassword = actualConfirmPassword.slice(0, -1); // 뒷 문자 삭제
    }

    // 비밀번호와 확인 비밀번호 비교
    if (actualPassword !== actualConfirmPassword) {
      $('#password-confirm-error').text('비밀번호가 일치하지 않습니다.').show();
    } else {
      $('#password-confirm-error').hide(); // 유효성 검사 통과 시 에러 메시지 숨김
    }

    // 숨겨진 필드에 실제 비밀번호 확인 값을 저장
    $("#actual-confirm-password").val(actualConfirmPassword);
  });

  // 전화번호 유효성 검사 및 숫자 외 문자 제거
  $("#phone").on("input", function () {
    $(this).val($(this).val().replace(/[^0-9-]/g, ''));  // 숫자와 '-'만 허용
    const phone = $(this).val();
    if (!phoneRegex.test(phone)) {
      $("#phone-error").text("전화번호는 000-0000-0000 형식이어야 합니다.").show();
    } else {
      $("#phone-error").hide();
    }
  });

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

  // 윤년 확인 함수 및 일자 계산
  function populateDays(month, year) {
    $('#birth-day').empty();
    let lastDay = new Date(year, month, 0).getDate(); // 마지막 일 계산

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
  $('#birth-year, #birth-month').on('change', function () {
    const selectedYear = $('#birth-year').val();
    const selectedMonth = $('#birth-month').val();
    populateDays(selectedMonth, selectedYear);
  });

  // 회원가입 폼 제출 시
  $("form").submit(function (event) {
    if (isSubmitting) {
      event.preventDefault(); // 중복 제출 방지
      return;
    }
    isSubmitting = true; // 제출 시작

    // 생년월일 조합
    const birthYear = $('#birth-year').val();
    const birthMonth = $('#birth-month').val();
    const birthDay = $('#birth-day').val();

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

    // 유효성 검사
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

    // 비밀번호 형식 검증
    if (!passwordRegex.test(password)) {
      $("#password-error").text("비밀번호는 8자 이상, 20자 이하이며, 문자, 숫자, 특수문자를 포함해야 합니다.").show();
      isValid = false;
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
    }

    // 전화번호 검증
    if (!phoneRegex.test(phone)) {
      $("#phone-error").text("전화번호는 000-0000-0000 형식이어야 합니다.").show();
      isValid = false;
    }

    // 주소 검증
    if (zipcode.trim() === "" || address.trim() === "" || detailedAddress.trim() === "") {
      $("#address-error").text("주소를 모두 입력해주세요.").show();
      isValid = false;
    }

    // 최종 검증 후 제출 방지
    if (!isValid) {
      isSubmitting = false;  // 제출 방지 후 중복 제출 방지 플래그 리셋
      event.preventDefault(); // 기본 제출 이벤트 방지
    } else {
      console.error(isValid);
      alert("회원가입이 완료되었습니다.");
      window.location.href = '/member/login'; // 로그인 페이지로 리다이렉트

    }
  });

  // Kakao 우편번호 찾기 API 실행 함수
  window.execDaumPostcode = function () {
    new daum.Postcode({
      oncomplete: function (data) {
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

  // 프로필 이미지 미리보기
  function previewProfileImage(event) {
    var file = event.target.files[0];
    var fileSizeLimit = 2 * 1024 * 1024; // 2MB 제한

    if (!file.type.startsWith('image/')) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > fileSizeLimit) {
      alert("파일 크기가 너무 큽니다. 2MB 이하로 업로드해주세요.");
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      $('#profile-image').attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
  }

  // 프로필 이미지 업로드 이벤트 연결
  $("#profile-image-input").change(previewProfileImage);

  // 단계바
  // 이전/다음 버튼 로직 구현

  $('.next-btn').click(function () {
    if (!validateCurrentStep()) {
      alert('모든 항목을 올바르게 작성한 후에 다음 단계로 진행해주세요.');
      return; // 더 이상의 실행을 중지
    }

    // 다음 단계로 넘어가기
    $('.form-step').eq(currentStep).removeClass('active');
    currentStep = (currentStep + 1) % $('.form-step').length;
    $('.form-step').eq(currentStep).addClass('active');

    updateProgressBar();
  });

  // "이전" 버튼 클릭 이벤트
  $('.prev-btn').click(function () {
    if (currentStep > 0) {
      $('.form-step').eq(currentStep).removeClass('active');
      currentStep--;
      $('.form-step').eq(currentStep).addClass('active');

      updateProgressBar();
    }
  });

  // 현재 단계의 필드 유효성 검사
  function validateCurrentStep() {
    return $('.form-step')
        .eq(currentStep)
        .find('input, select')
        .toArray()
        .every((el) => el.checkValidity());
  }
  updateProgressBar();
});



