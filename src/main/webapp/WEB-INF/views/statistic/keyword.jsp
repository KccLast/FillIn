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
                <label for="phrase">문항을 선택해주세요</label>
                <select id="phrase">
                    <option value="문항1">문항1</option>
                    <option value="문항2">문항2</option>
                </select>
                <button id="update">업데이트</button>
            </div>
            <div class="search-filter">
                <label for="score-filter">검색 점수 필터: <span id="score-value">1</span></label>
                <input type="range" id="score-filter" min="0" max="1" value="1" oninput="updateScoreValue(this.value)">
                <label for="result-count">결과 수: <span id="result-value">500</span></label>
                <input type="range" id="result-count" min="1" max="1000" value="500"
                       oninput="updateResultValue(this.value)">
            </div>
            <div class="keyword-search">
                <label for="score-search">검색 키워드</label>
                <input type="text" id="keyword-input" placeholder="가격" required>
                <button id="search-btn">검색</button>

                <!-- 워드 클라우드 -->
                <div id="wordCloudContainer"
                     style="width: 100%; height: 400px; margin-top: 30px; justify-content: center;"></div>

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
        <div class="emotion-analysis">
            <h4>감정 분석</h4>
            <input type="text" id="emotion-text" placeholder="분석할 텍스트를 입력하세요" required>
            <button id="analyze-emotion-btn">분석 시작</button>
            <div id="emotion-result" style="margin-top: 20px;"></div>
        </div>

    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/resources/js/statistic/keyword.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.1.0/wordcloud2.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

</body>
</html>