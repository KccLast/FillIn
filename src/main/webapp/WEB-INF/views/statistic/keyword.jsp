<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Title</title>
<link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
<link rel="stylesheet" type="text/css"
	href="/resources/css/statistic/keyword.css">
</head>
<body>
	<%@include file="/resources/common/header.jsp"%>
	<%-- <%@ include file="/resources/common/miniNav.jsp"%> --%>
	<%@ include file="/resources/common/nav.jsp"%>


	<div class="content">

		<div class="container">
			<div class="keyword-analysis">
				<div class="title">
					<h3>키워드 분석</h3>
				</div>
				<div class="search-section">
					<label for="phrase">문항을 선택해주세요</label> <select id="phrase">
						<option value="문항1">문항1</option>
						<option value="문항2">문항2</option>
					</select>
					<button id="update">업데이트</button>
				</div>
				<div class="search-filter">
					<label for="score-filter">검색 점수 필터: <span id="score-value">1</span></label>
					<input type="range" id="score-filter" min="0" max="1"
						value="1" oninput="updateScoreValue(this.value)"> <label
						for="result-count">결과 수: <span id="result-value">500</span></label>
					<input type="range" id="result-count" min="1" max="1000"
						value="500" oninput="updateResultValue(this.value)">
				</div>
				<div class="keyword-search">
				<label for="score-search">검색 키워드</label>
					<input type="text" placeholder="가격">
					<button>검색</button>
					
					 <!-- 스크롤 결과 -->
                <div class="result-section" style="max-height: 300px; overflow-y: scroll; margin-top: 20px; border: 1px solid #ccc;">
                    <table class="result-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th>timestamp</th>
                                <th>responseKey</th>
                                <th>score</th>
                                <th>충청도 지역특산물 쇼핑몰 리뷰</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 더미 데이터 -->
                            <tr>
                                <td>1710292634000</td>
                                <td>UmCD2JFmnlACaexygxo</td>
                                <td>0.462320579417331</td>
                                <td>가격대비 괜찮습니다~~~</td>
                            </tr>
                            <tr>
                                <td>1710217504000</td>
                                <td>OpyfNxURMPxLcZ8GaZL</td>
                                <td>0.4413550750085911</td>
                                <td>싸고 가격에 비해 좋아용</td>
                            </tr>
                            <tr>
                                <td>1710205546000</td>
                                <td>zN7vb0XttQmSh5259NT</td>
                                <td>0.43051389978505993</td>
                                <td>가격대비 좋은지 모르겠네요</td>
                            </tr>
                            <tr>
                                <td>1710169935000</td>
                                <td>i546bDeqHAWr0r00B0C</td>
                                <td>0.4279763510397774</td>
                                <td>가격 배송이 빠릅니다~</td>
                            </tr>
                            <tr>
                                <td>1710233139000</td>
                                <td>MslIH8Aslzltx2mRj0</td>
                                <td>0.4268881179879875</td>
                                <td>다 좋은데 가격이 좀 비싸네요~</td>
                            </tr>
                            <tr>
                                <td>1710219232000</td>
                                <td>rMvewQbpxV5NHvFycWB7D</td>
                                <td>0.4207673318435905</td>
                                <td>냄새...도저히ㅜㅜ...싼 가격이라 그런가요?!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
				</div>
			</div>
		</div>


	</div>
	 <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/resources/js/statistic/keyword.js"></script>
</body>
</html>