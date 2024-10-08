$(document).ready(function() {
	var currentPage = 1;
	const pageSize = 9;
	let surveysData = [];

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

	// 다중 검색 조건으로 조회
	$('#searchBtn').on('click', function() {
		currentPage = 1;
		// 날짜 값을 yyyy-MM-dd 형식으로 포맷하는 함수
		/*function formatDate(dateString, isEndOfDay) {
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
		}*/

		// 날짜 값 포맷팅
		var startCreatedAt = $('#startCreatedAt').val();
		var endCreatedAt = $('#endCreatedAt').val();
		var startUpdatedAt = $('#startUpdatedAt').val();
		var endUpdatedAt = $('#endUpdatedAt').val();

		// 응답 수 입력 유효성 검사
		let minAnswerCount = $('#minAnswerCount').val();
		let maxAnswerCount = $('#maxAnswerCount').val();

		/*if (minAnswerCount && isNaN(minAnswerCount)) {
			alert('응답 수 최소값은 숫자여야 합니다.');
			return;
		}

		if (maxAnswerCount && isNaN(maxAnswerCount)) {
			alert('응답 수 최대값은 숫자여야 합니다.');
			return;
		}*/

		minAnswerCount = parseInt(minAnswerCount, 10);
		maxAnswerCount = parseInt(maxAnswerCount, 10);

		if (minAnswerCount < 1) {
			alert('응답 수 최소값은 1 이상이어야 합니다.');
			return;
		}

		if (maxAnswerCount < minAnswerCount) {
			alert('응답 수 최대값은 최소값보다 작을 수 없습니다.');
			return;
		}

		// 요청 데이터 구성
		const requestData = {
			ccSeq: parseInt($('#progress-ccSeq').val(), 10) || null, // 값이 없으면 null
			startCreatedAt: startCreatedAt,
			endCreatedAt: endCreatedAt,
			startUpdatedAt: startUpdatedAt,
			endUpdatedAt: endUpdatedAt,
			name: $('#title').val() || '', // 빈 문자열로 기본값 설정
			minAnswerCount: $('#minAnswerCount').val() ? parseInt($('#minAnswerCount').val(), 10) : null,
			maxAnswerCount: $('#maxAnswerCount').val() ? parseInt($('#maxAnswerCount').val(), 10) : null

		};
		
		console.log($("#title").val());
		console.log($("#progress-ccSeq").val());
		console.log($("#minAnswerCount").val());

		console.log(requestData);

		// AJAX 요청
		$.ajax({
			url: '/survey/api/dashboard',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(requestData),
			dataType: 'json',
			success: function(response) {
				console.log(response);	
				surveysData = response.data; // 응답 저장
				filteringSurveyCards(); // 필터링된 설문 카드 동적으로 업데이트
				setupPagination(); // 페이지 설정	
			},
			error: function(xhr, status, error) {
				console.error('Error message:', xhr.responseText || error);
			}
		});
	});

	function filteringSurveyCards() {
		// 카드 컨테이너 초기화
		$('.cards-container').empty();

		// 현재 페이지에 해당하는 설문 데이터 필터링
		const startRow = (currentPage - 1) * pageSize;
		const endRow = startRow + pageSize;
		const selectedCcSeq = $('#progress-ccSeq').val() || null;

		const currentSurveys = surveysData.filter(survey => {
			// ccSeq가 빈 문자열인 경우 모든 설문지를 포함
			if (selectedCcSeq === null || selectedCcSeq == '') {
				return true; // 모든 설문지 포함
			}
			return survey.ccSeq == selectedCcSeq; // 선택된 ccSeq와 일치하는 설문지만 포함
		}).slice(startRow, endRow);	
		
		/*const currentSurveys = surveysData.slice(startRow, endRow); // 전체 데이터를 기준으로 페이지네이션*/
	
		if (currentSurveys.length === 0) {
			$('.cards-container').append('<p>검색 결과와 일치하는 설문지가 없습니다.</p>');
			return;
		}

		// 설문지 생성하는 카드
		var surveyCard =
			`<div class="card h-100">
                <div class="add-survey-card">
                    <img alt="plusBtn" src="/resources/img/common/plusButton.png"/>
                </div>
        	</div>`;

			if (Array.isArray(currentSurveys)) {
				console.log(currentSurveys);
				/*<c:foreach items="${progressStatus}" var="item">
					console.log(item);
				</c:foreach>*/

				
				
				// 필터링된 설문지 생성
				surveyCard += currentSurveys.map(survey =>
				
				
					`<div class="card h-100">
	                <div class="card-body">
	                    <span class="badge rounded-pill  ${getBadgeClass(survey.ccSeq)} mb-1 px-2 py-1">${getBadgeText(survey.ccSeq)}</span>
	                    <p>${survey.name}</p>
	                    <div class="date-info">
	                        <p>생성일:</p>
	                        <p>${formatDate(survey.createdAt)}</p>
	                    </div>
	                    <div class="date-info">
	                        <p>수정일:</p>
	                        <p>${formatDate(survey.updatedAt)}</p>
	                    </div>
	                    <div class="date-info">
	                        <p>설문 기간:</p>
	                       
	                        <p>${survey.postDate && survey.endDate ? (survey.postDate) + ' ~ ' + (survey.endDate) : "설문 예정입니다." }</p>
	                    </div>
	                </div>
	                <div class="card-footer">
	                    <p>${survey.answerCount}개 응답</p>
	                </div>
	            </div>`
				).join('');

			// 최종적으로 생성된 HTML을 카드 컨테이너에 추가
			$('.cards-container').append(surveyCard);
		}
	}

	function setupPagination() {
		$('.pagination').empty(); // 페이지네이션 초기화
		const totalPage = Math.ceil(surveysData.length / pageSize); // 총 페이지 수 계산

		// 이전 버튼 추가
		if (currentPage > 1) {
			$('.pagination').append($('<div class="page-item"></div>')
				.append($('<a class="page-link" href="#">이전</a>')
					.on('click', function(e) {
						e.preventDefault();
						if (currentPage > 1) {
							currentPage--; // 이전 페이지로 이동
							filteringSurveyCards();
							setupPagination();
						}
					})));
		}

		// 페이지 링크 추가
		for (let i = 1; i <= totalPage; i++) {
			const pageLink = $('<div class="page-item"></div>')
				.append($('<a class="page-link" href="#"></a>')
					.text(i)
					.on('click', function(e) {
						e.preventDefault();
						currentPage = i; // 클릭한 페이지로 이동
						filteringSurveyCards();
						setupPagination();
					}));

			if (i === currentPage) {
				pageLink.addClass('active'); // 현재 페이지에 active 클래스 추가
			}

			$('.pagination').append(pageLink);
		}

		// 다음 버튼 추가
		if (currentPage < totalPage) {
			$('.pagination').append($('<div class="page-item"></div>')
				.append($('<a class="page-link" href="#">다음</a>')
					.on('click', function(e) {
						e.preventDefault();
						if (currentPage < totalPage) {
							currentPage++; // 다음 페이지로 이동
							filteringSurveyCards();
							setupPagination();
						}
					})));
		}
	}

	// 상태에 따른 배지 클래스 반환
	function getBadgeClass(ccSeq) {
		switch (ccSeq) {
			case 3: return 'bg-warning'; // 예정
			case 4: return 'bg-primary'; // 진행 중
			case 5: return 'bg-secondary'; // 완료
			default: return '';
		}
	}

	// 상태에 따른 배지 텍스트 반환
	function getBadgeText(ccSeq) {
		switch (ccSeq) {
			case 3: return '생성'; // 예정
			case 4: return '진행중'; // 진행 중
			case 5: return '완료'; // 완료
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
		$('#title, #minAnswerCount, #maxAnswerCount, #startCreatedAt, #endCreatedAt, #startUpdatedAt, #endUpdatedAt').val('');
		// 셀렉트 박스를 초기 상태로 설정
		$('#progress-ccSeq').prop('selectedIndex', 0);
		// 배지(span)들에 선택 상태가 있을 경우 초기화
		$('.date-badge').removeClass('selected-badge');

		// 페이지 초기화
		currentPage = 1;
		filteringSurveyCards();
	});
});

