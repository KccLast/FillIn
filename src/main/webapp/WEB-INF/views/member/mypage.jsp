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
				</div>
				<div class="form-group">
					<label for="email">이메일</label> <input type="email" id="email"
						name="email" class="form-control" disabled>
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
						name="ccId" class="form-control" disabled>
				</div>
				<div class="form-group">
					<label for="address">주소</label> <input type="text" id="postalCode"
						name="postalCode" class="form-control address-input" disabled>
					<input type="text" id="address" name="address"
						class="form-control address-input" disabled> <input
						type="text" id="detailAddress" name="detailAddress"
						class="form-control address-input" disabled>
				</div>
			</form>
		</div>
		
		<!-- Modal Footer -->
		<div class="modal-footer">
			<div class="mx-auto">
				<button type="submit" class="btn btn-primary updateBtn">회원
					정보 수정</button>
				<button type="button" class="btn btn-secondary logoutBtn">로그아웃</button>
			</div>
		</div>
	</div>

	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>

</body>
</html>
