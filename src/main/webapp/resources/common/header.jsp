<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<title>대시보드</title>
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
			crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="/resources/common/header.css">
	</head>
	<body>
		<!-- 헤더 -->
		<header class="p-2">
			<div class="container-fluid">
				<ul class="header-list d-flex justify-content-between m-1 align-items-center">
					<li>
						<img class="logo" alt="로고" src="/resources/img/common/logo.png">
					</li>
					<li class="dashboard">DashBoard</li>
					<div class="d-flex align-items-center">
						<li class="px-2 alarm-item">
							<img alt="alarm" src="/resources/img/common/alarm.png" width="25" height="23">
							<div class="circle"></div>
						</li>
						<li class="px-2 username">송동호</li>
						<li class="px-2">
							<img alt="profile" src="/resources/img/common/profile.png" width="35" height="35">
						</li>
					</div>
				</ul>
			</div>
		</header>
	</body>
</html>
