$(document).ready(function () {
    // let page = 1;
    // const size = 20; // 페이지당 로드할 데이터 크기
    // let loading = false;// 데이터를 로드하는 중인지 확인

    // 필터 버튼 클릭 이벤트
    $('#filter-btn').click(function () {
        let startDate = $('#startDate').val();
        let endDate = $('#endDate').val();

        // 날짜가 비어있는지, 올바른 형식인지 확인
        if (!startDate || !endDate) {
            alert("시작일자와 종료일자를 입력하세요.");
            return;
        }

        // 처음 데이터 로드(, page, size)
        // page = 1;
        loadMoreData(startDate, endDate);
    });

    // 스크롤 이벤트 (무한 스크롤 기능)
    // $(window).scroll(function () {
    //     if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && !loading) {
    //         page++;
    //         let startDate = $('#startDate').val();
    //         let endDate = $('#endDate').val();
    //         loadMoreData(startDate, endDate, page, size);
    //     }
    // });

    // 데이터 로드 함수(, page, size)
    function loadMoreData(startDate, endDate) {
        // loading = true;

        $.ajax({
            url: "/api/survey/logs",
            type: "GET",
            data: {
                startDate: startDate, // yyyy-MM-dd 형식으로 전달
                endDate: endDate
                // page: page, // 페이지 번호 전달
                // size: size  // 페이지당 데이터 수 전달
            },
            success: function (data) {
                renderTable(data);
                if (data.some(item => item.responseTime < 3000)) {
                    $('#warning-message').show();  // 3초 미만 응답 경고
                } else {
                    $('#warning-message').hide();
                }
                generateResponseTimeChart(data);
                // loading = false;
            },
            error: function () {
                alert("데이터를 가져오는 중 오류가 발생했습니다.");
                // loading = false;
            }
        });
    }


    // 초를 시, 분, 초 형식으로 변환하는 함수
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = (seconds % 60).toFixed(2);

        // 시, 분, 초가 한 자리수일 때 두 자리로 표시
        const formattedHrs = hrs > 0 ? `${hrs}h ` : "";
        const formattedMins = mins > 0 ? `${mins}m ` : "";
        const formattedSecs = `${secs}s`;

        return `${formattedHrs}${formattedMins}${formattedSecs}`;
    }

    // 테이블 데이터 렌더링
    function renderTable(data) {
        let tbody = $('#surveyLogTable tbody');
        // if (page === 1) {
        //     tbody.empty();  // 처음 페이지일 때 기존 테이블 비우기
        // }
        tbody.empty();  // 기존 테이블 비우기

        // && page === 1
        if (data.length === 0) {
            tbody.append("<tr><td colspan='6'>No logs found.</td></tr>");
        } else {
            data.forEach(function (item) {
                //시분초로 변환 추가 혹은 삭제(선택)
                const formattedResponseTime  = formatTime(item.responseTime / 1000); // ms를 초로 변환
                tbody.append(`<tr>
                    <td>${item.logSeq}</td>
                    <td>${item.surveySeq}</td>
<!--                    <td>${item.occurDate}</td>-->
                    <td>${item.startDate}</td>
                    <td>${item.endDate}</td>
<!--                    <td>${item.responseTime} ms</td>-->
                    <td>${formattedResponseTime}</td> <!-- 변환된 시간을 사용 -->
                </tr>`);
            });
        }
    }

    // 응답 시간 분석 차트 생성
    function generateResponseTimeChart(data) {
        const labels = data.map(item => `Log ${item.logSeq}`);
        const responseTimes = data.map(item => item.responseTime);

        const ctx = document.getElementById('responseTimeChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '응답 시간 (ms)',
                    data: responseTimes,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
