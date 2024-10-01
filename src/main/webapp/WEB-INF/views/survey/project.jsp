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
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script
	src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f7372f613dea5dbd8f49b7be0a73bbb8"></script>

<script>
			$(function () {
				$('.content').on('click', '.j-question-card', function (e) {
					changeFocus(this);
					this.scrollIntoView({ behavior: 'smooth', block: 'center' });
				})

				$('.j-question-list').on('click', '.j-question', function () {
					let target = $('.content').children().eq($(this).index());
					target[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
					changeFocus(target);
				})

				//필수버튼 클릭이벤트 
				$('.content').on('click', '.j-essential', function () {
					if ($(this).hasClass('j-es-seleted')) {
						$(this).removeClass('j-es-seleted');
					} else {
						$(this).addClass('j-es-seleted');
					}
				})

				//객관식 옵션 추가하기 버튼 
				$('.content').on('click', '.j-option-plus', function () {
					let $prev = $(this).prev();
					let number = $prev.find('.j-option-order').text();
					let next = parseInt(number) + 1;
					let html = '<div class="j-select-optionBox j-flex-row-center">' +
						'<div class="j-option-order">' + next + '</div>' +
						'<div class="j-option-input-radio">' +
						'<input type="text" placeholder="옵션 입력란">' +
						'<input type="checkbox">' +
						'</div>' +
						'<div class="j-xbutton">' +
						'<img src="/resources/img/question/x-circle.png">' +
						'</div></div>';
					$prev.after(html);
				})

				
				//옵션 삭제 order 다시 계산
				$('.content').on('click', '.j-xbutton > img', function () {
					let $parentDiv = $(this).parent().parent();
					if ($parentDiv.index() === 0) {
						return;
					}
					let $higherParent = $parentDiv.parent();
					$(this).parent().parent().remove();
					$higherParent.find('.j-option-order').each(function (idx, el) {
						$(el).text(idx + 1);
					})
				})

				$('.content').on('click', '.j-dropdwon-modifiy', function () {

				})
				
				//모달 바디 클릭하면, 

				// 처음에 숫자 범위 설정
				updateNumberRange();

				// 숫자를 클릭하면 해당 숫자만큼 선을 채우는 이벤트 설정
				$(document).on('click', '.j-number span', function (e) {
					var clickedIndex = $(this).index(); // 클릭된 숫자의 인덱스
					var totalNumbers = $('.j-number span').length - 1; // 전체 숫자의 갯수 (인덱스 기준으로 -1)

					// 선 채우기 업데이트
					updateLine(clickedIndex, totalNumbers);
					e.stopPropagation();
				});

				// start와 end select 변경 시 숫자 범위 업데이트
				$('.j-num-start, .j-num-end').change(function () {
					updateNumberRange();
				});


				/*모달관련*/
				// 모달 열기
				let currentCard;
				$(document).on('click', '.j-dropdwon-modifiy', function () {
					currentCard = $(this).closest('.j-question-card'); // 현재 카드 저장
					currSelect = $(this).prev().find('select > option');
					let mbody='';
					currSelect.each(function(idx,item){
						if(idx >0){
						mbody += $(item).text()+'\n';
						}
					})
					$('.modal-body > textarea').val(mbody);
					
					// 현재 카드의 위치 및 크기 계산
					var cardOffset = currentCard.offset(); // 카드의 화면에서의 위치
					var cardHeight = currentCard.outerHeight(); // 카드의 높이
					var cardWidth = currentCard.outerWidth(); // 카드의 너비

					// 모달의 위치 설정 (카드 중앙에 위치)
					var modal = $('#optionModal');
					var modalHeight = modal.outerHeight();
					var modalWidth = modal.outerWidth();

					// 카드 중앙에 모달을 배치
					modal.css({
						top: cardOffset.top + (cardHeight / 2) - (modalHeight / 2) + 'px', // 카드 중앙 기준
						left: cardOffset.left + (cardWidth / 2) - (modalWidth / 2) + 'px'
					});

					// 모달 표시
					modal.fadeIn();
				});

				// 모달 닫기
				$('.close').click(function () {
					$('#optionModal').fadeOut(); // 모달 숨기기
				});

				// 옵션 추가 버튼 클릭 이벤트
				$('#addOptionsBtn').click(function () {
					var optionsText = $('#optionTextarea').val(); // textarea 값 가져오기
					var options = optionsText.split('\n'); // 줄바꿈으로 구분된 옵션 배열 생성

					// 해당 카드의 select 요소 찾기
					var selectBox = currentCard.find('select');

					// 기존 옵션 초기화
					selectBox.find('option:not([disabled])').remove();

					// 새로운 옵션 추가
					options.forEach(function (option) {
						if (option.trim()) { // 공백은 추가하지 않음
							selectBox.append('<option>' + option.trim() + '</option>');
						}
					});

					// 모달 닫기 및 입력 초기화
					$('#optionModal').fadeOut();
					$('#optionTextarea').val('');
				});
				/*모달 관련*/
			
				/*객관식 표 관련*/
				/*row And col 추가*/
				$('.content').on('click','.j-row-plus-button',function(e){
					/*<input class="j-rowAndcol-input" type="text" placeholder="&nbsp;&nbsp;Row 1">*/
					let $row = $(this).parent().parent().find('.j-row-box');
					let idx = ($row.find('input').length) +1;
					
					let inputHtml = '<div class="j-rowAndcol-input-x-box j-flex-row-center">'+
						            '<input class="j-rowAndcol-input j-row-input" type="text" placeholder="&nbsp;&nbsp;Row '+idx+'">'+
				                    '<button class="j-rowAndcol-input-xbutton">x</button>'+
				                    '</div>';
					$row.append(inputHtml);
					
					updateVerticalLine($(this).parent().parent());
				})
				$('.content').on('click','.j-col-plus-button',function(){
					let $col = $(this).parent().parent().find('.j-col-box');
					let idx = ($col.find('input').length) +1;
			
					let inputHtml = '<div class="j-rowAndcol-input-x-box j-flex-row-center">'+
		            '<input class="j-rowAndcol-input j-col-input" type="text" placeholder="&nbsp;&nbsp;Col '+idx+'">'+
                    '<button class="j-rowAndcol-input-xbutton">x</button>'+
                    '</div>';
					$col.append(inputHtml);
					
					updateVerticalLine($(this).parent().parent());
				})
				
				/*row And col 추가*/
				
				
				/* row And col 삭제 */
				$('.content').on('mouseenter', '.j-rowAndcol-input-x-box', function() {
                
                $(this).find('.j-rowAndcol-input-xbutton').css('display', 'inline-block');
                 });

                $('.content').on('mouseleave', '.j-rowAndcol-input-x-box', function() {
    
                $(this).find('.j-rowAndcol-input-xbutton').css('display', 'none');
                });
                
               
                
                
             // Row의 삭제버튼을 눌렀을 때
                $('.content').on('click', '.j-row-box .j-rowAndcol-input-xbutton', function(){
                    // 해당 row를 삭제
                    if($(this).parent().parent().find('.j-rowAndcol-input-x-box').length === 1){
                    	return;
                    }
                    let $pp = $(this).parent().parent().parent();
                    $(this).parent().remove();

                    // 남아있는 Row들의번호를 다시 계산
                    $('.j-row-box .j-rowAndcol-input').each(function(index){
                        
                        $(this).attr('placeholder', '  Row ' + (index + 1));
                    });
                    updateVerticalLine($pp);
                });

                // Col의 삭제버튼을 눌렀을 때
                $('.content').on('click', '.j-col-box .j-rowAndcol-input-xbutton', function(){
                    // 해당 col을 삭제
                	 if($(this).parent().parent().find('.j-rowAndcol-input-x-box').length === 1){
                     	return;
                     }
                     let $pp = $(this).parent().parent().parent();
                    $(this).parent().remove();

                    // 남아있는 Col들의 placeholder 번호를 다시 계산
                    $('.j-col-box .j-rowAndcol-input').each(function(index){
                      
                        $(this).attr('placeholder', '  Col ' + (index + 1));
                    });
                    updateVerticalLine($pp);
                });
                
                
                /*객관식 표 미리보기*/
                // 미리보기 버튼 클릭 시 모달 띄우기
                let currentCharCard;
                $('.content').on('click','.j-preview-chart',function(){
                	
                	currentCharCard = $(this).closest('.j-question-card'); // 현재 카드 저장
					
					// 현재 카드의 위치 및 크기 계산
					var cardOffset = currentCharCard.offset(); // 카드의 화면에서의 위치
					var cardHeight = currentCharCard.outerHeight(); // 카드의 높이
					var cardWidth = currentCharCard.outerWidth(); // 카드의 너비

					// 모달의 위치 설정 (카드 중앙에 위치)
					var modal = $('#preview-modal');
					var modalHeight = modal.outerHeight();
					var modalWidth = modal.outerWidth();

					// 카드 중앙에 모달을 배치
					modal.css({
						top: cardOffset.top + (cardHeight / 2) - (modalHeight / 2) + 'px', // 카드 중앙 기준
						left: cardOffset.left + (cardWidth / 2) - (modalWidth / 2) + 'px'
					});

					// 모달 표시
					modal.fadeIn(); 	
    
                   // 테이블 미리보기 생성
                  generatePreviewTable(this);
                });

               // 모달 닫기
               $('.preview-modal-close').on('click', function() {
               $('#preview-modal').css('display', 'none');
               });

                /*객관식 표 미리보기*/
                
				/*객관식 표 관련*/
				
				/*위치 가져오기*/
				$('.content').on('click','.j-location',function(){
					getMyPosittion();
				})
})

// 행과 열을 기반으로 테이블 생성
function generatePreviewTable(target) {
				
    let rows = $(target).parent().find('.j-row-input').map(function() { return $(this).val(); }).get(); // 모든 행 이름 가져오기
    let cols = $(target).parent().find('.j-col-input').map(function() { return $(this).val(); }).get(); // 모든 열 이름 가져오기
	
	
    let tableHtml = '<table class="j-chart-table" border="1"><thead><tr><th></th>'; // 테이블 시작
    
    // 열 헤더 생성
    cols.forEach(function(colName) {
        tableHtml += '<th class="j-col-name-th"><span class="j-col-name">'+colName+'<span></th>';
    });
    tableHtml += '</tr></thead><tbody>';

    // 각 행마다 열 생성
    rows.forEach(function(rowName, rowIndex) {
        tableHtml += '<tr><td>'+rowName+'</td>'; // 행 헤더
        
        cols.forEach(function(colName, colIndex) {
            // 라디오 버튼을 각 셀에 추가
            tableHtml += '<td>'+
                    '<input type="radio" name="row'+-rowIndex+'" value="'+rowName+'">'+
                     '</td>';
        });
        tableHtml += '</tr>';
    });
    
    tableHtml += '</tbody></table>'; // 테이블 끝

    // 모달에 테이블 추가
    $('#preview-table-container').html(tableHtml);
   }
			
			
			function updateVerticalLine(target){
			
			 let row = target.find('.j-row-box').outerHeight();
			 let col = target.find('.j-col-box').outerHeight();
			
			 target.find('.j-vertical-line').outerHeight(row > col ? row:col);
			}
			function updateNumberRange() {
				var start = parseInt($('.j-num-start').val()); // 시작 값
				var end = parseInt($('.j-num-end').val()); // 끝 값

				// 숫자 범위 표시 초기화
				$('.j-number').empty();

				// start에서 end까지 span으로 숫자를 동적으로 추가
				for (var i = start; i <= end; i++) {
					$('.j-number').append('<span>' + i + '</span>');
				}

				// 선 초기화
				updateLine(0, end - start); // 첫 클릭 전 초기화
			}

			// 클릭한 숫자에 따라 선 채우기
			function updateLine(clickedIndex, totalNumbers) {
				var percentage = (clickedIndex / totalNumbers) * 100; // 클릭한 비율 계산
				console.log('clickedIndex:', clickedIndex, 'totalNumbers:', totalNumbers, 'percentage:', percentage); // 값 확인용 로그
				$('.j-line').css('background-image', 'linear-gradient(90deg, #005bac ' + percentage + '%, rgba(0, 91, 172, 0.4) ' + percentage + '%)');
			}

			function changeFocus(el) {
				$('.j-question-card').removeClass('j-card-selected');
				$(el).addClass('j-card-selected');
			}
			//주소입력
			 function execDaumPostcode() {
			        new daum.Postcode({
			            oncomplete: function(data) {
			                // 팝업을 통한 검색 결과 항목 클릭 시 실행
			                var addr = ''; // 주소_결과값이 없을 경우 공백 
			                var extraAddr = ''; // 참고항목
			
			                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			                if (data.userSelectedType === 'R') { // 도로명 주소를 선택
			                    addr = data.roadAddress;
			                } else { // 지번 주소를 선택
			                    addr = data.jibunAddress;
			                }
			
			                if(data.userSelectedType === 'R'){
			                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
			                        extraAddr += data.bname;
			                    }
			                    if(data.buildingName !== '' && data.apartment === 'Y'){
			                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			                    }
			                    if(extraAddr !== ''){
			                        extraAddr = ' (' + extraAddr + ')';
			                    }
			                } else {
			                    document.getElementById("UserAdd1").value = '';
			                }
			
			                // 선택된 우편번호와 주소 정보를 input 박스에 넣는다.
			                document.getElementById('zipp_code_id').value = data.zonecode;
			                document.getElementById("UserAdd1").value = addr;
			                document.getElementById("UserAdd1").value += extraAddr;
			                document.getElementById("UserAdd2").focus(); // 우편번호 + 주소 입력이 완료되었음으로 상세주소로 포커스 이동
			            }
			        }).open();
			    }
			//주소입력
		</script>





