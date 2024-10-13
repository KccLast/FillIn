var hitsChart;

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
                // 통계
                updateStatisticPage(response.data);
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

        // 버튼에 이벤트 리스너 추가
        // (DOM이 로드된 이후에만 가능)
        document.getElementById('listViewButton').addEventListener('click', () => toggleView('table'));
        document.getElementById('carouselViewButton').addEventListener('click', () => toggleView('carousel'));

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
                    // 통계
                    updateStatisticPage(response.data);
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
    const ctx = document.getElementById('statisticChart').getContext('2d');
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

function updateSelectQuestion(response) {
    const questionSelect = $(".form-select:eq(0)"); // 첫번째 select 박스
    const itemSelect = $(".form-select:eq(1)"); // 두번째 select 박스

    // 질문 셀렉트 박스 초기화
    questionSelect.empty().append(new Option('질문을 선택해주세요', ''));
    response.quantitativeResponseList.forEach((question) => {
        questionSelect.append(new Option(question.questionName, question.questionOrder));
    });

    // 질문 선택 시 문항 셀렉트 박스 업데이트
    questionSelect.on('change', function () {
        const selectedQuestionOrder = $(this).val();
        const selectedQuestion = response.quantitativeResponseList.find(q => q.questionOrder == selectedQuestionOrder);
        console.log(selectedQuestion);

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
}

// 테이블과 캐러셀 뷰 전환 함수
function toggleView(viewType) {
    const quanTableView = document.getElementById('quanListView');
    const quanCarouselView = document.getElementById('quanCarouselView');

    const qualTableView = document.getElementById('qualListView');
    const qualCarouselView = document.getElementById('qualCarouselView');

    if (viewType === 'table') {
        quanTableView.classList.remove('d-none');
        quanCarouselView.classList.add('d-none');
        qualTableView.classList.remove('d-none');
        qualCarouselView.classList.add('d-none');
    } else {
        quanTableView.classList.add('d-none');
        quanCarouselView.classList.remove('d-none');
        qualTableView.classList.add('d-none');
        qualCarouselView.classList.remove('d-none');
    }
}

// 테이블과 캐러셀에 데이터를 렌더링하는 함수
function renderData(response) {
    const quanTableView = document.getElementById('quanListView');
    const quanCarouselView = document.querySelector('.quan-carousel-inner');

    const qualTableView = document.getElementById('qualListView');
    const qualCarouselView = document.querySelector('.qual-carousel-inner');

    // 기존 내용을 지움
    quanTableView.innerHTML = '';
    quanCarouselView.innerHTML = '';

    qualTableView.innerHTML = '';
    qualCarouselView.innerHTML = '';

    let quanTableRow = null;
    let quanCarouselItem = null;

    let qualTableRow = null;
    let qualCarouselItem = null;

    // quantitativeList 데이터를 순회하며 각 질문에 대한 카드 생성
    // console.log(response.quantitativeResponseList);
    response.quantitativeResponseList.forEach((question, index) => {
        // 2개씩 보여줄 때 새로운 row 혹은 carousel-item을 생성
        if (index % 2 === 0) {
            quanTableRow = document.createElement('div');
            quanTableRow.classList.add('row', 'mb-3');
            quanTableView.appendChild(quanTableRow); // 새로운 행 추가

            quanCarouselItem = document.createElement('div');
            quanCarouselItem.classList.add('carousel-item');
            if (index === 0) quanCarouselItem.classList.add('active'); // 첫 번째 항목은 활성 상태로 설정
            const row = document.createElement('div');
            row.classList.add('row');
            quanCarouselItem.appendChild(row);
            quanCarouselView.appendChild(quanCarouselItem); // 새로운 캐러셀 항목 추가
        }

        // 테이블 형식 카드 생성
        const quanTableCard = document.createElement('div');
        quanTableCard.classList.add('col-md-6');
        quanTableCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5>${question.questionOrder}번: ${question.questionName}</h5>
                    <canvas id="tableChart${index}" style="height:30vh"></canvas>
                </div>
            </div>
        `;
        quanTableRow.appendChild(quanTableCard); // 카드가 같은 행 안에 포함되도록
        // console.log(index);

        // 캐러셀 항목 생성
        const quanCarouselCard = document.createElement('div');
        quanCarouselCard.classList.add('col-md-6'); // 한 줄에 두 개의 카드로 구성
        // if (index === 0) carouselItem.classList.add('active');  // 첫 번째 항목은 활성 상태로 설정
        quanCarouselCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5>${question.questionOrder}번: ${question.questionName}</h5>
                        <canvas id="carouselChart${index}"style="height:30vh"></canvas>
                    </div>
                </div>
            `;
        quanCarouselItem.querySelector('.row').appendChild(quanCarouselCard); // 캐러셀의 row에 카드 추가


        // Chart.js를 이용해 차트 렌더링
        renderChart(`tableChart${index}`, question.questionItems);
        renderChart(`carouselChart${index}`, question.questionItems);
    });

    // qualitativeList 데이터를 순회하며 각 질문에 대한 카드 생성
    console.log(response);
    response.qualitativeResponseList.forEach((question, index) => {
        qualTableRow = document.createElement('div');
        qualTableRow.classList.add('row', 'mb-3');
        qualTableView.appendChild(qualTableRow); // 새로운 행 추가

        qualCarouselItem = document.createElement('div');
        qualCarouselItem.classList.add('carousel-item');
        if (index === 0) qualCarouselItem.classList.add('active'); // 첫 번째 항목은 활성 상태로 설정
        const row = document.createElement('div');
        row.classList.add('row');
        qualCarouselItem.appendChild(row);
        qualCarouselView.appendChild(qualCarouselItem); // 새로운 캐러셀 항목 추가

        // 테이블 형식 카드 생성
        const qualTableCard = document.createElement('div');
        qualTableCard.classList.add('col-md-12');
        qualTableCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5>${question.questionOrder}번: ${question.questionName}</h5>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>응답 시간</th>
                                    <th>응답</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${question.answerList.map(answer => `
                                    <tr>
                                        <td>${answer.answerDate}</td>
                                        <td>${answer.answerContent}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        qualTableRow.appendChild(qualTableCard); // 카드가 같은 행 안에 포함되도록

        // 캐러셀 항목 생성
        const qualCarouselCard = document.createElement('div');
        qualCarouselCard.classList.add('col-md-12');
        qualCarouselCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5>${question.questionOrder}번: ${question.questionName}</h5>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>활동 시간</th>
                                        <th>사유 선택</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${question.answerList.map(answer => `
                                        <tr>
                                            <td>${answer.answerDate}</td>
                                            <td>${answer.answerContent}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        qualCarouselItem.querySelector('.row').appendChild(qualCarouselCard); // 캐러셀의 row에 카드 추가
    });
}

// 주어진 캔버스 ID에 대해 차트를 그리는 함수
function renderChart(canvasId, questionItems) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const labels = questionItems.map(item => item.itemContent);
    const data = questionItems.map(item => item.itemRatio);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#3C82F6', '#06B6D4', '#0FA4E8', '#6466F1'], // 색상은 원하는 대로 조정
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            // maintainAspectRatio: false
        }
    });
}