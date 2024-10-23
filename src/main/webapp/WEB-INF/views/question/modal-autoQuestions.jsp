<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> --%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="/resources/css/question/modal-autoQuestions.css">
<!-- SweetAlert2 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.2.0/sweetalert2.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.2.0/sweetalert2.all.min.js"></script>
</head>
<body>
	<!-- 질문지 자동 생성 모달 -->
	<div class="modal fade" id="makeAutoQuestion-modal" tabindex="-1"
		aria-labelledby="makeAutoQuestionModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered modal-lg">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h5 class="modal-title" id="makeAutoQuestionModalLabel">새로운 채움지 만들기</h5>
	                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	            </div>
	            <div class="modal-body">
	                <form>
	                    <p class="body-title fs-6 fw-bold">질문지 자동 생성</p>
	                    <div class="mb-3">
	                        <input type="text" class="form-control" id="survey-name" placeholder="채움지 이름">
	                    </div>
	                    <div class="mb-3">
	                        <textarea class="form-control" id="survey-description" placeholder="생성할 설문지에 대해 설명해주세요."></textarea>
	                    </div>
	                    <!-- 생성할 질문 유형 선택 체크박스 -->
	                    <div class="select-question-type d-flex justify-content-between">
	                    	<div class="vertical-line" style="display: none;"></div>
	                        <div class="select-question-selection flex-grow-1">
	                            <p class="fw-bold">질문 유형을 선택하세요.(복수 선택 가능)</p>
	                            <p>- 원하는 질문 유형을 체크하여 질문을 생성하세요.</p>
	                            <div class="checkbox-group" id="checkbox-group">
	                            </div>
	                        </div>
	                        <!-- 질문 유형 선택 체크박스 end -->
	                        <!-- 추가된 질문 리스트 확인 -->
	                        <div class="select-add-questions flex-grow-1 ms-3">
	                            <p class="fw-bold" style="display: none;">추가된 질문 목록</p>
	                        </div>
	                    </div>
	                </form>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-secondary" id="review-btn" onclick="showQuestionsModal()">추천 질문지 생성</button>
	                <button type="button" class="btn btn-secondary" id="create-question-btn" data-bs-dismiss="modal">채움지 생성</button>
	            </div>
	        </div>
	    </div>
	</div>

	<!-- 선택한 추천 질문 목록 모달창 -->
	<div class="modal fade" id="questions-modal" tabindex="-1"
		aria-labelledby="questionsModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="questionsModalLabel">추천 질문 목록</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
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
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="add-questions-btn">추가하기</button>
					<button type="button" class="btn btn-secondary"
						data-bs-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript"
		src="/resources/js/question/modal-autoQuestions.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>