<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>키워드 분석</title>

    <link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/keyword.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/js/bootstrap.bundle.min.js"></script>


    <!-- 버전 맞춤 -->

    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</head>
<body>
<%@include file="/resources/common/header.jsp" %>
<%@ include file="/resources/common/nav.jsp" %>

<script>
    <%--console.log('${}')// 콘솔에 clusteringData 출력--%>
    // 서버에서 전달된 clusteringData를 JSON으로 변환하여 JavaScript 변수에 저장

    var clusteringData = ${clusteringData};

    <%--console.log("Received Clustering Data: " + ${clusteringData});--%>

    console.log("Received Clustering Data: ", clusteringData);
</script>
<!-- 단계 바 -->

<%--<div class="container" style="margin-top:30px; margin-bottom:45px;">
    <div class="progress" style="height: 40px;">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar"
             style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">
            <i class="fas fa-check-circle"></i> 키워드 분석
        </div>
        <div class="progress-bar bg-secondary" role="progressbar" style="width: 33%" aria-valuenow="33"
             aria-valuemin="0" aria-valuemax="100">
            K-평균 군집화
        </div>
        <div class="progress-bar bg-secondary" role="progressbar" style="width: 34%" aria-valuenow="34"
             aria-valuemin="0" aria-valuemax="100">
            군집별 비교분석
        </div>
    </div>
</div>--%>

<div id="content" class="content" style="height: 700px; margin-top: 100px; margin-left: 100px; margin-right: 40px;">
    <div class="container">
        <div class="container" style="margin-top: 3px; margin-bottom: 28px; text-align: center;">
            <div class="step-wrapper">
                <div class="step active">
                    <i class="fas fa-search"></i>
                    <p>키워드 분석</p>
                </div>
                <div class="step-divider"></div>
                <div class="step">
                    <i class="fas fa-braille"></i>
                    <p>K-평균 군집화</p>
                </div>
                <div class="step-divider"></div>
                <div class="step">
                    <i class="fas fa-chart-bar"></i>
                    <p>군집별 비교분석</p>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <button id="prevBtn" class="nav-btn" style="padding: 12px 30px; font-size:16px;">이전</button>
                <button id="nextBtn" class="nav-btn" style="padding: 12px 30px; font-size:16px;">다음</button>
            </div>
        </div>

        <!-- 검색 및 필터 -->
        <div class="container" style="margin-top: 20px;">
            <div class="row mb-4">
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="phrase" style="margin-bottom:14px; margin-left:10px;">군집을 선택해주세요</label>
                        <select id="phrase" class="form-select">
                            <option selected value="phrase">문항을 선택해주세요.</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="search-filter mb-3">
                        <label for="result-count" class="d-block">군집 갯수</label>
                        <input type="range" id="result-count" min="2" max="20" value="5"
                               oninput="updateResultValue(this.value)" class="form-range">
                        <div class="d-flex justify-content-between mt-1" style="width:50%;">
                            <span id="rangeMinValue">2</span>
                            <span id="rangeValue">5</span>
                            <span id="rangeMaxValue">20</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-flex align-items-end justify-content-end">
                    <button id="update-btn" class="btn btn-primary custom-btn">업데이트</button>
                </div>
            </div>

            <!-- 검색 키워드 입력 및 워드클라우드, 감정분석 -->
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="keyword-search">
                        <label for="keyword-input" class="d-block">검색 키워드 입력</label>
                        <input type="text" id="keyword-input" class="form-control mb-2"
                               placeholder="ex) 질문, 추가 등의 키워드를 입력하세요">
                        <button id="table-search-btn" class="btn btn-primary custom-btn" data-bs-toggle="tooltip"
                                data-bs-placement="top" title="키워드를 검색하여 테이블을 필터링합니다;">
                            <i class="fas fa-search"></i> 검색
                        </button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex flex-column align-items-end">
                        <button id="wordcloud-btn" class="btn btn-primary custom-btn mb-2" data-bs-toggle="tooltip"
                                data-bs-placement="top" title="키워드로 워드 클라우드를 만듭니다;">
                            <i class="fas fa-cloud"></i> 워드 클라우드 생성
                        </button>
                        <button id="analyze-emotion-btn" class="btn btn-primary custom-btn" data-bs-toggle="tooltip"
                                data-bs-placement="top" title="텍스트 감정을 분석합니다;" style="width:30%;">
                            <i class="fas fa-smile"></i> 감정 분석
                        </button>
                        <small class="text-muted d-block mt-2">- 워드 클라우드 생성: 입력된 키워드를 바탕으로 자주 사용된 단어를 시각화합니다.</small>
                        <small class="text-muted d-block">- 감정 분석: 텍스트에서 긍정, 부정 등의 감정을 분석합니다.</small>
                    </div>
                </div>
            </div>

            <!-- 워드 클라우드 컨테이너 -->
            <div id="wordCloudContainer"
                 style="width: 100%; height: 400px; background-color: rgb(248, 249, 252); margin-top: 30px; justify-content: center;"></div>

            <!-- 감정분석 차트 -->
            <div id="emotionChartContainer">
                <select id="chart-type-selector" class="form-select" style="width: 150px; margin-bottom: 15px;">
                    <option value="bar">막대 그래프</option>
                    <option value="pie">파이 차트</option>
                </select>
                <canvas id="chart-container"></canvas>
            </div>

            <!-- 검색 결과 테이블 -->
            <div class="result-section"
                 style="max-height: 300px; overflow-y: scroll; margin-top: 20px; border: 1px solid #ccc;">
                <table class="result-table" style="width: 100%; border-collapse: collapse;" aria-label="검색 결과 테이블">
                    <thead>
                    <tr>
                        <th>SEQ</th>
                        <th>CLUSTER</th>
                        <th>ANSWER_Content</th>
                        <th>ANSWER_DATE</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>


        <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>--%>
        <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.1.0/wordcloud2.min.js"></script>--%>
        <%--<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>--%>
        <%--<script src="/resources/js/statistic/keyword.js"></script>--%>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <script src="/resources/js/statistic/keyword.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.1.0/wordcloud2.js"></script>
</body>

</html>
