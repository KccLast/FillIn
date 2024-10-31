
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
	<script>
		window.onload = function () {
			let curWindow = location.href;
			if (curWindow.includes('/survey/')) {
				let pathName = window.location.pathname;
				let surveySeq = pathName.substring(pathName.lastIndexOf('/') + 1);
				let link = '/survey/' + surveySeq;
				document.querySelector('.nav > .nav-link').setAttribute('href', link);
			}
		}
	</script>

<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div class="sidebar">
	<nav class="nav flex-column">
		<a href="#" class="nav-link"> 
			<img src="/resources/img/common/edit.png" alt="edit"> 
			<span class="menu-text">편집하기</span> 
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a> 
		<a href="#" class="nav-link"> 
			<img src="/resources/img/common/totalStatistics.png" alt="totalStatistics">
			<span class="menu-text">설문 전체 통계</span>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a>
		<a href="#" class="nav-link"> 
			<img src="/resources/img/common/clustering.png" alt="clustering">
			<span class="menu-text">군집 별 비교 분석</span>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a>
		<a href="#" id="regression-nav" class="nav-link">
			<img src="/resources/img/statistic/regression.png" alt="regression">
			<span class="menu-text">회귀분석</span>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a>
		<a href="#" class="nav-link"> 
			<img src="/resources/img/common/answerTime.png" alt="answerTime">
			<span class="menu-text">응답 시간 분석</span>
			<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
		</a>
	</nav>
</div>

