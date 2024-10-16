<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <%--    <meta name="viewport" content="width=device-width, initial-scale=1.0">--%>
    <title>Insert title here</title>
    <link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/kmeans.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <!-- 버전 맞춤 -->

    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</head>
<body>
<%@include file="/resources/common/header.jsp" %>
<%@include file="/resources/common/nav.jsp" %>
<script>
    var surveyId = '${surveyId}';
    console.log(surveyId);
</script>

<div id="content" class="content"
     style="height: 700px; margin-top: 100px; margin-left: 100px; margin-right: 40px;">
    <h5 class="fw-bold mb-3">K-평균 군집화</h5>
    <div class="accordion my-4" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed c-gray" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false" aria-controls="collapseOne">
                    <i class="bi bi-info-circle me-2"></i> K-평균 군집화란?
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                 data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>‘K-평균 군집화’</strong>는 AI 주관식 응답 분석을 통해 유사도를 기반으로 한 응답들을 산점도 그래프로 보여줘요.
                    별도의 분류 기준 없이, <strong>유사도</strong>를 기반으로 응답을 n개의 묶음으로 분류해주는 기능이에요.
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-9">
            <select id="question-select" class="form-select" aria-label="Default select example">
                <option selected value="">문항을 선택해주세요.</option>
            </select>
        </div>
        <button id="update-btn" type="button" class="col-3 btn btn-primary">업데이트</button>
    </div>

    <div class="d-flex justify-content-between">
        <div class="mt-4 col-2">
            <label for="customRange3" class="form-label fw-bold">군집 갯수</label>
            <input type="range" class="form-range" min="2" max="20" step="1" id="customRange3">
            <div class="d-flex justify-content-between">
                <span id="rangeMinValue">2</span>
                <span id="rangeMaxValue">20</span>
            </div>
        </div>
        <button id="analysis-btn" type="button" class="col-2 btn btn-primary my-auto"><i
                class="bi bi-caret-right-fill me-2"></i>분석
        </button>
    </div>

    <div id="chart"></div>

</div>


<script src="/resources/js/statistic/kmeans.js"></script>
</body>
</html>