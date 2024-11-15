/*
let responseTimeChart; // 응답 시간 차트
let statusChart; // 설문 상태 비율 차트

$(document).ready(function () {
    // 초기 전체 데이터 로드
    // loadSurveyStatusCounts();

    // 로그 필터 버튼 클릭 이벤트
    $("#filter-btn").click(function () {
        const startDate = $("#startDate").val();
        const endDate = $("#endDate").val();

        if (!startDate || !endDate) {
            alert("시작일자와 종료일자를 입력하세요.");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert("시작일자는 종료일자보다 이전이어야 합니다.");
            return;
        }

        loadSurveyLogs(startDate, endDate);
        loadSurveyStatusCounts(startDate, endDate);
    });

    // 설문 상태 비율 모달 열기
    $("#showStatusChartBtn").click(function () {
        $("#statusChartModal").show();
    });

    // 설문 상태 비율 모달 닫기
    $(".close").click(function () {
        $("#statusChartModal").hide();
    });

    // 설문 로그 데이터 로드
    function loadSurveyLogs(startDate, endDate) {
        $.ajax({
            url: "/api/survey/logs",
            type: "GET",
            data: { startDate, endDate },
            success: function (data) {
                renderTable(data);
                renderResponseTimeChart(data);
            },
            error: function () {
                alert("로그 데이터를 가져오는 중 오류가 발생했습니다.");
            },
        });
    }

    // 설문 상태 비율 데이터 로드
    function loadSurveyStatusCounts(startDate, endDate) {


        $.ajax({
            url: "/api/survey/status-counts",
            type: "GET",
            data: { startDate, endDate },
            success: function (data) {
                if (data && data.length > 0) {
                    console.log("Status Counts Data:", data);
                    renderStatusTable(data);
                    renderStatusChart(data);
                } else {

                    alert("조회된 설문 상태 비율 데이터가 없습니다.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching status counts:", xhr, status, error);
                alert("설문 상태 비율 데이터를 가져오는 중 오류가 발생했습니다.");
            },
        });
    }
    // 로그 테이블 렌더링
    function renderTable(data) {
        const tbody = $("#surveyLogTable tbody");
        tbody.empty();

        if (data.length === 0) {
            tbody.append("<tr><td colspan='5'>조회된 데이터가 없습니다.</td></tr>");
        } else {
            data.forEach(item => {
                tbody.append(`
                    <tr>
                        <td>${item.answerSeq || "N/A"}</td>
                        <td>${item.participantSeq || "N/A"}</td>
                        <td>${item.startDate || "N/A"}</td>
                        <td>${item.endDate || "설문 이탈"}</td>
                        <td>${formatTime(item.responseTime)}</td>
                    </tr>
                `);
            });
        }
    }

    // 응답 시간 차트 렌더링
    function renderResponseTimeChart(data) {
        const labels = data.map(item => `응답 ${item.answerSeq}`);
        const responseTimes = data.map(item => item.responseTime || 0);

        const ctx = document.getElementById("responseTimeChart").getContext("2d");

        if (responseTimeChart) {
            responseTimeChart.destroy();
        }

        responseTimeChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "응답 시간 (초)",
                        data: responseTimes,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    }

    // 상태 비율 테이블 렌더링
    function renderStatusTable(data) {
        const tbody = $("#statusTable tbody");
        tbody.empty();

        data.forEach(item => {
            tbody.append(`
                <tr>
                    <td>${item.status}</td>
                    <td>${item.count}</td>
                    <td>${item.percentage}%</td>
                </tr>
            `);
        });
    }

    // 설문 상태 비율 차트 렌더링
    function renderStatusChart(data) {
        const labels = data.map(item => item.status);
        const values = data.map(item => item.count);

        const ctx = document.getElementById("statusChart").getContext("2d");

        if (statusChart) {
            statusChart.destroy();
        }

        statusChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "응답 수",
                        data: values,
                        backgroundColor: ["#36a2eb", "#ff6384", "#ffce56"],
                    },
                ],
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    }

    // 초를 시, 분, 초 형식으로 변환
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs.toFixed(2)}s`;
    }
});
*/

