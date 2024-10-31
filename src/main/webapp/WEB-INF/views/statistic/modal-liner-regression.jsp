<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/modal-liner-regression.css">
    <script type="text/javascript" src="/resources/js/statistic/linearRegression.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">
</head>
<body>
<div class="modal fade" id="linerRegressionModal" tabindex="-1" aria-labelledby="linerRegressionModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <div class="d-flex align-items-center">
                    <div class="modal-title fs-5 me-2" id="linerRegressionModalLabel">회귀분석 질문 선택</div>
                    <i class="bi bi-info-circle mt-1"></i>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <p class="fw-bold">분석할 종속 질문과 독립 질문을 선택하세요.</p>
                    <div class="card">
                        <div class="card-body d-flex justify-content-between">
                            <div class="d-flex justify-content-center align-items-center flex-grow-1">
                                <p class="fw-bold">종속 질문</p>
                                <div class="dependent-question-container"></div>
                            </div>
                            <div class="vertical-line"></div>
                            <div class="d-flex justify-content-center align-items-center flex-grow-1">
                                <p class="fw-bold">독립 질문</p>
                                <div class="independent-question-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" >맞춤형 통계 생성</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">취소</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
