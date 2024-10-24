var hitsChart;
var quanChart;
var questionsList = [];
var quanQuestionList;
var qualQuestionList;

$(document).ready(function () {
    const loadingElement = $("#loading");
    const contentElement = $("#content");

    // 데이터 불러오는 함수
    function loadData() {
        // console.log('Loading spinner should be visible now.');
        // 로딩 시작 시 로딩 화면 표시
        loadingElement.show();
        contentElement.hide();

        // 페이지 로그되었을 때 AJAX 요청 보냄
        $.ajax({
            url: `/api/statistic/${surveyId}?startDate=${postDate}&endDate=${endDate}&questionSeq=0&contents=`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // 참여자 수 그래프
                updateParticipantsPage(response.data);
                // 조회수 그래프
                updateHitsPage(response.data);
                // 질문 리스트
                updateQuestionList(response.data);
                // 질문, 문항 로드
                updateSelectQuestion(response.data);

                console.log(response.data);

                // 로딩 완료 후 로딩 화면 숨김
                loadingElement.hide();
                contentElement.show();
            },
            error: function (error) {
                console.error("Error fetching initial data: ", error);
            }
        });

        $('#search-input').on('click', function () {
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();
            var questionId = $('#questionSelect').val() === '' ? 0 : $('#questionSelect').val();
            var itemContent = $('#itemSelect').val() === null ? '' : $('#itemSelect').val();

            console.log(questionId + " : " + itemContent);

            // 데이터 유효성 검사
            if (!startDate || !endDate) {
                alert('시작일, 종료일을 선택해주세요.');
                return;
            }

            // AJAX 요청
            $.ajax({
                url: `/api/statistic/${surveyId}?startDate=${startDate}&endDate=${endDate}&questionSeq=${questionId}&contents=${itemContent}`,
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    // 참여자 수 그래프
                    updateParticipantsPage(response.data);
                    // 조회수 그래프
                    updateHitsPage(response.data);
                    // 질문 리스트
                    updateQuestionList(response.data);
                    // 질문, 문항 로드
                    updateSelectQuestion(response.data);

                    // 로딩 완료 후 로딩 화면 숨김
                    loadingElement.hide();
                    contentElement.show();
                },
                error: function (error) {
                    console.error("Error fetching initial data: ", error);
                }
            });
        })
    }

    // 페이지 로드 시 데이터 불러오기
    loadData();
})


function updateParticipantsPage(response) {
    const progressPercentage = response.participantsCount / response.targetCount * 100;
    document.getElementById('progress-bar-fill').style.width = `${progressPercentage}%`;
    document.getElementById('progress-bar-fill').textContent = `${response.participantsCount}명`;
    document.getElementById('progress-bar-total').textContent = `${response.targetCount}명`;
}

function updateHitsPage(response) {
    const totalViews = [];
    const startCount = [];
    const completedCount = [];
    const labels = [];

    // console.log(response.hitsResponseList);

    // 서버에서 받은 데이터를 이용해 배열을 업데이트
    response.hitsResponseList.forEach(hit => {
        totalViews.push(hit.totalViews);
        startCount.push(hit.startCount);
        completedCount.push(hit.completedCount);
        labels.push(hit.occurDate);
    });

    // 기존 차트가 있으면 제거
    if (hitsChart) {
        hitsChart.destroy();
    }

    // Chart.js로 차트 업데이트
    const ctx = document.getElementById('hitsChart').getContext('2d');
    const data = {
        labels: labels,
        datasets: [
            {
                label: '조회수',
                data: totalViews,
                fill: true,
                borderColor: 'rgba(72, 136, 246, 1)',
                backgroundColor: 'rgba(198, 218, 253, 0.3)',
                tension: 0.1
            },
            {
                label: '시작수',
                data: startCount,
                fill: true,
                borderColor: 'rgba(52, 200, 102, 1)',
                backgroundColor: 'rgba(198, 237, 208, 0.3)',
                tension: 0.1
            },
            {
                label: '완료수',
                data: completedCount,
                fill: true,
                borderColor: 'rgba(173, 94, 247, 1)',
                backgroundColor: 'rgba(229, 204, 254, 0.3)',
                tension: 0.1
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end'
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '날짜'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '수치'
                    }
                }
            }
        }
    };

    hitsChart = new Chart(ctx, config);  // 기존 차트를 업데이트하거나 새로운 차트를 생성

}

function updateStatisticPage(response) {
    // 처음엔 캐러셀 뷰로 렌더링
    renderData(response);
}

