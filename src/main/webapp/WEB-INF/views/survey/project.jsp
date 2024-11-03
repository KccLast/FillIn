<%@ page contentType="text/html;charset=UTF-8" language="java" %>
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<title>Title</title>
		<link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
		<link rel="stylesheet" type="text/css" href="/resources/css/question/questionNav.css">
		<link rel="stylesheet" type="text/css" href="/resources/css/question/question.css">
		<link rel="stylesheet" type="text/css" href="/resources/css/question/condition.css">
		<link rel="stylesheet" type="text/css" href="/resources/css/question/questionDragAndDrop.css">
		<link rel="stylesheet" type="text/css" href="/resources/css/survey/post.css">
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.15.6/js/jsplumb.min.js"></script> -->
		<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
		<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
		<script type="text/javascript"
			src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f7372f613dea5dbd8f49b7be0a73bbb8"></script>

		<script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js"></script>

		<script src="/resources/js/question/questionDragAndDrop.js"></script>
		<script src="/resources/js/question/questionIUD.js"></script>
		<script src="/resources/js/question/questionEvent.js"></script>
		<script src="/resources/js/question/questionParse.js"></script>
		<script src="/resources/js/question/condition.js"></script>
		<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
		<script src="/resources/common/nav.js"></script>
		<script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
			integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
			crossorigin="anonymous"></script>
		<script>
			Kakao.init('127ec225729d485fc260cc987bda87a9'); // 사용하려는 앱의 JavaScript 키 입력
		</script>
		<script>
			var surveyJson = '${surveyJson}';
		</script>
		<script type="text/javascript">


			$(function () {

				let surveyName = "${survey.name}";
				updateSurveyName(surveyName);

				$('.content').on('keyup', '.j-survey-name-input', async function () {
					let idx = $(this).parent().parent().index();
					$('.j-question-list').find('.j-question').eq(idx).find('.question-name > span').html($(this).val());
					let nameVal = $(this).val();
					changeNodeName(idx, nameVal);
				})
				let survey = '${surveyJson}';

				parseJson(survey);
				parseCondition(survey);
				var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
				var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
					return new bootstrap.Tooltip(tooltipTriggerEl)
				})
				updateButton();
			})
		</script>

	</head>

	<body>
		<div class="loading-box">
			<span class="loader"></span>
		</div>
		<input type="hidden" id="surveySeq" value="${survey.seq}" />
		<%@include file="/resources/common/header.jsp" %>
			<%-- <%@ include file="/resources/common/miniNav.jsp" %> --%>
				<%@ include file="/resources/common/nav.jsp" %>
					<div id="j-question-nav">
						<!-- <div class="j-questionNav-tab-Box j-flex-row-center">
							<div class="j-question-nav-tab j-question-nav-color">
								질문 상세
							</div>
							<div class="j-deploy-nav-tab">
								게시 정보
							</div>
						</div> -->
						<div class="j-question-box">
							<div class="j-total-question-box j-flex-row-center">
								<div class="nameAndCnt">
									<span class="fw-bold">전체문항수</span>
									<div class="j-ai-img fw-bold fs-6">AI</div>
								</div>
								<div class="aiImgBox">
									<img src="/resources/img/question/ai.png" />
								</div>
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
						<div class="j-nav-button-box j-flex-row-center">
							<!-- <input type="button" value="저장" class="j-nav-input-button j-nav-save-button fs-6 btn"> -->
							<button class="btn btn-primary j-nav-input-button j-nav-save-button fs-6"><span
									class="button-text">저장</span></button>
							<!-- <input type="button" value="게시" class="j-nav-input-button j-depoly-button  fs-6 btn"> -->
							<button type="button" id="postButton"
								class="btn btn-primary j-nav-input-button j-depoly-button fs-6 fw-bold" data-bs-toggle="modal"
								data-bs-target="#postModal" style="display: none;">게시
							</button>

							<!-- <button type="button" id="postButton"
								class="btn btn-primary j-nav-input-button j-depoly-button fs-6 fw-bold" data-bs-toggle="modal"
								data-bs-target="#postModal">게시
							</button> -->
							<!-- 공유 버튼 -->
							<button type="button" id="shareButton"
								class="btn btn-primary j-nav-input-button j-share-button fs-6 fw-bold" data-bs-toggle="modal"
								data-bs-target="#shareModal" style="display: none;">공유
							</button>
							<!-- <input type="button" value="질문 고급조건" class="j-nav-input-button j-condition-button j-con-btn fs-6 btn"> -->
							<!-- <button class="btn btn-primary j-nav-input-button j-condition-button j-con-btn fs-6">응답 로직</button> -->
						</div>
					</div>
					<div class="j-deploy-box">
					</div>
					<img class="j-arrow-content j-arrow-right" src="/resources/img/question/arrow-right.png">
					<div class="j-progress-wrap j-flex-row-center">
						<div class="j-fix-pro j-flex-col-center j-pro-style j-pro-selected">
							<img src="/resources/img/question/edit-blue.png">
							<div>질문 편집</div>
						</div>
						<div class="j-pro-line"></div>
						<div class="j-con-pro j-flex-col-center j-pro-style">
							<img src="/resources/img/question/con-gray.png">
							<div>질문 흐름</div>
						</div>
					</div>
					<div class="content">

					</div>
					<!-- Post Modal -->
					<div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-lg modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title fw-bold ms-0" id="postModalLabel">게시 설정</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<!-- 설문기간 -->
									<div class="mb-4">
										<label class="form-label fw-bold c-main">설문기간</label>
										<div class="d-flex">
											<input type="date" class="form-control" id="startDate">
											<span class="mx-3">—</span>
											<input type="date" class="form-control" id="endDate">
										</div>
									</div>
									<!-- 목표 설정 -->
									<div>
										<label class="form-label fw-bold c-main">목표 설정</label>
										<div class="border p-3 rounded">
											<div class="row mb-3">
												<div class="col">
													<label class="form-label">예상 모집단</label>
													<input type="text" class="form-control" id="populationEstimate" placeholder="모집단 입력">
												</div>
												<div class="col">
													<label class="form-label">표본 집단</label>
													<input type="text" class="form-control" id="sampleSize" placeholder="집단 입력" disabled readonly>
												</div>
												<div class="col">
													<label class="form-label">신뢰도</label>
													<select class="form-select" id="confidenceLevel">
														<option>90%</option>
														<option>95%</option>
														<option>99%</option>
													</select>
												</div>
												<div class="col">
													<label class="form-label">표본오차</label>
													<select class="form-select" id="marginOfError">
														<option>±3%</option>
														<option>±5%</option>
														<option>±10%</option>
													</select>
												</div>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="checkbox" id="estimateCheck">
												<label class="form-check-label" for="estimateCheck">모집단 추정불가</label>
											</div>
											<div class="text-end mt-2">
												<button type="button" class="btn btn-primary" id="applyButton">적용</button>
											</div>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary fw-bold" data-bs-dismiss="modal">취소</button>
									<button type="button" class="btn btn-primary" id="confirmPost">게시</button>
								</div>
							</div>
						</div>
					</div>
					<!-- Share Modal -->
					<div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-lg modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title fw-bold ms-0" id="shareModalLabel">설문링크</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<label class="form-label fw-bold c-main">설문링크</label>
									<div class="input-group border p-3 rounded">
										<input type="text" class="form-control" id="surveyLink" readonly>
										<button class="btn btn-outline-secondary" id="copyButton" onclick="copyLink()">
											<i class="bi bi-copy"></i> <!-- 복사 아이콘 -->
										</button>
										<a type="button" class="btn btn-outline-secondary" id="shareButtonInModal"
											href="javascript:shareMessage()">
											<i class="bi bi-share"></i> <!-- 공유 아이콘 -->
										</a>
									</div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-primary fw-bold" data-bs-dismiss="modal">확인</button>
								</div>
							</div>
						</div>
					</div>
					<!-- 모달 창 -->
					<div id="optionModal" class="modifiy-modal">
						<div class="modal-content">
							<div class="modal-header">
								<span class="add-type-modal-close modal-close close">&times;</span>
							</div>
							<div class="modal-body j-flex-col-center">
								<div class="form-floating">
									<textarea id="optionTextarea" class="form-control" placeholder="" id="floatingTextarea2"
										style="height: 180px" rows="5" cols="50" style="resize: none !important;"
										placeholder="옵션1&#10;옵션2&#10;옵션3"></textarea>
									<label for="floatingTextarea2" class="j-drop-comment">옵션을 엔터로 구분해서 넣어주세요</label>
								</div>
							</div>
							<div class="modal-btn">
								<button id="addOptionsBtn" type="button" class="btn btn-primary">옵션 저장</button>
							</div>
						</div>
					</div>
					<!-- check Box 모달 -->
					<!-- chart 모달창 -->
					<div id="preview-modal" class="modifiy-modal" style="display: none;">
						<div class="preview-modal-content">
							<span class="preview-modal-close fs-6">
								&times;
							</span>
							<!-- <div class="fs-4">표 미리보기</div> -->
							<div id="preview-table-container"></div>
						</div>
					</div>
					<!-- chart 모달창 -->
					<!-- add type 모달창 -->
					<div id="add-type-modal" class="add-type-modal-class">
						<div class="add-type-modal-content">
							<span class="add-type-modal-close modal-close">&times;</span>
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
					<div class="j-condition-box j-flex-row-center">
						<img class="j-arrow-content j-arrow-left" src="/resources/img/question/arrow-left.png">
						<!-- 고정된 노드처럼 보이게 하는 HTML 요소 -->
						<div id="fixedNode" class="fixed-node">
							<button class="btn btn-primary">조건 접기</button>
						</div>

						<div id="node-info=box" class="node-info-box">
							<div class="node-info default-info j-flex-col-center">
								<img src="/resources/img/question/defaultLine.png">
								<div class="fw-bold">
									기본 흐름
								</div>
							</div>
							<div class="node-info condition-info j-flex-col-center">
								<img src="/resources/img/question/conditionLine.png">
								<div class="fw-bold">
									조건부 흐름
								</div>
							</div>
						</div>

						<div class="j-condition-card-container" id="conditionCardCon">
						</div>
						<div class="condition-nav-box">
							<input type="hidden" name="questionSeq">
							<div class="condition-nav-1">
								<div class="nav-top j-flex-row-center">
									<!-- <div class="top-basic condition-nav-1-top condition-nav-1-selected">
										기본 이동
									</div> -->
									<div class="top-condition condition-nav-1-top j-flex-row-center">
										<span>조건별 이동</span>
										<div class="icon-div">
											<i class="bi bi-info-circle coninfo" data-bs-toggle="tooltip" data-bs-placement="top" title="
											조건별 이동을 통해 응답에 따라 이어지는 
												질문을 설정할 수 있습니다."></i>

										</div>
									</div>
								</div>
								<!-- <div class="nav-body-1">
									<div class="basic-move">
										<span class="fs-6">다음 질문</span>
										<select class="form-select"></select>
									</div>
								</div> -->
								<div class="nav-body-2">
									<div class="accordion">
									</div>

								</div>

								<div class="j-condition-plus-img j-flex-row-center">
									<div class="fs-6">조건 추가</div>
									<img src="/resources/img/question/plus-circle-fill-blue.png">
								</div>

							</div>
							<div class="condition-nav-2 j-flex-row-center">
								<div class="cur-con-question-box con-question-box">
									<span class="fw-bold">현재 질문</span>
									<div class="form-floating con-question-input">
										<input type="text" class="form-control" placeholder="name@example.com" value=" " readonly>
										<label for="floatingInput">질문명</label>
									</div>
									<div class="cur-con-question-type con-question-type con-question-input j-flex-row-center">
									</div>
									<!-- <div class="form-floating cur-con-description con-question-description">
										<textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
											readonly> </textarea>
										<label for="floatingTextarea">질문설명</label>
									</div> -->
								</div>
								<div class="next-question-box con-question-box">
									<span class="fw-bold">다음 질문</span>
									<div class="form-floating con-question-input">
										<input type="text" class="form-control" placeholder="name@example.com" value=" " readonly>
										<label for="floatingInput">질문명</label>
									</div>
									<div class="next-con-question-type con-question-type con-question-input j-flex-row-center">
									</div>
									<!-- <div class="form-floating next-con-description con-question-description">
										<textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
											readonly> </textarea>
										<label for="floatingTextarea">질문설명</label>
									</div> -->
								</div>
							</div>
						</div>
					</div>
	</body>

	</html>