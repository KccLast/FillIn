<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>대시보드</title>

<!-- jQuery 라이브러리 -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- jQuery UI 라이브러리 -->
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>

<!-- Bootstrap CSS 추가 -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
	integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="/resources/common/header.css">


<!-- Bootstrap JS 추가 -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<script>
	/* $(function(){
		$.ajax({
			url : "/api/member/info",
            type : "GET",
            success : function(response){
                console.log("response : ", response);
				$('.header-list .username').text(response.data);
            },
            error : function(error){
                console.log("error : ", error);
            }
		})
	}) */

</script>

</head>

<body>
	<!-- 헤더 -->
	<header class="p-2">
		<div class="container-fluid">
			<ul class="header-list d-flex justify-content-between m-1 align-items-center">
				<li><img class="logo" alt="로고" src="/resources/img/common/logo.png"></li>
				<li class="dashboard">DashBoard</li>
				<div class="d-flex align-items-center">
					<li class="px-2 alarm-item"><img alt="alarm" src="/resources/img/common/alarm.png" width="25" height="23">
						<div class="circle"></div></li>
					<li class="px-2 username"> <sec:authentication property="principal.member.name"/>님</li>
					<li class="px-2">
						<!-- 모달 연결 -->
						<img class="profile" alt="profile"
							src="/resources/img/common/profile.png" width="35" height="35"
							data-bs-toggle="modal" data-bs-target="#mypage-modal">
					</li>
				</div>
			</ul>
		</div>
	</header>
	<%@include file="/WEB-INF/views/member/modal-mypage.jsp"%>
</body>
</html>
