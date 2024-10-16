// 선택된 체크 박스의 select-box 동적으로 생성
function toggleSelectBox(checkbox, selectId) {
	const $selectBox = $('#' + selectId);
	$selectBox.css('display', checkbox.checked ? 'inline-block' : 'none');
}

// 추천 질문 모달창
function showQuestionsModal() {
	$('#multiple-choice-list').empty();
	$('#checkbox-list').empty();
	$('#short-answer-list').empty();
	$('#long-answer-list').empty();

	const requestData = [
		{
			description: $('#survey-description').val(),
			questions: []
		}
	];

	// 객관식 질문 처리
	if ($('#multiple-choice').is(':checked')) {
		const multipleChoiceCount = parseInt($('#multiple-choice-count').val(), 10);

		requestData[0].questions.push({
			questionType: $('#multiple-choice-label').text(),
			count: multipleChoiceCount

		})
	}

	// 체크박스 질문 처리
	if ($('#check-box').is(':checked')) {
		const checkBoxCount = parseInt($('#check-box-count').val(), 10);

		requestData[0].questions.push({
			questionType: $('#check-box-label').text(),
			count: checkBoxCount

		})
	}

	// 단답형 질문 처리
	if ($('#short-answer').is(':checked')) {
		const shortAnswerCount = parseInt($('#short-answer-count').val(), 10);

		requestData[0].questions.push({
			questionType: $('#short-answer-label').text(),
			count: shortAnswerCount

		})
	}

	// 주관식 질문 처리
	if ($('#long-answer').is(':checked')) {
		const longAnswerCount = parseInt($('#long-answer-count').val(), 10);

		requestData[0].questions.push({
			questionType: $('#long-answer-label').text(),
			count: longAnswerCount

		})
	}

	$.ajax({
		url: '/api/question/make-auto-question',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(requestData),
		success: function(response) {
			console.log(JSON.stringify(requestData));
			console.log('서버 응답:', response);

			let jsonData = response.data;

			// 서버 응답이 문자열인 경우 JSON 파싱
			if (typeof jsonData === 'string') {
				// 백틱 제거
				jsonData = jsonData.replace(/```json/g, '').replace(/```/g, '').trim();

				try {
					jsonData = JSON.parse(jsonData);
				} catch (e) {
					console.log('응답 JSON 파싱 오류: ', e);
					return;
				}
			}

			console.log('파싱된 응답 데이터: ', jsonData);

			let multipleChoiceCount = 1;
			let checkboxCount = 1;
			let shortAnswerCount = 1;
			let longAnswerCount = 1;

			// 응답이 기대하는 형식인지 확인 후 질문 목록 생성
			if (jsonData && Array.isArray(jsonData.questions)) {
				jsonData.questions.forEach(function(question, index) {
					let questions = '';
					// 옵션이 없을 경우 기본 값: 0
					let optionsCount = question.options ? question.options.length : 0;

					// 질문 타입에 맞게 각 섹션에 질문 추가
					switch (question.type) {
						case 'multiple_choice':
							if ($('#multiple-choice').is(':checked')) {
								questions += createQuestionSection(
									multipleChoiceCount++,
									question.question,
									optionsCount,
									`multiple-choice-question-${multipleChoiceCount}`,
									false,
									question.description,
									question.options,
									question.type
								);
								$('#multiple-choice-list').append(questions);
							}
							break;
						case 'checkbox':
							if ($('#check-box').is(':checked')) {
								questions += createQuestionSection(
									checkboxCount++,
									question.question,
									optionsCount,
									`checkbox-question-${checkboxCount}`,
									false,
									question.description,
									question.options,
									question.type
								);
								$('#checkbox-list').append(questions);
							}
							break;
						case 'short_answer':
							if ($('#short-answer').is(':checked')) {
								questions += createQuestionSection(
									shortAnswerCount++,
									question.question,
									optionsCount,
									`short-answer-question-${shortAnswerCount}`,
									false,
									question.description,
									question.options,
									question.type
								);
								$('#short-answer-list').append(questions);
							}
							break;
						case 'long_answer':
							if ($('#long-answer').is(':checked')) {
								questions += createQuestionSection(
									longAnswerCount++,
									question.question,
									optionsCount,
									`long-answer-question-${longAnswerCount}`,
									false,
									question.description,
									question.options,
									question.type
								);
								$('#long-answer-list').append(questions);
							}
							break;
					}
				});

				// 모달 열기
				const questionsModal = new bootstrap.Modal($('#questions-modal')[0]);
				questionsModal.show();

				// 질문 접기/펼치기 기능
				$('.question-toggle').off('click').on('click', function(e) {
					if ($(e.target).is('.question-select')) {
						return;
					}
					const $content = $(this).next('.question-content');
					console.log('현재 상태:', $content.length ? $content.css('display') : '요소 없음');
					$content.toggle();
				});
			} else {
				console.error('질문 목록이 없거나 형식이 잘못되었습니다.');
			}
		},
		error: function(xhr, status, error) {
			console.error('에러 발생: ' + xhr.responseText);
		}
	});
}

