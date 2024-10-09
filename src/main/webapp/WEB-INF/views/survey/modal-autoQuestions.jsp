
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="/resources/css/survey/modal-autoQuestions.css">
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
						<p class="body-title">설문지 자동 생성</p>
						<div class="mb-3">
							<!-- <label for="recipient-name" class="col-form-label">Recipient:</label> -->
							<input type="text" class="form-control" id="survey-name"
								placeholder="채움지 이름">
						</div>
						<div class="mb-3">
							<!-- <label for="message-text" class="col-form-label">Message:</label> -->
							<textarea class="form-control" id="message-text"
								placeholder="생성할 설문지에 대해 설명해주세요."></textarea>
						</div>
						<div class="checkbox-group">
							<input type="checkbox" id="quantitative-question" name="quantitative-question" checked/>
							<label for="quantitative-question">정량적 질문 포함</label>
							<input type="checkbox" id="qualitative-question" name="qualitative-question"/>
							<label for="qualitative-question">정성적 질문 포함</label>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" id="create-btn">생성하기</button>
					<button type="button" class="btn btn-secondary" id="cancel-btn"
						data-bs-dismiss="modal">취소</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>