<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <html>

    <head>
        <title>Title</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="/resources/common/dashBoardNav.css">
        <link rel="stylesheet" type="text/css" href="/resources/css/statistic/compareClustering.css">
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
        <script src="/resources/common/nav.js"></script>
    </head>
    <script>
        const tableDataJson = JSON.parse('${tableData}');
        console.log("Received Table Data: ", tableDataJson);
    </script>

    <body>
        <%@include file="/resources/common/header.jsp" %>
            <%@include file="/resources/common/dashBoardNav.jsp" %>
                <%@include file="/resources/common/commonSelectModal.jsp" %>
                    <%--<%@include file="/resources/common/progressBar.css" %>--%>

                        <%--<script>--%>

                            <%-- var surveyId='${surveyId}' ;--%>
                                <%-- console.log(surveyId);--%>
                                    <%-- setHeadertitle('군집 별 비교 분석');--%>
                                        <%--< /script>--%>


                                            <div id="content" class="content">
                                                <div class="container card">
                                                    <div class="step-wrapper">
                                                        <div class="step-container">
                                                            <div class="step">
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
                                                            <div class="step active">
                                                                <i class="fas fa-chart-bar"></i>
                                                                <p class="step-text">군집별 비교분석</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h4 class="fw-bold mt-2 surveyTitle"></h4>

                                                    <div class="accordion my-4" id="accordionExample">
                                                        <div class="accordion-item">
                                                            <h2 class="accordion-header" id="headingOne">
                                                                <button class="accordion-button collapsed c-gray"
                                                                    type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseOne" aria-expanded="false"
                                                                    aria-controls="collapseOne">
                                                                    <i class="bi bi-info-circle me-2"></i> 군집 별 비교 분석이란?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" class="accordion-collapse collapse"
                                                                aria-labelledby="headingOne"
                                                                data-bs-parent="#accordionExample">
                                                                <div class="accordion-body">
                                                                    <strong>군집 별 비교 분석</strong> 페이지는 앞선 K-평균 군집화와 키워드 분석
                                                                    결과를 바탕으로 각 군집이 전체 설문에서 어떻게 응답했는지 자세히 보여주는
                                                                    페이지입니다. 각 군집의 특성을 도출하고, 질문별 응답 패턴을 비교함으로써 군집마다 나타나는
                                                                    고유한 특성과 경향을 이해할 수 있습니다.
                                                                    <br><br>
                                                                    이를 통해 사용자는 특정 군집이 설문 질문에 대해 가지는 공통된 인식과 차이점을 쉽게 파악할
                                                                    수 있으며, 다른 질문들에 대한 응답 경향을 분석하여 각 군집의 반응을
                                                                    종합적으로 이해할 수 있습니다.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="card mt-3">
                                                        <div class="card-body" style="padding: 0;">
                                                            <h5 class="fw-bold mb-4">군집 별 분석결과</h5>
                                                            <table class="cluster-analysis-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>군집</th>
                                                                        <th>주요 키워드</th>
                                                                        <th>감정 분석</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <div class="card mt-3 comparison-analysis-container">
                                                        <div class="card-body" style="padding: 0;">
                                                            <h5 class="fw-bold mb-4">질문 별 AI 분석</h5>

                                                            <div class="tables-container">
                                                                <!-- 왼쪽 테이블 -->
                                                                <div class="table-left styled-table">
                                                                    <h5 class="fw-bold">정량 평가 질문</h5>
                                                                    <table>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>번호</th>
                                                                                <th>질문</th>
                                                                                <th>유형</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tr>
                                                                            <td><span class="circle-number">1</span>
                                                                            </td>
                                                                            <td>사용자 경험 조사</td>
                                                                            <td><span class="type-icon">📝</span> 객관식
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td><span class="circle-number">2</span>
                                                                            </td>
                                                                            <td>사용자 경험 조사</td>
                                                                            <td><span class="type-icon">☑️</span> 체크박스
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td><span class="circle-number">2</span>
                                                                            </td>
                                                                            <td>사용자 경험 조사</td>
                                                                            <td><span class="type-icon">📊</span> 선형
                                                                            </td>
                                                                        </tr>
                                                                        <!-- 추가 행들... -->
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                <!-- 오른쪽 테이블 -->
                                                                <div class="table-right styled-table">
                                                                    <h5 class="fw-bold">1번 사용자 경험 조사</h5>
                                                                    <table>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>번호</th>
                                                                                <th>응답</th>
                                                                                <th>클러스터</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>C</td>
                                                                                <td>Cluster 1, Cluster 2</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>Java</td>
                                                                                <td>Cluster 3</td>
                                                                            </tr>
                                                                            <!-- 더 많은 행을 추가할 수 있습니다. -->
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            <!-- AI 분석 버튼 -->
                                                            <div class="ai-analysis-button-container">
                                                                <button class="ai-analysis-button btn-primary fw-bold">
                                                                    <i class="bi bi-clipboard-data"></i> AI 분석
                                                                </button>
                                                            </div>

                                                            <!-- 분석 결과 텍스트 -->
                                                            <div class="analysis-text">
                                                                <p>건강 관리 방식과 건강 만족도의 상관관계: 건강 관리 방법이 건강에 대한 만족도에 중요한 영향을
                                                                    미칩니다. 운동과 식습관 관리에 집중하는 군집 1은 건강에 대해 매우 높은
                                                                    만족도를
                                                                    보이며...</p>
                                                                <!-- 추가 텍스트를 여기에 입력 -->
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <script src="/resources/js/statistic/compareClustering.js"></script>
    </body>

    </html>