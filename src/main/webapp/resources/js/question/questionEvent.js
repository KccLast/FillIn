var dragInstance;
$(function () {

  /**/
  let moved = false; // 초기 상태 설정

  // .j-que-con-card 클릭 시 모달 열기
  $('.j-que-con-card').on('click', function (e) {
    e.stopPropagation(); // 이벤트 버블링 방지 (바깥 클릭 이벤트와 구분)
    $('.j-que-con-card').removeClass('j-que-con-selectd-card');
    $(this).addClass('j-que-con-selectd-card'); // 클래스 추가
    $('#j-con-modal').css('left', '1300px'); // 모달 이동
    moved = true; // 상태 변경
    e.stopPropagation();
  });

  // 바깥을 클릭하면 모달 닫기
  $(document).on('click', function () {
    if (moved) {
      $('.j-que-con-card').removeClass('j-que-con-selectd-card'); // 클래스 제거
      $('#j-con-modal').css('left', '1650px'); // 원래 위치로 이동
      moved = false; // 상태 초기화
    }
  });



  /**/
  let contentShow = true;
  localStorage.clear();
  if (!localStorage.getItem('updatedQuestionItemList')) {
    localStorage.setItem('updatedQuestionItemList', JSON.stringify([]));
  }
  if (!localStorage.getItem('removeQuestionList')) {
    localStorage.setItem('removeQuestionList', JSON.stringify([]));
  }
  if (!localStorage.getItem('removeQuestionItemList')) {
    localStorage.setItem('removeQuestionItemList', JSON.stringify([]));
  }

  const cards = $('.j-que-con-card'); // 모든 카드 선택
  setCardPositions(cards); // 카드 위치 설정

  //초기 연결 선 설정
  dragInstance = defaultConditionLine();
  $('.j-condition-box').hide();
  $('#j-con-modal').hide();
  //초기 연결 선 설정
  $('.j-con-btn').click(function () {
    if (contentShow) {
      $('.content').hide(); // 숨기기

      $('.j-condition-box').show(); // 보이기
      $('#j-con-modal').show();
      dragInstance.repaintEverything();
    } else {
      $('.content').show(); // 보이기
      $('.j-condition-box').hide(); // 숨기기
      $('#j-con-modal').hide();
    }

    contentShow = !contentShow; // 상태 반전
  });

  //카드 클릭하면 스크롤 정렬 기본 이벤트
  $('.content').on('click', '.j-question-card', function (e) {
    changeFocus(this);
    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  //질문 항목 클릭하면 카드 정렬 이벤트
  $('.j-question-list').on('click', '.j-question', function () {
    let target = $('.content').children().eq($(this).index());
    target[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    changeFocus(target);
  });

  //navbar로 질문 삭제
  //list를 통해 질문 삭제
  $('.j-question-list').on('click', '.j-list-xbutton > img', function () {
    let className = $(this).parent().parent().attr('class');

    // 'j-quorder' 이후 숫자를 추출
    let idx = className.match(/j-quorder(\d+)/);
    idx = idx[1];

    $(this).parent().parent().remove();
    $('.content')
      .find('.j-question-card > .j-q-order')
      .each(function () {
        if ($(this).val() === idx) {
          let seqVal = parseInt($(this).parent().find('.j-qseq').val());
          let deleteQues = { seq: seqVal };

          storeUpdateQuestionItemInLocal(
            deleteQues,
            seqVal,
            'removeQuestionList'
          );
          sendremoveQquestionItemLocalData(
            JSON.parse(localStorage.getItem('removeQuestionItemList'))
          );
          $(this).parent().remove();
        }
      });
  });

  /**새로운 질문 추가하는 모달  */
  $('.j-question-plus-button').click(function () {
    let modal = $('#add-type-modal');
    // 모달이 이미 보이는 상태라면 숨기기
    if (modal.is(':visible')) {
      modal.fadeOut();
      return; // 이미 보이는 상태일 때는 모달을 숨기고 함수 종료
    }
    let buttonOffset = $(this).offset();
    let buttonWidth = $(this).outerWidth();
    let buttonHeight = $(this).outerHeight();

    let modalHeight = modal.outerHeight();
    let modalWidth = modal.outerWidth();

    modal.css({
      position: 'absolute',
      top: buttonOffset.top - buttonHeight / 2 - modalHeight / 4 + 'px', // 카드 중앙 기준
      left: buttonOffset.left + buttonWidth + 'px',
    });

    modal.fadeIn();
    // 모달을 화면에 고정
    modal.css({
      position: 'fixed', // 화면에 고정
      top: modal.offset().top - $(window).scrollTop() + 'px', // 현재 화면에 보이는 위치로 고정
      left: modal.offset().left - $(window).scrollLeft() + 'px',
    });
  });

  // 모달 바깥을 클릭했을 때 모달 숨기기
  $(document).mouseup(function (e) {
    let modal = $('#add-type-modal');
    if (!modal.is(e.target) && modal.has(e.target).length === 0) {
      modal.fadeOut();
    }
  });

  //모달을 통해 질문 생성
  $('#add-type-modal-container').on(
    'click',
    '.j-typeAndImg-modal',
    async function () {
      let ccSeq = $(this).find('input[type="hidden"]').val();

      try {
        // questionFrame.html 불러오기
        let questionData = await fetchQuestionFrame();

        // 새롭게 추가할 고유한 컨테이너 생성
        let $newContainer = $(
          '<div class="j-question-card j-flex-col-center j-new-card"></div>'
        );
        $newContainer.html(questionData); // 불러온 questionFrame.html을 삽입
        $newContainer.append(
          '<input type="hidden" value="' + ccSeq + '" class="j-cseq"/>'
        );
        if (ccSeq === '18') {
          $newContainer.find('.j-survey-name').remove();
          $newContainer.find('.j-survey-content').remove();
        }
        // .content에 동적으로 새 프레임을 추가
        $('.content').append($newContainer);
        let idx = $newContainer.index();
        //질문순서 기입
        $newContainer.find('.j-q-order').val(idx);
        // header 파일 불러오기
        let headerData = await fetchHeader(ccSeq);
        $newContainer.find('.j-survey-es-type').append(headerData);

        // content 파일 불러오기
        let contentData = await fetchContent(ccSeq);
        $newContainer.find('.j-question-content-box').append(contentData);

        // 이미지 src 값을 추출하고 setQuestionNav 호출
        let src = $newContainer.find('.j-typeAndImg > img').attr('src');

        setQuestionNav(idx, src);

        if (ccSeq === '17') {
          $newContainer.find('.j-map-container').attr('id', 'map' + idx);
          setTimeout(() => createDefaultMap('map' + idx), 100);
        }
      } catch (error) {
        console.error('AJAX 요청 실패:', error);
      }
    }
  );

  /**새로운 질문 추가하는 모달  */

  //필수버튼 클릭이벤트
  $('.content').on('click', '.j-essential', function () {
    let card = $(this).parent().parent();
    if (!card.hasClass('j-u-card')) {
      card.addClass('j-u-card');
    }
    let isEssential = $(this).data('essential') === 'N' ? 'Y' : 'N';

    $(this).data('essential', isEssential);

    if ($(this).hasClass('j-es-seleted')) {
      $(this).removeClass('j-es-seleted');
    } else {
      $(this).addClass('j-es-seleted');
    }
  });
  //카드 기본 이벤트

  //객관식 관련 이벤트
  $('.content').on(
    'change',
    'input[type="text"][class*="qi"], select[class*="qi"]',
    function () {
      let classList = $(this).attr('class') || '';
      let match = classList.match(/(\d+)/); // 'qi' 뒤의 숫자 추출

      if (match) {
        let seq = match[1];
        let content = $(this).val(); // 변경된 값 가져오기
        seq = parseInt(seq);
        // 변경된 데이터를 객체로 만듦
        let updatedItem = {
          seq: seq,
          content: content,
          dropdownOptionList: [],
        };
        storeUpdateQuestionItemInLocal(
          updatedItem,
          seq,
          'updatedQuestionItemList'
        );
      }
    }
  );
  //라디오 버튼 눌렀을 때 이벤트
  $('.content').on('click', '.radio-container', function () {
    let $thisRadio = $(this).find('input[type="radio"]');
    let $sibling = $(this).siblings();

    $thisRadio.prop('checked', true);
    $(this).addClass('clicked-radio-css');
    $sibling.removeClass('clicked-radio-css');
  });
  //객관식 옵션 추가하기 버튼
  $('.content').on(
    'click',
    '.j-op-name, .j-option-plus-img',
    async function () {
      let $prev = $(this).parent().prev();
      let number = $prev.find('.j-option-order').text();
      let idx = $prev.parents('.j-question-card').index();
      $prev.parents('.j-question-card').addClass('j-item-u');
      let next = parseInt(number) + 1;
      let parentSeq = $(this).parent().parent().parent().next('.j-cseq').val();
      let html = await fetchQuestionItem(parentSeq);
      await setQiCheckBoxAndRadioName(html, $prev, next, idx);
    }
  );

  //객관식 옵션 삭제 order 다시 계산
  $('.content').on('click', '.j-xbutton > img', function () {
    let $parentDiv = $(this).parent().parent();
    let $higherParent = $parentDiv.parents('.j-select-question-type-box');

    if ($higherParent.children('.j-select-optionBox').length === 1) {
      return;
    }

    let inputBox = $(this).parent().prev().find('.qi');
    let targetSeq = seqExtract(inputBox);
    let questionSeq = $(this).parents('.j-question-card').find('.j-qseq').val();
    questionSeq2 = parseInt(questionSeq);
    let deleteObject = {
      seq: targetSeq,
      questionSeq: questionSeq2,
    };
    storeUpdateQuestionItemInLocal(
      deleteObject,
      targetSeq,
      'removeQuestionItemList'
    );

    $(this).parent().parent().remove();
    $higherParent.find('.j-option-order').each(function (idx, el) {
      $(el).text(idx + 1);
    });
  });
  //객관식 관련 이벤트

  //선형 배율 관련이벤트
  // 숫자를 클릭하면 해당 숫자만큼 선을 채우는 이벤트 설정
  updateNumberRange($('.j-number-range'));
  $('.content').on('click', '.j-number span', function (e) {
    var clickedIndex = $(this).index(); // 클릭된 숫자의 인덱스
    var totalNumbers = $(this).parent().find('span').length - 1; // 전체 숫자의 갯수 (인덱스 기준으로 -1)

    console.log(clickedIndex);
    console.log(totalNumbers);
    // 선 채우기 업데이트
    updateLine($(this).parents('.j-LineAndnumber'), clickedIndex, totalNumbers);
    e.stopPropagation();
  });

  // start와 end select 변경 시 숫자 범위 업데이트
  $('.content').on('change', '.j-num-start, .j-num-end', function () {
    $(this).addClass('j-updated');
    updateNumberRange($(this).parent());
  });
  //선형 배율 관련이벤트

  /*드롭다운 모달관련*/
  // 드롭다운 모달 모달 열기
  let currentCard;
  $(document).on('click', '.j-dropdwon-modifiy', function () {
    currentCard = $(this).closest('.j-question-card'); // 현재 카드 저장
    currSelect = $(this).prev().find('select > option');
    let mbody = '';
    currSelect.each(function (idx, item) {
      if (idx > 0) {
        mbody += $(item).text() + '\n';
      }
    });
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
      top: cardOffset.top + cardHeight / 2 - modalHeight / 2 + 'px', // 카드 중앙 기준
      left: cardOffset.left + cardWidth / 2 - modalWidth / 2 + 'px',
    });

    // 모달 표시
    modal.fadeIn();
  });

  // 드롭다운 모달 닫기
  $('.close').click(function () {
    $('#optionModal').fadeOut(); // 모달 숨기기
  });

  // 드롭다운 모달 옵션 추가 버튼 클릭 이벤트
  $('#addOptionsBtn').click(function () {
    var optionsText = $('#optionTextarea').val(); // textarea 값 가져오기
    var options = optionsText.split('\n'); // 줄바꿈으로 구분된 옵션 배열 생성

    // 해당 카드의 select 요소 찾기
    var selectBox = currentCard.find('select');

    // 기존 옵션 초기화
    selectBox.find('option:not([disabled])').remove();

    // 새로운 옵션 추가
    options.forEach(function (option) {
      if (option.trim()) {
        // 공백은 추가하지 않음
        selectBox.append('<option>' + option.trim() + '</option>');
      }
    });
    //DB에서 불라온 셀렉트 box일 경우
    if (selectBox.hasClass('qiBox')) {
      saveDropDownInStorage(options, currentCard.find('.j-qseq').val());
    }
    // 드롭다운 모달 닫기 및 입력 초기화
    $('#optionModal').fadeOut();
    $('#optionTextarea').val('');
  });
  /*드롭다운 모달 관련*/

  /*객관식 표 관련*/
  /*row And col 추가*/
  $('.content').on('click', '.j-row-plus-button', function (e) {
    $(this).parents('.j-question-card').addClass('j-item-u');
    /*<input class="j-rowAndcol-input" type="text" placeholder="&nbsp;&nbsp;Row 1">*/
    let $row = $(this).parent().parent().find('.j-row-box');
    let idx = $row.find('input').length + 1;

    let inputHtml =
      '<div class="j-rowAndcol-input-x-box j-flex-row-center j-new-checkAndRadio">' +
      '<input class="j-rowAndcol-input j-row-input" type="text" placeholder="&nbsp;&nbsp;Row ' +
      idx +
      '">' +
      '<button class="j-rowAndcol-input-xbutton">x</button>' +
      '</div>';
    $row.append(inputHtml);

    updateVerticalLine($(this).parent().parent());
  });
  $('.content').on('click', '.j-col-plus-button', function () {
    $(this).parents('.j-question-card').addClass('j-item-u');
    let $col = $(this).parent().parent().find('.j-col-box');
    let idx = $col.find('input').length + 1;

    let inputHtml =
      '<div class="j-rowAndcol-input-x-box j-flex-row-center j-new-checkAndRadio">' +
      '<input class="j-rowAndcol-input j-col-input" type="text" placeholder="&nbsp;&nbsp;Col ' +
      idx +
      '">' +
      '<button class="j-rowAndcol-input-xbutton">x</button>' +
      '</div>';
    $col.append(inputHtml);

    updateVerticalLine($(this).parent().parent());
  });

  /*row And col 추가*/

  /* row And col 삭제 */
  $('.content').on('mouseenter', '.j-rowAndcol-input-x-box', function () {
    $(this).find('.j-rowAndcol-input-xbutton').css('display', 'inline-block');
  });

  $('.content').on('mouseleave', '.j-rowAndcol-input-x-box', function () {
    $(this).find('.j-rowAndcol-input-xbutton').css('display', 'none');
  });

  // Row의 삭제버튼을 눌렀을 때
  $('.content').on(
    'click',
    '.j-row-box .j-rowAndcol-input-xbutton',
    function () {
      // 해당 row를 삭제
      if (
        $(this).parent().parent().find('.j-rowAndcol-input-x-box').length === 1
      ) {
        return;
      }

      storeItemChartListInLocal(this);

      let $pp = $(this).parent().parent().parent();
      $(this).parent().remove();

      // 남아있는 Row들의번호를 다시 계산
      $('.j-row-box .j-rowAndcol-input').each(function (index) {
        $(this).attr('placeholder', '  Row ' + (index + 1));
      });
      updateVerticalLine($pp);
    }
  );

  // Col의 삭제버튼을 눌렀을 때
  $('.content').on(
    'click',
    '.j-col-box .j-rowAndcol-input-xbutton',
    function () {
      // 해당 col을 삭제
      if (
        $(this).parent().parent().find('.j-rowAndcol-input-x-box').length === 1
      ) {
        return;
      }
      storeItemChartListInLocal(this);
      let $pp = $(this).parent().parent().parent();
      $(this).parent().remove();

      // 남아있는 Col들의 placeholder 번호를 다시 계산
      $('.j-col-box .j-rowAndcol-input').each(function (index) {
        $(this).attr('placeholder', '  Col ' + (index + 1));
      });
      updateVerticalLine($pp);
    }
  );

  /*객관식 표 미리보기*/
  // 미리보기 버튼 클릭 시 모달 띄우기
  let currentCharCard;
  $('.content').on('click', '.j-preview-chart', function () {
    currentCharCard = $(this).closest('.j-question-card'); // 현재 카드 저장

    // 현재 카드의 위치 및 크기 계산
    let cardOffset = currentCharCard.offset(); // 카드의 화면에서의 위치
    let cardHeight = currentCharCard.outerHeight(); // 카드의 높이
    let cardWidth = currentCharCard.outerWidth(); // 카드의 너비

    // 모달의 위치 설정 (카드 중앙에 위치)
    let modal = $('#preview-modal');
    let modalHeight = modal.outerHeight();
    let modalWidth = modal.outerWidth();

    // 카드 중앙에 모달을 배치
    modal.css({
      top: cardOffset.top + cardHeight / 2 - modalHeight / 2 + 'px', // 카드 중앙 기준
      left: cardOffset.left + cardWidth / 2 - modalWidth / 2 + 'px',
    });

    // 모달 표시
    modal.fadeIn();

    // 테이블 미리보기 생성
    generatePreviewTable(this);
  });

  // 객관식표 모달 닫기
  $('.preview-modal-close').on('click', function () {
    $('#preview-modal').css('display', 'none');
  });

  /*객관식 표 미리보기*/

  /*객관식 표 관련*/

  /*위치 가져오기*/
  $('.content').on('click', '.j-location', function () {
    let myId = $(this).prev().attr('id');
    getMyPosittion(myId);
  });

  /** 개인정보 동의 */
  // j-group-name과 j-goal에 입력 이벤트 리스너 추가
  $('.content').on('input', '.j-groupName> input', function () {
    $(this).css('width', (this.value.length + 1) * 20 + 'px');
  });

  //휴대폰 관련
  $('.content').on('keyup', '.j-phone-inputBox > input', onlyNumbers);
  // .content에 이벤트 위임 사용
  $('.content').on('keydown', '.j-phone-inputBox > input', onlyNumbers);

  $('.content').on('input', '.j-phone-1', function () {
    if ($(this).val().length >= 3) {
      $(this).next('.j-phone-2').focus(); // 다음 j-phone-2로 포커스 이동
    }
  });

  $('.content').on('input', '.j-phone-2', function () {
    if ($(this).val().length >= 4) {
      $(this).next('.j-phone-2').focus(); // 다음 j-phone-2로 포커스 이동
    }
  });
  //휴대폰 관련

  //이미지 관련
  //이미지 미리보기
  $('.content').on('click', '.j-img-preview', function () {
    // 미리보기 이미지를 클릭하면 해당 카드의 파일 입력이 트리거됨
    $(this).closest('.j-img-box').find('.j-file-input').click();
  });

  $('.content').on('change', '.j-file-input', function (event) {
    // 파일 입력에서 파일이 선택되면 미리보기를 업데이트
    const fileInput = this;
    const file = fileInput.files[0];
    const $previewDiv = $(fileInput)
      .closest('.j-img-box')
      .find('.j-img-preview');
    $previewDiv.find('.j-file-up-img').remove();
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // 미리보기 div의 background-image에 파일을 표시
        $previewDiv.css({
          'background-image': `url(${e.target.result})`,
          'background-size': 'cover',
          'background-position': 'center',
          'background-repeat': 'no-repeat',
        });
      };
      reader.readAsDataURL(file);
    }
  });

  //이미지 관련

  //이메일 관련
  //select box event
  $('.content').on('change', '.j-email-select', function () {
    // 선택한 select 요소의 부모 div를 찾아 해당 card 안의 input을 찾음
    let selectedValue = $(this).val(); // 선택된 값
    let $emailTailInput = $(this)
      .closest('.j-email-input-box')
      .find('.j-email-tail-input'); // 해당 input 찾기
    console.log('hi');
    // 기존 글자를 비우고 선택한 값을 넣음
    $emailTailInput.val(''); // 기존 내용 비우기
    if (selectedValue) {
      $emailTailInput.val(selectedValue); // 선택된 값을 tail input에 넣기
    }
  });
  //이메일 관련

  /**아이템에 타입 클릭해서 타입변경 */
  $('.content').on('click', '.j-typeAndImg', function () {
    // j-typeAndImg의 위치를 가져옴
    var $this = $(this);
    var offset = $this.offset(); // j-typeAndImg의 위치

    // 모달을 설정
    var $modal = $('#add-type-modal2');
    $modal.css({
      top: offset.top, // j-typeAndImg의 상단 위치
      left: offset.left - $modal.outerWidth(), // j-typeAndImg의 왼쪽 위치에서 모달 폭만큼 뺌
    });

    // 모달을 보이게 함
    $modal.show();
  });

  $(document).on('click', function (event) {
    if (
      !$(event.target).closest('.j-typeAndImg').length &&
      !$(event.target).closest('#add-type-modal2').length
    ) {
      $('#add-type-modal2').hide(); // 모달 숨기기
    }
  });

  $('#add-type-modal-container2 .j-typeAndImg-modal').on(
    'click',
    async function () {
      let ccSeq = $(this).find('input[type="hidden"').val();

      let selectDiv = $('.content').find('.j-card-selected');
      let idx = selectDiv.index();

      selectDiv.find('.j-cseq').val(ccSeq);

      let modalName = $(this).find('.j-type-name-modal').text();
      let divTypeName = $(selectDiv).find('.j-tpye-name').text();
      if (modalName === divTypeName) {
        return;
      }
      try {
        let header = await fetchHeader(ccSeq);
        selectDiv.find('.j-typeAndImg').remove();
        selectDiv.find('.j-survey-es-type').append(header);
        let content = await fetchContent(ccSeq);
        selectDiv.find('.j-question-content-box').remove();
        let frame = $('<div class="j-question-content-box"></div>');
        frame.append(content);
        selectDiv.append(frame);

        if (ccSeq === '17') {
          selectDiv.find('.j-map-container').attr('id', 'map' + idx);
          setTimeout(() => createDefaultMap('map' + idx), 100);
        }
        if (ccSeq === '18') {
          selectDiv.find('.j-survey-name').remove();
          selectDiv.find('.j-survey-content').remove();
        } else {
          // .j-survey-content이 없으면 추가
          if (selectDiv.find('.j-survey-content').length === 0) {
            selectDiv.find('.j-question-content-box').prepend(`
                      <div class="j-survey-content">
                       <textarea rows="" cols="" placeholder="질문에 대한 설명을 작성해주세요"></textarea>
                       </div>
                       `);
          }

          // .j-survey-name이 없으면 추가
          if (selectDiv.find('.j-survey-name').length === 0) {
            selectDiv.find('.j-question-content-box').prepend(`
                    <div class="j-survey-name">
                    <input class="j-survey-name-input" type="text" placeholder="질문명을 작성해주세요">
                    </div>
                     `);
          }
        }
        selectDiv.addClass('j-u-card');
      } catch (error) {
        console.error('AJAX 요청 실패:', error);
      }
    }
  );
  /**아이템에 타입 클릭해서 타입변경 */

  /** */
  //question nav 탭 누르면 하단 변화
  $('.j-questionNav-tab-Box > div').on('click', function () {
    $('.j-questionNav-tab-Box > div').removeClass('j-question-nav-color');
    $(this).addClass('j-question-nav-color');

    if ($(this).hasClass('j-question-nav-tab')) {
      $('.j-question-box').show();
      $('.j-condition-button').show();
      $('.j-deploy-box').hide();
      $('.j-depoly-button').hide();
    } else {
      $('.j-question-box').hide();
      $('.j-condition-button').hide();
      $('.j-deploy-box').show();
      $('.j-depoly-button').show();
    }
  });

  $('.j-nav-save-button').on('click', saveQuestion);

  /** 조건 카드 선택시 border이벤트 */
  $('.j-condition-box').on('click', '.j-que-con-card', function () {
    $('.j-que-con-card').removeClass('j-que-con-selectd-card');
    $(this).addClass('j-que-con-selectd-card');
    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  /** 조건 카드 선택시 border이벤트 */
});
function setCardPositions(cards, startTop = 20, left = 20, gap = 140) {
  // cards: 배치할 카드 목록 (jQuery 객체)
  // startTop: 첫 번째 카드의 상단 시작 위치
  // left: 모든 카드의 왼쪽 위치
  // gap: 각 카드 간의 세로 간격

  cards.each(function (index) {
    const topPosition = startTop + index * gap; // 각 카드의 Y축 위치 계산
    $(this).css({
      top: `${topPosition}px`,
      left: `${left}px`,
      position: 'absolute', // 위치 고정
    });
  });
}

//시작하면 연결하기!
function defaultConditionLine() {
  const instance = jsPlumb.getInstance({
    Connector: ['Straight'],
    Endpoint: ['Dot', { radius: 5 }],
    PaintStyle: { stroke: 'black', strokeWidth: 2 },
    EndpointStyle: { fill: 'blue' },
    Overlays: [['Arrow', { width: 10, length: 10, location: 1 }]],
    Anchors: ['Bottom', 'Top'],
    Container: document.querySelector('.j-condition-box'),
  });

  $('.j-que-con-card').draggable({
    containment: '.j-condition-box', // 부모 컨테이너 내부로 제한
    scroll: false, // 스크롤 시 움직임 방지
    drag: function () {
      instance.repaintEverything(); // 드래그 중 연결선 갱신
    },
  });

  // 카드 연결 설정
  instance.connect({ source: 'card1', target: 'card2', detachable: false });
  instance.connect({ source: 'card2', target: 'card3', detachable: false });

  // 초기 연결선 그리기
  instance.repaintEverything();

  return instance;
}

//생성된 input에 name부여
async function setQiCheckBoxAndRadioName(html, prev, next, idx) {
  let prevName = prev.find('.j-chAndRa').attr('name');

  prev.after(html);
  prev.next().addClass('j-new-checkAndRadio');
  prev.next().find('.j-option-order').text(next);
  /*$(html).find('.j-option-order').text(next);*/
  if (prevName === undefined || prevName === null)
    prev.next().find('.j-option-input-radio > input').eq(1).attr('name', idx);
  else {
    prev
      .next()
      .find('.j-option-input-radio > input')
      .eq(1)
      .attr('name', prevName);
  }
}

//카드 포커스 및 css
function changeFocus(el) {
  $('.j-question-card').removeClass('j-card-selected');
  $(el).addClass('j-card-selected');
}

//질문 추가될 때 nav에 추가하기
function setQuestionNav(idx, src) {
  let html =
    '<div class="j-question j-flex-row-center j-quorder' +
    idx +
    '">' +
    '<div class="question-img j-flex-row-center">' +
    '<img src="' +
    src +
    '">' +
    '</div>' +
    '<div class="question-name">' +
    '<span>질문명</span>' +
    '</div>' +
    '<div class="j-list-xbutton j-flex-row-center">' +
    '<img src="/resources/img/question/x-circle.png">' +
    '</div>' +
    '</div>';

  $('.j-question-list').append(html);
  return $('.j-question-list');
}

// 선형 배율
function updateLine(numRangeLine, clickedIndex, totalNumbers) {
  var percentage = (clickedIndex / totalNumbers) * 100; // 클릭한 비율 계산
  numRangeLine
    .find('.j-line')
    .css(
      'background-image',
      'linear-gradient(90deg, #005bac ' +
      percentage +
      '%, rgba(0, 91, 172, 0.4) ' +
      percentage +
      '%)'
    );
}
function updateNumberRange(target) {
  var start = parseInt($(target).find('.j-num-start').val()); // 시작 값
  var end = parseInt($(target).find('.j-num-end').val()); // 끝 값

  let numRangeLine = $(target).prev();
  let numRange = numRangeLine.find('.j-number');
  // 숫자 범위 표시 초기화
  numRange.empty();

  // start에서 end까지 span으로 숫자를 동적으로 추가
  for (var i = start; i <= end; i++) {
    numRange.append('<span>' + i + '</span>');
  }

  // 선 초기화
  updateLine(numRangeLine, 0, end - start); // 첫 클릭 전 초기화
}
// 선형 배율

//객관식 표
function updateVerticalLine(target) {
  let row = target.find('.j-row-box').outerHeight();
  let col = target.find('.j-col-box').outerHeight();

  target.find('.j-vertical-line').outerHeight(row > col ? row : col);
}

// 행과 열을 기반으로 테이블 생성
function generatePreviewTable(target) {
  let rows = $(target)
    .parent()
    .find('.j-row-input')
    .map(function () {
      return $(this).val();
    })
    .get(); // 모든 행 이름 가져오기
  let cols = $(target)
    .parent()
    .find('.j-col-input')
    .map(function () {
      return $(this).val();
    })
    .get(); // 모든 열 이름 가져오기

  let tableHtml =
    '<table class="j-chart-table" border="1"><thead><tr><th></th>'; // 테이블 시작

  // 열 헤더 생성
  cols.forEach(function (colName) {
    tableHtml +=
      '<th class="j-col-name-th"><span class="j-col-name">' +
      colName +
      '<span></th>';
  });
  tableHtml += '</tr></thead><tbody>';

  // 각 행마다 열 생성
  rows.forEach(function (rowName, rowIndex) {
    tableHtml += '<tr><td>' + rowName + '</td>'; // 행 헤더

    cols.forEach(function (colName, colIndex) {
      // 라디오 버튼을 각 셀에 추가
      tableHtml +=
        '<td>' +
        '<input type="radio" name="row' +
        -rowIndex +
        '" value="' +
        rowName +
        '">' +
        '</td>';
    });
    tableHtml += '</tr>';
  });

  tableHtml += '</tbody></table>'; // 테이블 끝

  // 모달에 테이블 추가
  $('#preview-table-container').html(tableHtml);
}

//객관식 표

//주소입력
function execDaumPostcode(button) {
  let $button = $(button);
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업을 통한 검색 결과 항목 클릭 시 실행
      var addr = ''; // 주소_결과값이 없을 경우 공백
      var extraAddr = ''; // 참고항목

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 도로명 주소를 선택
        addr = data.roadAddress;
      } else {
        // 지번 주소를 선택
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
        document.getElementById('UserAdd1').value = '';
      }

      // 선택된 우편번호와 주소 정보를 input 박스에 넣는다.
      $parent = $button.parent();
      $parent.find('.zipp_code_id').val(data.zonecode);
      $parent.find('.UserAdd1').val(addr + extraAddr);
      $parent.find('.UserAdd2').focus();
      /*document.getElementById('zipp_code_id').value = data.zonecode;
      document.getElementById("UserAdd1").value = addr;
      document.getElementById("UserAdd1").value += extraAddr;
      document.getElementById("UserAdd2").focus(); // 우편번호 + 주소 입력이 완료되었음으로 상세주소로 포커스 이동*/
    },
  }).open();
}
//주소입력

