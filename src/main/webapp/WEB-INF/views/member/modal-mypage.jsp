 <%@ page contentType="text/html;charset=UTF-8" language="java"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>마이페이지</title>

<link rel="stylesheet" type="text/css" href="/resources/css/member/mypage.css">
<script type="text/javascript" src="/resources/js/member/mypage.js"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</head>
<body>
 	<!-- 마이페이지 조회 Modal -->
	<div class="modal" id="mypage-modal" tabindex="-1"
		aria-labelledby="mypageModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="mypageModalLabel">마이 페이지</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="profile-container">
						<img alt="profile" class="profile-image" src="/resources/img/common/profile.png">
					</div>
					<div class="form-group">
						<label for="username">이메일</label>
						<input type="email" id="username" name="username" class="form-control" disabled>
					</div>
					<div class="form-group">
						<label for="name">이름</label>
						<input type="text" id="name" name="name" class="form-control" disabled>
					</div>
					<div class="form-group">
						<label for="birth">생년월일</label>
						<input type="text" id="birth" name="birth" class="form-control" disabled>
					</div>
					<div class="form-group">
						<label for="ccSeq">성별</label>
						<input type="text" id="ccSeq" name="ccSeq" class="form-control" disabled>
					</div>
					<div class="form-group">
						<label for="phone">휴대폰 번호</label>
						<input type="text" id="phone" name="phone" class="form-control" disabled>
					</div>
					<div class="form-group">
						<label for="address">주소</label> <input type="text" id="postalCode"
							name="postalCode" class="form-control address-input" disabled>
						<input type="text" id="address" name="address"
							class="form-control address-input" disabled>
						<input type="text" id="addressDetail" name="addressDetail"
							class="form-control address-input" disabled>
					</div>
				</div>
				<div class="modal-footer">
					<div class="mx-auto">
						<button type="button" id="updateMemberInfoBtn" class="btn btn-primary updateBtn"
							data-bs-target="#update-member-modal" data-bs-toggle="modal"
							data-bs-dismiss="modal">회원 정보 수정</button>
						<button type="button" class="btn btn-secondary logoutBtn">로그아웃</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 회원 정보 수정 Modal -->
	<div class="modal fade" id="update-member-modal" aria-hidden="true"
		aria-labelledby="updateMemberModalToggleLabel" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="updateMemberModalToggleLabel">마이 페이지</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>

				<div class="modal-body">
					<div class="profile-container">
						<img alt="profile" class="profile-image"
							src="/resources/img/common/profile.png">
						<button type="button" class="btn btn-primary">프로필 변경</button>
					</div>
					<div class="form-group">

						<label for="update-username">이메일</label> 
						<input type="text" id="update-username" name="username" class="form-control" autocomplete="username" disabled>

					</div>
					<!-- <div class="form-group">
						<label for="update-password">비밀번호</label> 
						<input type="password"
							id="password" name="update-password" class="form-control">
					</div>
					<div class="form-group">
						<label for="update-password-confirm">비밀번호 확인</label> 
						<input type="password" id="update-password-confirm" name="password-confirm" class="form-control">
					</div> -->
					<div class="form-group">
						<label for="update-name">이름</label>
						<input type="text" id="update-name"
							name="name" class="form-control" disabled>
					</div>
					<div class="form-group">
						<label for="update-birth">생년월일</label> 
						<input type="text" id="update-birth" name="birth" class="form-control" autocomplete="birth" disabled>
					</div>
					<div class="form-group">

						<label for="update-ccSeq">성별</label> 
						<input type="text" id="update-ccSeq" name="ccSeq" class="form-control" disabled>
					</div>
					<div class="form-group">
						<label for="update-phone">휴대폰 번호</label>
						<input type="text" id="update-phone" name="phone" class="form-control" autocomplete="phone">
						<div id="phone-error" class="error-message" style="display: none;"></div>
					</div>
					<div class="form-group">
						<label for="update-address">주소</label> 
						<div class="postalCode-group">
							<input type="text" id="update-postalCode" name="postalCode"
								class="form-control address-input" placeholder="우편번호" autocomplete="postal-code">
							<button class="btn btn-primary" id="postalCodeSearchBtn" type="button" onclick="sample6_execDaumPostcode()">우편번호 검색</button>
						</div>
						<input type="text" id="update-address" name="address"
							class="form-control address-input" placeholder="주소" autocomplete="name"> 
						<input type="text" id="update-addressDetail" name="addressDetail"
							class="form-control address-input" placeholder="상세주소">

					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" data-bs-target="#mypage-modal" id="saveBtn"
						data-bs-toggle="modal" >저장하기</button>
					<button class="btn btn-secondary logoutBtn" data-bs-target="#mypage-modal"
					data-bs-toggle="modal">취소하기</button>
				</div>
			</div>
		</div>
	</div>

</body>
</html> 