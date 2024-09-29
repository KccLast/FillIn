<%@ page contentType="text/html;charset=UTF-8" language="java" %>

	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<title>Title</title>
		<link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
		<link rel="stylesheet" type="text/css" href="/resources/css/question/questionNav.css">
		<link rel="stylesheet" type="text/css" href="/resources/css/question/question.css">
		<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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

				//옵션 추가하기 버튼 
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

			})

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
		</script>
	</head>

	<body>
		<%@include file="/resources/common/header.jsp" %>
			<%-- <%@ include file="/resources/common/miniNav.jsp" %> --%>
				<%@ include file="/resources/common/nav.jsp" %>

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
								<input class="j-survey-name-input" type="text" placeholder="질문명을 작성해주세요">
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
											<input type="text" placeholder="옵션 입력란">
											<input type="radio">
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
								<input class="j-survey-name-input" type="text" placeholder="질문명을 작성해주세요">
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
								<input class="j-survey-name-input" type="text" placeholder="질문명을 작성해주세요">
							</div>
							<div class="j-survey-content">
								<textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
							</div>
							<div class="j-question-content-box">
								<!-- 서술형 -->
								<div class="j-long-box j-flex-row-center">
									<div class="j-long-inputBox j-flex-row-center">
										<textarea class="j-long-input" placeholder="&#13;&#10;서술형은 500자 제한입니다."></textarea>
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
								<input class="j-survey-name-input" type="text" placeholder="질문명을 작성해주세요">
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
											<input type="text" placeholder="옵션 입력란">
											<input type="checkbox">
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
								<input class="j-survey-name-input" type="text" placeholder="질문명을 작성해주세요">
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
											<span>1</span>
											<span>2</span>
											<span>3</span>
											<span>4</span>
											<span>5</span>
										</div>
									</div>
									<div class="j-number-range j-flex-row-center">
										<select class="j-num-start">
											<option>0</option>
											<option>1</option>
										</select>
										<span> --- </span>
										<select class="j-num-end">
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
								<input class="j-survey-name-input" type="text" placeholder="질문명을 작성해주세요">
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
										<div class="j-dropdwon-text">
											옵션을 수정하기
										</div>
									</div>

								</div>
								<!-- 드롭다운 -->
							</div>
						</div>

					</div>

					<!-- 모달 창 -->
					<div id="optionModal" class="modifiy-modal">
						<div class="modal-content">
							<div class="modal-header">
								<span class="close">&times;</span>
								<h2>옵션 추가</h2>
							</div>
							<div class="modal-body">
								<p>옵션을 입력하고 엔터로 구분해주세요:</p>
								<textarea id="optionTextarea" rows="5" cols="50" style="resize:none;"
									placeholder="옵션1&#10;옵션2&#10;옵션3"></textarea>
								<button id="addOptionsBtn">옵션 추가</button>
							</div>
						</div>
					</div>
	</body>

	</html>