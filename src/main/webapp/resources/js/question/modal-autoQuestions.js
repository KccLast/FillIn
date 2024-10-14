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
	$('#descriptive-form-list').empty();

	// $('#questions-list').empty();

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
	if ($('#descriptive-form').is(':checked')) {
		const descriptiveCount = parseInt($('#descriptive-form-count').val(), 10);

		requestData[0].questions.push({
			questionType: $('#descriptive-form-label').text(),
			count: descriptiveCount

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
			let descriptiveFormCount = 1;

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
						case 'descriptive_form':
							if ($('#descriptive-form').is(':checked')) {
								questions += createQuestionSection(
									descriptiveFormCount++,
									question.question,
									optionsCount,
									`descriptive-form-question-${descriptiveFormCount}`,
									false,
									question.description,
									question.options,
									question.type
								);
								$('#descriptive-form-list').append(questions);
							}
							break;
					}
				});

				// 모달 열기
				const questionsModal = new bootstrap.Modal($('#questions-modal')[0]);
				questionsModal.show();

				// 질문 접기/펼치기 기능
				$('.question-toggle').off('click').on('click', function(e) {
					if($(e.target).is('.question-select')) {
						return;
					}
					const $content = $(this).next('.question-content');
					console.log('현재 상태:', $content.length ? $content.css('display') : '요소 없음');
					$content.toggle();
				});
				
				// 선택한 질문지 추가
				
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
	let section = `<div class="question-section">`;
	section += `<div>
					
				</div>`;
	section += `<h6 class="question-toggle">
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
					<input type="radio" id="${name}-${optionIndex}" name="${name} value="${option}">
					<label for="${name}-${optionIndex}"> ${option}</label>
				</div>`;
			} else {
				// 체크박스일 경우 체크박스로 생성
				section += `<div>
					<input type="checkbox" id="${name}-${optionIndex}" name="${name}">
					<label for="${name}-${optionIndex}"> ${option}</label>
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

	section += `</div>`;
	return section;
}