// 선택된 체크 박스의 select-box 동적으로 생성
function toggleSelectBox(checkbox, selectId) {
	const $selectBox = $('#' + selectId);
	$selectBox.css('display', checkbox.checked ? 'inline-block' : 'none');
}

// 추천 질문 모달창
function showQuestionsModal() {
	$('#questions-list').empty();
	let questions = "";

	// 객관식 질문 처리
	if ($('#multiple-choice').is(':checked')) {
		const multipleChoiceCount = $('#multiple-choice-count').val();
		questions += createQuestionSection('객관식', multipleChoiceCount, 'mc-question');
	}

	// 체크박스 질문 처리
	if ($('#check-box').is(':checked')) {
		const checkBoxCount = $('#check-box-count').val();
		questions += createQuestionSection('체크박스', checkBoxCount, 'cb-question', true);
	}

	// 단답형 질문 처리
	if ($('#short-answer').is(':checked')) {
		const shortAnswerCount = $('#short-answer-count').val();
		questions += createQuestionSection('단답형', shortAnswerCount, 'sa-question', true);
	}

	// 주관식 질문 처리
	if ($('#descriptive-form').is(':checked')) {
		const descriptiveCount = $('#descriptive-form-count').val();
		questions += createQuestionSection('주관식', descriptiveCount, 'df-question', true);
	}

	// 질문 목록을 모달에 추가
	$('#questions-list').append(questions);

	// 두 번째 모달 열기
	const questionsModal = new bootstrap.Modal($('#questions-modal')[0]);
	questionsModal.show();

	// 질문 접기/펼치기 기능
	$('.question-toggle').off('click').on('click', function() {
		const $content = $(this).next('.question-content'); // siblings 사용
		console.log('현재 상태:', $content.length ? $content.css('display') : '요소 없음');
		$content.toggle(); // 개별적으로 토글
	});
}

// 질문 섹션 생성 함수
function createQuestionSection(title, count, name, isHidden = false) {
	let section = `<h6 class="question-toggle">${title}</h6>`;
	section += `<div class="question-content" style="${isHidden ? 'display:none;' : ''}">`;

	for (let i = 1; i <= count; i++) {
		section += `<div><input type="checkbox" id="${name}-${i}" name="${name}">${i}번째 ${title} 질문</div>`;
	}

	section += `</div>`;
	return section;
}
