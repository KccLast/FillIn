$(document).ready(function() {
	// 기간별 설문지 조회
	$('.date-badge').on('click', function() {
		// 선택된 배지 스타일 업데이트
		const isCreatedAt = $(this).hasClass('created-at');
		$('.date-badge.' + (isCreatedAt ? 'created-at' : 'updated-at')).removeClass('selected-badge');
		$(this).addClass('selected-badge');

		const selectedPeriod = $(this).data('period');

		const today = new Date();
		let startDate, endDate;

		switch (selectedPeriod) {
			case '1주일':
				startDate = new Date();
				startDate.setDate(today.getDate() - 7);
				endDate = today;
				console.log('1주일 startDate: ' + startDate + ',endDate: ' + endDate);
				break;
			case '1개월':
				startDate = new Date();
				startDate.setMonth(today.getMonth() - 1);
				endDate = today;
				console.log('1개월 startDate: ' + startDate + ',endDate: ' + endDate);
				break;
			case '6개월':
				startDate = new Date();
				startDate.setMonth(today.getMonth() - 6);
				endDate = today;
				console.log('6개월 startDate: ' + startDate + ',endDate: ' + endDate);
				break;
			case '1년':
				startDate = new Date();
				startDate.setFullYear(today.getFullYear() - 1);
				endDate = today;
				console.log('1년 startDate: ' + startDate + ',endDate: ' + endDate);
				break;
			case '2년':
				startDate = new Date();
				startDate.setFullYear(today.getFullYear() - 2);
				endDate = today;
				console.log('2년 startDate: ' + startDate + ',endDate: ' + endDate);
				break;
			case '3년':
				startDate = new Date();
				startDate.setFullYear(today.getFullYear() - 3);
				endDate = today;
				console.log('3년 startDate: ' + startDate + ',endDate: ' + endDate);
				break;
			case '전체':
				startDate = null; // 모든 데이터
				endDate = null;
				break;
		}

		/*function formatDate(date, isEndOfDay = false) {
			if (!date) return ''; // 값이 없으면 빈 문자열 반환

			if (isEndOfDay) {
				date.setHours(23, 59, 59, 999);
			} else {
				date.setHours(0, 0, 0, 0);
			}

			return date.getFullYear() + '-' +
				('0' + (date.getMonth() + 1)).slice(-2) + '-' +
				('0' + date.getDate()).slice(-2);
		}*/

		// 날짜 포맷팅 함수
		function formatDate(date, isEndOfDay = false) {
			if (!date) return ''; // 값이 없으면 빈 문자열 반환

			// date가 Date 객체인지 확인하고 그렇지 않으면 Date 객체로 변환
			if (!(date instanceof Date)) {
				date = new Date(date);
			}

			if (isEndOfDay) {
				date.setHours(23, 59, 59, 999);
			} else {
				date.setHours(0, 0, 0, 0);
			}

			return date.getFullYear() + '-' +
				('0' + (date.getMonth() + 1)).slice(-2) + '-' +
				('0' + date.getDate()).slice(-2);
		}


		// 날짜 값 포맷팅
		const formattedStartDate = formatDate(startDate, false);
		const formattedEndDate = formatDate(endDate, true);

		// input에 값 설정
		if (isCreatedAt) {
			$('#startCreatedAt').val(formattedStartDate);
			$('#endCreatedAt').val(formattedEndDate);
		} else {
			$('#startUpdatedAt').val(formattedStartDate);
			$('#endUpdatedAt').val(formattedEndDate);
		}
	});

	// 날짜 포맷팅 함수
	function formatDate(date, isEndOfDay = false) {
		if (!date) return ''; // 값이 없으면 빈 문자열 반환

		if (isEndOfDay) {
			date.setHours(23, 59, 59, 999);
		} else {
			date.setHours(0, 0, 0, 0);
		}

		return date.getFullYear() + '-' +
			('0' + (date.getMonth() + 1)).slice(-2) + '-' +
			('0' + date.getDate()).slice(-2);
	}

	// 다중 검색 조건으로 조회
	$('#searchBtn').on('click', function() {
		// 날짜 값을 yyyy-MM-dd 형식으로 포맷하는 함수
		function formatDate(dateString, isEndOfDay) {
			if (!dateString) return null; // 값이 없으면 null 반환
			var date = new Date(dateString);

			// 시작 시간은 00:00:00, 종료 시간은 23:59:59로 설정
			if (isEndOfDay) {
				date.setHours(23, 59, 59, 999);
			} else {
				date.setHours(0, 0, 0, 0);
			}

			// yyyy-MM-ddTHH:mm:ss.sss' 형식으로 변환하여 반환
			return date.getFullYear() + '-' + // date 객체 연도 가져옴(반환되는 값: 4자리 연도)
				('0' + (date.getMonth() + 1)).slice(-2) + '-' + // date 객체의 월을 가져옴 (0부터 시작), 2자리 수로 만듦
				('0' + date.getDate()).slice(-2) + ' ' + // 일을 두 자리 문자열로 반환
				('0' + date.getHours()).slice(-2) + ':' + // 날짜 객체의 hour 가져와서 두 자리 문자열로 변환
				('0' + date.getMinutes()).slice(-2) + ':' + // 날짜 객체의 minutes를 가져와서 두 자리 문자열로 변환
				('0' + date.getSeconds()).slice(-2); // 날짜 객체의 seconds를 가져와서 두 자리 문자열로 반환
		}

		// 날짜 값 포맷팅
		var startCreatedAt = formatDate($('#startCreatedAt').val(), false);
		var endCreatedAt = formatDate($('#endCreatedAt').val(), true);
		var startUpdatedAt = formatDate($('#startUpdatedAt').val(), false);
		var endUpdatedAt = formatDate($('#endUpdatedAt').val(), true);

		// 요청 데이터 구성
		const requestData = {
			ccId: parseInt($('#ccId').val(), 10) || null, // 값이 없으면 null
			startCreatedAt: startCreatedAt,
			endCreatedAt: endCreatedAt,
			startUpdatedAt: startUpdatedAt,
			endUpdatedAt: endUpdatedAt,
			name: $('#name').val() || '', // 빈 문자열로 기본값 설정
			minAnswerCount: $('#minAnswerCount').val() ? parseInt($('#minAnswerCount').val(), 10) : null,
			maxAnswerCount: $('#maxAnswerCount').val() ? parseInt($('#maxAnswerCount').val(), 10) : null

		};

		console.log(requestData);

		// AJAX 요청
		$.ajax({
			url: '/survey/dashboard',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(requestData),
			dataType: 'json',
			success: function(response) {
				console.log(response);
				filteringSurveyCards(response); // 필터링된 설문 카드 동적으로 업데이트
			},
			error: function(xhr, status, error) {
				console.error('Error message:', xhr.responseText || error);
			}
		});
	});

	function filteringSurveyCards(surveys) {
		// 카드 컨테이너 초기화
		$('.cards-container').empty();

		// 설문지 생성하는 카드
		var surveyCard =
			`<div class="card h-100">
                <div class="add-survey-card">
                    <img alt="plusBtn" src="/resources/img/common/plusButton.png"/>
                </div>
        	</div>`;

		if (Array.isArray(surveys)) {
			// 필터링된 설문지 생성
			surveyCard += surveys.map(survey =>
				`<div class="card h-100">
                <div class="card-body">
                    <span class="badge rounded-pill ${getBadgeClass(survey.ccId)} mb-1 px-2 py-1">${getBadgeText(survey.ccId)}</span>
                    <p>${survey.name}</p>
                    <div class="date-info">
                        <p>최초 생성일:</p>
                        <p>${formatDate(survey.createdAt)}</p>
                    </div>
                    <div class="date-info">
                        <p>마지막 수정일:</p>
                        <p>${formatDate(survey.updatedAt)}</p>
                    </div>
                    <div class="date-info">
                        <p>설문 기간:</p>
                        <p>${formatDate(survey.postDate)} ~ ${formatDate(survey.endDate)}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <p>${survey.answerCount}개 응답</p>
                </div>
            </div>`
			).join('');

			// 최종적으로 생성된 HTML을 카드 컨테이너에 추가
			$('.cards-container').append(surveyCard);
		} else {
			console.warn("응답은 배열이 아닙니다:", surveys);
		}
	}

	// 상태에 따른 배지 클래스 반환
	function getBadgeClass(ccId) {
		switch (ccId) {
			case 11: return 'bg-warning'; // 예정
			case 12: return 'bg-primary'; // 진행 중
			case 13: return 'bg-secondary'; // 완료
			default: return '';
		}
	}

	// 상태에 따른 배지 텍스트 반환
	function getBadgeText(ccId) {
		switch (ccId) {
			case 11: return '예정'; // 예정
			case 12: return '진행 중'; // 진행 중
			case 13: return '완료'; // 완료
			default: return '';
		}
	}

	// 날짜 포맷팅 함수
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('ko-KR'); // 한국 날짜 형식으로 변환
	}

	// 초기화 버튼
	$('#initialBtn').on('click', function() {
		// 모든 텍스트 입력 필드와 날짜 입력 필드를 초기화
		$('#name, #minAnswerCount, #maxAnswerCount, #startCreatedAt, #endCreatedAt, #startUpdatedAt, #endUpdatedAt').val('');

		// 셀렉트 박스를 초기 상태로 설정
		$('#ccId').prop('selectedIndex', 0);

		// 배지(span)들에 선택 상태가 있을 경우 초기화
		$('.badge').removeClass('selected'); // 'selected' 클래스가 있다면 제거

	});
});
