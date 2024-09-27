<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Title</title>
		<link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
		<link rel="stylesheet" type="text/css" href="/resources/css/question/questionNav.css">
	</head>
	<body>
		<%@include file="/resources/common/header.jsp"%>
		<%-- <%@ include file="/resources/common/miniNav.jsp"%> --%>
		<%@ include file="/resources/common/nav.jsp"%>
	
		<!-- 컨텐트 내용 -->
		<!-- [대시보드] 스타일 -->
		<!-- style="height: 700px; background-color: green; margin-top: 100px; margin-left: 240px; margin-right: 40px; -->
		<!-- [대시보드 이외]의 모든 페이지 스타일 -->
		<!-- style="height: 700px; background-color: green; margin-top: 100px; margin-left: 100px; margin-right: 40px; -->
		
		<div id="j-question-nav">
			<div class="j-question-box">
				<div class="j-total-question-box j-flex-row-center">
				<span>전체문항수</span>
				<div class="j-ai-img">AI</div>
				</div>
			
				<div class="j-question-list">
					
					
					
					<div class="j-question j-flex-row-center">
						<div class="question-img j-flex-row-center">
							<img src="/resources/img/question/choice.png">
						</div>
						<div class="question-name">
							<span>만족도 조사</span>
						</div>
					</div>
					
					
					
				</div>
				
				<div class="j-question-plus-button j-flex-row-center">
					<button class="j-flex-row-center"> 
					<div>
						<img src="/resources/img/question/plus-circle-fill.png"/>
					</div>
					추가하기
					</button>
				</div>
			</div>
			<div class="j-identified-box">
				<div class="j-i-questions">
					
					
						<div class="j-question j-flex-row-center">
						<div class="question-img j-flex-row-center">
							<img src="/resources/img/question/choice.png">
						</div>
						<div class="question-name">
							<span>만족도 조사</span>
						</div>
					</div>
				
				</div>
				<div class="j-i-plus-button j-flex-row-center">
					<span class="j-i-btn-name">응답자 식별용 필드</span>
					<div class="j-i-btn-plus j-flex-row-center">
						<span>+</span>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="j-question-card j-flex-col-center">
				<div class="j-survey-es-type j-flex-row-center">
					<button class="j-essential">필수</button>
					<div class="j-typeAndImg j-flex-row-center">
						<img src="/resources/img/question/choice.png"/>
						<div class="j-tpye-name">객관식</div>
					</div>
				</div>
			    <div class="j-survey-name">
			    <input class="j-survey-name-input" type="text" placeholder="질문명을 작성해주세요">
			    </div>
			    <div class="j-survey-content">
			    	<textarea rows="" cols="">
			    	질문에 대한 설명을 작성해주세요
			    	</textarea>
			    </div>
			    <div class="j-question-content-box">
			    	<div class="j-select-question-type-box">
			    		
			    	</div>
			    </div>
			</div>
			
			<div class="j-question-card">
			    
			</div>
			
			<div class="j-question-card">
			    
			</div>
			
			<div class="j-question-card">
			    
			</div>
			
			
		</div>
	</body>
</html>