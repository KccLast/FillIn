let chart;

$(document).ready(function () {
    function loadData() {
        $.ajax({
            url: `/api/statistic/clustering/${surveyId}`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // 질문 로드
                updateSelectQuestion(response.data);
                $('#customRange3').val(2);
            },
            error: function (error) {
                console.error("Error fetching initial data : ", error);
            }
        })
    }

    loadData();
});

function updateSelectQuestion(response) {
    const questionSelect = $("#question-select");

    response.forEach((question) => {
        questionSelect.append(new Option(`${question.questionOrder}번 ${question.questionName}`, question.questionId));
    });
}

$('#analysis-btn').on('click', function () {
    var questionId = $('#question-select').val() || 0;
    var n_cluster = $('#customRange3').val();
    console.log(n_cluster);

    requestKmeans(questionId, n_cluster);
})

$('#update-btn').on('click', function () {
    var questionId = $('#question-select').val();
    $('#customRange3').val(2);
    // var n_cluster = $('#customRange3').val();
    // console.log(n_cluster);

    if (!questionId) {
        alert('질문을 선택해주세요.');
        return;
    }

    requestKmeans(questionId, 2);
});

function requestKmeans(questionId, n_cluster) {
    $.ajax({
        url: `/api/statistic/clustering?questionId=${questionId}`,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            // console.log(response.data);
            // python으로 요청 보내기
            $.ajax({
                url: `http://localhost:8000/api/statistic/clustering/${n_cluster}`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(response.data),
                dataType: 'json',
                success: function (response) {
                    // console.log(response);
                    const seriesData = {};

                    // 클러스터별로 데이터 그룹화
                    response.data.forEach(item => {
                        if (!seriesData[item.Cluster]) {
                            seriesData[item.Cluster] = [];
                        }
                        seriesData[item.Cluster].push([item.PCA1, item.PCA2, item.answerContent]);
                    });

                    // ApexCharts에 맞는 시리즈 형태로 변환
                    const series = Object.keys(seriesData).map(cluster => ({
                        name: `Cluster ${cluster}`,
                        data: seriesData[cluster]
                    }));

                    // console.log(series);

                    updateChart(series); // 차트 업데이트 함수
                },
                error: function (error) {
                    console.error("Error fetching initial data: ", error);
                }
            })
        },
        error: function (error) {
            console.error("Error fetching initial data: ", error);
        }
    })
}

function updateChart(series) {
    // 차트 이미 생성된 경우
    if (chart) {
        chart.updateSeries(series); // 기존 차트에 데이터 업데이트
    } else {
        // 차트가 생성되지 않은 경우 새로운 차트 생성
        var options = {
            series: series, // Ajax 응답에서 받은 데이터로 시리즈 설정
            chart: {
                height: 350,
                type: 'scatter',
                zoom: {
                    enabled: true,
                    type: 'xy'
                }
            },
            xaxis: {
                tickAmount: 10,
                labels: {
                    formatter: function (val) {
                        return parseFloat(val).toFixed(1);
                    }
                },
                title: {
                    text: 'X (PCA Component 1)' // X축 제목
                }
            },
            yaxis: {
                tickAmount: 7,
                title: {
                    text: 'Y (PCA Component 2)' // Y축 제목
                }
            },
            tooltip: {
                custom: function ({series, seriesIndex, dataPointIndex, w}) {
                    const answerContent = w.config.series[seriesIndex].data[dataPointIndex][2]; // answerContent 추출
                    return '<div class="arrow_box">' +
                        '<span>PCA1: ' + series[seriesIndex][dataPointIndex][0] + '</span><br>' +
                        '<span>PCA2: ' + series[seriesIndex][dataPointIndex][1] + '</span><br>' +
                        '<span>Answer: ' + answerContent + '</span>' +
                        '</div>';
                }
            }
        };

        chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }
}

