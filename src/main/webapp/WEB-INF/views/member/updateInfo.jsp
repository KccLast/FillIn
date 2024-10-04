<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<!-- <link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
	crossorigin="anonymous"> -->
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
	href="/resources/css/member/mypage.css">
<link rel="stylesheet" type="text/css"
	href="/resources/css/member/updateInfo.css">
<!-- <script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> -->
</head>
<body>
	<div class="container mt-5">
		<!-- Modal Header -->
		<div class="modal-header">
			<h4 class="modal-title">마이 페이지</h4>
			<button type="button" class="close" data-dismiss="modal"
				aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>

		<!-- Modal Body -->
		<div class="modal-body">
			<form action="/api/member/mypage" method="POST">
				<div class="profile-container">
					<img alt="profile" class="profile-image"
						src="/resources/img/common/profile.png">
					<button type="button" class="btn btn-primary changeProfileBtn">프로필 변경</button>
				</div>
				<div class="form-group">
					<label for="email">이메일</label> <input type="email" id="email"
						name="username" class="form-control" placeholder="" disabled>
				</div>
				<div class="form-group">
					<label for="password">비밀번호</label> 
						<input type="password" id="password"
						name="password" class="form-control" placeholder="비밀번호" required>
				</div>
				<div class="form-group">
					<label for="passwordConfirm">비밀번호 확인</label> 
						<input type="password" id="passwordConfirm"
						name="passwordConfirm" class="form-control" placeholder="비밀번호 확인" required>
				</div>
				<div class="form-group">
					<label for="email">이메일</label> <input type="email" id="email"
						name="username" class="form-control" placeholder="" disabled>
				</div>
				<div class="form-group">
					<label for="name">이름</label> <input type="text" id="name"
						name="name" class="form-control" disabled>
				</div>
				<div class="form-group">
					<label for="birth">생년월일</label> <input type="text" id="birth"
						name="birth" class="form-control" disabled>
				</div>
				<div class="form-group">
					<label for="gender">성별</label> <input type="text" id="ccId"
						name="ccSeq" class="form-control" disabled>
				</div>
				<div class="form-group">
				    <label for="address">주소</label>
				    <div class="postal-wrapper">
				        <input type="text" id="postalCode" name="postalCode" class="form-control address-input" required>
				        <button type="button" class="btn btn-primary" onclick="sample6_execDaumPostcode()">우편번호 찾기</button>
				    </div>
				    <input type="text" id="address" name="address" class="form-control address-input" required>
				    <div class="address-container">
					    <input type="text" id="detailAddress" name="detailAddress" class="form-control address-input" required>
					    <input type="text" id="extraAddress" class="form-control address-input" required>
					</div>

				</div>
			</form>
		</div>

		<!-- Modal Footer -->
		<div class="modal-footer">
			<div class="mx-auto">
				<button type="submit" class="btn btn-primary saveBtn">저장하기</button>
				<button type="button" class="btn btn-secondary cancelBtn">취소</button>
			</div>
		</div>
	</div>

	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script type="text/javascript" src="/resources/js/member/updateInfo.js"></script>
</body>
</html>
