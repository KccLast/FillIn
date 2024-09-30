<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/full.css">
</head>
<body>
<%@include file="/resources/common/header.jsp" %>
<%-- <%@ include file="/resources/common/miniNav.jsp"%> --%>
<%@include file="/resources/common/nav.jsp" %>

<!-- 컨텐츠 내용 -->
<div class="content">
    <!-- 날짜 조회 및 질문 선택 -->
    <div class="row mb-4">
        <div class="col-md-2">
            <%--					<label for="startDate" class="form-label">시작 날짜</label>--%>
            <input type="date" class="form-control" id="startDate" value="2024-04-20">
        </div>
        <div class="col-auto d-flex align-items-center justify-content-center">
            <span>~</span> <!-- 여기에 ~ 기호 추가 -->
        </div>
        <div class="col-md-2">
            <%--					<label for="endDate" class="form-label">종료 날짜</label>--%>
            <input type="date" class="form-control" id="endDate" value="2024-09-16">
        </div>
        <div class="col-md-2 d-flex align-items-end">
            <button class="btn btn-primary w-100">조회하기</button>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-md-2 d-flex align-items-end">
            <select class="form-select">
                <option>질문을 선택해주세요</option>
                <option>질문 1</option>
                <option>질문 2</option>
            </select>
        </div>
        <div class="col-md-2 d-flex align-items-end">
            <select class="form-select">
                <option>문항을 선택해주세요</option>
                <option>문항 1</option>
                <option>문항 2</option>
            </select>
        </div>

        <div class="col-md-2 d-flex align-items-end">
            <button class="btn btn-primary">검색</button>
        </div>
    </div>

    <!-- 통계 데이터 -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">통계 데이터</h4>
                    <!-- 통계 차트 및 데이터 테이블 삽입 -->
                    <div class="chart-area">
                        <canvas id="statisticChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%--			<!-- 추가 데이터 카드 -->--%>
    <%--			<div class="row mt-4">--%>
    <%--				<div class="col-md-6">--%>
    <%--					<div class="card">--%>
    <%--						<div class="card-body">--%>
    <%--							<h5>1번: 성별을 선택해주세요.</h5>--%>
    <%--							<canvas id="genderChart"></canvas>--%>
    <%--						</div>--%>
    <%--					</div>--%>
    <%--				</div>--%>

    <%--				<div class="col-md-6">--%>
    <%--					<div class="card">--%>
    <%--						<div class="card-body">--%>
    <%--							<h5>2번: 연령대를 선택해주세요.</h5>--%>
    <%--							<canvas id="ageChart"></canvas>--%>
    <%--						</div>--%>
    <%--					</div>--%>
    <%--				</div>--%>
    <%--			</div>--%>

    <!-- 추가 데이터 카드 -->
    <div id="dataCarousel" class="carousel slide mt-4" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5>1번: 성별을 선택해주세요.</h5>
                                <canvas id="genderChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5>2번: 연령대를 선택해주세요.</h5>
                                <canvas id="ageChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 다음 슬라이드 -->
            <div class="carousel-item">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5>3번: 추가 질문을 입력해주세요.</h5>
                                <canvas id="additionalChart1"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5>4번: 또 다른 질문을 선택해주세요.</h5>
                                <canvas id="additionalChart2"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a class="carousel-control-prev" href="#dataCarousel" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#dataCarousel" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </a>
    </div>

    <%--			<!-- 테이블 데이터 -->--%>
    <%--			<div class="row mt-4">--%>
    <%--				<div class="col-12">--%>
    <%--					<div class="card">--%>
    <%--						<div class="card-body">--%>
    <%--							<h5>3번: 고양이를 좋아하는 이유를 알려주세요.</h5>--%>
    <%--							<div class="table-responsive">--%>
    <%--								<table class="table">--%>
    <%--									<thead>--%>
    <%--									<tr>--%>
    <%--										<th>활동 시간</th>--%>
    <%--										<th>사유 선택</th>--%>
    <%--									</tr>--%>
    <%--									</thead>--%>
    <%--									<tbody>--%>
    <%--									<tr>--%>
    <%--										<td>2024. 2. 2. 오후 6:39:25</td>--%>
    <%--										<td>귀엽기 때문에</td>--%>
    <%--									</tr>--%>
    <%--									<tr>--%>
    <%--										<td>2024. 2. 2. 오후 6:38:54</td>--%>
    <%--										<td>서열 싫어한다</td>--%>
    <%--									</tr>--%>
    <%--									</tbody>--%>
    <%--								</table>--%>
    <%--							</div>--%>
    <%--						</div>--%>
    <%--					</div>--%>
    <%--				</div>--%>
    <%--			</div>--%>

    <!-- 테이블 데이터 캐러셀 -->
    <div id="tableCarousel" class="carousel slide mt-4" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>3번: 고양이를 좋아하는 이유를 알려주세요.</h5>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>활동 시간</th>
                                            <th>사유 선택</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>2024. 2. 2. 오후 6:39:25</td>
                                            <td>귀엽기 때문에</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 다음 슬라이드 -->
            <div class="carousel-item">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>3번: 고양이를 좋아하는 이유를 알려주세요.</h5>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>활동 시간</th>
                                            <th>사유 선택</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>2024. 2. 2. 오후 6:38:54</td>
                                            <td>서열 싫어한다</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a class="carousel-control-prev" href="#tableCarousel" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#tableCarousel" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </a>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-..."
            crossorigin="anonymous"></script>
</body>
</html>