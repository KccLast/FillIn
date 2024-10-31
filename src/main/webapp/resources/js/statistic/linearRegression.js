$(document).ready(function () {
    // 설문에 대한 질문들 가져오기
    $.ajax({
        url: '/api/statistics/question-list/'
    });
});