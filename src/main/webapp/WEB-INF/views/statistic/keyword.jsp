<%--<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>키워드 분석</title>

            <link rel="stylesheet" type="text/css" href="/resources/common/statisticsNav.css">
            <link rel="stylesheet" type="text/css" href="/resources/common/dashBoardNav.css">
            <link rel="stylesheet" type="text/css" href="/resources/css/statistic/keyword.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/css/bootstrap.min.css"
                rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap">
            <script src="/resources/common/nav.js"></script>

            <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        </head>

        <body>
            <%@ include file="/resources/common/header.jsp" %>
                <%@ include file="/resources/common/dashBoardNav.jsp" %>

                    <script>
                        var clusteringData = ${ clusteringData };
                        console.log("Received Clustering Data: ", clusteringData);
                    </script>

                    <!-- 단계 바 -->
                    <div id="content" class="content"
                        style="height: 700px; margin-top: 100px; margin-left: 100px; margin-right: 40px;">
                        <div class="container">
                            &lt;%&ndash; <div class="container"
                                style="margin-top: 3px; margin-bottom: 28px; text-align: center;">&ndash;%&gt;
                                <div class="step-wrapper">
                                    <div class="step-container">
                                        <div class="step">
                                            <i class="fas fa-braille"></i>
                                            <p class="step-text">K-평균 군집화</p>
                                        </div>
                                    </div>
                                    <div class="step-divider"></div>
                                    <div class="step-container">
                                        <div class="step active">
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


                                &lt;%&ndash; <div class="nav-buttons">&ndash;%&gt;
                                    &lt;%&ndash; <button id="prevBtn" class="nav-btn">이전</button>&ndash;%&gt;
                                    &lt;%&ndash; <button id="nextBtn" class="nav-btn">다음</button>&ndash;%&gt;
                                    &lt;%&ndash; </div>&ndash;%&gt;

                                &lt;%&ndash;
                            </div>&ndash;%&gt;



                            <!-- 검색 및 필터 -->
                            <div class="container" style="margin-top: 20px;">
                                <div class="accordion my-4" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button class="accordion-button collapsed c-gray" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                aria-expanded="false" aria-controls="collapseOne">
                                                <i class="bi bi-info-circle me-2"></i> 키워드 분석이란?
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse"
                                            aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <strong>‘키워드 분석’</strong>은 군집별로 주어진 데이터 내에서 중요한 키워드를 식별하고, 이 키워드들의 사용
                                                빈도와 관련성을 분석하는 과정입니다.
                                                이를 통해 사용자는 데이터의 핵심 주제나 트렌드를 더 명확하게 이해할 수 있습니다.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mb-4">
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="phrase" style="margin-bottom:5px; margin-left:11px;">군집을
                                                선택해주세요</label>
                                            <div style="display: flex; align-items: center;">
                                                <select id="phrase" class="form-select me-2" style="width: 100%;">
                                                    <option selected value="phrase">문항을 선택해주세요.</option>
                                                </select>
                                                <button id="update-btn" class="btn btn-primary custom-btn">업데이트</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <!-- 검색 키워드 입력 -->
                                <div class="row mb-4">
                                    <div class="col-md-6">

                                    </div>
                                </div>

                                <!-- 워드클라우드 생성 및 감정 분석 버튼 -->
                                <div class="tab-buttons">
                                    <div id="wordcloud-tab" class="tab active"> <i class="fas fa-cloud"
                                            style="color: #0096FF;"></i> 워드 클라우드 생성 <i class="fas fa-info-circle"
                                            data-bs-toggle="tooltip" title="응답 내용의 주요 키워드를 시각화하여 보여줍니다."></i></div>
                                    <div id="emotion-tab" class="tab"> <i class="fas fa-smile"
                                            style="color: #28A745;"></i> 감정 분석 <i class="fas fa-info-circle"
                                            data-bs-toggle="tooltip"
                                            title="응답 내용의 감정을 분석하여 긍정, 중립, 부정의 비율을 시각화합니다."></i></div>
                                </div>

                                <!-- 워드 클라우드 컨테이너 -->
                                <div id="wordCloudContainer"
                                    style="width: 100%; height: 400px; background-color: rgb(248, 249, 252); margin-top: 30px; justify-content: center;">
                                </div>

                                <!-- 감정분석 차트 -->
                                <div id="emotionChartContainer">
                                    <select id="chart-type-selector" class="form-select"
                                        style="width: 150px; margin-bottom: 15px;">
                                        <option value="bar">막대 그래프</option>
                                        <option value="pie">파이 차트</option>
                                    </select>
                                    <canvas id="chart-container"></canvas>
                                </div>

                                <div class="keyword-search">
                                    <label for="keyword-input" class="d-block">검색 키워드 입력</label>
                                    <div style="display: flex; align-items: center;">
                                        <input type="text" id="keyword-input" class="form-control mb-2"
                                            placeholder="ex) 질문, 추가 등의 키워드를 입력하세요">
                                        <button id="table-search-btn" class="btn btn-primary custom-btn"
                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="키워드를 검색하여 테이블을 필터링합니다;">
                                            <i class="fas fa-search"></i> 검색
                                        </button>
                                    </div>
                                </div>



                                <!-- 검색 결과 테이블 -->
                                <div class="result-section"
                                    style="max-height: 300px; overflow-y: scroll; margin-top: 20px; border: 1px solid #ccc;">
                                    <table class="result-table" style="width: 100%; border-collapse: collapse;"
                                        aria-label="검색 결과 테이블">
                                        <thead>
                                            <tr>
                                                <th>SEQ</th>
                                                <th>CLUSTER</th>
                                                <th>ANSWER_Content</th>
                                                <th>ANSWER_DATE</th>
                                                <th>Frequency</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div class="nav-buttons">
                                    <button id="prevBtn" class="nav-btn" onclick="history.back()">이전 페이지</button>
                                    <button id="nextBtn" class="nav-btn">다음 페이지</button>
                                </div>
                            </div>
                        </div>


                        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.1.0/wordcloud2.js"></script>
                        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                        <script
                            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/js/bootstrap.bundle.min.js"></script>
                        <script src="/resources/js/statistic/keyword.js"></script>
                    </div>
        </body>

        </html>--%>


        <%@ page contentType="text/html;charset=UTF-8" language="java" %>
            <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

                <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>키워드 분석</title>

                    <!-- <link rel="stylesheet" type="text/css" href="/resources/common/nav.css"> -->
                    <link rel="stylesheet" type="text/css" href="/resources/common/statisticsNav.css">
                    <link rel="stylesheet" type="text/css" href="/resources/common/dashBoardNav.css">
                    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/keyword.css">
                    <link rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/css/bootstrap.min.css"
                        rel="stylesheet">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
                    <link rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap">
                    <link rel="stylesheet" type="text/css" href="/resources/common/statisticsNav.css">


                    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
                </head>

                <body>
                    <%@ include file="/resources/common/header.jsp" %>
                        <%@ include file="/resources/common/dashBoardNav.jsp" %>

                            <script>
                                var clusteringData = ${ clusteringData };
                                console.log("Received Clustering Data: ", clusteringData);
                            </script>

                            <!-- 단계 바 -->
                            <div id="content" class="content">
                                <div class="container">
                                    <%-- <div class="container"
                                        style="margin-top: 3px; margin-bottom: 28px; text-align: center;">--%>
                                        <div class="step-wrapper">
                                            <div class="step-container">
                                                <div class="step">
                                                    <i class="fas fa-braille"></i>
                                                    <p class="step-text">K-평균 군집화</p>
                                                </div>
                                            </div>
                                            <div class="step-divider"></div>
                                            <div class="step-container">
                                                <div class="step active">
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


                                        <%-- <div class="nav-buttons">--%>
                                            <%-- <button id="prevBtn" class="nav-btn">이전</button>--%>
                                                <%-- <button id="nextBtn" class="nav-btn">다음</button>--%>
                                                    <%-- </div>--%>

                                                        <%-- </div>--%>



                                                            <!-- 검색 및 필터 -->
                                                            <%-- <div class="container" style="margin-top: 20px;">--%>
                                                                <div class="accordion my-4" id="accordionExample">
                                                                    <div class="accordion-item">
                                                                        <h2 class="accordion-header" id="headingOne">
                                                                            <button
                                                                                class="accordion-button collapsed c-gray"
                                                                                type="button" data-bs-toggle="collapse"
                                                                                data-bs-target="#collapseOne"
                                                                                aria-expanded="false"
                                                                                aria-controls="collapseOne">
                                                                                <i class="bi bi-info-circle me-2"></i>
                                                                                키워드 분석이란?
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseOne"
                                                                            class="accordion-collapse collapse"
                                                                            aria-labelledby="headingOne"
                                                                            data-bs-parent="#accordionExample">
                                                                            <div class="accordion-body">
                                                                                <strong>‘키워드 분석’</strong>은 군집별로 주어진 데이터
                                                                                내에서 중요한 키워드를 식별하고, 이 키워드들의 사용 빈도와 관련성을
                                                                                분석하는 과정입니다.
                                                                                이를 통해 사용자는 데이터의 핵심 주제나 트렌드를 더 명확하게 이해할 수
                                                                                있습니다.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <%--<div class="row mb-4">
                                                                    <div class="col-md-4">
                                                                        <div class="mb-3">
                                                                            <label for="phrase"
                                                                                style="margin-bottom:5px; margin-left:11px;">군집을
                                                                                선택해주세요</label>
                                                                            <div
                                                                                style="display: flex; align-items: center;">
                                                                                <select id="phrase"
                                                                                    class="form-select me-2"
                                                                                    style="width: 100%;">
                                                                                    <option selected value="phrase">문항을
                                                                                        선택해주세요.</option>
                                                                                </select>
                                                                                &lt;%&ndash; <button id="update-btn"
                                                                                    class="btn btn-primary custom-btn">업데이트</button>&ndash;%&gt;
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                </div>--%>
                                <div class="row mb-4">
                                    <div class="col-md-4">
                                        <div class="mb-3" style="display: flex; align-items: center;">
                                            <label for="phrase" style="margin-bottom:5px; margin-right:10px;">군집을
                                                선택해주세요:</label>
                                            <select id="phrase" class="form-select me-2" style="width: auto;">
                                                <option selected value="phrase">문항을 선택해주세요.</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- 검색 키워드 입력 -->
                                <div class="row mb-4">
                                    <div class="col-md-6">

                                    </div>
                                </div>

                                <!-- 워드클라우드 생성 및 감정 분석 버튼 -->
                                <div class="tab-buttons">
                                    <div id="wordcloud-tab" class="tab active"> <i class="fas fa-cloud"
                                            style="color: #0096FF;"></i> 워드 클라우드 생성 <i class="fas fa-info-circle"
                                            data-bs-toggle="tooltip" title="응답 내용의 주요 키워드를 시각화하여 보여줍니다."></i></div>
                                    <div id="emotion-tab" class="tab"> <i class="fas fa-smile"
                                            style="color: #28A745;"></i> 감정 분석 <i class="fas fa-info-circle"
                                            data-bs-toggle="tooltip"
                                            title="응답 내용의 감정을 분석하여 긍정, 중립, 부정의 비율을 시각화합니다."></i></div>
                                </div>

                                <!-- 워드 클라우드 컨테이너 -->
                                <div id="wordCloudContainer"
                                    style="width: 100%; height: 400px; background-color: rgb(248, 249, 252); margin-top: 30px; justify-content: center;">
                                </div>

                                <!-- 감정분석 차트 -->
                                <div id="emotionChartContainer">
                                    <select id="chart-type-selector" class="form-select"
                                        style="width: 150px; margin-bottom: 15px;">
                                        <option value="bar">막대 그래프</option>
                                        <option value="pie">파이 차트</option>
                                    </select>
                                    <canvas id="chart-container"></canvas>
                                </div>

                                <%--<div class="keyword-search">
                                    <label for="keyword-input" class="d-block">검색 키워드 입력</label>
                                    <div style="display: flex; align-items: center;">
                                        <input type="text" id="keyword-input" class="form-control mb-2"
                                            placeholder="ex) 질문, 추가 등의 키워드를 입력하세요">
                                        <button id="table-search-btn" class="btn btn-primary custom-btn"
                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="키워드를 검색하여 테이블을 필터링합니다;">
                                            <i class="fas fa-search"></i> 검색
                                        </button>
                                    </div>
                            </div>--%>
                            <div class="keyword-search"
                                style="display: flex; align-items: center; gap: 10px; width: 49%;">
                                <label for="keyword-input" class="mb-0" style="white-space: nowrap;">검색 키워드 입력:</label>
                                <input type="text" id="keyword-input" class="form-control"
                                    placeholder="ex) 질문, 추가 등의 키워드를 입력하세요" style="flex-grow: 1;">
                                <button id="table-search-btn" class="btn btn-primary" data-bs-toggle="tooltip"
                                    data-bs-placement="top" title="키워드를 검색하여 테이블을 필터링합니다.">
                                    <i class="fas fa-search"></i> 검색
                                </button>
                            </div>






                            <%-- <div id="cluster-topwords-container" style="margin-bottom: 20px;">--%>
                                <%-- <!-- 각 클러스터별 상위 단어가 표시될 영역 -->--%>
                                    <%-- <h5>클러스터별 상위 3개의 키워드:</h5>--%>
                                        <%-- <div id="cluster-topwords"></div>--%>
                                            <%-- </div>--%>
                                                <%-- <div id="cluster-sentiment-results" style="margin-top: 20px;">--%>
                                                    <%-- <h5>클러스터별 감정 분석 결과:</h5>--%>
                                                        <%-- <div id="cluster-sentiment-data">--%>
                                                            <%-- &lt;%&ndash; 클러스터별 감정 결과가 표시될 영역 &ndash;%&gt;--%>
                                                                <%-- </div>--%>
                                                                    <%-- </div>--%>

                                                                        <%-- <button id="analyzeAllBtn"
                                                                            class="btn btn-primary"
                                                                            style="display: flex; justify-content: flex-end;">전체
                                                                            감정분석 보기</button>--%>
                                                                            <!-- 검색 결과 테이블 -->
                                                                            <div class="result-section"
                                                                                style="max-height: 300px; overflow-y: scroll; margin-top: 20px; border: 1px solid #ccc;">
                                                                                <table class="result-table"
                                                                                    style="width: 100%; border-collapse: collapse;"
                                                                                    aria-label="검색 결과 테이블">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>순번</th>
                                                                                            <th>클러스터</th>
                                                                                            <th>응답내용</th>
                                                                                            <th>응답날짜</th>
                                                                                            <th>빈도수</th>
                                                                                            <th>상위 단어 추출</th>
                                                                                            <th>상세보기</th>
                                                                                            <th>감정 결과</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody></tbody>
                                                                                </table>
                                                                            </div>
                                                                            <div class="nav-buttons">
                                                                                <button id="prevBtn" class="nav-btn"
                                                                                    onclick="history.back()">이전
                                                                                    페이지</button>
                                                                                <button id="nextBtn" class="nav-btn">다음
                                                                                    페이지
                                                                                    <span id="spinner"
                                                                                        class="spinner-border spinner-border-sm"
                                                                                        role="status" aria-hidden="true"
                                                                                        style="display: none;"></span>
                                                                                </button>

                                                                            </div>
                                                                            <%-- </div>--%>
                                                                                </div>

                                                                                <%-- <!-- 모달 창 코드 -->--%>
                                                                                    <div class="modal fade"
                                                                                        id="emotionModal" tabindex="-1"
                                                                                        aria-labelledby="emotionModalLabel"
                                                                                        aria-hidden="true">
                                                                                        <div
                                                                                            class="modal-dialog modal-dialog-centered modal-lg">
                                                                                            <div class="modal-content">
                                                                                                <div
                                                                                                    class="modal-header">
                                                                                                    <h5 class="modal-title"
                                                                                                        id="emotionModalLabel">
                                                                                                        감정 분석 결과</h5>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        class="btn-close"
                                                                                                        data-bs-dismiss="modal"
                                                                                                        aria-label="Close"></button>
                                                                                                </div>
                                                                                                <div class="modal-body">
                                                                                                    <p
                                                                                                        id="modalContent">
                                                                                                    </p>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="modal-footer">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        class="btn btn-secondary"
                                                                                                        data-bs-dismiss="modal">닫기</button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>


                                                                                    <script
                                                                                        src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                                                                                    <script
                                                                                        src="https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.1.0/wordcloud2.js"></script>
                                                                                    <script
                                                                                        src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                                                                                    <script
                                                                                        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3-alpha1/dist/js/bootstrap.bundle.min.js"></script>
                                                                                    <script
                                                                                        src="/resources/js/statistic/keyword.js"></script>
                                                                                    </div>
                </body>

                </html>