</head>

<body>
	<%@include file="/resources/common/header.jsp"%>
	<%-- <%@ include file="/resources/common/miniNav.jsp" %> --%>
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
						<img src="/resources/img/question/plus-circle-fill.png" />
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
					<img src="/resources/img/question/plus-square-fill.png">
				</div>
			</div>
		</div>
	</div>
	<div class="content">


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				<!-- 객관식 -->
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/choice.png" />
					<div class="j-tpye-name">객관식</div>
				</div>
				<!-- 객관식  -->
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				<!-- 객관식 -->
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
				<!-- 객관식 -->
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				<!-- 단답형 -->
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/short.png" />
					<div class="j-tpye-name">단답형</div>
				</div>
				<!-- 단답형  -->
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				<!-- 단답형 -->
				<div class="j-short-box j-flex-row-center">
					<div class="j-short-inputBox j-flex-row-center">
						<input type="text" placeholder="단답형은 100자 제한입니다.">
					</div>
				</div>
				<!-- 단답형 -->
			</div>
		</div>



		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				<!-- 서술형  -->
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/long.png" />
					<div class="j-tpye-name">서술형</div>
				</div>
				<!-- 서술형  -->
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				<!-- 서술형 -->
				<div class="j-long-box j-flex-row-center">
					<div class="j-long-inputBox j-flex-row-center">
						<textarea class="j-long-input"
							placeholder="&#13;&#10;서술형은 500자 제한입니다."></textarea>
					</div>
				</div>
				<!-- 서술형 -->
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				<!-- 체크박스 -->
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/checkBox.png" />
					<div class="j-tpye-name">체크박스</div>
				</div>
				<!-- 체크박스  -->
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				<!-- 체크박스 -->
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
				<!-- 체크박스 -->
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				<!-- 선형배율 -->
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/Liner.png" />
					<div class="j-tpye-name">선형</div>
				</div>
				<!-- 선형배율  -->
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				<!-- 선형배율 -->
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
				<!-- 선형배율 -->
			</div>
		</div>



		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				<!-- 드롭다운 -->
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/dropdown.png" />
					<div class="j-tpye-name">드롭다운</div>
				</div>
				<!-- 드롭다운  -->
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				<!-- 드롭다운 -->
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
				<!-- 드롭다운 -->
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				<!-- 객관식표 -->
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/chart.png" />
					<div class="j-tpye-name">객관식표</div>
				</div>
				<!-- 객관식표  -->
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				<!-- 객관식표 -->
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
				<!-- 객관식표 -->
			</div>
		</div>



		<!-- 사용자 식별용  -->

		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				<!-- 주소 -->
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/house.png" />
					<div class="j-tpye-name">주소</div>
				</div>
				<!-- 주소  -->
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				<!-- 주소 -->
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
				<!-- 주소 -->
			</div>
		</div>


		<div class="j-question-card j-flex-col-center">
			<div class="j-survey-es-type j-flex-row-center">
				<button class="j-essential">필수</button>
				<!-- 위치기록 -->
				<div class="j-typeAndImg j-flex-row-center">
					<img src="/resources/img/question/location.png" />
					<div class="j-tpye-name">위치기록</div>
				</div>
				<!-- 위치기록  -->
			</div>
			<div class="j-survey-name">
				<input class="j-survey-name-input" type="text"
					placeholder="질문명을 작성해주세요">
			</div>
			<div class="j-survey-content">
				<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
			</div>
			<div class="j-question-content-box">
				<!-- 위치기록 -->
				<div class="j-map j-flex-col-center">
					<div id="map" class="j-map-container"></div>
					<button class="j-location">위치 가져오기</button>
				</div>
				<!-- 위치기록 -->
			</div>
		</div>

		<!-- 사용자 식별용  -->

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
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/checkBox.png" />
					<div class="j-type-name-modal">체크박스</div>
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/Liner.png" />
					<div class="j-type-name-modal">선형</div>
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/dropdown.png" />
					<div class="j-type-name-modal">드롭다운</div>
					</div>
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/chart.png" />
					<div class="j-type-name-modal">객관식표</div>
				    </div>
				   </div>
				</div>
				<div class="j-qual-box j-flex-col-center">
					<span>Qualitative</span>
					<div class="j-type-box">
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/short.png" />
					<div class="j-type-name-modal">단답형</div>
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/long.png" />
					<div class="j-type-name-modal">주관식</div>
				    </div>
				    
				    
				   </div>
				</div>
				<div class="j-data-box j-flex-col-center">
					<span>Data</span>
					<div class="j-type-box ">
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/choice.png" />
					<div class="j-type-name-modal">전화번호</div>
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/gender.png" />
					<div class="j-type-name-modal">성별</div>
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/location.png" />
					<div class="j-type-name-modal">위치기록</div>
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/house.png" />
					<div class="j-type-name-modal">주소</div>
					</div>
					
					<div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/secu.png" />
					<div class="j-type-name-modal">개인정보동의</div>
				    </div>
				    
				    <div class="j-typeAndImg-modal j-flex-row-center">
					<img src="/resources/img/question/picture.png" />
					<div class="j-type-name-modal">사진</div>
				    </div>
				   </div>
				</div>
			</div>
		</div>
	</div>
	<!-- add type 모달창 -->

</body>

<script>
		
			 var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
			 var options = { //지도를 생성할 때 필요한 기본 옵션
					center: new kakao.maps.LatLng(36.5760, 128.0000), //지도의 중심좌표.
					level: 13 //지도의 레벨(확대, 축소 정도)
				};

			 var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
			
			 
			function getMyPosittion(){
				navigator.geolocation.getCurrentPosition((position) => {
					  createKaKaoMap(position.coords.latitude, position.coords.longitude);
					});
			}
			
			function createKaKaoMap(latitude,longitude){
				 
				 var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
				 var options = { //지도를 생성할 때 필요한 기본 옵션
						center: new kakao.maps.LatLng(36.5760, 128.0000),
						level:3
					};
				
				   
				var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
				
				var moveLatLng = new kakao.maps.LatLng(latitude, longitude);
				map.panTo(moveLatLng);		
					
				
				var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
				// 마커를 생성합니다
				var marker = new kakao.maps.Marker({
				    position: markerPosition
				});

				// 마커가 지도 위에 표시되도록 설정합니다
				marker.setMap(map);
			}
    </script>
</html>