function updateQuestionList(response) {
    // console.log(response);
    // 정량, 정성 각 항목 저장해놓기
    quanQuestionList = response.quantitativeResponseList;
    qualQuestionList = response.qualitativeResponseList;
    // console.log(quanQuestionList);

    if (questionsList.length > 0) {
        questionsList.splice(0, questionsList.length);
    }

    // 정량 항목
    response.quantitativeResponseList.forEach(item => {
        questionsList.push({
            questionOrder: item.questionOrder,
            questionName: item.questionName,
            questionDescription: item.questionDescription,
            ccSeq: item.ccSeq,
            ccName: item.ccName,
            parentSeq: item.parentSeq
        });
    });

    // 정성 항목
    response.qualitativeResponseList.forEach(item => {
        questionsList.push({
            questionOrder: item.questionOrder,
            questionName: item.questionName,
            questionDescription: item.questionDescription,
            ccSeq: item.ccSeq,
            ccName: item.ccName,
            parentSeq: item.parentSeq
        });
    });

    // questionOrder로 정렬
    questionsList.sort((a, b) => a.questionOrder - b.questionOrder);

    console.log(questionsList);

    // 테이블 업데이트
    updateTable();
}

function updateTable() {
    const tableBody = document.getElementById('table-body');

    // 테이블 내용 초기화
    tableBody.innerHTML = '';

    // questionList에 있는 데이터를 테이블에 추가
    questionsList.forEach(item => {
        const row = document.createElement('tr');

        // 스타일 설정
        let style = 'font-size: small; ';

        // parentSeq 값 따라 스타일 조건부로 설정
        if (item.parentSeq === 3) {
            style += 'color: #005bac; font-weight: bold;';
        } else if (item.parentSeq === 4) {
            style += 'color: #51971a; font-weight: bold;';
        } else if (item.parentSeq === 5) {
            style += 'color: #de8a0d; font-weight: bold;';
        } else if (item.parentSeq === 6) {
            style += 'color: #805ad5; font-weight: bold;';
        }

        row.innerHTML = `
            <td>${item.questionOrder}</td>
            <td>${item.questionName}</td>
            <td style="${style}"><img src="/resources/img/question/type/type${item.ccSeq}.png" style="width: 20px; height: 20px; margin-right: 5px"> ${item.ccName}</td>
        `;

        // 행 클릭 시 handleRowClick 함수 호출
        row.addEventListener('click', () => handleRowClick(item));

        tableBody.appendChild(row);
    });
}

function handleRowClick(item) {
    const cardBody = document.querySelector('.chart-container .card-body');

    // 기존 내용 초기화
    cardBody.innerHTML = '';

    // parentSeq 값에 따라 다른 콘텐츠를 렌더링 (객관식 표 우선 빼놓고)
    if (item.parentSeq === 3 && item.ccSeq !== 11) {
        // 차트 삽입
        cardBody.innerHTML = `
            <h5 class="fw-bold">${item.questionOrder}번: ${item.questionName}</h5>
            <p>${item.questionDescription}</p>
<!--            <div class="row">-->
<!--                <canvas id="statisticChart" class="col"></canvas>-->
<!--                <div id="legendContainer" class="col"></div>-->
<!--            </div>-->
        `;

        // row, col 추가
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        const statisticChart = document.createElement('canvas');
        statisticChart.id = 'statisticChart';
        statisticChart.className = 'col-7';
        // statisticChart.style.width = '300px'; // 원하는 너비로 설정
        // statisticChart.style.height = '250px'; // 원하는 높이로 설정

        const legendContainer = document.createElement('div');
        legendContainer.id = 'legendContainer';
        legendContainer.className = 'col-5';

        // rowDiv에 canvas, legendContainer 추가
        rowDiv.appendChild(statisticChart);
        rowDiv.appendChild(legendContainer);

        cardBody.appendChild(rowDiv);

        renderChart(quanQuestionList.find(i => i.questionOrder === item.questionOrder).questionItems); // 차트 렌더링 함수 호출
    } else if (item.parentSeq === 4) {
        // 테이블 삽입
        cardBody.innerHTML = `
            <h5 class="fw-bold">${item.questionOrder}번: ${item.questionName}</h5>
            <p>${item.questionDescription}</p>
            <div style="padding: 0; max-height: 300px; overflow-y: auto;">
                <table class="table" style="table-layout: fixed; width: 100%;">
                    <thead style="position: sticky; top: 0; background-color: white; z-index: 1;">
                        <tr>
                            <th>응답 시간</th>
                            <th>응답 내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${qualQuestionList.find(i => i.questionOrder === item.questionOrder).answerList.map(answer => `
                            <tr>
                                <td>${answer.answerDate}</td>
                                <td>${answer.answerContent}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        console.log(qualQuestionList);
    } else if (item.parentSeq === 5 || item.parentSeq === 6 || item.ccSeq === 11) {
        // 지원하지 않는 형식 표시
        cardBody.innerHTML = `
            <div class="fw-bold">${item.questionOrder}번: ${item.questionName}</div>
            <p style="color: red; font-weight: bold;">통계를 지원하지 않는 형식의 질문입니다.</p>
        `;
        console.log('지원하지 않는 형식 표시');
    }
}

