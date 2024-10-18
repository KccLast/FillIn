<%@ page contentType="text/html;charset=UTF-8" language="java"%>

<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<title>Title</title>
<link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
<link rel="stylesheet" type="text/css"
	href="/resources/css/question/questionNav.css">
<link rel="stylesheet" type="text/css"
	href="/resources/css/question/question.css">
	<link rel="stylesheet" type="text/css"
	href="/resources/css/question/condition.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.15.6/js/jsplumb.min.js"></script>	
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script
	src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f7372f613dea5dbd8f49b7be0a73bbb8"></script>

<script type="text/javascript">
	$(function(){
		let surveyName = "${survey.name}";
		updateSurveyName(surveyName);
		console.log("surveyName In jsp"+surveyName);
	})
	
</script>
<script src="/resources/js/question/questionIUD.js"></script>
<script src="/resources/js/question/questionEvent.js"></script>
<script src="/resources/js/question/questionParse.js"></script>

<script type="text/javascript">
	
	$(function(){
		$('.content').on('keyup','.j-survey-name-input',function(){
			let idx = $(this).parent().parent().index();
			$('.j-question-list').find('.j-question').eq(idx).find('.question-name > span').html($(this).val());
		})

	    let survey = '${surveyJson}';
	    parseJson(survey);

	})
</script>




</head>

