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

$('#next-btn').on('click', function () {
    var questionId = $('#question-select').val();

    // 클러스터링된 데이터를 가져와서 필요한 정보만 추출
    if (!chart) {
        alert('차트가 아직 생성되지 않았습니다. 분석을 먼저 수행하세요.');
        return;
    }

    const clustersData = chart.w.config.series; // 차트에 있는 시리즈 데이터 접근
    const formattedData = [];

    // 클러스터 데이터를 순회하면서 answerContent, answerDate, cluster 번호 추출
    clustersData.forEach((cluster, clusterIndex) => {
        cluster.data.forEach(data => {
            formattedData.push({
                cluster: clusterIndex + 1,  // 클러스터 번호
                answerContent: data[2],     // answerContent
                answerDate: data[3]         // answerDate
            });
        });
    });

    // 동적으로 폼 생성
    var form = $('<form></form>');
    form.attr('method', 'POST');
    form.attr('action', `/statistic/keyword?surveySeq=${surveyId}&questionSeq=${questionId}`);

    // formattedData를 JSON 문자열로 변환해서 숨겨진 필드로 추가
    var input = $('<input>')
        .attr('type', 'hidden')
        .attr('name', 'clusteringData')
        .attr('value', JSON.stringify(formattedData));
    form.append(input);

    // 폼을 body에 추가하고 제출
    $('body').append(form);
    form.submit();

    // console.log("Formatted Data: ", JSON.stringify(formattedData)); // 데이터 구조 확인
    //
    // $.ajax({
    //     url: `/statistic/keyword?surveySeq=${surveyId}&questionSeq=${questionId}`,
    //     type: 'POST',
    //     contentType: 'application/json',
    //     data: JSON.stringify(formattedData),
    //     success: function (response) {
    //         console.log(response);
    //         window.location.href = response;
    //     },
    //     error: function (error) {
    //         console.log("Error during submission: ", error);
    //     }
    // });
});

function requestKmeans(questionId, n_cluster) {
    $.ajax({
        url: `/api/statistic/clustering?questionId=${questionId}`,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response.data);
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
                        seriesData[item.Cluster].push([item.PCA1, item.PCA2, item.answerContent, item.answerDate]);
                    });

                    // ApexCharts에 맞는 시리즈 형태로 변환
                    const series = Object.keys(seriesData).map(cluster => ({
                        name: `Cluster ${cluster}`,
                        data: seriesData[cluster]
                    }));

                    // console.log(series);

                    updateChart(series); // 차트 업데이트 함수
                    updateTable(series); // 테이블 업데이트 함수
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
                    const answerDate = w.config.series[seriesIndex].data[dataPointIndex][3];
                    return '<div class="arrow_box">' +
                        // '<span>PCA1: ' + series[seriesIndex][dataPointIndex][0] + '</span><br>' +
                        // '<span>PCA2: ' + series[seriesIndex][dataPointIndex][1] + '</span><br>' +
                        '<span>Date: ' + answerDate + '</span>' +
                        '<span>Answer: ' + answerContent + '</span>' +
                        '</div>';
                }
            }
        };

        chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }
}

function updateTable(series) {
    const tableBody = $('#table-body'); // 테이블의 tbody 선택
    tableBody.empty(); // 기존 테이블 데이터 삭제

    // 시리즈 데이터를 순회하며 테이블에 삽입
    series.forEach((cluster, clusterIndex) => {
        cluster.data.forEach((data, dataIndex) => {
            const row = `
                <tr>
                    <td>${data[3]}</td> <!-- answerDate -->
                    <td>${clusterIndex + 1}</td> <!-- cluster no -->
                    <td>${data[2]}</td> <!-- answerContent -->
                </tr>
            `;
            tableBody.append(row); // 테이블에 행 추가
        });
    });
}
