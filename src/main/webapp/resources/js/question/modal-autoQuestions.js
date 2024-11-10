// 선택된 체크 박스의 select-box 동적으로 생성
function toggleSelectBox(checkbox, selectId) {
    const $selectBox = $('#' + selectId);
    $selectBox.css('display', checkbox.checked ? 'inline-block' : 'none');
}

// 추천 질문 모달창
function showQuestionsModal() {
    if($('#survey-description').val().length === 0) {
        Swal.fire({
            text: "질문 생성에 필요한 주제나 내용을 입력해 주세요.",
            icon: "warning",
            backdrop: false,
            didClose: () => {
                $('#survey-description').focus();
            }
        });
        return;
    }

    if(!$('.checkbox-item input:checked').length) {
        Swal.fire({
            text: "질문 유형을 하나 이상 선택해 주세요.",
            icon: "warning",
            backdrop: false
        });
        return;
    }

    $('#load').show(); // 로딩 화면 표시
    console.log('로딩 화면 표시됨');

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
            ccSeq: 7, // ccSeq 7 (객관식)
            count: multipleChoiceCount
        });
    }

    // 체크박스 질문 처리
    if ($('#check-box').is(':checked')) {
        const checkBoxCount = parseInt($('#check-box-count').val(), 10);

        requestData[0].questions.push({
            ccSeq: 8, // ccSeq 8 (체크박스)
            count: checkBoxCount
        });
    }

    // 단답형 질문 처리
    if ($('#short-answer').is(':checked')) {
        const shortAnswerCount = parseInt($('#short-answer-count').val(), 10);

        requestData[0].questions.push({
            ccSeq: 12, // ccSeq 12 (단답형)
            count: shortAnswerCount
        });
    }

    // 주관식 질문 처리
    if ($('#long-answer').is(':checked')) {
        const longAnswerCount = parseInt($('#long-answer-count').val(), 10);

        requestData[0].questions.push({
            ccSeq: 13, // ccSeq 13 (장문형)
            count: longAnswerCount
        });
    }

    console.log('requestData: ' + JSON.stringify(requestData));

    $.ajax({
        url: '/api/question/make-auto-question',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData),
        success: function (response) {
            console.log('서버 응답:', response);

            $('#load').hide();

            let jsonData = response.data;

            // 서버 응답이 문자열인 경우 JSON 파싱
            if (typeof jsonData === 'string') {
                // 백틱 제거
                jsonData = jsonData.replace(/```json/g, '').replace(/```/g, '').trim();
                console.log("jsonData =" + jsonData);
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

            // 각 섹션을 숨겨 초기화
            $('#multiple-choice-section').hide();
            $('#checkbox-section').hide();
            $('#short-answer-section').hide();
            $('#long-answer-section').hide();


            // 응답이 기대하는 형식인지 확인 후 질문 목록 생성
            if (jsonData && Array.isArray(jsonData.questions)) {
                jsonData.questions.forEach(function (question, index) {
                    let questions = '';
                    // 옵션이 없을 경우 기본 값: 0
                    let optionsCount = question.options ? question.options.length : 0;

                    // 질문 타입에 맞게 각 섹션에 질문 추가
                    switch (question.ccSeq) {
                        case '7': // 객관식
                            if ($('#multiple-choice').is(':checked')) {
                                questions += createQuestionSection(
                                    index,
                                    multipleChoiceCount++,
                                    question.name,
                                    optionsCount,
                                    `multiple-choice-question-${multipleChoiceCount}`,
                                    false,
                                    question.description,
                                    question.options,
                                    question.ccSeq
                                );
                                $('#multiple-choice-list').append(questions);
                                $('#multiple-choice-section').show();
                            }
                            break;
                        case '8': // 체크박스
                            if ($('#check-box').is(':checked')) {
                                questions += createQuestionSection(
                                    index,
                                    checkboxCount++,
                                    question.name,
                                    optionsCount,
                                    `checkbox-question-${checkboxCount}`,
                                    false,
                                    question.description,
                                    question.options,
                                    question.ccSeq
                                );
                                $('#checkbox-list').append(questions);
                                $('#checkbox-section').show();
                            }
                            break;
                        case '12': // 단답형
                            if ($('#short-answer').is(':checked')) {
                                questions += createQuestionSection(
                                    index,
                                    shortAnswerCount++,
                                    question.name,
                                    optionsCount,
                                    `short-answer-question-${shortAnswerCount}`,
                                    false,
                                    question.description,
                                    question.options,
                                    question.ccSeq
                                );
                                $('#short-answer-list').append(questions);
                                $('#short-answer-section').show();
                            }
                            break;
                        case '13': // 장문형
                            if ($('#long-answer').is(':checked')) {
                                questions += createQuestionSection(
                                    index,
                                    longAnswerCount++,
                                    question.name,
                                    optionsCount,
                                    `long-answer-question-${longAnswerCount}`,
                                    false,
                                    question.description,
                                    question.options,
                                    question.ccSeq
                                );
                                $('#long-answer-list').append(questions);
                                $('#long-answer-section').show();
                            }
                            break;
                    }
                    console.log(questions);
                });

                // 생성된 질문 content show
                $('.first-content').hide();
                $('.second-content').show();

                // 질문 접기/펼치기 기능
                $('.question-content').hide();
                $('.question-toggle').off('click').on('click', function (e) {
                    if ($(e.target).is('.question-select')) {
                        return;
                    }
                    const $content = $(this).next('.question-content');
                    const $arrowDown = $(this).find('.bi-caret-right-fill');
                    const $arrowUp = $(this).find('.bi-caret-down-fill');

                    $content.slideToggle(300, function () {
                        if ($content.is(':visible')) {
                            $arrowDown.hide();
                            $arrowUp.show();
                        } else {
                            $arrowDown.show();
                            $arrowUp.hide();
                        }
                    });
                });
            } else {
                console.error('질문 목록이 없거나 형식이 잘못되었습니다.');
            }
        },
        error: function (xhr, status, error) {
            $('#load').hide();
            console.error('에러 발생: ' + xhr.responseText);

        }
    });
}

