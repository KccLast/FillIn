<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="/resources/common/statisticsNav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/full.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <!-- 버전 맞춤 -->
</head>
<body>
<%@include file="/resources/common/header.jsp" %>
<%@include file="/resources/common/statisticsNav.jsp" %>
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
        <h4 class="fw-bold mb-">설문 전체 통계</h4>


        <div class="row g-3 my-auto">
            <div class="col d-flex align-items-center">
                <label for="startDate" class="form-label fw-bold me-2 my-auto" style="min-width: 50px;">시작일</label>
                <input type="date" class="form-control" id="startDate" value='${postDateResponse.postDate}'>
            </div>
            <div class="col d-flex align-items-center">
                <label for="endDate" class="form-label fw-bold me-2 my-auto" style="min-width: 50px;">종료일</label>
                <input type="date" class="form-control" id="endDate" value='${postDateResponse.endDate}'>
            </div>
            <div class="col d-flex align-items-center">
                <label for="questionSelect" class="form-label fw-bold me-2 my-auto"
                       style="min-width: 50px;">그룹화</label>
                <select id="questionSelect" class="form-select" style="min-width: 270px !important;">
                    <%--                    <option>질문을 선택해주세요</option>--%>
                </select>
            </div>
            <div class="col d-flex align-items-center">
                <select id="itemSelect" class="form-select" style="min-width: 220px !important;" disabled>
                    <%--                    <option>문항을 선택해주세요</option>--%>
                </select>
            </div>
            <div class="col">
                <button id="search-input" class="btn btn-primary">검색</button>
            </div>
        </div>

        <!-- 참여자 수 그래프 -->
        <div class="my-auto">
            <h5 class="fw-bold mt-4">목표 달성률</h5>
            <div class="progress-bar-container" style="height: 60px;">
                <%--        <c:set var="progressPercentage"--%>
                <%--               value="${(statisticSurveyResponse.participantsCount / statisticSurveyResponse.targetCount) * 100}"/>--%>
                <div class="progress-bar-fill fw-bold" id="progress-bar-fill"></div>
                <div class="progress-bar-total fw-bold" id="progress-bar-total"></div>
            </div>
        </div>

        <!-- 통계 데이터 -->
        <div class="my-auto">
            <h5 class="fw-bold mt-4">조회수 통계</h5>
            <div class="card">
                <div class="card-body">
                    <div class="row mb-3 fw-bold">
                        <div class="col">
                            <div class="fs-8">총 조회수</div>
                            <div class="fs-4 fw-bold">25</div>
                        </div>
                        <div class="col">
                            <div class="fs-8">시작 수</div>
                            <div class="fs-4 fw-bold">25</div>
                        </div>
                        <div class="col">
                            <div class="fs-8">완료 수</div>
                            <div class="fs-4 fw-bold">25</div>
                        </div>
                    </div>
                    <!-- 통계 차트 및 데이터 테이블 삽입 -->
                    <div class="chart-area d-flex justify-content-center">
                        <canvas id="hitsChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h5 class="fw-bold mt-4">질문 별 통계</h5>
            <!-- Bootstrap 그리드 시스템 사용 -->
            <div class="row">
                <!-- 표 영역 -->
                <div class="col-lg-6 mb-4">
                    <div class="card table-container">
                        <div class="card-body" style="padding: 0; max-height: 420px; overflow-y: auto">
                            <table class="table table-hover" style="table-layout: fixed; width: 100%;">
                                <thead style="position: sticky; top: 0; background-color: white; z-index: 1;">
                                <tr>
                                    <th>번호</th>
                                    <th>질문</th>
                                    <th>유형</th>
                                </tr>
                                </thead>
                                <tbody id="table-body">
                                <%--                                <tr>--%>
                                <%--                                    <td>1</td>--%>
                                <%--                                    <td>사용자 경험 조사</td>--%>
                                <%--                                    <td>객관식</td>--%>
                                <%--                                </tr>--%>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 차트 영역 -->
                <div class="col-lg-6">
                    <div class="card chart-container">
                        <div class="card-body">
                            <%--                            <div class="fw-bold">--%>
                            <%--                                1번: 사용자 경험 조사--%>
                            <%--                            </div>--%>
                            <%--                            <p>웹 사이트 사용에 대한 경험을 조사합니다.</p>--%>
                            <%--                            <canvas id="statisticChart"></canvas>--%>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="/resources/js/statistic/full.js"></script>
        <%--        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>--%>
</body>
</html>