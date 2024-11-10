surveySeq = $('.question-list').data('seq');

let regressionChart;
let answerData;

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
                getAnswerData();
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
            receiveRegressionData(surveyData, selectedQuestion);
        },
        error: function (xhr, status, error) {
            console.error('AJAX 요청 실패:', xhr.responseText || error);
        }
    });
}

// 파이썬에서 회귀분석 데이터 받기
function receiveRegressionData(questionContents, selectedQuestion) {
    $.ajax({
        url: '/api/statistics/regression-result-data',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log("서버에서 받은 데이터:", response);
            drawRegressionChart(response.data, questionContents, selectedQuestion, answerData);
        },
        error: function (xhr, status, error) {
            console.error("데이터 요청 중 에러 발생:", error);
        }
    });
}

// 사용자 응답 가져오기
function getAnswerData() {
    $.ajax({
       url: '/api/statistics/answer-data',
       type: 'GET',
       dataType: 'json',
       success: function (response) {
           console.log('사용자 응답 response: ', response);
           console.log("Participant Answers:", response.data.questionResponses);
           answerData = response.data.questionResponses;
       },
        error: function(xhr, status, error) {
            console.error("AJAX 요청 실패:", status, error);
        }
    });
}

// 회귀분석 차트 그리기
function drawRegressionChart(response, questionContents, selectedQuestion, answerData) {
    // 기존 차트가 존재하면 제거
    if (regressionChart) {
        regressionChart.destroy();
    }

    console.log("회귀 계수:", response.coefficients);
    console.log("절편:", response.intercept);
    console.log('answerData: ', answerData);


    // 종속 질문에 해당하는 데이터 찾기
    const dependentAnswer = questionContents.find(question => question.questionSeq === Number(selectedQuestion.dependent));
    const dependentQuestionName = dependentAnswer.questionName;

    console.log('selectedQuestion: ', selectedQuestion);

    // x축 값 (질문 순서 또는 인덱스)
    // const xValues = Array.from({ length: answerData.length }, (_, i) => i + 1);
    //const xValues = answerData.map((answer) => selectedQuestion.map(seq => answer[seq]));
    const xValues = answerData.map(answer => {
        return selectedQuestion.independent.map(seq => {
            if (answer.questionSeq === seq) {
                return answer.questionItemSeq;
            }
            return null;
        }).filter(item => item !== null);
    }).flat();

    console.log("xValues:", xValues);
    // 회귀 직선의 y 값 계산
    const regressionLine = xValues.map(x => response.coefficients[0] * x + response.intercept);

    // 실제 응답 데이터
    const chartData = answerData.map((answer, index) => ({
        x: index + 1, // 순서
        y: answer.questionItemSeq // 실제 응답값을 수치로 변환 필요
    }));

    console.log("응답 데이터:", chartData.map(d => d.y));

    // y 축 자동 범위 계산
    const yMin = Math.min(...chartData.map(d => d.y), ...regressionLine);
    const yMax = Math.max(...chartData.map(d => d.y), ...regressionLine);

    const ctx = document.getElementById('regression-chart').getContext('2d');

    regressionChart = new Chart(ctx, {
        data: {
            labels: xValues,
            datasets: [
                {
                    type: 'scatter',
                    label: '실제 데이터',
                    data: chartData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.1
                },
                {
                    type: 'line',
                    label: '회귀 직선',
                    data: xValues.map((x, index) => ({ x: x, y: regressionLine[index] })),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '질문 항목 순서'
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: dependentQuestionName
                    },
                    // min: yMin - 5, // 범위 여백 조정
                    // max: yMax + 5, // 범위 여백 조정
                    min: 350,  // 데이터와 회귀 직선이 겹치는 범위로 조정
                    max: 400,
                    ticks: {
                        stepSize: Math.round((yMax - yMin) / 5) // 적절한 스텝 크기
                    }
                }
            }
        }
    });
}