// 질문 섹션 생성 함수
function createQuestionSection(index, title, count, name, isHidden = false, description = '', options = [], type) {
	let section = `<div class="select-question-section" data-question-type="${type}">`;

	// 질문 그룹의 "전체 선택" 체크박스 추가
	if (index === 1) {
		section += `<div>
	                    <input type="checkbox" id="select-all-${type}" class="select-all-checkbox" data-type="${type}">
	                    <label for="select-all-${type}">전체 선택</label>
                	</div>`;
	}

	section += `<h6 class="question-toggle" id="toggle-${name}">
                    <input type="checkbox" id="${name}-select" class="question-select" data-title="${title}" data-count="${count}">
                    ${index}. ${title}
                </h6>`;
	section += `<div class="question-content" style="${isHidden ? 'display:none;' : ''}">`;
	section += `<p>${description}</p>`;

	if (options && options.length > 0) {
		options.forEach((option, optionIndex) => {
			// 객관식인 경우 라디오 버튼으로 생성
			if (type === 'multiple_choice') {
				section += `<div>
                    <input type="radio" id="${name}-${optionIndex}" name="${name}" value="${option}">
                    <label for="${name}-${optionIndex}">${option}</label>
                </div>`;
			} else {
				// 체크박스일 경우 체크박스로 생성
				section += `<div>
                    <input type="checkbox" id="${name}-${optionIndex}" name="${name}" class="${name}-option">
                    <label for="${name}-${optionIndex}">${option}</label>
                </div>`;
			}
		});
	} else {
		// 옵션이 없는 경우 텍스트 입력 필드로 생성
		for (let i = 0; i < count; i++) {
			section += `<div>
                <input type="text" placeholder="답변을 입력해주세요." id="${name}-text-${i}" name="${name}">
            </div>`;
		}
	}

	section += `</div>`; // question-content 끝
	section += `</div>`; // select-question-section 끝

	// 모두 선택 체크박스 이벤트 리스너 추가
	//section += addSelectAllListener(name, type);




	return section;
}

document.addEventListener('click', function(event) {
	if (event.target.matches('.select-all-checkbox')) {
		const type = event.target.getAttribute('data-question-type');
		const subQuestions = document.querySelectorAll(`.question-select[data-question-type="${type}"]`);

		subQuestions.forEach(questionCheckbox => {
			questionCheckbox.checked = event.target.checked;
		});
	}
});

/*function addSelectAllListener(name, type) {
	return `<script>
		document.getElementById('select-all-${type}').addEventListener('change', function() {
			const subQuestions = document.querySelectorAll('.question-select[data-type="${type}"]');
			subQuestions.forEach(questionCheckbox => {
				questionCheckbox.checked = this.checked;
			});
		});
	</script>`;
}
*/
$(document).ready(function() {
	// 전체 선택 버튼 클릭
	// 전체 선택 체크박스가 동적으로 생성되어 직접 바인딩하기 보다는 이벤트 위임 사용
	// on() 메소드를 사용할 때, 이벤트 위임 방식을 사용하여 기존의 상위 요소에 이벤트를 걸기
	$(document).on('click', '.select-all-checkbox', function() {
		const questionType = $(this).data('type');
		const isChecked = $(this).is(':checked');

		$(`.select-question-section[data-question-type="${questionType}"] .question-select`).each(function() {
			$(this).prop('checked', isChecked);
		});
	});

	$(document).on('click', '.question-select', function() {
		const questionType = $(this).closest('.select-question-section').data('question-type');
		const allChecked = $(`.select-question-section[data-question-type="${questionType}"] .question-select`).length ===
			$(`.select-question-section[data-question-type="${questionType}"] .question-select:checked`).length;

		// 하위 질문 중 하나라도 해제되면 젠체 선택 체크박스도 해제
		$(`.select-all-checkbox[data-type="${questionType}"]`).prop('checked', allChecked);
	});


	// 선택한 질문지 추가
	$('#add-questions-btn').off('click').on('click', function() {
		const addedQuestions = [];
		$('.select-question-section').each(function() {
			const checkbox = $(this).find('.question-select');

			// 체크박스가 선택되지 않았으면 다음으로 넘어감
			if (!checkbox.is(':checked')) {
				return;
			}

			const title = $(this).find('.question-select').data('title');
			const questionToggleId = checkbox.attr('id');

			if (!questionToggleId) {
				console.error('ID 속성이 없습니다. 올바르게 설정되어 있는지 확인하세요.');
				return;
			}
			const type = questionToggleId.split('-question')[0];
			console.log('title, type: ' + title + ' / ' + type);

			addedQuestions.push({ title, type })
			let que = JSON.stringify(addedQuestions);
			console.log('addedQuestions: ' + que);

			// 추가된 질문 목록 업데이트
			// 질문 그룹화
			const groupedQuestions = {};
			addedQuestions.forEach(function(question) {
				// 타입 별로 그룹화
				if (!groupedQuestions[question.type]) {
					groupedQuestions[question.type] = [];
				}
				groupedQuestions[question.type].push(question.title);
			});

			const questionListContainer = $('.select-add-questions');
			questionListContainer.html('<p>추가된 질문 목록</p>');

			// 그룹별로 출력
			for (const type in groupedQuestions) {
				if (groupedQuestions.hasOwnProperty(type)) {
					// 타입 제목 추가
					questionListContainer.append(`<p>[${type}]</p>`);

					groupedQuestions[type].forEach(function(title, index) {
						// 해당 그룹 내의 마지막 질문 인덱스 계산
						const isLastItem = index === groupedQuestions[type].length - 1;
						const marginStyle = isLastItem ? 'style="margin-bottom: 10px;"' : '';

						questionListContainer.append(
							`<div ${marginStyle}>
								<label>
									<input type="checkbox" class="added-question-checkbox">
									${title}
								</label>
							</div>`
						);
					});
				}
			}

			// 모두 선택 체크박스 처리
			$('.select-all-checkbox').off('click').on('click', function() {
				const isChecked = $(this).is(':checked');
				const questionType = $(this).data('type');

				$(`.select-question-section[data-question-type="${questionType}"] .question-select`).each(function() {
					$(this).prop('checked', isChecked);
				});
			});

			$('#questions-modal').modal('hide');

		});
	});
});