<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div class="container-fluid">
	<!-- 내비게이션 바 -->
	<nav id="sidebar" class="col-lg-2 fs-5">
		<div>
			<p class="workspace">DashBoard</p>
			<div class="logo-border mt-2"></div>
		</div>
		<div class="nav-menu">
			<p class="workspace"><sec:authentication property="principal.member.name"/>의 DashBoard</p>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</div>
	</nav>
</div>