<body>
	<input type="hidden" id="surveySeq" value="${survey.seq}"/>
	<%@include file="/resources/common/header.jsp"%>
	<%-- <%@ include file="/resources/common/miniNav.jsp" %> --%>
	<%@ include file="/resources/common/nav.jsp"%>

	<!-- 컨텐트 내용 -->
	<!-- [대시보드] 스타일 -->
	<!-- style="height: 700px; background-color: green; margin-top: 100px; margin-left: 240px; margin-right: 40px; -->
	<!-- [대시보드 이외]의 모든 페이지 스타일 -->
	<!-- style="height: 700px; background-color: green; margin-top: 100px; margin-left: 100px; margin-right: 40px; -->

	<div id="j-question-nav">
		<div class="j-questionNav-tab-Box j-flex-row-center">
			<div class="j-question-nav-tab j-question-nav-color">
				질문 상세
			</div>
			<div class="j-deploy-nav-tab">
				게시 정보
			</div>
			
		</div>
		<div class="j-question-box">
			<div class="j-total-question-box j-flex-row-center">
				<span>전체문항수</span>
				<div class="j-ai-img">AI</div>
			</div>

			<div class="j-question-list">


			</div>

			<div class="j-question-plus-button j-flex-row-center">
				<button class="j-flex-row-center">
					<div>
						<img src="/resources/img/question/plus-circle-fill.png" />
					</div>
					추가하기
				</button>
			</div>
		</div>
		
		<div class="j-deploy-box">
		
		
		</div>
		
		<div class="j-condition-button j-flex-row-center j-fix-height">
			<input type="button" value="질문 고급조건" class="j-nav-input-button j-con-btn">
		</div>
		
		<div class="j-depoly-button j-flex-row-center j-fix-height">
			<input type="button" value="게시하기" class="j-nav-input-button">
		</div>
		
		<div class="j-save-button j-flex-row-center j-fixSave-height">
			<input type="button" value="저장하기" class="j-nav-input-button j-nav-save-button">
		</div>
		
	</div>
	<div class="content">


		<!-- <div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				객관식
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/choice.png" />
					<div class="j-tpye-name">객관식</div>
				</div>
				객관식 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				객관식
				<div class="j-select-question-type-box">
					<div class="j-select-optionBox j-flex-row-center">
						<div class="j-option-order">1</div>
						<div class="j-option-input-radio">
							<input type="text" placeholder="옵션 입력란"> <input
								type="radio">
						</div>
						<div class="j-xbutton">
							<img src="/resources/img/question/x-circle.png">
						</div>
					</div>
					<div class="j-option-plus">
						<div class="j-op-name j-flex-row-center">
							<span>옵션추가하기</span>
						</div>
						<div class="j-option-plus-img">
							<img src="/resources/img/question/plus-circle-fill-blue.png">
						</div>
					</div>
				</div>
				객관식
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				단답형
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/short.png" />
					<div class="j-tpye-name">단답형</div>
				</div>
				단답형 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				단답형
				<div class="j-short-box j-flex-row-center">
					<div class="j-short-inputBox j-flex-row-center">
						<input type="text" placeholder="단답형은 100자 제한입니다.">
					</div>
				</div>
				단답형
			</div>
		</div>



		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				서술형 
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/long.png" />
					<div class="j-tpye-name">서술형</div>
				</div>
				서술형 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				서술형
				<div class="j-long-box j-flex-row-center">
					<div class="j-long-inputBox j-flex-row-center">
						<textarea class="j-long-input"
							placeholder="&#13;&#10;서술형은 500자 제한입니다."></textarea>
					</div>
				</div>
				서술형
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				체크박스
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/checkBox.png" />
					<div class="j-tpye-name">체크박스</div>
				</div>
				체크박스 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				체크박스
				<div class="j-select-question-type-box">
					<div class="j-select-optionBox j-flex-row-center">
						<div class="j-option-order">1</div>
						<div class="j-option-input-radio">
							<input type="text" placeholder="옵션 입력란"> <input
								type="checkbox">
						</div>
						<div class="j-xbutton">
							<img src="/resources/img/question/x-circle.png">
						</div>
					</div>
					<div class="j-option-plus">
						<div class="j-op-name j-flex-row-center">
							<span>옵션추가하기</span>
						</div>
						<div class="j-option-plus-img">
							<img src="/resources/img/question/plus-circle-fill-blue.png">
						</div>
					</div>
				</div>
				체크박스
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				선형배율
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/Liner.png" />
					<div class="j-tpye-name">선형</div>
				</div>
				선형배율 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				선형배율
				<div class="j-dropdown-box">
					<div class="j-LineAndnumber j-flex-col-center">
						<div class="j-line"></div>
						<div class="j-number">
							<span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span>
						</div>
					</div>
					<div class="j-number-range j-flex-row-center">
						<select class="j-num-start">
							<option>0</option>
							<option>1</option>
						</select> <span> --- </span> <select class="j-num-end">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
							<option>8</option>
							<option>9</option>
							<option>10</option>
						</select>
					</div>
				</div>
				선형배율
			</div>
		</div>



		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				드롭다운
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/dropdown.png" />
					<div class="j-tpye-name">드롭다운</div>
				</div>
				드롭다운 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				드롭다운
				<div class="j-dropdwon-box j-flex-col-center">
					<div class="j-dropdwon">
						<select>
							<option value="" disabled selected>옵션을 편집하세요</option>
						</select>
					</div>
					<div class="j-dropdwon-modifiy j-flex-row-center">
						<div class="j-dropdwon-img">
							<img src="/resources/img/question/pencil.png">
						</div>
						<div class="j-dropdwon-text">옵션을 수정하기</div>
					</div>

				</div>
				드롭다운
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				객관식표
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/chart.png" />
					<div class="j-tpye-name">객관식표</div>
				</div>
				객관식표 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				객관식표
				<div class="j-chart-box">
					<div class="j-preview-chart j-flex-row-center">
						<img src="/resources/img/question/previewChart.png">
						<div>표 미리보기</div>
					</div>
					<div class="j-chart-plus">
						<div class="j-rowAndcol-plus j-row-plus-button j-flex-row-center">
							<div class="j-rowAndcol-plus-img">
								<img src="/resources/img/question/plus-circle-fill-blue.png">
							</div>
							<div class='j-chart-plus-name'>행 추가하기</div>
						</div>
						<div class="j-rowAndcol-plus j-col-plus-button j-flex-row-center">
							<div class="j-rowAndcol-plus-img">
								<img src="/resources/img/question/plus-circle-fill-blue.png">
							</div>
							<div class='j-chart-plus-name'>열 추가하기</div>
						</div>
					</div>
					<div class="j-chart-body j-flex-row-center">
						<div class="j-rowAndcol-box j-row-box">
							<div class="j-rowAndcol-input-x-box j-flex-row-center">
								<input class="j-rowAndcol-input j-row-input" type="text"
									placeholder="&nbsp;&nbsp;Row 1">
								<button class="j-rowAndcol-input-xbutton j-flex-row-center">
									<span>x</span>
								</button>
							</div>
						</div>
						<div class="j-vertical-line"></div>
						<div class="j-rowAndcol-box j-col-box">
							<div class="j-rowAndcol-input-x-box j-flex-row-center">
								<input class="j-rowAndcol-input j-col-input" type="text"
									placeholder="&nbsp;&nbsp;Col 1">
								<button class="j-rowAndcol-input-xbutton">x</button>
							</div>
						</div>
					</div>
				</div>
				객관식표
			</div>
		</div>



		사용자 식별용 

		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				주소
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/house.png" />
					<div class="j-tpye-name">주소</div>
				</div>
				주소 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				주소
				<div class="j-address j-flex-row-center">
					<div class="col-sm-10 j-address-box">
						<label for="zipp_btn" class="form-label">주소</label><br /> <input
							type="text" class="form-control mb-2" id="zipp_code_id"
							name="zipp_code" maxlength="10" placeholder="우편번호"
							style="width: 50%; display: inline;"> <input
							type="button" id="zipp_btn" class="btn btn-primary"
							onclick="execDaumPostcode()" value="우편번호 찾기"><br> <input
							type="text" class="form-control mb-2" name="user_add1"
							id="UserAdd1" maxlength="40" placeholder="기본 주소를 입력하세요" required>
						<div class="invalid-feedback">주소를 입력해주시기 바랍니다!</div>
						<input type="text" class="form-control" name="user_add2"
							id="UserAdd2" maxlength="40" placeholder="상세 주소를 입력하세요">
					</div>
				</div>
				주소
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				위치기록
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/location.png" />
					<div class="j-tpye-name">위치기록</div>
				</div>
				위치기록 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				위치기록
				<div class="j-map j-flex-col-center">
					<div id="map" class="j-map-container"></div>
					<button class="j-location">위치 가져오기</button>
				</div>
				위치기록
			</div>
		</div>
		
		
		
		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				사진
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/picture.png" />
					<div class="j-tpye-name">사진</div>
				</div>
				사진 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				사진 
				<div class="j-img-box j-flex-col-center">
					<input type="file" class="j-file-input">
					<div class="j-img-preview j-flex-row-center">
						<img class="j-file-up-img" src="/resources/img/question/file-up.png" />
					</div>
					<div class="j-img-answerBox">
						<textarea rows="" cols=""></textarea>
					</div>
				</div>
				사진 
			</div>
		</div>
		
		
		
		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				이메일
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/email.png" />
					<div class="j-tpye-name">이메일</div>
				</div>
				이메일 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				이메일 
				<div class="j-email-input-box j-flex-row-center">
				<input tpye="text" class="j-email-header-input">
				<span>@</span>
				<input type="text" class="j-email-tail-input">
				<select class="j-email-select">
					<option value="0"></option>
					<option value="1">naver.com</option>
					<option value="2">gmail.com</option>
					<option value="3">daum.com</option>
				</select>
				</div>
				이메일 
			</div>
		</div>
		
		개인정보 수집이용 동의서
		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				개인정보
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/secu.png" />
					<div class="j-tpye-name">개인정보</div>
				</div>
				개인정보 
			</div>
			<div class="j-question-content-box">
				개인정보 
				<div>
					<h5>개인 정보 수집 및 이용 동의서 </h5>
				</div>
				<div class="j-groupName">
				 <input type="text" placeholder="단체명" class="j-group-name">은 <input type="text" placeholder="개인정보 수집 목적" class="j-goal">을
				 위하여 아래와 같이 개인정보를 수집 및 이용 및 제3자에게 제공하고자 합니다.</br>
				 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오 
				</div>
				
				<div class="j-ok-box">
				<div>개인정보 수집 및 이용 내역</div>
					<table>
						<thead>
							<th>항목</th>
							<th>수집 및 이용 목적</th>
							<th>보유기간</th>
						</thead>
						<tbody>
							<tr>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
							</tr>
						</tbody>
						
					</table>
				</div>
				
				<div class="j-ok-box">
				<div>민감 정보 처리 내역</div>
					<table>
						<thead>
							<th>항목</th>
							<th>수집 및 이용 목적</th>
							<th>보유기간</th>
						</thead>
						<tbody>
							<tr>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
							</tr>
						</tbody>
						
					</table>
				
				</div>
				
				<div class="j-ok-box">
				<div>개인정보 제3자 제공 내역</div>
					<table>
						<thead>
							<th>제공받는 자</th>
							<th>제공 목적</th>
							<th>제공항목</th>
							<th>보유기간</th>
						</thead>
						<tbody>
							<tr>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
							</tr>
						</tbody>
						
					</table>
				
				</div>
				<div class="j-plus-ok-info">
					※ 응답자는 위의 개인정보 수집∙이용에 대한 동의를 거부할 권리가 있으며,</br>
					동의를 거부할 경우 <span>개인정보가 필요한 서비스의 이용에 제한</span>을 받을 수 있습니다.
				</div>
				<div>
					<h5 class="j-bottom">위와 같이 개인정보를 수집 및 이용하는 것에 동의하십니까?</h5>
				</div>
				<div>
					<div class="j-bottom-buttom">
					<div class="j-select-optionBox j-flex-row-center">
						<div class="j-option-order">1</div>
						<div class="j-option-input-radio">
							<input type="text" placeholder="동의" disabled="disabled"> 
							<input type="radio" name="ok">
						</div>
					</div>
					<div class="j-select-optionBox j-flex-row-center">
						<div class="j-option-order">2</div>
						<div class="j-option-input-radio">
							<input type="text" placeholder="동의하지 않음" disabled="disabled"> 
							<input type="radio" name="ok">
						</div>
					</div>
					</div>
				</div>
				개인정보 
			</div>
		</div>
		개인정보 수집이용 동의서
		
		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				전화번호
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/phones.png" />
					<div class="j-tpye-name">전화번호</div>
				</div>
				전화번호 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				전화번호 
				<div class="j-flex-row-center">
				<div class="j-phone-inputBox">
					<input text="text" class="j-phone-1" maxlength="3"/>
					<input text="text" class="j-phone-2" maxlength="4"/>
					<input text="text" class="j-phone-2" maxlength="4"/>
				</div>
				</div>
				전화번호 
			</div>
		</div>

		사용자 식별용 
 -->
 
 <!-- <div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				 성별
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/gender.png" />
					<div class="j-tpye-name">성별</div>
				</div>
				 성별 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				 성별 
				<div class="gender-selection j-flex-row-center">
    <div class="radio-container">
        <input type="radio" name="gender" value="male" class="j-gender-radio">
        <span class="radio-text">남자</span>
    </div>
    <div class="radio-container">
        <input type="radio" name="gender" value="female" class="j-gender-radio">
        <span class="radio-text">여자</span>
    </div>
