<%--
<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/keyword.css">





</head>
<body>
<%@include file="/resources/common/header.jsp" %>
&lt;%&ndash; <%@ include file="/resources/common/miniNav.jsp"%> &ndash;%&gt;
<%@ include file="/resources/common/nav.jsp" %>


<div class="content">

    <div class="container">
        <div class="keyword-analysis">
            <!-- 단계 바 -->
            <div class="progress-bar" id="parent-bar">
                <div class="step done">
                    <span class="icon">✓</span>
                    <span class="text">키워드 분석</span>
                </div>
                <div class="step">
                    <span class="icon">✓</span>
                    <span class="text">K-평균 군집화</span>
                </div>
                <div class="step">
                    <span class="icon">✓</span>
                    <span class="text">군집별 비교분석</span>
                </div>
            </div>
            <!-- 단계 바 끝 -->

            <div class="title">
                <h3>키워드 분석</h3>
            </div>
            <div class="search-section">
                <label for="phrase">문항을 선택해주세요</label> <select id="phrase">
                <option value="문항1">문항1</option>
                <option value="문항2">문항2</option>
            </select>
                <button id="update">업데이트</button>
            </div>
            <div class="search-filter">
                <label for="score-filter">검색 점수 필터: <span id="score-value">1</span></label>
                <input type="range" id="score-filter" min="0" max="1"
                       value="1" oninput="updateScoreValue(this.value)"> <label
                    for="result-count">결과 수: <span id="result-value">500</span></label>
                <input type="range" id="result-count" min="1" max="1000"
                       value="500" oninput="updateResultValue(this.value)">
            </div>
            <div class="keyword-search">
                <label for="score-search">검색 키워드</label>
                <input type="text" placeholder="가격" required>
                <button>검색</button>

                <!-- 스크롤 결과 -->
                <div class="result-section"
                     style="max-height: 300px; overflow-y: scroll; margin-top: 20px; border: 1px solid #ccc;">
                    <table class="result-table" style="width: 100%; border-collapse: collapse;" aria-label="검색 결과 테이블">
                        <thead>
                        <tr>
                            <th>SEQ</th>
                            <th>QUESTION_SEQ</th>
                            <th>PARTICIPANT_SEQ</th>
                            <th>CONTENTS</th>
                            <th>ANSWER_DATE</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- 더미 데이터 삭제 후 서버에서 가져온 데이터를 표시 -->
                        <tr>
                            <td>${item.SEQ}</td>
                            <td>${item.QUESTION_SEQ}</td>
                            <td>${item.PARTICIPANT_SEQ}</td>
                            <td>${item.CONTENTS}</td>
                            <td>${item.ANSWER_DATE}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/resources/js/statistic/keyword.js"></script>

</body>
</html>--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

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
</head>
<body>
<%@include file="/resources/common/header.jsp" %>
<%@ include file="/resources/common/nav.jsp" %>
<script>
    <%--console.log('${}')// 콘솔에 clusteringData 출력--%>
    // 서버에서 전달된 clusteringData를 JSON으로 변환하여 JavaScript 변수에 저장
    var clusteringData = ${clusteringData};
    console.log("Received Clustering Data: ", clusteringData);
</script>

