<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <title>회귀분석</title>
        <!-- jQuery 라이브러리 -->
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <!-- jQuery UI 라이브러리 -->
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
        <%-- sweetAlert2 라이브러리   --%>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <!-- Bootstrap CSS 추가 -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="/resources/common/statisticsNav.css">
        <link rel="stylesheet" type="text/css" href="/resources/common/dashBoardNav.css">
        <link rel="stylesheet" type="text/css" href="/resources/css/statistic/linearRegression.css">
        <%--  chart.js  --%>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>

    <body>
        <%@ include file="/resources/common/header.jsp" %>
            <%@ include file="/resources/common/dashBoardNav.jsp" %>
                <%@include file="/resources/common/commonSelectModal.jsp" %>

                    <div class="content">
                        <div class="container card">
                            <h4 class="fw-bold mt-2 surveyTitle" data-bs-toggle="modal"
                                data-bs-target="#j-user-sur-Modal"></h4>
                            <%-- 설명 아코디언 버튼 --%>
                                <div class="accordion my-4" id="accordionRegression">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed c-gray" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                aria-expanded="false" aria-controls="collapseOne">
                                                <i class="bi bi-info-circle me-2"></i>회귀분석이란?
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse"
                                            data-bs-parent="#accordionRegression">
                                            <div class="accordion-body">
                                                <strong>회귀분석</strong>은 '한 가지 요소'가 '다른 요소'에 어떤 영향을 미치는지,
                                                그리고 그 관계가 얼마나 강한지를 이해하고 예측하는 방법입니다. <br>
                                                예를 들면 <strong>부모의 키</strong>와 <strong>자녀의 키</strong> 사이에 관계가 있는지, 또 얼마나
                                                연관이 있는지를 알아보고 싶다면 회귀분석을
                                                사용할 수 있습니다.
                                                회귀분석을 통해 다음과 같은 질문에 답할 수 있습니다<br><br>
                                                <i class="bi bi-dot"></i> 부모의 키가 클수록 자녀의 키도 커질 가능성이 높은가? <br>
                                                <i class="bi bi-dot"></i> 집 크기가 커지면 가격도 비례해서 높아지는가? <br>
                                                <i class="bi bi-dot"></i> 광고비를 더 쓰면 매출이 얼마나 늘어날까? <br><br>
                                                이처럼 <strong>하나의 변수(독립 변수)</strong>가 <strong>다른 변수(종속 변수)</strong>에 미치는
                                                영향을 수학적으로 계산하여 관계를 예측하는 데
                                                회귀분석이 활용됩니다.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <%-- 설명 아코디언 버튼 end--%>
                                    <div class="card">
                                        <div class="card-header fs-5 fw-bold">
                                            분석 항목 선택
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div class="w-100">
                                                    <p class="fw-bold">결과 질문과 원인 질문을 선택하세요.</p>
                                                    <div class="question-list row justify-content-between"
                                                        data-seq="${surveySeq}">
                                                        <div
                                                            class="col-5 justify-content-center align-items-center flex-grow-1">
                                                            <p class="fw-bold mt-4">결과 질문(결과로 알고 싶은 항목을 선택하세요.)</p>
                                                            <div class="dependent-question-container"></div>
                                                        </div>
                                                        <div
                                                            class="col-5  justify-content-center align-items-center flex-grow-1">
                                                            <p class="fw-bold mt-4">원인 질문(결과에 영향을 줄 수 있는 항목을 선택하세요.)</p>
                                                            <div class="independent-question-container"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <button type="button" class="btn btn-primary mt-3"
                                                    id="start-regression">분석</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card-header fs-5 fw-bold">분석결과 차트</div>
                                        <div class="card-body">
                                            <canvas id="regression-chart" width="400" height="200"></canvas>
                                        </div>
                                    </div>
                        </div>
                    </div>
                    <%@include file="/WEB-INF/views/statistic/modal-liner-regression.jsp" %>
                        <script src="/resources/js/statistic/linearRegression.js"></script>
    </body>

    </html>