// 질문 섹션 생성 함수
function createQuestionSection(queIndex, index, title, count, name, isHidden = false, description = '', options, type) {
    let section = `<div class="select-question-section" data-question-type="${type}">`;

    // 질문 그룹의 "전체 선택" 체크박스 추가
    if (index === 1) {
        section += `<div>
	                    <input type="checkbox" id="select-all-${type}" class="select-all-checkbox" data-type="${type}">
	                    <label for="select-all-${type}" class="my-2">전체 선택</label>
                	</div>`;
    }

    section += `<h6 class="question-toggle" id="toggle-${name}">
                    <input type="checkbox" id="${name}-select" class="question-select" data-title="${title}" 
                    	data-count="${count}" value=${queIndex}>
                    ${index}. ${title}
                    <i class="bi bi-caret-right-fill"></i>
                    <i class="bi bi-caret-down-fill" style="display: none;"></i>
                </h6>`;
    section += `<div class="question-content" style="${isHidden ? 'display:none;' : ''}">`;
    section += `<p>${description}</p>`;

    if (options && options.length > 0) {
        options.forEach((option, optionIndex) => {
            // 객관식인 경우 텍스트로 생성
            if (type === '7') {
                section += `<div>${optionIndex + 1}. ${option}</div>`;
            } else {
                // 체크박스일 경우 체크박스로 생성
                section += `<div>${optionIndex + 1}. ${option}</div>`;
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

    return section;
}

// 전체 선택 버튼 클릭
document.addEventListener('click', function (event) {
    if (event.target.matches('.select-all-checkbox')) {
        const type = event.target.getAttribute('data-type');
        const subQuestions = document.querySelectorAll(`.question-select[data-question-type="${type}"]`);

        subQuestions.forEach(questionCheckbox => {
            questionCheckbox.checked = event.target.checked;
        });
    }
});

$(document).ready(function () {
    $.ajax({
        url: '/api/question/get-common-code',
        type: 'GET',
        success: function (commonCode) {
            console.log(commonCode);
            let typeMapping = {
                7: 'multiple-choice',
                8: 'check-box',
                12: 'short-answer',
                13: 'long-answer'
            };

            console.log($('#checkbox-group').length);
            // checkbox-group에 체크박스 동적으로 추가
            let checkboxGroup = $('#checkbox-group');
            $.each(commonCode, function (index, code) {
                console.log('ccSeq:', code.seq, 'name:', code.name); // 각 코드의 ccSeq와 name 확인
                let type = typeMapping[code.seq]; // ccSeq에 맞는 타입 확인
                if (type) {
                    let checkboxHtml = `
                    <div class="checkbox-item d-flex align-items-center">
                        <input type="checkbox" id="${type}" name="${type}" onclick="toggleSelectBox(this, '${type}-count')" />
                        <label for="${type}" id="${type}-label">${code.name}</label>
                        <select class="form-select small-select" id="${type}-count" name="${type}-count" style="display: none;">
                            <option value="1">1개</option>
                            <option value="2">2개</option>
                            <option value="3">3개</option>
                            <option value="5">5개</option>
                            <option value="10">10개</option>
                        </select>
                    </div>
                    `;
                    checkboxGroup.append(checkboxHtml);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('에러 발생: ' + xhr.responseText);
        }
    });

    // 전체 선택 버튼 클릭
    // 전체 선택 체크박스가 동적으로 생성되어 직접 바인딩하기 보다는 이벤트 위임 사용
    // on() 메소드를 사용할 때, 이벤트 위임 방식을 사용하여 기존의 상위 요소에 이벤트를 걸기
    $(document).on('click', '.select-all-checkbox', function () {
        const questionType = $(this).data('type');
        const isChecked = $(this).is(':checked');

        $(`.select-question-section[data-question-type="${questionType}"] .question-select`).each(function () {
            $(this).prop('checked', isChecked);
        });
    });

    $(document).on('click', '.question-select', function () {
        const questionType = $(this)
            .closest('.select-question-section')
            .data('question-type');
        const allChecked =
            $(
                `.select-question-section[data-question-type="${questionType}"] .question-select`
            ).length ===
            $(
                `.select-question-section[data-question-type="${questionType}"] .question-select:checked`
            ).length;

        // 하위 질문 중 하나라도 해제되면 전체 선택 체크박스도 해제
        $(`.select-all-checkbox[data-type="${questionType}"]`).prop(
            'checked',
            allChecked
        );
    });

    let addedQuestions = [];
// 선택한 질문지 추가
    $('#add-questions-btn').on('click', function () {
        let hasChecked = false;

        // 선택된 체크박스가 있는지 확인
        $('.select-question-section').each(function () {
            const checkbox = $(this).find('.question-select');
            if (checkbox.is(':checked')) {
                hasChecked = true;
            }
        });

        if (!hasChecked) {
            Swal.fire({
                type: 'error',
                text: '하나 이상의 질문을 선택해주세요.',
            });
            return;
        }

        $('.select-question-section').each(function () {
            const checkbox = $(this).find('.question-select');
            // 체크박스가 선택되지 않았으면 다음으로 넘어감
            if (!checkbox.is(':checked')) {
                return;
            }

            const title = $(this).find('.question-select').data('title');
            // const dataCount = $(this).find('.question-select').data('count');
            const type = checkbox.attr('id').split('-question')[0];
            console.log('type =' + type);
            const description = $(this).find('.question-content p').text();
            let ccSeq = null;
            let options = [];

            // 타입에 따라 ccSeq 값 설정
            switch (type) {
                case 'multiple-choice':
                    ccSeq = 7; // 객관식
                    break;
                case 'checkbox':
                    ccSeq = 8; // 체크박스
                    break;
                case 'short-answer':
                    ccSeq = 12; // 단답형
                    break;
                case 'long-answer':
                    ccSeq = 13; // 장문형
                    break;
            }

            // 옵션이 있는 경우(객관식, 체크박스)
            if (ccSeq === 7 || ccSeq === 8) {
                // 객관식 또는 체크박스일 경우에만 옵션을 수집
                $(this)
                    .find('.question-content div')
                    .each(function () {
                        // 모든 <div> 선택
                        const optionText = $(this).text().trim(); // div의 텍스트 가져오기

                        // 정규 표현식으로 번호와 점 제거
                        const option = optionText.replace(/^\d+\.\s*/, '');
                        options.push(option); // 텍스트를 options 배열에 추가
                    });
            }

            addedQuestions.push({
                ccSeq: ccSeq,
                name: title,
                description: description,
                options: options.length > 0 ? options : [],
                // dataCount: dataCount
            });
        });

        // 전체 선택 체크박스 처리
        $('.select-all-checkbox')
            .off('click')
            .on('click', function () {
                const isChecked = $(this).is(':checked');
                const questionType = $(this).data('type');

                $(
                    `.select-question-section[data-question-type="${questionType}"] .question-select`
                ).each(function () {
                    $(this).prop('checked', isChecked);
                });
            });
        console.log('#####################');
        console.log(addedQuestions);

        let autoData = {
            seq: $('#surveySeq').val(),
            questions: addedQuestions,
        };
        $.ajax({
            url: '/api/question/create-survey',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(autoData),
            success: function (response) {
                console.log(response);
                 location.href = response.data;
            },
            error: function (xhr) {
                console.error('Error:', xhr.responseText);
            },
        });

        $('.second-content').hide();
        $('.first-content').show();
        //$('.generated-questions-list-btn').show();
    });

    $('#question-close-btn').on('click', function () {
        $('.second-content').hide();
        $('.first-content').show();
        //$('.generated-questions-list-btn').show();
    });

    // 생성 질문 목록 버튼
    // $('.generated-questions-list-btn').on('click', function () {
    //     $('.first-content').hide();
    //     $('.second-content').show();
    // });

    // 선택된 질문 - 질문지 만드는 페이지로 보내기
    // $('#create-question-btn').on('click', function () {
    //     let questions = [];
    //     let surveyName = '';
    //     surveyNames = $('#survey-name').val().trim();
    //
    //     if (surveyNames.length === 0) {
    //         Swal.fire({
    //             icon: "warning",
    //             text: "설문지 이름을 입력해 주세요.",
    //             backdrop: false
    //         });
    //         return;
    //     }
    //
    //     let aiSurveyObject = {
    //         surveyName: surveyNames
    //     }
    //     $('.added-question-checkbox:checked').each(function () {
    //         const ccSeq = $(this).attr('id').split('-')[1];
    //
    //         const questionData = addedQuestions.find(que => que.ccSeq === parseInt(ccSeq) && que.name === $(this).parent().text().trim());
    //
    //         if (questionData) {
    //             questions.push({
    //                 ccSeq: questionData.ccSeq,
    //                 name: questionData.name,
    //                 description: questionData.description,
    //                 options: questionData.options
    //             });
    //         }
    //     });
    //
    //     console.log('questions: ' + JSON.stringify(questions, null, 2));
    //
    //     aiSurveyObject.questions = questions;
    //     console.log('Request Payload 222: ', JSON.stringify(aiSurveyObject));
    //     $.ajax({
    //         url: '/api/question/create-survey',
    //         type: 'POST',
    //         contentType: 'application/json',
    //         data: JSON.stringify(aiSurveyObject),
    //         success: function (response) {
    //             console.log(response);
    //             location.href = response.data;
    //         },
    //         error: function (xhr) {
    //             console.error('Error:', xhr.responseText);
    //         }
    //     });
    // });

    $('.aiImgBox').click(function (){

    })

});