<div class="content">
    <div class="container">
        <div class="keyword-analysis">
            <!-- 단계 바 -->

            <div class="container" style="margin-top:30px; margin-bottom:45px;">
                <div class="progress" style="height: 40px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">
                        <i class="fas fa-check-circle"></i> 키워드 분석
                    </div>
                    <div class="progress-bar bg-secondary" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">
                        K-평균 군집화
                    </div>
                    <div class="progress-bar bg-secondary" role="progressbar" style="width: 34%" aria-valuenow="34" aria-valuemin="0" aria-valuemax="100">
                        군집별 비교분석
                    </div>
                </div>
            </div>

            <!-- 단계 바 끝 -->

            <h5 class="fw-bold mb-3">키워드 분석</h5>
            <div class="accordion my-4" id="keywordAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="keywordHeading">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#keywordCollapse"
                                aria-expanded="false" aria-controls="keywordCollapse">
                            <i class="bi bi-info-circle me-2"></i> 키워드 분석이란?
                        </button>
                    </h2>
                    <div id="keywordCollapse" class="accordion-collapse collapse" aria-labelledby="keywordHeading"
                         data-bs-parent="#keywordAccordion">
                        <div class="accordion-body">
                            <strong>‘키워드 분석’</strong>은 군집별로 주어진 데이터 내에서 중요한 키워드를 식별하고, 이 키워드들의 사용 빈도와 관련성을 분석하는 과정입니다.
                            이를 통해 사용자는 데이터의 핵심 주제나 트렌드를 더 명확하게 이해할 수 있습니다.
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-8">
                        <div class="search-section mb-3">
                            <label for="phrase">문항을 선택해주세요</label>
                            <select id="phrase" class="form-select">
                                <option value="문항1">문항1</option>
                                <option value="문항2">문항2</option>
                            </select>
                        </div>
                        <div class="search-filter mb-3">
                            <label for="score-filter">검색 점수 필터: <span id="score-value">1</span></label>
                            <input type="range" id="score-filter" min="0" max="1" value="1" oninput="updateScoreValue(this.value)" class="form-range">
                            <label for="result-count">결과 수: <span id="result-value">500</span></label>
                            <input type="range" id="result-count" min="1" max="1000" value="500" oninput="updateResultValue(this.value)" class="form-range">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="keyword-search">
                            <label for="score-search">검색 키워드</label>
                            <input type="text" id="keyword-input" placeholder="가격" required class="form-control mb-2">
                            <button id="search-btn" class="btn btn-primary btn-block mb-2">워드 클라우드 생성</button>
                            <button id="analyze-emotion-btn" class="btn btn-primary btn-block">감정 분석 시작</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- 워드 클라우드 -->
                <div id="wordCloudContainer"
                     style="width: 100%; height: 400px; background-color: rgb(248, 249, 252); margin-top: 30px; justify-content: center;">

                </div>

                <!-- 감정 분석 결과 출력 영역 -->
<%--                <div id="emotion-result" style="margin-top: 20px;"></div>--%>

                <!-- 차트 유형 선택 드롭다운 -->
                <select id="chart-type-selector" style="display:none;">
                    <option value="bar">막대 그래프</option>
                    <option value="pie">파이 차트</option>
                </select>

                <!-- 감정 분석 결과 차트를 표시할 컨테이너 -->
                <div id="chart-parent" style = "width: 100%; height: 500px; display: flex; align-items: center; justify-content: center; display:none;">
                <canvas id="chart-container" style="width: 200px; height: 300px; margin-top: 30px; display:none;"></canvas>
                </div>
                <!-- 스크롤 결과 -->
                <div class="result-section"
                     style="max-height: 300px; overflow-y: scroll; margin-top: 20px; border: 1px solid #ccc;">
                    <table class="result-table" style="width: 100%; border-collapse: collapse;" aria-label="검색 결과 테이블">
                        <thead>
                        <tr>
                            <th>SEQ</th>
                            <th>QUESTION_SEQ</th>
                            <th>PARTICIPANT_SEQ</th>
                            <th>CONTENTS</th>
                            <th>ANSWER_DATE</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- 서버에서 가져온 데이터를 표시 -->
                        </tbody>
                    </table>
                </div>

            </div>
        </div>


        <!-- 감정 분석 섹션 추가 -->
<%--        <div class="emotion-analysis">--%>
<%--            <h4>감정 분석</h4>--%>
<%--            <input type="text" id="emotion-text" placeholder="분석할 텍스트를 입력하세요" required>--%>
<%--            <button id="analyze-emotion-btn">분석 시작</button>--%>
<%--            <div id="emotion-result" style="margin-top: 20px;"></div>--%>
<%--        </div>--%>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="/resources/js/statistic/keyword.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.1.0/wordcloud2.js"></script>
</body>
</html>