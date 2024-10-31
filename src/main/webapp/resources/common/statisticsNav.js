seq = JSON.parse(`${surveyJson}`).seq;
url = JSON.parse(`${surveyJson}`).url;

console.log('seq: ', seq);

$(document).ready(function () {
    //clickLinerRegression();
});

function clickLinerRegression() {
    $('#regression-statistics').on('click', function () {
       alert('click');
    });
}