// 페이지 로드 시에 한달전데이터까지 기준으로 데이터를 보여주고 시작하는 코드 수정 후
/*let responseTimeChart; // 응답 시간 차트
let statusChart; // 설문 상태 비율 차트

$(document).ready(function () {
    const surveySeq = $("#surveySeq").val(); // surveySeq가 있다면 가져옴
    // 기본 날짜 설정
    const today = new Date().toISOString().split("T")[0]; // 오늘 날짜
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // 한 달 전
    const defaultStartDate = oneMonthAgo.toISOString().split("T")[0];

    $("#startDate").val(defaultStartDate); // 기본 시작 날짜 설정
    $("#endDate").val(today); // 기본 종료 날짜 설정

    // 페이지 로드 시 기본 데이터 로드
    loadSurveyLogs(defaultStartDate, today);
    loadSurveyStatusCounts(defaultStartDate, today);

    // 로그 필터 버튼 클릭 이벤트
    $("#filter-btn").click(function () {
        const startDate = $("#startDate").val();
        const endDate = $("#endDate").val();

        if (!startDate || !endDate) {
            alert("시작일자와 종료일자를 입력하세요.");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert("시작일자는 종료일자보다 이전이어야 합니다.");
            return;
        }

        loadSurveyLogs(surveySeq,startDate, endDate);
        loadSurveyStatusCounts(surveySeq,startDate, endDate);
    });

    // 설문 상태 비율 모달 열기
    $("#showStatusChartBtn").click(function () {
        $("#statusChartModal").show();
    });

    // 설문 상태 비율 모달 닫기
    $(".close").click(function () {
        $("#statusChartModal").hide();
    });

    // 설문 로그 데이터 로드
    function loadSurveyLogs(startDate, endDate) {
        $.ajax({
            url: "/api/survey/logs",
            type: "GET",
            data: { startDate, endDate },
            success: function (data) {
                renderTable(data);
                renderResponseTimeChart(data);
            },
            error: function () {
                alert("로그 데이터를 가져오는 중 오류가 발생했습니다.");
            },
        });
    }

    // 설문 상태 비율 데이터 로드
    function loadSurveyStatusCounts(startDate, endDate) {
        $.ajax({
            url: "/api/survey/status-counts",
            type: "GET",
            data: { startDate, endDate },
            success: function (data) {
                if (data && data.length > 0) {
                    renderStatusTable(data);
                    renderStatusChart(data);
                } else {
                    alert("조회된 설문 상태 비율 데이터가 없습니다.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching status counts:", xhr, status, error);
                alert("설문 상태 비율 데이터를 가져오는 중 오류가 발생했습니다.");
            },
        });
    }

    // 로그 테이블 렌더링
    function renderTable(data) {
        const tbody = $("#surveyLogTable tbody");
        tbody.empty();

        if (data.length === 0) {
            tbody.append("<tr><td colspan='5'>조회된 데이터가 없습니다.</td></tr>");
        } else {
            data.forEach(item => {
                tbody.append(`
                    <tr>
                        <td>${item.answerSeq || "N/A"}</td>
                        <td>${item.participantSeq || "N/A"}</td>
                        <td>${item.startDate || "N/A"}</td>
                        <td>${item.endDate || "설문 이탈"}</td>
                        <td>${formatTime(item.responseTime)}</td>
                    </tr>
                `);
            });
        }
    }

    // 응답 시간 차트 렌더링
    function renderResponseTimeChart(data) {
        const labels = data.map(item => `응답 ${item.answerSeq}`);
        const responseTimes = data.map(item => item.responseTime || 0);

        const ctx = document.getElementById("responseTimeChart").getContext("2d");

        if (responseTimeChart) {
            responseTimeChart.destroy();
        }

        responseTimeChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "응답 시간 (초)",
                        data: responseTimes,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    }

    // 상태 비율 테이블 렌더링
    function renderStatusTable(data) {
        const tbody = $("#statusTable tbody");
        tbody.empty();

        data.forEach(item => {
            tbody.append(`
                <tr>
                    <td>${item.status}</td>
                    <td>${item.count}</td>
                    <td>${item.percentage}%</td>
                </tr>
            `);
        });
    }

    // 설문 상태 비율 차트 렌더링
    function renderStatusChart(data) {
        const labels = data.map(item => item.status);
        const values = data.map(item => item.count);

        const ctx = document.getElementById("statusChart").getContext("2d");

        if (statusChart) {
            statusChart.destroy();
        }

        statusChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "응답 수",
                        data: values,
                        backgroundColor: ["#36a2eb", "#ff6384", "#ffce56"],
                    },
                ],
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    }

    // 초를 시, 분, 초 형식으로 변환
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs.toFixed(2)}s`;
    }
});*/


let responseTimeChart; // 응답 시간 차트
let statusChart; // 설문 상태 비율 차트

