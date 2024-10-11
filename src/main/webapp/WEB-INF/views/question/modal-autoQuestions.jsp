<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="/resources/css/question/modal-autoQuestions.css">
</head>
<body>
	<!-- 질문지 자동 생성 모달 -->
	<div class="modal fade" id="makeAutoQuestion-modal" tabindex="-1"
		aria-labelledby="makeAutoQuestionModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="makeAutoQuestionModalLabel">새로운 채움지 만들기</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form>
						<p class="body-title">질문지 자동 생성</p>
						<div class="mb-3">
							<input type="text" class="form-control" id="survey-name"
								placeholder="채움지 이름">
						</div>
						<div class="mb-3">
							<textarea class="form-control" id="message-text"
								placeholder="생성할 설문지에 대해 설명해주세요."></textarea>
						</div>
						<!-- 생성할 질문 유형 선택 체크박스 -->
						<div class="select-question-type">
						    <p>질문 유형을 선택하세요.(복수 선택 가능)</p>
						    <p>- 원하는 질문 유형을 체크하여 질문을 생성하세요.</p>
						    <div class="checkbox-group" id="checkbox-group">
						        <div class="checkbox-item">
						            <input type="checkbox" id="multiple-choice" name="multiple-choice" onclick="toggleSelectBox(this, 'multiple-choice-count')" />
						            <label for="multiple-choice">객관식</label>
						            <select class="form-select small-select" id="multiple-choice-count" name="multiple-choice-count" style="display: none;">
						                <option value="1">1개</option>
						                <option value="2">2개</option>
						                <option value="3">3개</option>
						                <option value="5">5개</option>
						                <option value="10">10개</option>
						            </select>
						        </div>
						
						        <div class="checkbox-item">
						            <input type="checkbox" id="check-box" name="check-box" onclick="toggleSelectBox(this, 'check-box-count')" />
						            <label for="check-box">체크박스</label>
						            <select class="form-select small-select" id="check-box-count" name="check-box-count" style="display: none;">
						                <option value="1">1개</option>
						                <option value="2">2개</option>
						                <option value="3">3개</option>
						                <option value="5">5개</option>
						                <option value="10">10개</option>
						            </select>
						        </div>
						
						        <div class="checkbox-item">
						            <input type="checkbox" id="short-answer" name="short-answer" onclick="toggleSelectBox(this, 'short-answer-count')" />
						            <label for="short-answer">단답형</label>
						            <select class="form-select small-select" id="short-answer-count" name="short-answer-count" style="display: none;">
						                <option value="1">1개</option>
						                <option value="2">2개</option>
						                <option value="3">3개</option>
						                <option value="5">5개</option>
						                <option value="10">10개</option>
						            </select>
						        </div>
						
						        <div class="checkbox-item">
						            <input type="checkbox" id="descriptive-form" name="descriptive-form" onclick="toggleSelectBox(this, 'descriptive-form-count')" />
						            <label for="descriptive-form">주관식</label>
						            <select class="form-select small-select" id="descriptive-form-count" name="descriptive-form-count" style="display: none;">
						                <option value="1">1개</option>
						                <option value="2">2개</option>
						                <option value="3">3개</option>
						                <option value="5">5개</option>
						                <option value="10">10개</option>
						            </select>
						        </div>
						    </div>
						</div>
						<!-- 질문 유형 선택 체크박스 end -->
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" id="review-btn" onclick="showQuestionsModal()">질문 목록 보기</button>
					<button type="button" class="btn btn-secondary" id="cancel-btn"
						data-bs-dismiss="modal">취소</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 선택한 추천 질문 목록 모달창 -->
	<div class="modal fade" id="questions-modal" tabindex="-1" aria-labelledby="questionsModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h5 class="modal-title" id="questionsModalLabel">추천 질문 목록</h5>
	                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	            </div>
	            <div class="modal-body">
	                <div id="questions-list" class="questions-list"></div>
	            </div>
	            <div class="modal-footer">
	            	<button type="button" class="btn btn-primary">추가하기</button>
	                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
	            </div>
	        </div>
	    </div>
	</div>

	<script type="text/javascript" src="/resources/js/question/modal-autoQuestions.js"></script>
</body>
</html>