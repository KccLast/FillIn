//단계바
// const surveyId = '<%= request.getParameter("surveyId") %>';
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".progress-bar .step").forEach(function (step, index) {
        step.addEventListener("click", function () {
            switch (index) {
                case 0:
                    window.location.href = '/statistic/keyword'; // 키워드 분석 페이지로 이동
                    break;
                case 1:
                    window.location.href = '#'; // K-평균 군집화 페이지로 이동
                    break;
                case 2:
                    window.location.href = '#'; // 군집별 비교분석 페이지, 아직 미정
                    break;
            }
        });
    });
});
//단계바 끝


// 결과 수, 점수 필터 값 업데이트(슬라이더)
function updateResultValue(value) {
    // 결과 수 값을 업데이트
    document.getElementById("result-value").innerText = value;
}

function updateScoreValue(value) {
    // 점수 필터 값을 업데이트
    document.getElementById("score-value").innerText = value;
}

// Ajax 요청을 통한 서버와 연동
$(document).ready(function () {
    let debounceTimer;

    // 키워드 입력시 필터링 (Debounce 적용)
    // 키워드 입력 시 테이블 필터링과 워드 클라우드 생성
    $('input[placeholder="가격"]').on('keyup', function () {
        clearTimeout(debounceTimer);
        let keyword = $(this).val().trim();
        debounceTimer = setTimeout(function () {
            filterTable(keyword); // 테이블 데이터 조회
            // generateWordCloud(keyword); // 워드 클라우드 생성
        }, 300);
    });

    // 워드 클라우드 생성 버튼 클릭 이벤트
    $('#search-btn').click(function () {
        let keyword = $('#keyword-input').val().trim();
        generateWordCloud(keyword);
    });

    // 감정 분석 시작 버튼 클릭 이벤트
    $('#analyze-emotion-btn').click(function () {
        let allTexts = [];
        $(".result-table tbody tr").each(function () {
            allTexts.push($(this).find("td:nth-child(4)").text()); // 콘텐츠 수집
        });

        let combinedText = allTexts.join(" ");
        if (combinedText) {
            analyzeEmotion(combinedText);
            $('#chart-type-selector').show(); // 차트 유형 선택 드롭다운 표시
        } else {
            alert('분석할 텍스트가 없습니다.');
        }
    });

    // 차트 유형 선택 드롭다운 변경 이벤트
    $('#chart-type-selector').change(function () {

        if (window.currentChartData) {
            renderChart(window.currentChartData); // 차트 다시 그리기
        }else {
            console.log("window.currentChartData=====",window.currentChartData)
        }
    });
});

function analyzeEmotion(text) {
    $.ajax({
        url: "/api/statistic/analyzeEmotion",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({content: text}),
        success: function (response) {
            $('#chart-parent').css("display", "flex");
            $('#chart-container').show();

            window.currentChartData = response; // 응답 전역 변수 저장
            renderChart(response); // 차트 렌더링 함수 호출
            $('#chart-type-selector').show(); // 차트 유형 선택 드롭다운 표시
        },
        error: function () {
            alert("감정 분석 중 오류가 발생했습니다.");
        }
    });
}

// 테이블 필터링 함수
function filterTable(keyword) {
    $.ajax({
        url: "/api/statistic/search",
        type: "GET",
        data: {keyword: keyword},
        headers: {
            'Accept': 'application/json',  // 서버가 응답 가능한 형식으로 요청
        },
        success: function (data) {
            console.log("data", data);
            renderTable(data);
        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + " " + error);
        }
    });
}

// 워드 클라우드 생성 함수
function generateWordCloud(keyword) {
    $.ajax({
        url: "/api/statistic/wordcloud",
        type: "GET",
        data: {keyword: keyword},
        success: function (data) {
            WordCloud(document.getElementById('wordCloudContainer'), {
                list: data.map(item => [item.word, item.frequency]),  // 단어 리스트,단어와 빈도수 리스트
                gridSize: 7,  // 그리드 크기. 숫자를 작게 할수록 단어가 더 촘촘하게 배치됨.
                'weightFactor': function (size) {
                    return size * 12;  // 폰트 크기 조정. 숫자를 더 크게 하면 폰트가 커짐.
                },
                fontFamily: 'Times, serif',
                color: 'random-dark',  // 색상 지정, 무작위 어두운 색
                backgroundColor: '#f8f9fc',  // 배경색
                rotateRatio: 0.5,  // 회전 비율(단어)
                minSize: 15,  // 최소 폰트 크기
            });
        },
        error: function () {
            alert("워드 클라우드를 생성하는 중 오류가 발생했습니다.");
        }
    });
}

// 서버에서 받은 데이터를 테이블에 표시하는 함수
function renderTable(data) {
    let tbody = $(".result-table tbody");
    tbody.empty();  // 기존 데이터 삭제
    if (data.length === 0) {
        tbody.append("<tr><td colspan='5'>검색 결과가 없습니다.</td></tr>");
    } else {
        data.forEach(function (item) {
            tbody.append(`
                    <tr>
                        <td>${item.seq}</td>
                        <td>${item.questionSeq}</td>
                        <td>${item.participantSeq}</td>
                        <td>${item.contents}</td>
                        <td>${item.answerDate}</td>
                    </tr>
                `);
        });
    }
}


// 차트 렌더링 함수
function renderChart(data) {
    if (!data || !data.document || !data.document.confidence) {
        console.error("Invalid data for chart:", data);
        return; // 데이터가 유효하지 않으면 함수 종료
    }
// .getContext('2d')
    const ctx = document.getElementById('chart-container');
    const chartType = $('#chart-type-selector').val(); // 선택된 차트 유형

    if (window.currentChart) {
        window.currentChart.destroy(); // 기존 차트 제거
    }

// 차트 유형에 따라 새 차트 생성
    if (chartType === 'pie') {
        window.currentChart = drawPieChart(ctx, data); // 파이 차트 그리기
    } else if (chartType === 'bar') {
        window.currentChart = drawBarChart(ctx, data); // 막대 그래프 그리기
    }
}

// 파이 차트 그리기
function drawPieChart(ctx, data) {
    let pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Positive', 'Neutral', 'Negative'], // 감정 레이블
            datasets: [{
                label: 'Sentiment Analysis',
                data: [
                    data.document.confidence.positive,
                    data.document.confidence.neutral,
                    data.document.confidence.negative
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            // maintainAspectRatio: false // 비율 유지하지 않음
        }
    });
    return pieChart; // 생성된 차트 객체 반환
}

// 막대 차트 그리기
function drawBarChart(ctx, data) {
    let barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Positive', 'Neutral', 'Negative'], // 감정 레이블
            datasets: [{
                label: 'Sentiment Analysis',
                data: [
                    data.document.confidence.positive,
                    data.document.confidence.neutral,
                    data.document.confidence.negative
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true
        }
    });
    return barChart; // 생성된 차트 객체 반환
}

