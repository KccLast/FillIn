$(document).ready(function () {
    var currentPage = 1;
    const pageSize = 6;
    let surveysData = [];

    // 페이지 로드 시 검색 조건 불러오기
    //loadSearchCriteria();

    // 페이지 로드 시 세션에 저장된 검색 조건을 가져오는 함수
    function loadSearchCriteria() {
        const searchCriteria = JSON.parse(sessionStorage.getItem('searchCriteria'));
        console.log('Loaded search criteria:', searchCriteria);

        if (searchCriteria) {
            $('#title').val(searchCriteria.name || '');
            $('#startCreatedAt').val(searchCriteria.startCreatedAt || '');
            $('#endCreatedAt').val(searchCriteria.endCreatedAt || '');
            $('#startUpdatedAt').val(searchCriteria.startUpdatedAt || '');
            $('#endUpdatedAt').val(searchCriteria.endUpdatedAt || '');
            $('#minAnswerCount').val(searchCriteria.minAnswerCount || '');
            $('#maxAnswerCount').val(searchCriteria.maxAnswerCount || '');
            filteringSurveyCards(); // 검색 조건을 불러와서 필터링 실행
        }
    }

    const savedRequestData = sessionStorage.getItem("requestData");

    const savedResultData = sessionStorage.getItem("resultData");

    console.log('savedResultData: ', savedResultData);
    console.log('savedRequestData: ', savedRequestData);

    // sessionStorage에서 검색 조건 불러오기
    var title = sessionStorage.getItem('title');
    var startCreatedAt = sessionStorage.getItem('startCreatedAt');
    var endCreatedAt = sessionStorage.getItem('endCreatedAt');
    var startUpdatedAt = sessionStorage.getItem('startUpdatedAt');
    var endUpdatedAt = sessionStorage.getItem('endUpdatedAt');
    var minAnswerCount = sessionStorage.getItem('minAnswerCount');
    var maxAnswerCount = sessionStorage.getItem('maxAnswerCount');

    // 불러온 값을 폼에 자동으로 설정
    // if (title) $('#title').val(title);
    if (startCreatedAt) $('#startCreatedAt').val(startCreatedAt);
    if (endCreatedAt) $('#endCreatedAt').val(endCreatedAt);
    if (startUpdatedAt) $('#startUpdatedAt').val(startUpdatedAt);
    if (endUpdatedAt) $('#endUpdatedAt').val(endUpdatedAt);
    if (minAnswerCount) $('#minAnswerCount').val(minAnswerCount);
    if (maxAnswerCount) $('#maxAnswerCount').val(maxAnswerCount);


    // 기간별 설문지 조회
    $('.date-badge').on('click', function () {
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

    // 다중 검색 조건으로 조회
    $('#searchBtn').on('click', function () {
        currentPage = 1;
        saveSearchCriteria();

        // 검색 조건을 변수에 저장
        var title = $('#title').val();
        var startCreatedAt = $('#startCreatedAt').val();
        var endCreatedAt = $('#endCreatedAt').val();
        var startUpdatedAt = $('#startUpdatedAt').val();
        var endUpdatedAt = $('#endUpdatedAt').val();
        var minAnswerCount = $('#minAnswerCount').val();
        var maxAnswerCount = $('#maxAnswerCount').val();

        // sessionStorage에 저장
        sessionStorage.setItem('title', title);
        sessionStorage.setItem('startCreatedAt', startCreatedAt);
        sessionStorage.setItem('endCreatedAt', endCreatedAt);
        sessionStorage.setItem('startUpdatedAt', startUpdatedAt);
        sessionStorage.setItem('endUpdatedAt', endUpdatedAt);
        sessionStorage.setItem('minAnswerCount', minAnswerCount);
        sessionStorage.setItem('maxAnswerCount', maxAnswerCount);

        // 날짜 값 포맷팅
        startCreatedAt = $('#startCreatedAt').val();
        endCreatedAt = $('#endCreatedAt').val();
        startUpdatedAt = $('#startUpdatedAt').val();
        endUpdatedAt = $('#endUpdatedAt').val();

        // 응답 수 입력 유효성 검사
        minAnswerCount = $('#minAnswerCount').val();
        maxAnswerCount = $('#maxAnswerCount').val();

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

        // sessionStorage에 검색 조건 저장
        sessionStorage.setItem("requestData", JSON.stringify(requestData));

        // AJAX 요청
        $.ajax({
            url: '/api/survey/dashboard',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            dataType: 'json',
            success: function (response) {
                console.log(response);
                surveysData = response.data; // 응답 저장

                // 검색된 설문지 수 업데이트
                let surveyCount = surveysData.length - 1;
                console.log('surveysData.length: ', surveysData.length);

                if (surveysData.length < pageSize) {
                    surveyCount = surveysData.length;
                }

                console.log('surveyCount: ', surveyCount);

                $('#surveyCount').text(surveyCount);
                $('#surveyCountContainer').show();

                filteringSurveyCards(); // 필터링된 설문 카드 동적으로 업데이트
                setupPagination(); // 페이지 설정


            },
            error: function (xhr, status, error) {
                console.error('Error message:', xhr.responseText || error);
            }
        });
    });

    function filteringSurveyCards() {
        // 세션에서 검색 조건을 불러오기
        const searchCriteria = JSON.parse(sessionStorage.getItem('searchCriteria')) || {};
        console.log('searchCre: ', searchCriteria);
        $('.row.row-cols-1').empty();
        $('.pagination').hide();


        // 현재 페이지에 해당하는 설문 데이터 필터링
        // const selectedCcSeq = $('#progress-ccSeq').val() || null;
        const selectedCcSeq = searchCriteria.ccSeq || null;

        let filteredSurveys = surveysData.filter(survey => {
            // ccSeq가 빈 문자열인 경우 모든 설문지를 포함
            if (selectedCcSeq === null || selectedCcSeq == '') {
                return true; // 모든 설문지 포함
            }
            return survey.ccSeq == selectedCcSeq; // 선택된 ccSeq와 일치하는 설문지만 포함
        });

        console.log(filteredSurveys);

        if (searchCriteria.name) {
            filteredSurveys = filteredSurveys.filter(survey => survey.name.includes(searchCriteria.name));
        }
        if (searchCriteria.minAnswerCount) {
            filteredSurveys = filteredSurveys.filter(survey => survey.answerCount >= searchCriteria.minAnswerCount);
        }
        if (searchCriteria.maxAnswerCount) {
            filteredSurveys = filteredSurveys.filter(survey => survey.answerCount <= searchCriteria.maxAnswerCount);
        }

        // 페이지 범위 계산 (1페이지는 추가 버튼 포함 6개, 이후 페이지는 6개)
        const startRow = (currentPage - 1) * pageSize;
        let endRow = startRow + pageSize;

        if (currentPage === 1) {
            endRow -= 1; // 1페이지에서는 추가 버튼이 포함되므로 데이터를 한 개 덜 가져옴
        }

        const currentSurveys = filteredSurveys.slice(startRow, endRow);

        if (currentSurveys.length === 0) {
            $('.row.row-cols-1').append(`
                <div class="no-results-container d-flex flex-column align-items-center justify-content-center text-center p-4 mx-auto">
                    <div class="no-results-icon mb-3">
                        <img src="/resources/img/survey/no-results.png" alt="No Results" class="img-fluid mb-3" style="max-width: 50px;" />
                    </div>
                    <p class="no-results-text h5 text-muted">검색 결과와 일치하는 설문지가 없습니다.</p>
                </div>
            `);
            return;
        }

        var surveyCard = '';

        // 설문지 생성하는 카드
        if (currentPage === 1) {
            surveyCard =
                `<div class="col">
					<div class="card survey-card" data-bs-toggle="modal" data-bs-target="#makeSurvey-modal">
						<div class="add-survey-card">
							<img alt="plusBtn" src="/resources/img/common/plusButton.png"
								>
						</div>
					</div> 
				</div>`;
        }

        if (Array.isArray(currentSurveys)) {
            // 필터링된 설문지 생성
            surveyCard += currentSurveys.map(survey =>
                `<div class="col"> 
                <a href="/survey/${survey.seq}" class="text-decoration-none text-dark">
                    <div class="card each-survey-card d-flex flex-column">
                        <div class="card-body py-1"> 
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="fw-bold mt-3">${survey.name}</p>
                                <span class="badge rounded-pill ${getBadgeClass(survey.ccSeq)} px-2 py-1 fs-6">${getBadgeText(survey.ccSeq)}</span>
                            </div>
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
                                <p>${survey.postDate && survey.endDate ? (survey.postDate) + ' ~ ' + (survey.endDate) : "설문 예정입니다."}</p>
                            </div>
                        </div>
                        <div class="card-footer py-0 d-flex align-items-center">
                            <p>${survey.answerCount}개 응답</p>
                        </div>
                    </div>
                </a>
            </div>`
            ).join('');

            // 페이지네이션 고정을 위한 더미 카드
            const totalCards = currentSurveys.length;
            // const isFirstPage = (currentPage === 1); // 현재 페이지가 1페이지인지 확인
            const dummyCount = (currentPage === 1) ? (5 - totalCards) : (6 - totalCards);

            if (dummyCount > 0) {
                const dummyCards = Array(dummyCount).fill(`<div class="col dummy-card"></div>`)
                    .join('');
                surveyCard += dummyCards;
            }

            // 최종적으로 생성된 HTML을 카드 컨테이너에 추가
            $('.row.row-cols-1').append(surveyCard);
            $('.pagination').show();
        }
    }

    function setupPagination() {
        $('.pagination').empty(); // 페이지네이션 초기화
        const totalPage = Math.ceil(surveysData.length / pageSize); // 총 페이지 수 계산
        const pageBlock = 10;
        const startPage = Math.floor((currentPage - 1) / pageBlock) * pageBlock + 1;
        const endPage = Math.min(startPage + pageBlock - 1, totalPage);

        // 처음으로 버튼 추가
        const firstPageLink = $('<a class="page-link" href="#"> <i class="bi bi-chevron-double-left"></i> </a>')
            .on('click', function (e) {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage = 1; // 첫 페이지로 이동
                    //sessionStorage.setItem("currentPage", currentPage); // 페이지 이동 시 세션 업데이트
                    filteringSurveyCards();
                    setupPagination();
                }
            });

        if (currentPage === 1) {
            firstPageLink.addClass('disabled');
        }

        $('.pagination').append(firstPageLink);

        // 이전 버튼 추가
        const prevPageLink = $('<a class="page-link" href="#"> <i class="bi bi-chevron-left"></i> </a>')
            .on('click', function (e) {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--; // 이전 페이지로 이동
                    filteringSurveyCards();
                    setupPagination();
                }
            });

        if (currentPage === 1) {
            prevPageLink.addClass('disabled'); // 현재 첫 페이지일 경우 비활성화
        }

        $('.pagination').append(prevPageLink);

        // 페이지 링크 추가
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = $('<div class="page-item"></div>')
                .append($('<a class="page-link" href="#"></a>')
                    .text(i)
                    .on('click', function (e) {
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
        const nextPageLink = $('<a class="page-link" href="#"> <i class="bi bi-chevron-right"></i> </a>')
            .on('click', function (e) {
                e.preventDefault();
                if (currentPage < totalPage) {
                    currentPage++; // 다음 페이지로 이동
                    filteringSurveyCards();
                    setupPagination();
                }
            });

        if (currentPage === totalPage) {
            nextPageLink.addClass('disabled'); // 현재 마지막 페이지일 경우 비활성화
        }

        $('.pagination').append(nextPageLink);

        // 맨 마지막으로 버튼 추가
        const lastPageLink = ($('<a class="page-link" href="#"> <i class="bi bi-chevron-double-right"></i> </a>')
            .on('click', function (e) {
                e.preventDefault();
                if (currentPage < totalPage) {
                    currentPage = totalPage; // 마지막 페이지로 이동
                    filteringSurveyCards();
                    setupPagination();
                }
            }));

        if (currentPage === totalPage) {
            lastPageLink.addClass('disabled'); // 현재 마지막 페이지일 경우 비활성화
        }

        $('.pagination').append(lastPageLink);
    }

    // 상태에 따른 배지 클래스 반환
    function getBadgeClass(ccSeq) {
        switch (ccSeq) {
            case 3:
                return 'bg-warning'; // 예정
            case 4:
                return 'bg-primary'; // 진행 중
            case 5:
                return 'bg-secondary'; // 완료
            default:
                return '';
        }
    }

    // 상태에 따른 배지 텍스트 반환
    function getBadgeText(ccSeq) {
        switch (ccSeq) {
            case 3:
                return '생성'; // 예정
            case 4:
                return '진행중'; // 진행 중
            case 5:
                return '완료'; // 완료
            default:
                return '';
        }
    }

    // 날짜 포맷팅 함수
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR'); // 한국 날짜 형식으로 변환
    }

    // 초기화 버튼
    $('#initialBtn').on('click', function () {
        // 모든 텍스트 입력 필드와 날짜 입력 필드를 초기화
        $('#title, #minAnswerCount, #maxAnswerCount, #startCreatedAt, #endCreatedAt, #startUpdatedAt, #endUpdatedAt').val('');
        // 셀렉트 박스를 초기 상태로 설정
        $('#progress-ccSeq').prop('selectedIndex', 0);
        // 배지(span)들에 선택 상태가 있을 경우 초기화
        $('.date-badge').removeClass('selected-badge');

        // 세션에서 검색 조건 삭제
        sessionStorage.removeItem('searchCriteria');

        // 페이지 초기화
        currentPage = 1;

        const requestData = {
            ccSeq: null,
            startCreatedAt: null,
            endCreatedAt: null,
            startUpdatedAt: null,
            endUpdatedAt: null,
            name: '',
            minAnswerCount: null,
            maxAnswerCount: null
        };

        // AJAX 요청으로 모든 데이터를 다시 불러옴
        $.ajax({
            url: '/api/survey/dashboard',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            dataType: 'json',
            success: function (response) {
                surveysData = response.data; // 전체 데이터로 업데이트

                let surveyCount = surveysData.length - 1;
                console.log('surveysData.length: ', surveysData.length);


                if (surveysData.length < pageSize) {
                    surveyCount = surveysData.length;
                }

                $('#surveyCount').text(surveyCount);
                $('#surveyCountContainer').hide();

                // 필터링된 설문 카드를 다시 표시
                filteringSurveyCards();
                setupPagination(); // 페이지 설정
            },
            error: function (xhr, status, error) {
                console.error('Error message:', xhr.responseText || error);
            }
        });

        // 필터링된 설문 카드를 다시 표시
        // filteringSurveyCards();
        // setupPagination(); // 페이지 설정

    });
});

// 검색 조건을 세션 스토리지에 저장하는 함수
function saveSearchCriteria() {
    const searchCriteria = {
        ccSeq: $('#progress-ccSeq').val() || null,
        startCreatedAt: $('#startCreatedAt').val() || null,
        endCreatedAt: $('#endCreatedAt').val() || null,
        startUpdatedAt: $('#startUpdatedAt').val() || null,
        endUpdatedAt: $('#endUpdatedAt').val() || null,
        name: $('#title').val() || '',
        minAnswerCount: $('#minAnswerCount').val() || null,
        maxAnswerCount: $('#maxAnswerCount').val() || null
    };
    sessionStorage.setItem('searchCriteria', JSON.stringify(searchCriteria));
}

// 페이지 로드 시 세션에 저장된 검색 조건을 가져오는 함수
function loadSearchCriteria() {
    const searchCriteria = JSON.parse(sessionStorage.getItem('searchCriteria'));
    if (searchCriteria) {
        $('#progress-ccSeq').val(searchCriteria.ccSeq);
        $('#startCreatedAt').val(searchCriteria.startCreatedAt);
        $('#endCreatedAt').val(searchCriteria.endCreatedAt);
        $('#startUpdatedAt').val(searchCriteria.startUpdatedAt);
        $('#endUpdatedAt').val(searchCriteria.endUpdatedAt);
        $('#title').val(searchCriteria.name);
        $('#minAnswerCount').val(searchCriteria.minAnswerCount);
        $('#maxAnswerCount').val(searchCriteria.maxAnswerCount);
    }
}



