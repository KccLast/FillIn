surveySeq = $('.question-list').data('seq');
console.log('surveySeq: ', surveySeq);

let regressionChart;

// 헤더 타이틀 설정
$('.dashboard').text('회귀분석');

$(document).ready(function () {
    // 설문에 대한 질문들 가져오기
    $.ajax({
        url: `/api/statistics/question-list/${surveySeq}`,
        type: 'GET',
        success: function (response) {
            console.log("response:" + JSON.stringify(response, null, 2));
            // 설문지 이름 불러오기
            $('.question-name').text(response.data[0].surveyName);
            // 분석할 질문 화면에 뿌리기
            getQuestionsBySurvey(response.data);
            collectSelectedQuestion();

            $('#start-regression').on('click', function () {
                sendQuestions();
            });
        },
        error: function (xhr, status, error) {
            console.error('AJAX 요청 실패:', xhr.responseText || error);
        }
    });

});

// 가져온 질문 리스트 추가(결과 질문, 원인 질문)
function getQuestionsBySurvey(questions) {
    $('.dependent-question-container').empty();
    $('.independent-question-container').empty();

    let dependentQuestion = '';
    let independentQuestion = '';

    questions.forEach(function (question, index) {
        dependentQuestion += `
            <div class="my-2">
                <input type="radio" name="dependent-radio" id="dependent-radio-${index}" data-index="${index}" value="${question.questionSeq}">
                ${question.questionName}
            </div>
            <div></div>
        `;

        independentQuestion += `
            <div class="my-2">
                <input type="checkbox" name="independent-checkbox" id="independent-checkbox-${index}" data-index="${index}" value="${question.questionSeq}">
                ${question.questionName}
            </div>
            <div></div>
        `;
    });
    $('.dependent-question-container').append(dependentQuestion);
    $('.independent-question-container').append(independentQuestion);

    $('input[name="dependent-radio"]').on('change', handleRadioChange);
    $('input[name="independent-checkbox"]').on('change', handleCheckboxChange);
}

// 결과 질문 라디오 버튼 클릭 이벤트 처리
function handleRadioChange() {
    const radioIndex = $(this).data('index');

    // 선택한 라디오 버튼의 인덱스와 같은 체크박스가 체크되었는지 확인
    const isIndependentChecked = $(`input[name="independent-checkbox"][id="independent-checkbox-${radioIndex}"]`).is(':checked');

    if (isIndependentChecked) {
        swal({
            type: 'warning',
            text: '결과 질문과 원인 질문이 같습니다. 다른 질문을 선택해주세요.'
        });
        $(`input[name="independent-checkbox"][id="independent-checkbox-${radioIndex}"]`).prop('checked', false);
    }
}

// 원인 질문 체크박스 클릭 이벤트 처리
function handleCheckboxChange() {
    const checkboxIndex = $(this).data('index');
    const isChecked = $(this).is(':checked');

    if (isChecked) {
        const isDependentChecked = $(`input[name="dependent-radio"][id="dependent-radio-${checkboxIndex}"]`).is(':checked');
        if (isDependentChecked) {
            swal({
                type: 'warning',
                text: '결과 질문과 원인 질문이 같습니다. 다른 질문을 선택해주세요.'
            });
            $(this).prop('checked', false);
        }
    }
}

// 체크한 질문 파이썬으로 보내기
function collectSelectedQuestion() {
    // 선택한 라디오 버튼의 값
    const selectedDependentQuestion = $('input[name="dependent-radio"]:checked').val();
    console.log('selectedDependentQuestion: ', selectedDependentQuestion);

    // 선택한 체크박스 값들
    const selectedIndependentQuestions = $('input[name="independent-checkbox"]:checked')
        .map(function () {
            return $(this).val();
        }).get();

    console.log('selectedIndependentQuestions: ', selectedIndependentQuestions);

    return {
        dependent: selectedDependentQuestion,
        independent: selectedIndependentQuestions
    };
}

function sendQuestions() {
    const selectedQuestion = collectSelectedQuestion();
    console.log('selectedQuestion: ', selectedQuestion);

    if(!selectedQuestion.dependent || selectedQuestion.independent.length === 0) {
        swal({
           type: 'warning',
           text: '결과 질문과 원인 질문을 모두 선택해 주세요.'
        });
        return;
    }

    const requestData = {
        surveySeq: $('.question-list').data('seq'),
        dependentQuestion: selectedQuestion.dependent,
        independentQuestions: selectedQuestion.independent
    };

    console.log(requestData)

    $.ajax({
        url: '/api/statistics/regression-analysis',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData),
        success: function (response) {
            console.log('서버 응답:', response);
            receiveRegressionData();
        },
        error: function (xhr, status, error) {
            console.error('AJAX 요청 실패:', xhr.responseText || error);
        }
    });
}

// 파이썬에서 회귀분석 데이터 받기
function receiveRegressionData() {
    $.ajax({
        url: '/api/statistics/regression-result-data',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log("서버에서 받은 데이터:", response);
            drawRegressionChart(response.data);
        },
        error: function(xhr, status, error) {
            console.error("데이터 요청 중 에러 발생:", error);
        }
    });
}


// 회귀분석 차트 그리기
function drawRegressionChart(response) {
    console.log('#####');
    console.log('response: ', response);

    // 기존 차트가 존재하면 제거
    if (regressionChart) {
        regressionChart.destroy();
    }

    const ctx = document.getElementById('regression-chart').getContext('2d');

    const chartData = response.predictions.map((prediction, index) => ({
        x: index + 1,  // x 좌표 값으로 인덱스 사용 (1부터 시작)
        y: prediction   // y 좌표 값은 예측값
    }));

    regressionChart = new Chart(ctx, {
        type: 'scatter',  // 선형 그래프
        data: {
            datasets: [{
                label: '회귀 분석 결과',
                data: chartData,  // 예측값을 기반으로 한 데이터
                borderColor: 'rgba(75, 192, 192, 1)',  // 선의 색상
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // 영역의 색상
                fill: true,  // 선 아래를 채움
                tension: 0.1  // 선의 부드러움 조정
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    beginAtZero: true  // y 축이 0부터 시작하도록 설정
                }
            }
        }
    });
}