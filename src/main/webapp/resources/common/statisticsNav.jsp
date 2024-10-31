<%@ page contentType="text/html;charset=UTF-8" language="java" %>

	<script>

		let initLink = false;

		window.onload = function () {
			// 현재 URL 확인
			let curWindow = location.href;

			// URL에 '/survey/'가 포함된 경우에만 실행

			let pathName = window.location.pathname;
			console.log(pathName);
			let surveySeq = pathName.substring(pathName.lastIndexOf('/') + 1);

			// 각 링크 생성
			let editLink = '/survey/' + surveySeq;
			let statisticLink = '/statistic/' + surveySeq;
			let clusterLink = '/statistic/clustering/' + surveySeq;
			let linerLink = '/statistics/liner-regression/' + surveySeq;
			let logLink = '/survey/logs/' + surveySeq;

			// 링크가 초기화되지 않았다면 각 링크에 href 속성 설정

			const navLinks = document.querySelectorAll('.nav > .nav-link');

			navLinks[0].setAttribute('href', editLink);
			navLinks[1].setAttribute('href', statisticLink);
			navLinks[2].setAttribute('href', clusterLink);
			navLinks[3].setAttribute('href', linerLink);
			navLinks[4].setAttribute('href', logLink);

			// 초기화 완료 표시
			initLink = true;


		};
	</script>


	<div class="sidebar">
		<nav class="fs-5 nav flex-column">
			<a href="#" class="nav-link">
				<img src="/resources/img/common/edit.png" alt="edit">
				<span class="menu-text">편집하기</span>
				<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
			</a>
			<a href="#" class="nav-link ">
				<img src="/resources/img/common/totalStatistics.png" alt="totalStatistics">
				<span class="menu-text">설문 전체 통계</span>
				<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
			</a>
			<a href="#" class="nav-link">
				<img src="/resources/img/common/clustering.png" alt="clustering">
				<span class="menu-text ">군집 별 비교 분석</span>
				<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
			</a>
			<a href="#" id="regression-statistics" class="nav-link">
				<img src="/resources/img/statistic/regression.png" alt="regression">
				<span class="menu-text">회귀분석</span>
				<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
			</a>
			<a href="#" class="nav-link ">
				<img src="/resources/img/common/answerTime.png" alt="answerTime">
				<span class="menu-text">응답 시간 분석</span>
				<img class="arrow-icon" alt="arrow" src="/resources/img/common/arrow.png">
			</a>
		</nav>
	</div>