<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <link rel="stylesheet" type="text/css" href="/resources/css/question/modal-autoQuestions.css">
    <!-- SweetAlert2 -->
    <%--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.2.0/sweetalert2.min.css">--%>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.2.0/sweetalert2.all.min.js"></script>--%>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">
    <link rel="stylesheet" type="text/css" href="/resources/common/loading.css">
</head>
<body>
<!-- 질문지 자동 생성 모달 -->
<div class="modal fade" id="makeAutoQuestion-modal" tabindex="-1"
     aria-labelledby="makeAutoQuestionModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <%@ include file="/resources/common/loading.jsp" %>
			<%-- 첫 번째 모달 content	--%>
            <div class="modal-header first-content">
                <h5 class="modal-title" id="makeAutoQuestionModalLabel">새로운 설문지 만들기</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body first-content">
                <div class="header-container d-flex justify-content-between align-items-center mb-2">
                    <p class="body-title fs-6 fw-bold">맞춤형 질문지 생성</p>
                    <button type="button" class="btn generated-questions-list-btn mb-3" style="display: none;">
                        생성 질문 목록</button>
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" id="survey-name" placeholder="여기에 설문지 이름을 입력하세요.">
                </div>
                <div class="mb-3">
                    <textarea class="form-control" id="survey-description" placeholder="여기에 설문지 설명을 입력하세요."></textarea>
                </div>
                <!-- 생성할 질문 유형 선택 체크박스 -->
                <div class="select-question-type d-flex justify-content-between">
                    <div class="vertical-line" style="display: none;"></div>
                    <div class="select-question-selection flex-grow-1">
                        <p class="fw-bold">질문 유형을 체크하고 생성할 질문 수를 선택하세요.(복수 선택 가능)</p>
                        <div class="checkbox-group" id="checkbox-group">
                        </div>
                    </div>
                    <!-- 질문 유형 선택 체크박스 end -->
                    <!-- 추가된 질문 리스트 확인 -->
                    <div class="select-add-questions flex-grow-1 ms-3">
                        <p class="fw-bold" style="display: none;">추가된 질문 목록</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer first-content">
                <button type="button" class="btn btn-secondary" id="create-auto-question-btn"
                        onclick="showQuestionsModal()">질문 자동 생성
                </button>
                <button type="button" class="btn btn-secondary" id="create-question-btn" data-bs-dismiss="modal">
					새 설문지 만들기
                </button>
            </div>
			<%-- 첫 번째 모달 content end --%>

			<%-- 두 번째 모달 content --%>
			<div class="modal-header second-content" style="display: none;">
				<h5>추천 질문 목록</h5>
			</div>
			<div class="modal-body second-content" style="display: none;">
				<!-- 객관식 질문 섹션 -->
				<div id="multiple-choice-section" class="question-group">
					<h6 class="question-type">객관식 질문</h6>
					<div id="multiple-choice-list" class="question-list"></div>
				</div>
				<!-- 체크박스 질문 섹션 -->
				<div id="checkbox-section" class="question-group">
					<h6 class="question-type">체크박스 질문</h6>
					<div id="checkbox-list" class="question-list"></div>
				</div>
				<!-- 단답형 질문 섹션 -->
				<div id="short-answer-section" class="question-group">
					<h6 class="question-type">단답형 질문</h6>
					<div id="short-answer-list" class="question-list"></div>
				</div>
				<!-- 주관식 질문 섹션 -->
				<div id="long-answer-section" class="question-group">
					<h6 class="question-type">장문형 질문</h6>
					<div id="long-answer-list" class="question-list"></div>
				</div>
			</div>
			<div class="modal-footer second-content" style="display: none;">
				<button type="button" class="btn btn-primary" id="add-questions-btn">추가</button>
				<button type="button" class="btn btn-secondary" id="question-close-btn"
						>닫기
				</button>
			</div>
			<%-- 두 번째 모달 content end --%>
        </div>
    </div>
</div>
<script type="text/javascript" src="/resources/js/question/modal-autoQuestions.js"></script>
</body>
</html>