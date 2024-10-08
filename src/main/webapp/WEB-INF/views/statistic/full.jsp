<%@ page import="com.kcc.fillin.statistic.dto.StatisticSurveyResponse" %>
<%@ page import="com.kcc.fillin.statistic.dto.HitsDTO" %>
<%@ page import="com.kcc.fillin.statistic.dto.QuantitativeResponse" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/full.css">
</head>
<body>
<%@include file="/resources/common/header.jsp" %>
<%@include file="/resources/common/nav.jsp" %>
<%--<%--%>
<%--    // StatisticSurveyResponse res = (StatisticSurveyResponse)request.getAttribute("statisticSurveyResponse");--%>
<%--    // HitsDTO hitsResponseList = (HitsDTO)res.getHitsResponseList();--%>
<%--    // QuantitativeResponse quantitativeResponseList = (QuantitativeResponse)res.getQuantitativeResponseList();--%>
<%--%>--%>
<script>
    var surveyId = '${surveyId}';
</script>
<%--<c:set var='hitsResponseList' value='${statisticSurveyResponse.hitsResponseList}'/>--%>
<%--<c:set var='quantitativeResponseList' value='${statisticSurveyResponse.quantitativeResponseList}'/>--%>
<%--<c:set var='qualitativeResponseList' value='${statisticSurveyResponse.qualitativeResponseList}'/>--%>

