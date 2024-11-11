<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Survey Log & Response Time</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
<%--    <script src="/resources/js/survey/surveyLog.js"></script>--%>

    <link rel="stylesheet" type="text/css" href="/resources/css/survey/surveyLog.css">
    <link rel="stylesheet" type="text/css" href="/resources/common/statisticsNav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/survey/dashboard.css">
</head>

<body>
<%@include file="/resources/common/header.jsp" %>
<%@ include file="/resources/common/statisticsNav.jsp" %>
<%@include file="/resources/common/commonSelectModal.jsp" %>
<script>

    var surveyId = '${surveySeq}';
    console.log(surveyId);
    setHeadertitle('응답 시간 분석');
</script>

<div class="content" style="">
    <div class="container">
        <h4 style="padding-bottom: 28px; text-align: left;" class="surveyTitle fw-bold"
            data-bs-toggle="modal" data-bs-target="#j-user-sur-Modal"></h4>
<%--        <input type="hidden" value="${surveySeq}">--%>



        <div class="filter-section">
            <label for="startDate">시작 일자:</label>
            <input type="date" id="startDate">
            <label for="endDate">종료 일자:</label>
            <input type="date" id="endDate">
            <button id="filter-btn" class="filter-button">로그 필터</button>
        </div>

        <div class="button-section text-end"> <!-- 버튼 오른쪽 정렬 -->
            <button id="showStatusChartBtn" class="btn btn-primary">상태 비율 보기</button>
        </div>

        <!-- 설문 상태 비율 모달 -->
        <div id="statusChartModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h4>설문 상태 비율</h4>
                <canvas id="statusChart" width="400" height="200"></canvas>
            </div>
        </div>

        <!-- 오른쪽 상단 상태 값 표 -->
        <div class="status-table-section">
            <table id="statusTable" class="result-table">
                <thead>
                <tr>
                    <th>상태</th>
                    <th>집계(수)</th>
                    <th>비율 (%)</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>



        <!-- 로그 테이블 -->
        <div id="data-container" class="table-section">
            <table id="surveyLogTable" class="result-table">
                <thead>
                <tr>
                    <th>질문응답 번호</th>
                    <th>참여 번호</th>
                    <th>설문 시작일자</th>
                    <th>설문 종료일자</th>
                    <th>응답 시간</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <canvas id="responseTimeChart" width="400" height="200"></canvas>
    </div>
    <script src="/resources/js/survey/surveyLog.js"></script>
</div>
</body>

</html>
