<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/full.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <!-- 버전 맞춤 -->
</head>
<body>
<%@include file="/resources/common/header.jsp" %>
<%@include file="/resources/common/nav.jsp" %>
<script>
    var surveyId = '${surveyId}';
    var postDate = '${postDateResponse.postDate}';
    var endDate = '${postDateResponse.endDate}';
    console.log(postDate + " , " + endDate);
</script>
<!-- 로딩 스피너 -->
<div id="loading" style="display: none !important;">
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <h5>Loaing!!!!!!!!!!!!!!!!!!!!!</h5>
</div>
<!-- 컨텐츠 내용 -->
<div id="content" class="content" style="display: none;">
    <!-- 날짜 조회 및 질문 선택 -->
    <div class="container">
        <div class="row m-2">
            <div class="col-md-6 d-flex align-items-center">
                <label for="startDate" class="form-label me-2" style="flex-basis: 70px;">시작일</label>
                <input type="date" class="form-control" id="startDate" value='${postDateResponse.postDate}'>
            </div>
            <div class="col-md-6 d-flex align-items-center">
                <label for="endDate" class="form-label me-2" style="flex-basis: 70px;">종료일</label>
                <input type="date" class="form-control" id="endDate" value='${postDateResponse.endDate}'>
            </div>
        </div>

        <div class="row m-2">
            <div class="col-md-6 d-flex align-items-center">
                <label for="questionSelect" class="form-label me-2" style="flex-basis: 70px;">그룹화</label>
                <select id="questionSelect" class="form-select">
                    <%--                    <option>질문을 선택해주세요</option>--%>
                </select>
            </div>
            <div class="col-md-6 d-flex align-items-center">
                <select id="itemSelect" class="form-select" disabled>
                    <%--                    <option>문항을 선택해주세요</option>--%>
                </select>
            </div>
        </div>

        <div class="m-2 ">
            <button id="search-input" class="btn btn-primary">검색</button>
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

    <!-- 보기 전환 버튼 -->
    <div class="view-toggle-container">
        <button id="listViewButton" class="btn btn-secondary">표로 보기</button>
        <button id="carouselViewButton" class="btn btn-secondary">슬라이드로 보기</button>
    </div>

    <!-- 정량 평가 통계 -->
    <!-- 테이블 형태 -->
    <div id="quanListView" class="row mt-4 d-none"></div>

    <!-- 캐러셀 형태 -->
    <div id="quanCarouselView" class="carousel carousel-dark slide mt-4" data-bs-ride="carousel">
        <div class="carousel-inner quan-carousel-inner"></div>

        <a class="carousel-control-prev" href="#quanCarouselView" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#quanCarouselView" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </a>
    </div>

    <!-- 정성 평가 통계 -->
    <!-- 테이블 형태 -->
    <div id="qualListView" class="row mt-4 d-none"></div>

    <!-- 캐러셀 형태 -->
    <div id="qualCarouselView" class="carousel carousel-dark slide mt-4" data-bs-ride="carousel">
        <div class="carousel-inner qual-carousel-inner">
        </div>

        <a class="carousel-control-prev ms-0" href="#qualCarouselView" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#qualCarouselView" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </a>

    </div>


    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="/resources/js/statistic/full.js"></script>
</body>
</html>