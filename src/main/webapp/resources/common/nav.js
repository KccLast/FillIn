seq = JSON.parse(`${surveyJson}`).seq;
url = JSON.parse(`${surveyJson}`).url;

console.log('seq: ', seq);

$(document).ready(function () {
    clickLinerRegression();
});

function clickLinerRegression() {
    $('#regression-nav').on('click', function () {
        $.ajax({
            url: `/statistics/liner-regression/${seq}`,
            type: 'GET',
            error: function (xhr, status, error) {
                console.error('AJAX 요청 실패:', xhr.responseText || error);
            }
        });

        window.location.href = `/statistics/liner-regression/${seq}`;
    });
}