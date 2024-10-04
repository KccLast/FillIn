<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DashBoard</title>
<link rel="stylesheet" type="text/css" href="/resources/common/dashBoardNav.css">
<link rel="stylesheet" type="text/css" href="/resources/css/survey/dashboard.css">
<!-- <script type="text/javascript" src="http://code.jquery.com/jquery-3.7.1.min.js"></script> -->
</head>
<body>
	<%@include file="/resources/common/header.jsp"%>
	<%@ include file="/resources/common/dashBoardNav.jsp"%>

	<!-- 컨텐트 내용 -->
	<div class="content">
		<!-- 다중 검색창 -->
		<div class="filter-section">
			<div class="filter-row">
				<p>진행 상태</p>
				<div class="filter-input">
					<select class="selectpicker" id="progress-ccId" name="ccId">
						<option value="">전체</option>
						<option value="11">예정</option>
						<option value="12">진행 중</option>
						<option value="13">완료</option>
					</select>
				</div>
			</div>

			<div class="filter-row">
				<p>최초 생성일</p>
				<div class="filter-input">
					<input type="date" id="startCreatedAt" name="startCreatedAt">
					- <input type="date" id="endCreatedAt" name="endCreatedAt">

					<span class="date-badge created-at" data-period="1주일">1주일</span> <span
						class="date-badge created-at" data-period="1개월">1개월</span> <span
						class="date-badge created-at" data-period="6개월">6개월</span> <span
						class="date-badge created-at" data-period="1년">1년</span> <span
						class="date-badge created-at" data-period="2년">2년</span> <span
						class="date-badge created-at" data-period="3년">3년</span> <span
						class="date-badge created-at" data-period="전체">전체</span>
				</div>
			</div>

			<div class="filter-row">
				<p>마지막 수정일</p>
				<div class="filter-input">
					<input type="date" id="startUpdatedAt" name="startUpdatedAt">
					- <input type="date" id="endUpdatedAt" name="endUpdatedAt">

					<span class="date-badge updated-at" data-period="1주일">1주일</span> <span
						class="date-badge updated-at" data-period="1개월">1개월</span> <span
						class="date-badge updated-at" data-period="6개월">6개월</span> <span
						class="date-badge updated-at" data-period="1년">1년</span> <span
						class="date-badge updated-at" data-period="2년">2년</span> <span
						class="date-badge updated-at" data-period="3년">3년</span> <span
						class="date-badge updated-at" data-period="전체">전체</span>
				</div>
			</div>

			<div class="filter-row">
				<p>제목</p>
				<div class="filter-input">
					<input type="text" id="title" name="title" placeholder="제목">
				</div>
			</div>

			<div class="filter-row">
				<p>응답 수</p>
				<div class="filter-input">
					<input type="text" id="minAnswerCount" name="minAnswerCount">
					- <input type="text" id="maxAnswerCount" name="maxAnswerCount">
				</div>
			</div>

			<div class="filter-row">
				<button class="search-btn" id="searchBtn">조회하기</button>
				<button class="initial-btn" id="initialBtn">초기화</button>
			</div>
		</div>
		<!-- 다중 검색 end -->

		<!-- 설문지 생성하는 카드  -->
		<div class="cards-container">
			<div class="card h-100">
				<div class="add-survey-card">
					<img alt="plusBtn" src="/resources/img/common/plusButton.png">
				</div>
			</div>

			<!-- 생성된 설문지 카드 -->
			<c:forEach var="survey" items="${pagedSurveys}">
				<div class="card h-100">
					<div class="card-body">
						<c:choose>
							<c:when test="${survey.ccSeq == 11 }">
								<span class="badge rounded-pill bg-warning mb-1 px-2 py-1">예정</span>
							</c:when>
							<c:when test="${survey.ccSeq == 12}">
								<span class="badge rounded-pill bg-primary mb-1 px-2 py-1">진행 중</span>
							</c:when>
							<c:when test="${survey.ccSeq == 13}">
								<span class="badge rounded-pill bg-secondary mb-1 px-2 py-1">완료</span>
							</c:when>
						</c:choose>

						<p>${survey.name }</p>
						<%-- <p>${survey.formattedLocaldate}</p> --%>
						<div class="date-info">
							<p>최초 생성일:</p>
							<p>
								<fmt:formatDate value="${survey.createdAt }" />
							</p>
						</div>
						<div class="date-info">
							<p>마지막 수정일:</p>
							<p>
								<fmt:formatDate value="${survey.updatedAt }" />
							</p>
						</div>
						<div class="date-info">
							<p>설문 기간:</p>
							<p>
								<fmt:formatDate value="${survey.postDate }" />
								~
								<fmt:formatDate value="${survey.endDate }" />
							</p>
						</div>
					</div>

					<div class="card-footer">
						<p>${survey.answerCount}개응답</p>
					</div>
				</div>
			</c:forEach>
		</div>

		<!-- 페이지 네비게이션 -->
		<div class="pagination">
			<c:if test="${pageNum > 1 }">
				<a href="?pageNum=${pageNum - 1 }&amount=${amount}">이전</a>
			</c:if>

			<c:forEach var="i" begin="1" end="${totalPages }">
				<c:choose>
					<c:when test="${i == pageNum }">
						<strong>${i }</strong>
					</c:when>
					<c:otherwise>
						<a href="?pageNum=${i }&amount=${amount}">${i }</a>
					</c:otherwise>
				</c:choose>
			</c:forEach>

			<c:if test="${pageNum < totalPages }">
				<a href="?pageNum=${pageNum + 1 }&amount=${amount}">다음</a>
			</c:if>
		</div>
	</div>
	<script type="text/javascript"
		src="/resources/js/survey/multiSearch.js"></script>
</body>
</html>