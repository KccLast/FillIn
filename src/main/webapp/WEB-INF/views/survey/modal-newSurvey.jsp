<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">
    <script src="/resources/js/survey/modal-newSurvey.js"></script>
</head>
<body>
<!-- 설문지 생성 모달 -->
<div class="modal fade" id="makeSurvey-modal" tabindex="-1" aria-labelledby="makeSurveyModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="makeSurveyModalLabel">새로운 설문지 만들기</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <div class="fs-6 fw-bold mb-2">설문지 이름</div>
                    <form id="createSurveyForm" action="/survey" method="post">
                    <input type="text" name="name" class="form-control" id="survey-name" placeholder="여기에 설문지 이름을 입력하세요.">
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="create-survey-btn">생성</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>