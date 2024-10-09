$(document).ready(function() {
	// 마이 페이지 모달창 들어가면 회원 정보 조회
	$.ajax ({
		url: '/api/member/mypage',
		type: 'GET',
		success: function(response) {
			let ccSeq = '';
			if(response.data.ccSeq == 1) {
				ccSeq = '여성';
			} else {
				ccSeq = '남성';
			}
			console.log(response.data);
			$('#username').val(response.data.username);
			$('#name').val(response.data.name);
			$('#birth').val(response.data.birth);
			$('#ccSeq').val(ccSeq);
			$('#phone').val(response.data.phone);
			$('#postalCode').val(response.data.postalCode);
			$('#address').val(response.data.address);
		}
	});
	
	// 회원 정보 수정 버튼 클릭
	$('#updateMemberInfoBtn').click(function() {
		$.ajax({
			url: '/api/member/mypage',
			type: 'GET',
			success: function(response) {
				let ccSeq = '';
				if(response.data.ccSeq == 1) {
					ccSeq = '여성';
				} else {
					ccSeq = '남성';
				}
				console.log(response.data);
				$('#update-username').val(response.data.username);
				$('#update-name').val(response.data.name);
				$('#update-birth').val(response.data.birth);
				$('#update-ccSeq').val(ccSeq);
				$('#update-phone').val(response.data.phone);
				$('#update-postalCode').val(response.data.postalCode);
				$('#update-address').val(response.data.address);
			}
		});
	});
	
	// 회원 정보 저장 버튼 클릭
	$('#saveBtn').click(function() {
		// 에러 메시지 초기화
    	$('#phone-error').hide().text('');
    	
    	const phoneInput = $('#update-phone').val();
	    const phonePattern = /^\d{3}-\d{4}-\d{4}$/;
	
	    // 전화번호 유효성 검사
	    if (!phonePattern.test(phoneInput)) {
	        $('#phone-error').text('휴대폰 번호는 000-0000-0000 형식이어야 합니다.').show();
	        return; // 유효성 검사 실패 시 요청 중단
	    }

		
		const updateData = {
			/*password: $('#update-password').val(),
			passwordConfirm: $('#update-password-confirm').val(),*/
			phone: $('#update-phone').val(),
			postalCode: $('#update-postalCode').val(),
            address: $('#update-address').val() + ' ' + $('#update-detailAddress').val() // 주소와 상세주소
		};
		
		console.log(updateData);
		
		$.ajax({
			url: '/api/member/mypage',
			type: 'PATCH',
			contentType: 'application/json',
			data: JSON.stringify(updateData),
			success: function(response) {
				console.log(response);
				
				// 첫 번째 모달 내용 업데이트
				$('#phone').val(updateData.phone);
				$('#postalCode').val(updateData.postalCode);
				$('#address').val(updateData.address);
				
				alert('회원 정보 수정이 완료되었습니다.');
				
				// 수정 모달 닫기 후 조회 모달 열기
                $('#update-member-modal').modal('hide');
                $('#mypage-modal').modal('show');
			},
			error: function(xhr, status, error) {
				console.error('Error message:', xhr.responseText || error);
            
	            // 서버에서 온 에러 메시지 표시
	            if (xhr.responseText) {
	                $('#phone-error').text(xhr.responseText).show();  // 에러 메시지 표시
	            } else {
	                $('#phone-error').text('회원 정보 수정 중 에러가 발생했습니다.').show();  // 일반 에러 메시지
	            }
			}
		});
	});
});

// 우편번호 검색 카카오 주소 api
function sample6_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                
                } 

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('update-postalCode').value = data.zonecode;
                document.getElementById('update-address').value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById('update-detailAddress').focus();
            }
        }).open();
    }