$(document).ready(function () {
    const surveySeq = $('.log-survey-seq').val();

    console.log(surveySeq);
    // 기본 날짜 설정
    const today = new Date().toISOString().split("T")[0]; // 오늘 날짜
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // 한 달 전
    const defaultStartDate = oneMonthAgo.toISOString().split("T")[0];

    $("#startDate").val(defaultStartDate); // 기본 시작 날짜 설정
    $("#endDate").val(today); // 기본 종료 날짜 설정

    // 페이지 로드 시 기본 데이터 로드
    loadSurveyLogs(surveySeq,defaultStartDate, today);
    loadSurveyStatusCounts(surveySeq,defaultStartDate, today);

    // 로그 필터 버튼 클릭 이벤트
    $("#filter-btn").click(function () {
        const startDate = $("#startDate").val();
        const endDate = $("#endDate").val();

        if (!startDate || !endDate) {
            alert("시작일자와 종료일자를 입력하세요.");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert("시작일자는 종료일자보다 이전이어야 합니다.");
            return;
        }

        loadSurveyLogs(surveySeq,startDate, endDate);
        loadSurveyStatusCounts(surveySeq,startDate, endDate);
    });

    // 설문 상태 비율 모달 열기
    $("#showStatusChartBtn").click(function () {
        $("#statusChartModal").show();
    });

    // 설문 상태 비율 모달 닫기
    $(".close").click(function () {
        $("#statusChartModal").hide();
    });

    // 설문 로그 데이터 로드
    function loadSurveyLogs(surveySeq,startDate, endDate) {
        console.log(surveySeq + startDate + endDate + "보내기")
        $.ajax({
            url: "/api/survey/logs",
            type: "GET",
            dataType: "json",
            data: { surveySeq: surveySeq,
                startDate: startDate,
                endDate: endDate },
            success: function (data) {
                renderTable(data);
                renderResponseTimeChart(data);
            },
            error: function () {

            },
        });
    }

    // 설문 상태 비율 데이터 로드
    function loadSurveyStatusCounts(surveySeq, startDate, endDate) {
        console.log(hi);
        $.ajax({
            url: "/api/survey/status-counts",
            type: "GET",
            data: { surveySeq, startDate, endDate },
            success: function (data) {
                if (data && data.length > 0) {
                    renderStatusTable(data);
                    renderStatusChart(data);
                } else {

                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching status counts:", xhr, status, error);
                console.error(error);
            },
        });
    }

    // 로그 테이블 렌더링
    function renderTable(data) {
        const tbody = $("#surveyLogTable tbody");
        tbody.empty();

        if (data.length === 0) {
            tbody.append("<tr><td colspan='5'>조회된 데이터가 없습니다.</td></tr>");
        } else {
            data.forEach(item => {
                tbody.append(`
                    <tr>
                        <td>${item.answerSeq || "N/A"}</td>
                        <td>${item.participantSeq || "N/A"}</td>
                        <td>${item.startDate || "N/A"}</td>
                        <td>${item.endDate || "설문 이탈"}</td>
                        <td>${formatTime(item.responseTime)}</td>
                    </tr>
                `);
            });
        }
    }

    // 응답 시간 차트 렌더링
    function renderResponseTimeChart(data) {
        const labels = data.map(item => `응답 ${item.answerSeq}`);
        const responseTimes = data.map(item => item.responseTime || 0);

        const ctx = document.getElementById("responseTimeChart").getContext("2d");

        if (responseTimeChart) {
            responseTimeChart.destroy();
        }

        responseTimeChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "응답 시간 (초)",
                        data: responseTimes,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    }

    // 상태 비율 테이블 렌더링
    function renderStatusTable(data) {
        const tbody = $("#statusTable tbody");
        tbody.empty();

        data.forEach(item => {
            tbody.append(`
                <tr>
                    <td>${item.status}</td>
                    <td>${item.count}</td>
                    <td>${item.percentage}%</td>
                </tr>
            `);
        });
    }

    // 설문 상태 비율 차트 렌더링
    function renderStatusChart(data) {
        const labels = data.map(item => item.status);
        const values = data.map(item => item.count);

        const ctx = document.getElementById("statusChart").getContext("2d");

        if (statusChart) {
            statusChart.destroy();
        }

        statusChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "응답 수",
                        data: values,
                        backgroundColor: ["#36a2eb", "#ff6384", "#ffce56"],
                    },
                ],
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    }

    // 초를 시, 분, 초 형식으로 변환
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs.toFixed(2)}s`;
    }
});
