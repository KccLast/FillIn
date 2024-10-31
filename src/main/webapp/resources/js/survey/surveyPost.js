var seq, url;

var seq = JSON.parse(`${surveyJson}`).seq;

// jQuery로 페이지 로드 시 오늘 날짜 설정
$(document).ready(function () {
    const today = getTodayDate();
    $("#startDate").val(today);
    $("#endDate").val(today); // 필요에 따라 다르게 설정 가능

    seq = JSON.parse(`${surveyJson}`).seq;
    url = JSON.parse(`${surveyJson}`).url;
    console.log('jsjsjsjs ' + seq + ' : ' + url);

    $('#applyButton').click(function () {
        // 모집단 추정불가 체크 여부 확인
        const isEstimateUnknown = $('#estimateCheck').is(':checked');
        const confidenceLevel = parseFloat($('#confidenceLevel').val().replace(/[^0-9.]/g, '')); // 신뢰도 값 가져오기
        const marginOfError = parseFloat($('#marginOfError').val().replace(/[^0-9.]/g, '')); // 표본오차 값 가져오기

        // 신뢰도에 따른 Z 값 매핑
        const Z = {
            "90": 1.645,
            "95": 1.96,
            "99": 2.576
        }[confidenceLevel] || 1.96;  // 기본값 95% 신뢰도

        // 표본오차에 따른 E 값 매핑
        const E = marginOfError / 100;

        let sampleSize;

        if (isEstimateUnknown) {
            // 모집단 추정 불가일 때, 신뢰도와 표본오차만으로 계산
            sampleSize = calculateSampleSizeWithoutPopulation(Z, E);
        } else {
            // 예상 모집단 값을 가져와 계산
            const estimatedPopulation = parseInt($('#populationEstimate').val(), 10);
            sampleSize = calculateSampleSizeWithPopulation(estimatedPopulation, Z, E);
        }

        // 계산 결과를 표본 집단 입력 필드에 표시
        $('#sampleSize').val(sampleSize);
    });

    // 모집단 추정 불가 체크박스 클릭 시 예상 모집단 필드 초기화, 비활성화
    $('#estimateCheck').on('change', function () {
        const populationInput = $('#populationEstimate');

        if ($(this).is(':checked')) { // 모집단 추정 불가
            populationInput.val('');         // 입력 초기화
            populationInput.prop('disabled', true);  // 비활성화
        } else { // 모집단 추정
            populationInput.prop('disabled', false); // 활성화
        }
    });

    // 게시 버튼 클릭
    $('#confirmPost').on('click', function () {
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        const sampleSize = $('#sampleSize').val();
        const confidenceLevel = parseFloat($('#confidenceLevel').val().replace(/[^0-9.]/g, '')); // 신뢰도 값 가져오기
        const marginOfError = parseFloat($('#marginOfError').val().replace(/[^0-9.]/g, '')); // 표본오차 값 가져오기

        // 데이터 유효성 검사
        if (!startDate || !endDate) {
            alert('시작일, 종료일을 선택해주세요.');
            return;
        }

        /**
         * post 요청 보내고
         * url 요청 따로 보내자
         */
        $.ajax({
            url: `/api/survey/post`,
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                surveyId: seq,
                startDate: startDate,
                endDate: endDate,
                sampleSize: sampleSize,
                reliability: confidenceLevel,
                allowableError: marginOfError
            }),
            success: function (response) {
                url = response.data.url;
                updateButton();
                $('#postModal').modal('hide'); // 모달 닫기
            },
            error: function () {
                alert('게시 요청에 실패했습니다. 다시 시도해주세요.');
            }
        });
    });

    // 공유 버튼을 클릭하면 설문 링크를 모달에 표시
    $('#shareButton').on('click', function () {
        // 설문 링크를 input에 넣어주기
        const surveyUrl = `https://fillin/survey/url/` + url; // 실제 설문 URL로 변경
        document.getElementById("surveyLink").value = surveyUrl;
    });

});

// kakao 공유하기
function shareMessage() {
    const title = JSON.parse(`${surveyJson}`).name;

    Kakao.Share.sendCustom({
        templateId: 113722,
        templateArgs: {
            survey_name: title,
            url: url
        },
    });
}

// 게시 <-> 공유 버튼 업데이트
function updateButton() {
    // console.log(typeof url);
    if (url === null) {
        // URL이 null일 때 '게시' 버튼 표시
        // console.log('게시');
        document.getElementById("postButton").style.display = 'block';
        document.getElementById("shareButton").style.display = 'none';
    } else {
        // URL이 null이 아닐 때 '공유' 버튼 표시
        // console.log('공유');
        document.getElementById("postButton").style.display = 'none';
        document.getElementById("shareButton").style.display = 'block';
    }
}

// 페이지 로드 시 실행
window.onload = updateButton;

// 링크 복사 기능
function copyLink() {
    const linkInput = document.getElementById("surveyLink");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // 모바일 호환성
    document.execCommand("copy");

    // 복사 알림 메시지
    alert("링크가 복사되었습니다!");
}

// 모집단 추정불가일 때 표본 크기 계산 함수
function calculateSampleSizeWithoutPopulation(Z, E) {
    // 신뢰도와 표본오차를 바탕으로 표본 크기 계산
    return Math.ceil((Z * Z * 0.5 * 0.5) / E ** 2);
}

// 예상 모집단이 있을 때 표본 크기 계산 함수
function calculateSampleSizeWithPopulation(population, Z, E) {
    // 모집단과 신뢰도, 표본오차를 바탕으로 표본 크기 계산
    const n0 = (Z * Z * 0.5 * (1 - 0.5)) / (E * E);
    return Math.ceil((n0 * population) / (n0 + population - 1));
}

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}