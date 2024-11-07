<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div class="container-fluid">
	<!-- 내비게이션 바 -->
	<nav id="sidebar" class="col-lg-2 fs-5">
		<a href="/survey/dashboard" class="nav-link ">
			<img src="/resources/img/common/dashboard.png" alt="dashboard">
			<span class="menu-text">대시보드</span>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a>
		<a href="/statistic" class="nav-link ">
			<img src="/resources/img/common/totalStatistics.png" alt="totalStatistics">
			<span class="menu-text">설문 전체 통계</span>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a>
		<a href="/statistic/clustering" class="nav-link">
			<img src="/resources/img/common/clustering.png" alt="clustering">
			<span class="menu-text ">군집 별 비교 분석</span>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a>
		<a href="/statistics/liner-regression" id="regression-statistics" class="nav-link">
			<img src="/resources/img/statistic/regression.png" alt="regression">
			<span class="menu-text">회귀분석</span>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a>
		<a href="/survey/logs" class="nav-link ">
			<img src="/resources/img/common/answerTime.png" alt="answerTime">
			<span class="menu-text">응답 시간 분석</span>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a>
	</nav>
</div>