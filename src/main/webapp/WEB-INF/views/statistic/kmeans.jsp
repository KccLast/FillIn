<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <%--    <meta name="viewport" content="width=device-width, initial-scale=1.0">--%>
    <title>Insert title here</title>
    <link rel="stylesheet" type="text/css" href="/resources/common/statisticsNav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/kmeans.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap">
    <!-- 버전 맞춤 -->
    <link rel="stylesheet" type="text/css" href="/resources/common/progressBar.css">


    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</head>
<body>
<%@include file="/resources/common/header.jsp" %>
<%@include file="/resources/common/statisticsNav.jsp" %>
<%--<%@include file="/resources/common/progressBar.css" %>--%>

<script>

    var surveyId = '${surveyId}';
    console.log(surveyId);

</script>





<div id="content" class="content">

    <div class="container">
        <div class="step-wrapper">
            <div class="step-container">
                <div class="step active">
                    <i class="fas fa-braille"></i>
                    <p class="step-text">K-평균 군집화</p>
                </div>
            </div>
            <div class="step-divider"></div>
            <div class="step-container">
                <div class="step">
                    <i class="fas fa-search"></i>
                    <p class="step-text">키워드 분석</p>
                </div>
            </div>
            <div class="step-divider"></div>
            <div class="step-container">
                <div class="step">
                    <i class="fas fa-chart-bar"></i>
                    <p class="step-text">군집별 비교분석</p>
                </div>
            </div>
        </div>

    <div class="container card">

        <h4 class="fw-bold mt-2">K-평균 군집화</h4>
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
                        각 군집은 유사한 답변을 포함하고, 이 군집들은 <strong>산점도 그래프</strong>를 통해 시각적으로 확인할 수 있어요. 이를 통해서 응답이 어떻게 분류되는지,
                        유사한 응답들이 어떻게
                        그룹화되는지를 쉽게 이해할 수 있어요.
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between">
            <div class="col-9">
                <select id="question-select" class="form-select" aria-label="Default select example">
                    <%--                    <option selected value="">문항을 선택해주세요.</option>--%>
                </select>
            </div>
            <button id="update-btn" type="button" class="col-2 btn btn-primary">업데이트</button>
        </div>

        <div class="d-flex justify-content-between">

            <div class="mt-4 col-2">
                <label for="customRange3" class="form-label fw-bold">군집 갯수</label>
                <div class="row">
                    <div class="col"><input type="range" class="form-range" min="2" max="20" step="1" id="customRange3">
                        <div class="d-flex justify-content-between">
                            <span id="rangeMinValue">2</span>
                            <span id="rangeMaxValue">20</span>
                        </div>
                    </div>
                    <div class="col-2">
                        <span id="currentRangeValue">2</span>
                    </div>
                </div>
            </div>
            <button id="analysis-btn" type="button" class="col-2 btn btn-primary my-auto"><i
                    class="bi bi-caret-right-fill me-2"></i>분석
            </button>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <div id="chart"></div>
            </div>
        </div>


        <div class="card mt-3">
            <div class="card-body" style="padding: 0; max-height: 420px; overflow-y: auto">
                <table class="table table-hover" style="table-layout: fixed; width: 100%; text-align: center">
                    <thead style="position: sticky; top: 0; background-color: white; z-index: 1;">
                    <tr>
                        <th scope="col" style="width: 25%">응답일</th>
                        <th scope="col" style="width: 10%">Cluster</th>
                        <th scope="col" style="width: 65%">내용</th>
                    </tr>
                    </thead>
                    <tbody id="table-body"></tbody>
                </table>
            </div>
        </div>


        <div class="d-flex justify-content-center mt-4" style="margin-bottom: 20px;">
            <button id="next-btn" class="btn btn-primary">다음 페이지</button>
        </div>
    </div>
</div>

        <script src="/resources/js/statistic/kmeans.js"></script>
</body>
</html>