<!-- 컨텐츠 내용 -->
<div class="content">
    <!-- 날짜 조회 및 질문 선택 -->
    <div class="row mb-4">
        <div class="col-md-2">
            <%--					<label for="startDate" class="form-label">시작 날짜</label>--%>
            <input type="date" class="form-control" id="startDate" value="2024-04-20">
        </div>
        <div class="col-auto d-flex align-items-center justify-content-center">
            <span>~</span> <!-- 여기에 ~ 기호 추가 -->
        </div>
        <div class="col-md-2">
            <%--					<label for="endDate" class="form-label">종료 날짜</label>--%>
            <input type="date" class="form-control" id="endDate" value="2024-09-16">
        </div>
        <div class="col-md-2 d-flex align-items-end">
            <button class="btn btn-primary w-100">조회하기</button>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-md-2 d-flex align-items-end">
            <select class="form-select">
                <option>질문을 선택해주세요</option>
                <option>질문 1</option>
                <option>질문 2</option>
            </select>
        </div>
        <div class="col-md-2 d-flex align-items-end">
            <select class="form-select">
                <option>문항을 선택해주세요</option>
                <option>문항 1</option>
                <option>문항 2</option>
            </select>
        </div>

        <div class="col-md-2 d-flex align-items-end">
            <button class="btn btn-primary">검색</button>
        </div>
    </div>

    <!-- 참여자 수 그래프 -->
    <div class="progress-bar-container">
        <%--        <c:set var="progressPercentage"--%>
        <%--               value="${(statisticSurveyResponse.participantsCount / statisticSurveyResponse.targetCount) * 100}"/>--%>
        <div class="progress-bar-fill" id="progress-bar-fill"></div>
        <div class="progress-bar-total" id="progress-bar-total"></div>
    </div>

    <!-- 통계 데이터 -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">통계 데이터</h4>
                    <!-- 통계 차트 및 데이터 테이블 삽입 -->
                    <div class="chart-area">
                        <canvas id="statisticChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 정량 평가 통계 -->
    <!-- 보기 전환 버튼 -->
    <div class="view-toggle-container">
        <button id="listViewButton" class="btn btn-secondary">표로 보기</button>
        <button id="carouselViewButton" class="btn btn-secondary">슬라이드로 보기</button>
    </div>

    <!-- 테이블 형태 -->
    <div id="quantitativeListView" class="row mt-4 d-none"></div>

    <!-- 캐러셀 형태 -->
    <div id="quantitativeCarouselView" class="carousel slide mt-4" data-bs-ride="carousel">
        <div class="carousel-inner"></div>

        <a class="carousel-control-prev" href="#dataCarouselView" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#dataCarouselView" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </a>
    </div>

    <!-- 테이블 데이터 캐러셀 -->
    <div id="tableCarousel" class="carousel slide mt-4" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>3번: 고양이를 좋아하는 이유를 알려주세요.</h5>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>활동 시간</th>
                                            <th>사유 선택</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>2024. 2. 2. 오후 6:39:25</td>
                                            <td>귀엽기 때문에</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 다음 슬라이드 -->
            <div class="carousel-item">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>3번: 고양이를 좋아하는 이유를 알려주세요.</h5>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>활동 시간</th>
                                            <th>사유 선택</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>2024. 2. 2. 오후 6:38:54</td>
                                            <td>서열 싫어한다</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a class="carousel-control-prev" href="#tableCarousel" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#tableCarousel" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </a>

    </div>


    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <%--    <script>--%>
    <%--        var quantitativeResponseList = `${quantitativeResponseList}`;--%>
    <%--        var qualitativeResponseList = '${qualitativeResponseList}';--%>
    <%--        &lt;%&ndash;console.log(`${quantitativeResponseList}`);&ndash;%&gt;--%>
    <%--        // console.log(quantitativeResponseList);--%>

    <%--        // 조회수, 시작수, 완료수를 저장할 배열 초기화--%>
    <%--        const totalViews = [];--%>
    <%--        const startCount = [];--%>
    <%--        const completedCount = [];--%>
    <%--        // 날짜 리스트 추출--%>
    <%--        const labels = [];--%>

    <%--        // JSP에서 c:forEach를 사용하여 데이터를 자바스크립트 배열로 저장--%>
    <%--        <c:forEach var="hit" items="${statisticSurveyResponse.hitsResponseList}">--%>
    <%--        &lt;%&ndash;console.log('${hit.occurDate}');&ndash;%&gt;--%>
    <%--        totalViews.push(${hit.totalViews});--%>
    <%--        startCount.push(${hit.startCount});--%>
    <%--        completedCount.push(${hit.completedCount});--%>
    <%--        labels.push('${hit.occurDate}');--%>
    <%--        </c:forEach>--%>

    <%--        const ctx = document.getElementById('statisticChart').getContext('2d');--%>

    <%--        const data = {--%>
    <%--            labels: labels,--%>
    <%--            datasets: [--%>
    <%--                {--%>
    <%--                    label: '조회수',--%>
    <%--                    data: totalViews,--%>
    <%--                    fill: true,--%>
    <%--                    borderColor: 'rgba(72, 136, 246, 1)',--%>
    <%--                    backgroundColor: 'rgba(198, 218, 253, 0.3)',--%>
    <%--                    tension: 0.1--%>
    <%--                },--%>
    <%--                {--%>
    <%--                    label: '시작수',--%>
    <%--                    data: startCount,--%>
    <%--                    fill: true,--%>
    <%--                    borderColor: 'rgba(52, 200, 102, 1)',--%>
    <%--                    backgroundColor: 'rgba(198, 237, 208, 0.3)',--%>
    <%--                    tension: 0.1--%>
    <%--                },--%>
    <%--                {--%>
    <%--                    label: '완료수',--%>
    <%--                    data: completedCount,--%>
    <%--                    fill: true,--%>
    <%--                    borderColor: 'rgba(173, 94, 247, 1)',--%>
    <%--                    backgroundColor: 'rgba(229, 204, 254, 0.3)',--%>
    <%--                    tension: 0.1--%>
    <%--                }--%>
    <%--            ]--%>
    <%--        };--%>

    <%--        const config = {--%>
    <%--            type: 'line',--%>
    <%--            data: data,--%>
    <%--            options: {--%>
    <%--                responsive: true,--%>
    <%--                plugins: {--%>
    <%--                    legend: {--%>
    <%--                        position: 'top',--%>
    <%--                    },--%>
    <%--                },--%>
    <%--                scales: {--%>
    <%--                    x: {--%>
    <%--                        title: {--%>
    <%--                            display: true,--%>
    <%--                            text: '날짜'--%>
    <%--                        }--%>
    <%--                    },--%>
    <%--                    y: {--%>
    <%--                        title: {--%>
    <%--                            display: true,--%>
    <%--                            text: '수치'--%>
    <%--                        }--%>
    <%--                    }--%>
    <%--                }--%>
    <%--            }--%>
    <%--        };--%>

    <%--        // 차트 생성--%>
    <%--        new Chart(ctx, config);--%>
    <%--    </script>--%>

    <script src="/resources/js/statistic/full.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-..."
            crossorigin="anonymous"></script>
</body>
</html>