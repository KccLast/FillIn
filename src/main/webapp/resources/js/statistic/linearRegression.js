surveySeq = $('.question-list').data('seq');
console.log('surveySeq: ', surveySeq);
$('.dashboard').text('회귀분석');

$(document).ready(function () {
    // 설문에 대한 질문들 가져오기
    $.ajax({
        url: `/api/statistics/question-list/${surveySeq}`,
        type: 'GET',
        success: function (response) {
            console.log("response:" + JSON.stringify(response, null, 2));
            getQuestionsBySurvey(response.data);
            $('.question-name').text(response.data[0].surveyName)
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
                <input type="radio" name="dependent-radio" id="dependent-radio">
                ${question.questionName}
            </div>
            <div></div>
        `;

        independentQuestion += `
            <div class="my-2">
                <input type="checkbox" name="independent-checkbox" id="independent-checkbox">
                ${question.questionName}
            </div>
            <div></div>
        `;
    });
    $('.dependent-question-container').append(dependentQuestion);
    $('.independent-question-container').append(independentQuestion);
}

// 각 질문(결과, 원인)들 파이썬으로 보내기
// function