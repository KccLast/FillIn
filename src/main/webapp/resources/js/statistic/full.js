document.addEventListener('DOMContentLoaded', function () {
    // 페이지 로그되었을 때 AJAX 요청 보냄
    fetchData();

    // 버튼에 이벤트 리스너 추가
    // (DOM이 로드된 이후에만 가능)
    document.getElementById('listViewButton').addEventListener('click', () => toggleView('table'));
    document.getElementById('carouselViewButton').addEventListener('click', () => toggleView('carousel'));
});

// 현재 페이지 url에서 surveyId 값 추출 후 끝에서 surveyId 추출
// const surveyId = window.location.pathname.split('/').pop();

function fetchData() {
    $.ajax({
        url: `/api/statistic/${surveyId}`,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            // 참여자 수 그래프
            updateParticipantsPage(response.data);
            // 조회수 그래프
            updateHitsPage(response.data);
            // 통계
            updateStatisticPage(response.data);
        },
        error: function (error) {
            console.error("Error fetching initial data: ", error);
        }
    });
}

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

    new Chart(ctx, config);  // 기존 차트를 업데이트하거나 새로운 차트를 생성

}

function updateStatisticPage(response) {
    // 처음엔 캐러셀 뷰로 렌더링
    renderData(response);
}

// 테이블과 캐러셀 뷰 전환 함수
function toggleView(viewType) {
    const tableView = document.getElementById('dataListView');
    const carouselView = document.getElementById('dataCarouselView');

    // const

    if (viewType === 'table') {
        tableView.classList.remove('d-none');
        carouselView.classList.add('d-none');
    } else {
        tableView.classList.add('d-none');
        carouselView.classList.remove('d-none');
    }
}

// 테이블과 캐러셀에 데이터를 렌더링하는 함수
function renderData(response) {
    const tableView = document.getElementById('dataListView');
    const carouselView = document.querySelector('.carousel-inner');

    // 기존 내용을 지움
    tableView.innerHTML = '';
    carouselView.innerHTML = '';

    let tableRow = null;
    let carouselItem = null;

    // quantitativeList 데이터를 순회하며 각 질문에 대한 카드 생성
    // console.log(response.quantitativeResponseList);
    response.quantitativeResponseList.forEach((question, index) => {
        // 2개씩 보여줄 때 새로운 row 혹은 carousel-item을 생성
        if (index % 2 === 0) {
            tableRow = document.createElement('div');
            tableRow.classList.add('row', 'mb-3');
            tableView.appendChild(tableRow); // 새로운 행 추가

            carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) carouselItem.classList.add('active'); // 첫 번째 항목은 활성 상태로 설정
            const row = document.createElement('div');
            row.classList.add('row');
            carouselItem.appendChild(row);
            carouselView.appendChild(carouselItem); // 새로운 캐러셀 항목 추가
        }

        // 테이블 형식 카드 생성
        const tableCard = document.createElement('div');
        tableCard.classList.add('col-md-6');
        tableCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5>${question.questionOrder}번: ${question.questionName}</h5>
                    <canvas id="tableChart${index}" style="height:30vh"></canvas>
                </div>
            </div>
        `;
        tableRow.appendChild(tableCard); // 카드가 같은 행 안에 포함되도록
        // console.log(index);

        // 캐러셀 항목 생성
        const carouselCard = document.createElement('div');
        carouselCard.classList.add('col-md-6'); // 한 줄에 두 개의 카드로 구성
        // if (index === 0) carouselItem.classList.add('active');  // 첫 번째 항목은 활성 상태로 설정
        carouselCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5>${question.questionOrder}번: ${question.questionName}</h5>
                        <canvas id="carouselChart${index}"style="height:30vh"></canvas>
                    </div>
                </div>
            `;
        carouselItem.querySelector('.row').appendChild(carouselCard); // 캐러셀의 row에 카드 추가


        // Chart.js를 이용해 차트 렌더링
        renderChart(`tableChart${index}`, question.questionItems);
        renderChart(`carouselChart${index}`, question.questionItems);
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