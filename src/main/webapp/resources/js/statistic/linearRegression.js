surveySeq = $('.question-list').data('seq');
console.log('surveySeq: ', surveySeq);
// 헤더 타이틀 설정
$('.dashboard').text('회귀분석');
// $('#regression-statistics').add('red');

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
                <input type="radio" name="dependent-radio" id="dependent-radio-${index}" data-index="${index}">
                ${question.questionName}
            </div>
            <div></div>
        `;

        independentQuestion += `
            <div class="my-2">
                <input type="checkbox" name="independent-checkbox" id="independent-checkbox-${index}" data-index="${index}">
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
    // 선택한 체크박스 값들
    const selectedIndependentQuestions = $('input[name="independent-checkbox"]:checked')
        .map(function () {
            return $(this).val();
        }).get();

    return {
        dependent: selectedDependentQuestion,
        independent: selectedIndependentQuestions
    };
}

function sendQuestions() {
    const selectedQuestion = collectSelectedQuestion();
    console.log(selectedQuestion);
    $.ajax({
        url: ''
    });
}