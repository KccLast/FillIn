surveySeq = $('.question-list').data('seq');

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
                sendQuestions(response.data);
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

function sendQuestions(surveyData) {
    const selectedQuestion = collectSelectedQuestion();
    console.log('selectedQuestion: ', selectedQuestion);

    if (!selectedQuestion.dependent || selectedQuestion.independent.length === 0) {
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
            receiveRegressionData(surveyData, selectedQuestion.dependent);
        },
        error: function (xhr, status, error) {
            console.error('AJAX 요청 실패:', xhr.responseText || error);
        }
    });
}

// 파이썬에서 회귀분석 데이터 받기
function receiveRegressionData(questionContents, dependent) {
    $.ajax({
        url: '/api/statistics/regression-result-data',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log("서버에서 받은 데이터:", response);
            drawRegressionChart(response.data, questionContents, dependent);
        },
        error: function (xhr, status, error) {
            console.error("데이터 요청 중 에러 발생:", error);
        }
    });
}


// 회귀분석 차트 그리기
function drawRegressionChart(response, questionContents, dependent) {
    console.log('response: ', response);  // response 데이터 전체 확인
    console.log('dependent: ', dependent);  // 종속 질문 확인
    console.log('questionContents - drawRegre: ', questionContents);  // 질문 내용 확인

    // 기존 차트가 존재하면 제거
    if (regressionChart) {
        regressionChart.destroy();
    }

    // 종속 질문에 해당하는 데이터 찾기
    const dependentAnswer = questionContents.find(question => question.questionSeq === Number(dependent));
    console.log('dependentAnswer: ', dependentAnswer);  // 종속 질문 데이터 확인

    // x 값으로 사용할 인덱스 (1부터 시작하는 값)
    const xValues = response.predictions.map((prediction, index) => index + 1);
    console.log('xValues: ', xValues);  // x축 값 확인

    // 기울기(m)와 절편(b)
    const m = response.coefficients[0];
    const b = response.intercept;
    console.log('m (기울기): ', m);  // 기울기 확인
    console.log('b (절편): ', b);  // 절편 확인

    // predictions가 [x, y] 형태일 때
    const minY = Math.min(...response.predictions);  // p[1]은 y 값
    const maxY = Math.max(...response.predictions);  // p[1]은 y 값

    const yValues = response.predictions.map(p => p);

    console.log('yValues: ', yValues);

    // const minPredictionY = Math.min(...yValues);
    // const maxPredictionY = Math.max(...yValues);


    // y = mx + b 식을 사용해 회귀 직선의 y 값을 계산
    // const regressionLine = xValues.map(x => {
    //     const yValue = m * x + b;
    //
    //     // 회귀 직선의 값이 예측값의 범위에 맞도록 조정
    //     const adjustedYValue = (yValue - minY) / (maxY - minY) * (maxPredictionY - minPredictionY) + minPredictionY;
    //     return Math.round(adjustedYValue * 100) / 100;  // 소수점 2자리로 반올림
    // });

    // const regressionLine = xValues.map(x => m * x + b);
    // console.log('Regression Line (원래 값): ', regressionLine);
    //
    // console.log('Adjusted regressionLine: ', regressionLine);  // 조정된 회귀 직선 y 값

    const regressionLineOriginal = xValues.map(x => m * x + b);

// 회귀 직선의 원래 최소값과 최대값 계산
    const minRegressionY = Math.min(...regressionLineOriginal);
    const maxRegressionY = Math.max(...regressionLineOriginal);

// 예측값의 최소/최대값 구하기
    const minPredictionY = Math.min(...yValues);
    const maxPredictionY = Math.max(...yValues);

// 예측값 범위에 맞게 회귀 직선을 조정
    const regressionLine = regressionLineOriginal.map(yValue => {
        return ((yValue - minRegressionY) / (maxRegressionY - minRegressionY)) * (maxPredictionY - minPredictionY) + minPredictionY;
    });

    console.log('Adjusted regressionLine: ', regressionLine);  // 조정된 회귀 직선 y 값

    // 차트 데이터 생성 (예측값을 사용하여 산포도)
    const chartData = response.predictions.map((prediction, index) => ({
        x: xValues[index],
        y: prediction
    }));
    console.log('chartData (예측값): ', chartData);  // 예측값 확인

    console.log(response.predictions); // predictions 배열의 구조 확인



    console.log('Adjusted minY: ', minY);
    console.log('Adjusted maxY: ', maxY);

    // 예측 값과 회귀 직선의 예측값 비교
    console.log('Predictions: ', response.predictions);
    console.log('Regression Line: ', regressionLine);

    // 차트 그리기
    const ctx = document.getElementById('regression-chart').getContext('2d');

    console.log('xValues: ', xValues);
    console.log('regressionLine: ', regressionLine);
    console.log('chartData: ', chartData);
    console.log('minY: ', minY);
    console.log('maxY: ', maxY);

    regressionChart = new Chart(ctx, {
          // 산포도 그래프 타입 설정
        data: {
            datasets: [
                {
                    type: 'scatter',
                    label: '예측값',  // 예측값을 기반으로 한 데이터
                    data: chartData,  // 예측값
                    borderColor: 'rgba(75, 192, 192, 1)',  // 예측값의 색상
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',  // 영역의 색상
                    fill: true,  // 선 아래를 채움
                    tension: 0.1  // 선의 부드러움 조정
                },
                {
                    type: 'line',
                    label: '회귀 직선',  // 회귀 직선
                    data: xValues.map((x, index) => ({
                        x: x,
                        y: regressionLine[index]
                    })),
                    borderColor: 'rgba(255, 99, 132, 1)',  // 회귀 직선 색상
                    borderWidth: 2,  // 선의 두께
                    fill: false,  // 회귀 직선은 선 아래를 채우지 않음
                    tension: 0 // 직선으로 설정
                }
            ]
        },
        options: {
            responsive: true,  // 반응형 그래프
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '질문 항목 순서'  // x축 레이블
                    },
                    ticks: {
                        beginAtZero: true  // x축 시작점 설정
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '예측값'  // y축 레이블
                    },
                    min: minY - 10,  // y축 최소값 설정 (조정 가능)
                    max: maxY + 10,  // y축 최대값 설정 (조정 가능)
                    ticks: {
                        stepSize: (maxY - minY) / 5  // 간격을 조금 더 세밀하게 설정
                    }
                }
            }
        }
    });
}