//휴대폰 관련//
// 숫자 입력만 허용 (한글, 영어 및 기타 문자 차단)
function onlyNumbers(event) {
  const value = $(this).val();
  $(this).val(value.replace(/[^0-9]/g, ''));
}

// 입력 후 자동 포커스 이동
function autoMoveToNext(currentInput, nextInput, maxLength) {
  $(currentInput).on('input', function () {
    if ($(this).val().length >= maxLength) {
      $(nextInput).focus();
    }
  });
}
//휴대폰 관련//

/**지도 관련 */
function createDefaultMap(mapdiv) {
  let container = document.getElementById(mapdiv);

  let options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(36.576, 128.0), //지도의 중심좌표.
    level: 13, //지도의 레벨(확대, 축소 정도)
  };
  let map = new kakao.maps.Map(container, options);
}

function getMyPosittion(id) {
  navigator.geolocation.getCurrentPosition((position) => {
    createKaKaoMap(id, position.coords.latitude, position.coords.longitude);
  });
}

function createKaKaoMap(id, latitude, longitude) {
  var container = document.getElementById(id); //지도를 담을 영역의 DOM 레퍼런스
  var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(36.576, 128.0),
    level: 3,
  };

  var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  var moveLatLng = new kakao.maps.LatLng(latitude, longitude);
  map.panTo(moveLatLng);

  var markerPosition = new kakao.maps.LatLng(latitude, longitude);
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
}
/**지도 관련 */
