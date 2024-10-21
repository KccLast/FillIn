<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DashBoard</title>
<!-- <link rel="stylesheet" type="text/css" href="/resources/common/dashBoardNav.css"> -->
<link rel="stylesheet" type="text/css" href="/resources/common/fixNav.css">
<link rel="stylesheet" type="text/css" href="/resources/css/survey/dashboard.css">
</head>
<body>
	<%@include file="/resources/common/header.jsp"%>
	<%-- <%@ include file="/resources/common/dashBoardNav.jsp"%> --%>
	<%@ include file="/resources/common/fixNav.jsp"%>

	<!-- 컨텐트 내용 -->
	<div class="content">
	<table class="table">
	 <!--  <thead>
	    <tr>
	      <th scope="col">항목</th>
	      <th scope="col">필터</th>
	    </tr>
	  </thead> -->
	  <tbody>
	    <tr>
	      <td>진행 상태</td>
	      <td>
	        <select class="selectpicker" id="progress-ccSeq" name="ccSeq">
	          <option value="">전체</option>
	          <c:forEach var="status" items="${progressStatus}">
	            <option value="${status.seq}">${status.name}</option>
	          </c:forEach>
	        </select>
	      </td>
	    </tr>
	    <tr>
	      <td>생성일</td>
	      <td>
	        <input type="date" id="startCreatedAt" name="startCreatedAt"> - 
	        <input type="date" id="endCreatedAt" name="endCreatedAt">
	        <c:forEach var="status" items="${selectPeriod}">
	          <span class="date-badge created-at" data-period="${status.name}">
	            ${status.name}
	          </span>
	        </c:forEach>
	      </td>
	    </tr>
	    <tr>
	      <td>수정일</td>
	      <td>
	        <input type="date" id="startUpdatedAt" name="startUpdatedAt"> - 
	        <input type="date" id="endUpdatedAt" name="endUpdatedAt">
	        <c:forEach var="status" items="${selectPeriod}">
	          <span class="date-badge updated-at" data-period="${status.name}">
	            ${status.name}
	          </span>
	        </c:forEach>
	      </td>
	    </tr>
	    <tr>
	      <td>제목</td>
	      <td>
	        <input type="text" id="title" name="title" placeholder="제목">
	      </td>
	    </tr>
	    <tr>
	      <td>응답 수</td>
	      <td>
	        <input type="text" id="minAnswerCount" name="minAnswerCount" oninput="this.value = this.value.replace(/[^0-9]/g,'')"> - 
	        <input type="text" id="maxAnswerCount" name="maxAnswerCount" oninput="this.value = this.value.replace(/[^0-9]/g,'')">
	        <p class="limit-num">* 숫자만 입력</p>
	      </td>
	    </tr>
	    <tr>
	      <td colspan="2">
	        <button class="search-btn" id="searchBtn">검색</button>
	        <button class="initial-btn" id="initialBtn">초기화</button>
	      </td>
	    </tr>
	  </tbody>
	</table>
	
		<!-- 다중 검색창 -->
		<%-- <div class="filter-section">
			<div class="filter-row">
				<p>진행 상태</p>
				<div class="filter-input">
					<select class="selectpicker" id="progress-ccSeq" name="ccSeq">
						<option value="">전체</option>
						<c:forEach var="status" items="${progressStatus }">
			            	<option value="${status.seq}">${status.name}</option>
						</c:forEach>
					</select>
				</div>
			</div>

			<div class="filter-row">
				<p>생성일</p>
				<div class="filter-input">
					<input type="date" id="startCreatedAt" name="startCreatedAt">
					- <input type="date" id="endCreatedAt" name="endCreatedAt">

						<c:forEach var="status" items="${selectPeriod }">
							<span class="date-badge created-at" data-period="${status.name}">
								${status.name}
							</span>
						</c:forEach>
				</div>
			</div>

			<div class="filter-row">
				<p>수정일</p>
				<div class="filter-input">
					<input type="date" id="startUpdatedAt" name="startUpdatedAt">
					- <input type="date" id="endUpdatedAt" name="endUpdatedAt">
					
					<c:forEach var="status" items="${selectPeriod }">
						<span class="date-badge updated-at" data-period="${status.name}">
								${status.name}
						</span>
					</c:forEach>
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
					<input type="text" id="minAnswerCount" name="minAnswerCount" oninput="this.value = this.value.replace(/[^0-9]/g,'')">
					- <input type="text" id="maxAnswerCount" name="maxAnswerCount" oninput="this.value = this.value.replace(/[^0-9]/g,'')">
					<p class="limit-num">* 숫자만 입력</p>
				</div>
			</div>

			<div class="filter-row">
				<button class="search-btn" id="searchBtn">조회하기</button>
				<button class="initial-btn" id="initialBtn">초기화</button>
			</div>
		</div> --%>
		<!-- 다중 검색 end -->

		<!-- 설문지 생성하는 카드  -->
		<div class="cards-container">
			<div class="card h-100">
				<div class="add-survey-card">
					<img alt="plusBtn" src="/resources/img/common/plusButton.png"
					data-bs-toggle="modal" data-bs-target="#makeAutoQuestion-modal">
				</div>
			</div>

			<!-- 생성된 설문지 카드 -->
			<c:forEach var="survey" items="${pagedSurveys}">
				<div class="card h-100">
					<div class="card-body">
						<c:forEach var="status" items="${progressStatus }">
							<c:if test="${survey.ccSeq == status.seq }">
								<span class="badge rounded-pill mb-1 px-2 py-1
									<c:choose>
										<c:when test="${status.seq == 3 }">bg-warning</c:when>
										<c:when test="${status.seq == 4 }">bg-primary</c:when>
										<c:when test="${status.seq == 5 }">bg-secondary</c:when>
									</c:choose>">
									${status.name }
								</span>
							</c:if>
						</c:forEach>
						<p>${survey.name }</p>
						<div class="date-info">
							<p>생성일:</p>
							<p>${survey.createdAt }</p>
						</div>
						<div class="date-info">
							<p>수정일:</p>
							<p>${survey.updatedAt }</p>
						</div>
						<div class="date-info">
							<p>설문 기간:</p>
							<p>${survey.postDate } ~ ${survey.endDate }</p>
						</div>
					</div>
					<div class="card-footer">
						<p>${survey.answerCount}개 응답</p>
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
	<script type="text/javascript" src="/resources/js/survey/multiSearch.js"></script>
	<%@include file="/WEB-INF/views/question/modal-autoQuestions.jsp"%>
</body>
</html>