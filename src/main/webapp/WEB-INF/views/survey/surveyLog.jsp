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
                <script src="/resources/js/survey/surveyLog.js"></script>

                <link rel="stylesheet" type="text/css" href="/resources/css/survey/surveyLog.css">
                <link rel="stylesheet" type="text/css" href="/resources/common/statisticsNav.css">
                <link rel="stylesheet" type="text/css" href="/resources/css/survey/dashboard.css">
            </head>

            <body>
                <%@include file="/resources/common/header.jsp" %>
                    <%@ include file="/resources/common/statisticsNav.jsp" %>
                        <%@include file="/resources/common/commonSelectModal.jsp" %>
                        <div class="content" style="">
                            <div class="container">
                                <h4 style="padding-bottom: 28px; text-align: left;" class="surveyTitle fw-bold"
                                    data-bs-toggle="modal" data-bs-target="#j-user-sur-Modal"></h4>
                                <div class="filter-section">
                                    <label for="startDate">시작 일자:</label>
                                    <input type="date" id="startDate">

                                    <label for="endDate">종료 일자:</label>
                                    <input type="date" id="endDate">

                                    <button id="filter-btn" class="filter-button">로그 필터</button>
                                </div>

                                <div id="data-container" class="table-section">
                                    <table id="surveyLogTable" class="result-table">
                                        <thead>
                                        <tr>
                                            <th>응답 번호</th>
                                            <th>질문 번호</th>
                                            <th>참여 번호</th>
                                            <th>설문 시작일자</th>
                                            <th>설문 종료일자</th>
                                            <th>응답 시간</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>

                                <%-- <div id="warning-message" style="display:none;">Some responses are under 3 seconds.
                            </div>--%>
                            <canvas id="responseTimeChart" width="400" height="200"></canvas>
                            </div>
                        </div>

            </body>

            </html>