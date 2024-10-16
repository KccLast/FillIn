<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Survey Log & Response Time</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
    <script src="/resources/js/survey/surveyLog.js"></script>

    <link rel="stylesheet" type="text/css" href="/resources/css/survey/surveyLog.css">
    <link rel="stylesheet" type="text/css" href="/resources/common/dashBoardNav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/survey/dashboard.css">
</head>
<body>
<%@include file="/resources/common/header.jsp"%>
<%@ include file="/resources/common/dashBoardNav.jsp"%>


<div class="container">
    <h2>Survey Log Details</h2>
    <div class="filter-section">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate">

        <label for="endDate">End Date:</label>
        <input type="date" id="endDate">

        <button id="filter-btn">Filter Logs</button>
    </div>

    <!-- 설문 로그 테이블(스크롤 가능한 박스 설정) -->
    <div id="data-container" class="table-section">
        <table id="surveyLogTable" class="result-table">
            <thead>
            <tr>
                <th>Log Seq</th>
                <th>Survey Seq</th>
<%--                <th>Occur Date</th>--%>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Response Time (seconds)</th>
            </tr>
            </thead>
            <tbody>
            <!-- 데이터가 스크롤을 통해 볼 수 있음 -->
            </tbody>
        </table>
    </div>

    <!-- 응답 시간 경고 -->
    <div id="warning-message" style="display:none; color: red; margin-top: 10px;">응답 시간이 너무 짧습니다 (3초 미만)</div>

    <!-- 응답 시간 분석 시각화 -->
    <canvas id="responseTimeChart" width="400" height="200"></canvas>
</div>

</body>
</html>
