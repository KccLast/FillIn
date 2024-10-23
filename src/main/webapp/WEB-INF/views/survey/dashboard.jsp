<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DashBoard</title>
<link rel="stylesheet" type="text/css"
	href="/resources/common/dashBoardNav.css">
<link rel="stylesheet" type="text/css"
	href="/resources/css/survey/dashboard.css">
</head>
<body>
	<%@include file="/resources/common/header.jsp"%>
	<%@ include file="/resources/common/dashBoardNav.jsp"%>

	<!-- 컨텐트 내용 -->
	<div class="content">
		<div class="container">
			<div class="card search-card mb-4">
				<div class="card-body">
					<div class="container">
						<!-- 1번째 row -->
						<div class="row">
							<div class="col-1">
								<p class="fw-bold mt-2">진행 상태</p>
							</div>
							<div class="col-2">
								<select class="selectpicker form-select" id="progress-ccSeq"
									name="ccSeq">
									<option value="">전체</option>
									<c:forEach var="status" items="${progressStatus}">
										<option value="${status.seq}">${status.name}</option>
									</c:forEach>
								</select>
							</div>
							
							<div class="col-1 fw-bold d-flex justify-content-end">
								<p class="mt-2">제목</p>
							</div>
							<div class="col-3">
								<input type="text" class="form-control me-2" id="title"
									name="title" placeholder="제목">
							</div>
							<div class="col-1">
								<p class="mb-0 me-2 fw-bold mt-2 ml-2">응답 수</p>
							</div>
							<div class="col-2">
								<div class="d-flex align-items-center flex-nowrap">
									<input type="text" class="form-control me-2"
										id="minAnswerCount" name="minAnswerCount"
										oninput="this.value = this.value.replace(/[^0-9]/g,'')">
									<span class="me-2">-</span> <input type="text"
										class="form-control me-2" id="maxAnswerCount"
										name="maxAnswerCount"
										oninput="this.value = this.value.replace(/[^0-9]/g,'')">
								</div>
							</div>
							<div class="col-2">
								<p class="limit-num mt-2">* 숫자만 입력</p>
							</div>
							
						</div>
						<!-- 1번째 row end-->
						
						<!-- 2번째 row -->
						<div class="row my-2 align-items-center">
							<div class="col-1">
								<p class="fw-bold mt-2">생성일</p>
							</div>
							<div class="col-2">
								<div class="d-flex align-items-center">
									<input type="date" class="form-control me-2"
										id="startCreatedAt" name="startCreatedAt"> <span
										class="mx-3">-</span>
								</div>
							</div>
							<div class="col-2">
								<input type="date" class="form-control me-2" id="endCreatedAt"
									name="endCreatedAt">
							</div>
							<div class="col-7">
								<c:forEach var="status" items="${selectPeriod}">
									<span class="date-badge created-at"
										data-period="${status.name}">${status.name}</span>
								</c:forEach>
							</div>
						</div>
						<!-- 2번째 row end -->
						
						<!-- 3번째 row -->
						<div class="row my-2 align-items-center">
							<div class="col-1 mt-1">
								<p class="fw-bold mt-2">수정일</p>
							</div>
							<div class="col-2">
								<div class="d-flex align-items-center">
									<input type="date" class="form-control me-2"
										id="startUpdatedAt" name="startUpdatedAt"> <span
										class="mx-3">-</span>
								</div>
							</div>
							<div class="col-2">
								<input type="date" class="form-control me-2" id="endUpdatedAt"
									name="endUpdatedAt">
							</div>
							<div class="col-7">
								<c:forEach var="status" items="${selectPeriod }">
									<span class="date-badge updated-at"
										data-period="${status.name}"> ${status.name} </span>
								</c:forEach>
							</div>
						</div>
						<!-- 3번째 row end -->
						<!-- <div class="row">
							<div class="col-1 fw-bold">
								<p>제목</p>
							</div>
							<div class="col-3">
								<input type="text" class="form-control me-2" id="title"
									name="title" placeholder="제목">
							</div>
						</div> -->
						<div class="row my-2 align-itmes-center">
							<!-- <div class="col-1">
								<p class="mb-0 me-2 fw-bold">응답 수</p>
							</div>
							<div class="col-2">
								<div class="d-flex align-items-center flex-nowrap">
									<input type="text" class="form-control me-2"
										id="minAnswerCount" name="minAnswerCount"
										oninput="this.value = this.value.replace(/[^0-9]/g,'')">
									<span class="me-2">-</span> <input type="text"
										class="form-control me-2" id="maxAnswerCount"
										name="maxAnswerCount"
										oninput="this.value = this.value.replace(/[^0-9]/g,'')">
								</div>
							</div>
							<div class="col-3">
								<p class="limit-num">* 숫자만 입력</p>
							</div> -->

						</div>
						<div class="row">
							<div class="col-12 text-center">
								<button class="btn mx-2" id="searchBtn">검색</button>
								<button class="btn" id="initialBtn">초기화</button>
							</div>

						</div>
					</div>
				</div>
			</div>
			<!-- 다중 검색 end -->

			<!-- 설문지 생성하는 카드  -->
			<div id="surveyCountContainer" style="display: none;">
				<p>
					[검색 결과: <span id="surveyCount">0</span>개]
				</p>
			</div>
			<div class="row row-cols-1 row-cols-md-3 g-4">
				<!-- 설문지 생성 버튼은 첫 페이지에만 표시 -->
				<c:if test="${pageNum == 1}">
					<div class="col">
						<div class="card survey-card">
							<div class="add-survey-card">
								<img alt="plusBtn" src="/resources/img/common/plusButton.png"
									data-bs-toggle="modal" data-bs-target="#makeAutoQuestion-modal">
							</div>
						</div>
					</div>
				</c:if>

				<!-- 생성된 설문지 카드 출력 -->
				<c:forEach var="survey" items="${pagedSurveys}">
					<div class="col">
						<div class="card each-survey-card d-flex flex-column">
							<div class="card-body py-1">
								<!-- 설문 진행 상태 -->
								<c:forEach var="status" items="${progressStatus}">
									<c:if test="${survey.ccSeq == status.seq}">
										<span
											class="badge rounded-pill mb-1 px-2 py-1
	                            <c:choose>
	                                <c:when test="${status.seq == 3}">bg-warning</c:when>
	                                <c:when test="${status.seq == 4}">bg-primary</c:when>
	                                <c:when test="${status.seq == 5}">bg-secondary</c:when>
	                            </c:choose>">
											${status.name} </span>
									</c:if>
								</c:forEach>
								<p class="fw-bold">${survey.name}</p>
								<div class="date-info">
									<p>생성일:</p>
									<p>${survey.createdAt}</p>
								</div>
								<div class="date-info">
									<p>수정일:</p>
									<p>${survey.updatedAt}</p>
								</div>
								<div class="date-info">
									<p>설문 기간:</p>
									<p>${survey.postDate}~${survey.endDate}</p>
								</div>
							</div>
							<div class="card-footer py-0 d-flex align-items-center">
								<p class="">${survey.answerCount}개응답</p>
							</div>
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
	</div>
	 <script type="text/javascript" src="/resources/js/survey/multiSearch.js"></script>
	 
	 <!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
       integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
       crossorigin="anonymous"></script>

		JOLD Paginator 로드
		<script src="jquery.jold.paginator.min.js"></script> -->

	<%@include file="/WEB-INF/views/question/modal-autoQuestions.jsp"%>
</body>
</html>