function updateSelectQuestion(response) {
    const questionSelect = $(".form-select:eq(0)"); // 첫번째 select 박스
    const itemSelect = $(".form-select:eq(1)"); // 두번째 select 박스

    // 현재 선택된 값 저장
    const selectedQuestionOrder = questionSelect.val();
    const selectedItemContent = itemSelect.val();

    // 질문 셀렉트 박스 초기화
    questionSelect.empty().append(new Option('질문을 선택해주세요', ''));
    response.quantitativeResponseList.forEach((question) => {
        questionSelect.append(new Option(question.questionName, question.questionOrder));
    });

    // 기존 선택된 질문 값이 있으면 선택 상태 유지
    if (selectedQuestionOrder) {
        questionSelect.val(selectedQuestionOrder).change();
    }

    // 질문 선택 시 문항 셀렉트 박스 업데이트
    questionSelect.on('change', function () {
        const selectedQuestionOrder = $(this).val();
        const selectedQuestion = response.quantitativeResponseList.find(q => q.questionOrder == selectedQuestionOrder);
        // console.log(selectedQuestion);

        // 문항 셀렉트 박스 초기화
        itemSelect.empty().append(new Option('문항을 선택해주세요', ''));

        if (selectedQuestion) {
            selectedQuestion.questionItems.forEach((item) => {
                itemSelect.append(new Option(item.itemContent));
            });
        }

        // 문항 선택 가능하게 활성화
        itemSelect.prop('disabled', false);

    });

    // 기존 선택된 문항 값이 있으면 해당 문항 유지
    if (selectedItemContent) {
        itemSelect.val(selectedItemContent);
    }
}

// 주어진 캔버스 ID에 대해 차트를 그리는 함수
function renderChart(questionItems) {
    const ctx = document.getElementById('statisticChart').getContext('2d');

    // 기존 차트가 있으면 제거
    if (quanChart) {
        quanChart.destroy();
    }

    const labels = questionItems.map(item => item.itemContent);
    const data = questionItems.map(item => item.itemRatio !== null ? item.itemRatio : 0);

    quanChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#3C82F6', '#06B6D4', '#0FA4E8', '#6466F1'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            // maintainAspectRatio: false
            plugins: {
                legend: {
                    position: 'top', // 레전드 위치 설정
                    labels: {
                        display: false // 기본 레전드 숨기기
                        // boxWidth: 20, // 레전드 색상 상자의 너비
                        // padding: 30, // 레전드 간격
                        // usePointStyle: true, // 점 스타일 사용
                        // generateLabels: function (chart) {
                        //     let datasets = chart.data.datasets;
                        //     return datasets[0].data.map((data, i) => ({
                        //         text: `${chart.data.labels[i]}\t${data}%`,
                        //         fillStyle: datasets[0].backgroundColor[i],
                        //         hidden: false,
                        //     }));
                        // }
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                        }
                    }
                }
            }
        }
    });

    // HTML 레전드 생성
    const legendContainer = document.getElementById('legendContainer');
    // legendContainer.className = 'my-auto';

    labels.forEach((label, i) => {
        // 원형 색상 박스 생성
        const colorBox = document.createElement('span');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = quanChart.data.datasets[0].backgroundColor[i];
        colorBox.style.width = '15px'; // 너비 설정
        colorBox.style.height = '15px'; // 높이 설정
        colorBox.style.borderRadius = '50%'; // 원형으로 만들기
        colorBox.style.display = 'inline-block'; // 인라인 블록으로 설정
        colorBox.style.marginRight = '10px'; // 텍스트와의 간격

        const labelText = document.createElement('span');
        labelText.innerHTML = label; // 항목 텍스트
        labelText.style.whiteSpace = 'nowrap'; // 텍스트를 한 줄로 표시
        labelText.style.overflow = 'hidden'; // 넘치는 텍스트를 숨김
        labelText.style.textOverflow = 'ellipsis'; // 넘치는 텍스트를 ...로 표시
        labelText.style.maxWidth = '70px'; // 최대 너비 설정
        labelText.style.display = 'inline-block'; // 인라인 블록으로 설정
        labelText.title = label; // 전체 텍스트를 툴팁으로 표시

        // 비율 항목을 감싸는 div 생성
        const percentageContainer = document.createElement('div');
        percentageContainer.style.display = 'flex'; // 플렉스 박스로 설정
        percentageContainer.style.alignItems = 'center'; // 수직 중앙 정렬
        percentageContainer.style.marginLeft = 'auto'; // 오른쪽 끝에 배치

        const percentage = document.createElement('span');
        percentage.className = 'percentage';
        percentage.innerHTML = `${data[i]}%`; // 비율 텍스트

        // 레전드 항목을 감싸는 div 생성
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item m-2';
        legendItem.style.display = 'flex'; // 플렉스 박스로 설정
        legendItem.style.alignItems = 'center'; // 수직 중앙 정렬

        // 색상 박스와 텍스트를 추가
        legendItem.appendChild(colorBox);
        legendItem.appendChild(labelText);

        // 비율 항목을 추가
        percentageContainer.appendChild(percentage);
        legendItem.appendChild(percentageContainer); // 비율 항목 추가

        legendContainer.appendChild(legendItem);
    });
}