</div>
				 성별 
			</div>
		</div>
		
		
		
		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				 날짜
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/day.png" />
					<div class="j-tpye-name">날짜</div>
				</div>
				 날짜 
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				 날짜  
					<div class='j-dayBox j-flex-row-center'>
					<input type="date">
					</div>
				 날짜 
			</div>
		</div> -->
 
	</div>

	<!-- 모달 창 -->
	<div id="optionModal" class="modifiy-modal">
		<div class="modal-content">
			<div class="modal-header">
				<h4>옵션 추가</h4>
			</div>
			<div class="modal-body j-flex-col-center">
				<div>옵션을 입력하고 엔터로 구분해주세요</div>
				<textarea id="optionTextarea" rows="5" cols="50"
					style="resize: none;" placeholder="옵션1&#10;옵션2&#10;옵션3"></textarea>
			</div>
			<div class="modal-btn">
				<button id="addOptionsBtn">옵션 저장</button>
				<button class="close">닫기</button>
			</div>
		</div>
	</div>
	<!-- check Box 모달 -->

	<!-- chart 모달창 -->
	<div id="preview-modal" class="modifiy-modal" style="display: none;">
		<div class="preview-modal-content">
			<span class="preview-modal-close">&times;</span>
			<h3>표 미리보기</h3>
			<div id="preview-table-container"></div>
		</div>
	</div>
	<!-- chart 모달창 -->

	<!-- add type 모달창 -->
	<div id="add-type-modal" class="add-type-modal-class">
		<div class="add-type-modal-content">
			<span class="add-type-modal-close">&times;</span>
			<div id="add-type-modal-container" class="j-flex-row-center">
				<div class="j-quantity-box j-flex-col-center">
					<span>Quantity</span>
					<div class="j-type-box ">
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/choice.png" />
					<div class="j-type-name-modal">객관식</div>
					<input type="hidden" value="7" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/checkBox.png" />
					<div class="j-type-name-modal">체크박스</div>
				    <input type="hidden" value="8" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/Liner.png" />
					<div class="j-type-name-modal">선형</div>
				    <input type="hidden" value="9" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/dropdown.png" />
					<div class="j-type-name-modal">드롭다운</div>
					<input type="hidden" value="10" />
					</div>
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/chart.png" />
					<div class="j-type-name-modal">객관식표</div>
				    <input type="hidden" value="11" />
				    </div>
				   </div>
				</div>
				<div class="j-qual-box j-flex-col-center">
					<span>Qualitative</span>
					<div class="j-type-box">
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/short.png" />
					<div class="j-type-name-modal">단답형</div>
				    <input type="hidden" value="12" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/long.png" />
					<div class="j-type-name-modal">주관식</div>
				    <input type="hidden" value="13" />
				    </div>
				    
				    
				   </div>
				</div>
				<div class="j-data-box j-flex-col-center">
					<span>Data</span>
					<div class="j-type-box ">
					
					
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/location.png" />
					<div class="j-type-name-modal">위치기록</div>
				    <input type="hidden" value="17" />
				    </div>
				    
				   
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/secu.png" />
					<div class="j-type-name-modal">개인정보</div>
				    <input type="hidden" value="18" />
				    </div>
				    
				     <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/gender.png" />
					<div class="j-type-name-modal">성별</div>
				    <input type="hidden" value="19" />
				    </div>
				    
				     <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/day.png" />
					<div class="j-type-name-modal">날짜</div>
				    <input type="hidden" value="20" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/picture.png" />
					<div class="j-type-name-modal">사진</div>
				    <input type="hidden" value="21" />
				    </div>
				   </div>
				</div>
				
				<div class="j-contact-box j-flex-col-center">
					<span>Contact</span>
					
					<div class="j-type-box ">
					
					
					
					  <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/email.png" />
					<div class="j-type-name-modal">이메일</div>
				    <input type="hidden" value="14" />
				    </div>
					
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/house.png" />
					<div class="j-type-name-modal">주소</div>
					<input type="hidden" value="15" />
					</div>
					
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/phones.png" />
					<div class="j-type-name-modal">전화번호</div>
				    <input type="hidden" value="16" />
				    </div>
				   </div>
				</div>
			</div>
		</div>
	</div>
	<!-- add type 모달창 -->
	
	
	<!-- add type 모달창2 -->
	<div id="add-type-modal2" class="add-type-modal-class">
		<div class="add-type-modal-content">
			<span class="add-type-modal-close">&times;</span>
			<div id="add-type-modal-container2" class="j-flex-row-center">
				<div class="j-quantity-box j-flex-col-center">
					<span>Quantity</span>
					<div class="j-type-box ">
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/choice.png" />
					<div class="j-type-name-modal">객관식</div>
					<input type="hidden" value="7" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/checkBox.png" />
					<div class="j-type-name-modal">체크박스</div>
				    <input type="hidden" value="8" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/Liner.png" />
					<div class="j-type-name-modal">선형</div>
				    <input type="hidden" value="9" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/dropdown.png" />
					<div class="j-type-name-modal">드롭다운</div>
					<input type="hidden" value="10" />
					</div>
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/chart.png" />
					<div class="j-type-name-modal">객관식표</div>
				    <input type="hidden" value="11" />
				    </div>
				   </div>
				</div>
				<div class="j-qual-box j-flex-col-center">
					<span>Qualitative</span>
					<div class="j-type-box">
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/short.png" />
					<div class="j-type-name-modal">단답형</div>
				    <input type="hidden" value="12" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/long.png" />
					<div class="j-type-name-modal">주관식</div>
				    <input type="hidden" value="13" />
				    </div>
				    
				    
				   </div>
				</div>
				<div class="j-data-box j-flex-col-center">
					<span>Data</span>
					<div class="j-type-box ">
					
					
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/location.png" />
					<div class="j-type-name-modal">위치기록</div>
				    <input type="hidden" value="17" />
				    </div>
				    
				   
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/secu.png" />
					<div class="j-type-name-modal">개인정보</div>
				    <input type="hidden" value="18" />
				    </div>
				    
				     <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/gender.png" />
					<div class="j-type-name-modal">성별</div>
				    <input type="hidden" value="19" />
				    </div>
				    
				     <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/day.png" />
					<div class="j-type-name-modal">날짜</div>
				    <input type="hidden" value="20" />
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/picture.png" />
					<div class="j-type-name-modal">사진</div>
				    <input type="hidden" value="21" />
				    </div>
				   </div>
				</div>
				
				<div class="j-contact-box j-flex-col-center">
					<span>Contact</span>
					
					<div class="j-type-box ">
					
					
					
					  <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/email.png" />
					<div class="j-type-name-modal">이메일</div>
				    <input type="hidden" value="14" />
				    </div>
					
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/house.png" />
					<div class="j-type-name-modal">주소</div>
					<input type="hidden" value="15" />
					</div>
					
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/phones.png" />
					<div class="j-type-name-modal">전화번호</div>
				    <input type="hidden" value="16" />
				    </div>
				   </div>
				</div>
			</div>
		</div>
	</div>
	<!-- add type 모달창2 -->
	<div class="j-condition-box">
		
		<div class="j-condition-card-container">
			
			<div class="j-que-con-card j-flex-row-center" id="card1">
				<div class="j-corder j-flex-row-center">1</div>
				<div class="j-type-con-img j-flex-row-center">
					<img src="/resources/img/question/checkBox.png"/>
				</div>
				<div class="j-con-que-name">질문명</div>
			</div>
	    
	    
	    
	    
			<div class="j-que-con-card j-flex-row-center" id="card2">
				<div class="j-corder j-flex-row-center">2</div>
				<div class="j-type-con-img j-flex-row-center">
					<img src="/resources/img/question/checkBox.png"/>
				</div>
				<div class="j-con-que-name">질문명</div>
			</div>
	   
	    
	    
			<div class="j-que-con-card j-flex-row-center" id="card3">
				<div class="j-corder j-flex-row-center">3</div>
				<div class="j-type-con-img j-flex-row-center">
					<img src="/resources/img/question/checkBox.png"/>
				</div>
				<div class="j-con-que-name">질문명</div>
			</div>
	    </div>
	  </div>
	  
	  <div id="j-con-modal">
	  	<div id="j-con-modal-hader" class="j-flex-row-center">
	  		<div id="j-nextQuestion" class="j-flex-row-center j-con-modal-h-select">
	  			<span>이어지는 질문</span>
	  		</div>
	  		<div id="j-subQuestion" class="j-flex-row-center">
	  			<span>대체 질문 등록</span>
	  		</div>
	  	</div>
	  	<div id="j-con-modal-body">
	  		<div class="j-basic-move">
	  			<div>기본이동</div>
	  			<select class="form-select">
	  				<option value="" disabled>다음질문</option>
	  			</select>
	  		</div>
	  		<div class="j-condition-move">
	  			<div class="j-condition-plus j-flex-row-center">
	  				<span>로직 추가하기</span>
	  				<div class="j-con-plus-button j-flex-row-center">
	  					<span>+</span>
	  				</div>
	  			</div>
	  			<div class="j-condition-content-box">
	  				
	  				<div class="j-condition">
	  					
	  					<div class="j-condition-header j-flex-row-center">
	  						<div class="j-arrow j-flex-row-center">
	  							<img src="/resources/img/question/arrow-up.png">
	  						</div>
	  						<div class="j-con-sur-name">로직 1</div>
	  					</div>
	  					
	  					<div class="j-condition-c">
	  						<div>조건</div>
	  						<input type="text" class="form-control" placeholder="조건 값을 입력해주세요">
	  						<select class="operations form-select">
	  							<option value="" disabled="disabled">조건</option>
	  						</select>
	  						<div>결과</div>
	  						<select class="next-ques form-select">
	  							<option value="" disabled="disabled">다음질문</option>
	  						</select>
	  					</div>
	  					
	  				</div>
	  			
	  			</div>
	  		</div>
	  	</div>
	  </div>
</body>

</html>