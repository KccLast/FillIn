var page = 1;
var end;
var participant_seq = 999;
//var pageDTO;
$(function () {
  setCard();

  localStorage.clear();
  if (!localStorage.getItem('submitList')) {
    localStorage.setItem('submitList', JSON.stringify([]));
  }
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
  //라디오 버튼 클릭 이벤트
  $('.content').on('click', '.radio-contentBox', function () {
    let $thisRadio = $(this).find('input[type="radio"]');
    let $sibling = $(this).siblings();

    $thisRadio.prop('checked', true);
    $(this).addClass('clicked-radio-css');
    $sibling.removeClass('clicked-radio-css');
  });
  //라디오 버튼 클릭 이벤트

  //선채우기 이벤트
  $('.content').on('click', '.j-number span', function (e) {
    var clickedIndex = $(this).index(); // 클릭된 숫자의 인덱스
    var totalNumbers = $(this).parent().find('span').length - 1; // 전체 숫자의 갯수 (인덱스 기준으로 -1)

    console.log(clickedIndex);
    console.log(totalNumbers);
    // 선 채우기 업데이트
    updateLine($(this).parents('.j-LineAndnumber'), clickedIndex, totalNumbers);
    e.stopPropagation();
  });

  //위치가져오기
  $('.content').on('click', '.j-location', function () {
    let myId = $(this).prev().attr('id');
    getMyPosittion(myId);
  });

  $('.nextBtn').on('click', '#next-btn', function () {
    page++;
    // setCard();
    setPageBtn();
    pageHideAndShow();
  });
  $('.nextBtn').on('click', '#prev-btn', function () {
    console.log(page);
    page--;
    //setCard();
    setPageBtn();
    pageHideAndShow();
  });

  $('.content').on(
    'click',
    '.j-option-input-radio > input[type="checkbox"]',
    function () {
      let $parentCard = $(this).parents('.j-question-card'); // 부모 .j-question-card 요소
      let questionSeq = $parentCard.find('.j-qseq').val();
      let cSeq = $parentCard.find('.j-cseq').val();
      let currentDateTime = new Date().toISOString(); // 현재 시간
      let checkedValues = [];

      // 부모 .j-question-card 내에서 체크된 모든 체크박스의 앞에 있는 값을 가져옴
      $parentCard
        .find('.j-option-input-radio > input[type="checkbox"]:checked')
        .each(function () {
          let val = $(this).val(); // 체크된 체크박스 값을 가져옴
          checkedValues.push(val); // 배열에 추가
        });

      // submitObject 생성
      let submitObject = {
        questionSeq: questionSeq,
        participantSeq: participant_seq,
        ccSeq: cSeq,
        contents: checkedValues, // 체크된 값들의 배열
        answerDate: currentDateTime,
      };
      console.log(submitObject);
      storeCheckBoxsubmitInLocal(submitObject, questionSeq, 'submitList');
    }
  );

  $('.content').on(
    'click',
    '.j-option-input-radio > input[type="radio"], .j-gender-radio',
    function () {
      getSubmitObject(this, $(this).val());

      // storeCheckBoxsubmitInLocal(
      //   submitObject,
      //   submitObject.questionSeq,
      //   'submitList'
      // );
    }
  );

  $('.content').on('click', '.j-number > span', function () {
    getSubmitObject(this, $(this).text());
    // storeCheckBoxsubmitInLocal(
    //   submitObject,
    //   submitObject.questionSeq,
    //   'submitList'
    // );
  });

  $('.content').on('change', '.qiBox', function () {
    getSubmitObject(this, $(this).find('option:selected').text());
  });

  $('.content').on(
    'change',
    '.j-short-inputBox > input[type="text"], .j-long-input',
    function () {
      getSubmitObject(this, $(this).val());
    }
  );
  $('.content').on('change', '.j-address-box>input[type="text"]', function () {
    let $parent = $(this).parent();
    let val = '';
    $parent.find('input[type="text"]').each(function (index, item) {
      if (index > 0) {
        val += $(item).val();
      }
    });
    getSubmitObject(this, val);
  });

  $('.content').on('change', '.j-dayBox > input[type="date"]', function () {
    getSubmitObject(this, $(this).val());
  });
  $('.content').on('change', '.j-img-answerBox > textarea', function () {
    getSubmitObject(this, $(this).val());
  });
  $('.content').on(
    'change',
    '.j-email-header-input, .j-email-tail-input',
    function () {
      // 이메일 주소를 결합 (헤더와 도메인 부분)
      let email = '';

      $(this)
        .parent()
        .find('input[type="text"]')
        .each((index, item) => {
          email += $(item).val();
          if (index === 0) email += '@'; // 이메일 주소 형식으로 결합
        });
      console.log(email);

      // 이메일 유효성 검사 (정규 표현식)
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 확인 정규식

      // 이메일 형식이 맞을 때만 getSubmitObject 호출
      if (emailRegex.test(email)) {
        getSubmitObject(this, email); // 유효한 이메일일 때만 호출
      }
    }
  );

  $('.content').on('change', '.j-phone-inputBox > input', function () {
    let phone = '';

    $(this)
      .parent()
      .find('input[type="text"]')
      .each((index, item) => {
        phone += $(item).val();
        if (index === 0 || index === 1) phone += '-'; // 이메일 주소 형식으로 결합
      });
    let phoneRegex = /^010-\d{4}-\d{4}$/; // 010-1234-1234 형식

    // 휴대폰 번호가 형식에 맞는지 확인
    if (phoneRegex.test(phone)) {
      console.log(phone);
      getSubmitObject(this, phone);
    }
  });

  $('#j-submit').click(async function () {
    // confirm 대화 상자를 통해 사용자 확인
    if (
      confirm('응답하시면 다시는 수정하실 수 없습니다. 계속 진행하시겠습니까?')
    ) {
      // 사용자가 '확인'을 클릭한 경우
      submitResponse();
      // 여기서 응답 제출 처리 (예: 폼 제출, AJAX 호출 등)
    } else {
      // 사용자가 '취소'를 클릭한 경우
    }
  });
});
function submitResponse() {
  const localData = localStorage.getItem('submitList');

  $.ajax({
    url: '/api/question/submit',
    type: 'post',
    contentType: 'application/json',
    data: localData,
    success: function () {
      alert('설문에 참여해주셔서 감사합니다.');
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function getSubmitObject(target, value) {
  let $parentCard = $(target).parents('.j-question-card'); // 부모 .j-question-card 요소
  let questionSeq = $parentCard.find('.j-qseq').val();
  let cSeq = $parentCard.find('.j-cseq').val();
  let currentDateTime = new Date().toISOString(); // 현재 시간
  let submitObject = {
    questionSeq: questionSeq,
    ccSeq: cSeq,
    participantSeq: participant_seq,
    contents: [value], // 체크된 값들의 배열
    answerDate: currentDateTime,
  };
  storeCheckBoxsubmitInLocal(
    submitObject,
    submitObject.questionSeq,
    'submitList'
  );
}

async function pageHideAndShow() {
  console.log('show' + page);
  $('.j-question-card').hide();
  $('.' + page).show();
  // 스크롤을 맨 위로 올립니다.
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 부드럽게 스크롤 (필요에 따라 제거 가능)
  });
  // map.relayout();
}
//카드 포커스 및 css
function changeFocus(el) {
  $('.j-question-card').removeClass('j-card-selected');
  $(el).addClass('j-card-selected');
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

function storeCheckBoxsubmitInLocal(updateItem, questionSeq, listId) {
  //로컬 스토리지에서 꺼내오기
  let localStorageObject = JSON.parse(localStorage.getItem(listId)) || [];
  //이미 있는 데이터인지 검사
  let index = localStorageObject.findIndex(
    (item) => item.questionSeq === questionSeq
  );
  //있으면 업데이트
  if (index !== -1) {
    localStorageObject[index] = updateItem;
    //없으면 새로 넣기
  } else {
    localStorageObject.push(updateItem);
  }
  console.log(localStorageObject);
  localStorage.setItem(listId, JSON.stringify(localStorageObject));
}

//위치 가져오기
function createDefaultMap(mapdiv) {
  let container = document.getElementById(mapdiv);

  let options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(36.576, 128.0), //지도의 중심좌표.
    level: 13, //지도의 레벨(확대, 축소 정도)
  };
  let map = new kakao.maps.Map(container, options);
  return map;
}

function getMyPosittion(id) {
  navigator.geolocation.getCurrentPosition((position) => {
    createKaKaoMap(id, position.coords.latitude, position.coords.longitude);
  });
}

function createKaKaoMap(id, latitude, longitude) {
  var $contentBox = document.getElementById(id); //지도를 담을 영역의 DOM 레퍼런스
  var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(36.576, 128.0),
    level: 3,
  };

  var map = new kakao.maps.Map($contentBox, options); //지도 생성 및 객체 리턴

  var moveLatLng = new kakao.maps.LatLng(latitude, longitude);
  map.panTo(moveLatLng);

  var markerPosition = new kakao.maps.LatLng(latitude, longitude);
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  getAddressFromCoords(latitude, longitude, function (response) {
    getSubmitObject($('.content').find('.j-card-selected >div'), response);
    //storeCheckBoxsubmitInLocal(submitObject);
  });
  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
}

function getAddressFromCoords(latitude, longitude, callback) {
  var geocoder = new kakao.maps.services.Geocoder();
  var coord = new kakao.maps.LatLng(latitude, longitude);

  geocoder.coord2Address(
    coord.getLng(),
    coord.getLat(),
    function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        if (result[0].road_address) {
          // 도로명 주소를 콜백으로 전달
          callback(result[0].road_address.address_name);
        } else {
          // 지번 주소를 콜백으로 전달
          callback(result[0].address.address_name);
        }
      } else {
        console.error('주소 변환 실패:', status);
        callback(null); // 변환 실패 시 null 반환
      }
    }
  );
}

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
      getSubmitObject($('.content').find('.j-card-selected'), addr + extraAddr);
      /*document.getElementById('zipp_code_id').value = data.zonecode;
			document.getElementById("UserAdd1").value = addr;
			document.getElementById("UserAdd1").value += extraAddr;
			document.getElementById("UserAdd2").focus(); // 우편번호 + 주소 입력이 완료되었음으로 상세주소로 포커스 이동*/
    },
  }).open();
}
//주소입력

//카드셋팅
function setCard() {
  const currentUrl = window.location.href;
  const lastSlashIndex = currentUrl.lastIndexOf('/');
  const surveyUrl = currentUrl.substring(lastSlashIndex + 1);
  const requestUrl = `/api/survey/${surveyUrl}`;
  $.ajax({
    url: requestUrl,
    type: 'GET',
    success: async function (response) {
      console.log(response);
      console.log(response.data);
      if (page === undefined || page === null) page = 1;
      //pageDTO = response.data.pageDTO;
      setEnd(response.data.totalCnt);
      setPageBtn();

      await processQuestions(response.data.questions);
      await pageHideAndShow();
    },
    error: function (xhr, status, error) {
      console.error('에러 발생:', error);
      console.error('상태 코드:', status);
      console.error('응답:', xhr.responseText);
    },
  });
}

function setEnd(totalCnt) {
  end = Math.ceil(totalCnt / 5);
}

async function processQuestions(questions) {
  for (const [index, question] of questions.entries()) {
    await appendQuestionCard(question, index); // 비동기 함수가 순차적으로 실행되도록 처리
  }
}

async function appendQuestionCard(question, index) {
  let page = Math.ceil((index + 1) / 5);
  try {
    // submitFrame.html 불러오기
    let questionData = await fetchSubmitFrame();

    // 새롭게 추가할 고유한 컨테이너 생성
    let $new$contentBox = $(
      `<div class="j-question-card j-flex-col-center ${page}"></div>`
    );
    $new$contentBox.html(questionData); // 불러온 questionFrame.html을 삽입
    $new$contentBox.append(
      '<input type="hidden" value="' + question.ccSeq + '" class="j-cseq"/>'
    );
    $new$contentBox.append(
      '<input type="hidden" value="' + question.seq + '" class="j-qseq"/>'
    );
    if (question.ccSeq === 18) {
      $new$contentBox.find('.j-survey-name').remove();
      $new$contentBox.find('.j-survey-content').remove();
    } else {
      $new$contentBox.find('.j-survey-input').text(question.name.trim());
      $new$contentBox
        .find('.j-survey-content')
        .text(question.description.trim());
    }
    if (question.isEssential === 'Y') {
      let es = $new$contentBox.find('.j-essential');
      es.data('essential', 'Y');
      es.addClass('j-es-seleted');
    }
    $('.content').append($new$contentBox);

    $new$contentBox.find('.j-q-order').val(question.order);

    if (question.questionItemExist === true) {
      await setQuestionItem(question, $new$contentBox);
    } else {
      // content 파일 불러오기
      let contentData = await fetchSubmitContent(question.ccSeq);
      $new$contentBox.find('.j-question-content-box').append(contentData);
    }

    if (question.ccSeq === 17) {
      $new$contentBox.find('.j-map-container').attr('id', 'map' + question.seq);
      setTimeout(() => createDefaultMap('map' + question.seq), 100);
    }
  } catch (error) {
    console.error('AJAX 요청 실패:', error);
  }
}

async function setQuestionItem(question, newCard) {
  // seq랑 question seq를 클래스에다가 집어넣어야겠다 j-seq-22, j-question-seq-23이런식으로 대가리에 넣자
  let contentData = await fetchSubmitContent(question.ccSeq);
  let $contentData = $(contentData);
  let $contentBox = newCard.find('.j-question-content-box');
  $contentBox.append(contentData);

  // forEach 대신 for...of 사용하여 async/await가 제대로 동작하도록 수정
  for (let [index, qi] of question.questionItems.entries()) {
    if (question.ccSeq === 7 || question.ccSeq === 8) {
      if (index === 0) {
        type7Common($contentBox, qi);
      } else {
        let fetchContent = await fetchSubmitContent(question.ccSeq);
        $contentBox.append(fetchContent);
        let cur = $contentBox.find('.j-select-question-type-box').eq(index);
        type7Common($(cur), qi);
      }
    }
    if (question.ccSeq === 9) {
      if (index === 0) {
        $contentBox.find('.j-num-start').addClass('qi ' + qi.seq);
        $contentBox.find('.j-num-start').val(qi.content);
      } else {
        $contentBox.find('.j-num-end').addClass('qi ' + qi.seq);
        $contentBox.find('.j-num-end').val(qi.content);
      }
    }

    if (question.ccSeq === 10) {
      let html = `<option value="${qi.content}" class="qi${qi.seq}">${qi.content}</option>`;
      //let questionSeq = `<input type="hidden" value="${qi.questionSeq}" class="j-qseq"/>`;
      $contentBox.find('.j-dropdwon > select').addClass('qiBox');
      $contentBox.find('.j-dropdwon > select').append(html);
    }

    if (question.ccSeq === 11) {
      let row = $($contentBox.find('.j-row-box'));
      let col = $($contentBox.find('.j-col-box'));
      if (qi.orderNum === 1) {
        row.find('.j-row-input').eq(0).val(qi.content);
        row
          .find('.j-row-input')
          .eq(0)
          .addClass('qi ' + qi.seq);
      } else if (qi.orderNum > 1 && qi.orderNum < 85) {
        let html = `
<div class="j-rowAndcol-input-x-box j-flex-row-center">
    <input class="j-rowAndcol-input j-row-input qi ${qi.seq}" type="text" value="${qi.content}" placeholder="&nbsp;&nbsp;Row 1">
    <button class="j-rowAndcol-input-xbutton j-flex-row-center">
        <span>x</span>
    </button>
</div>
`;
        row.append(html);
      } else if (qi.orderNum == 85) {
        col.find('.j-col-input').eq(0).val(qi.content);
        col
          .find('.j-col-input')
          .eq(0)
          .addClass('qi ' + qi.seq);
      } else {
        let html = `
<div class="j-rowAndcol-input-x-box j-flex-row-center">
    <input class="j-rowAndcol-input j-col-input qi ${qi.seq}" type="text" value="${qi.content}" placeholder="&nbsp;&nbsp;Col 1">
    <button class="j-rowAndcol-input-xbutton j-flex-row-center">
        <span>x</span>
    </button>
</div>
`;
        col.append(html);
      }
    }
  }
  if (question.ccSeq === 9) {
    updateNumberRange($contentBox.find('.j-number-range'));
  }
}

async function fetchQuestionItem(seq) {
  return $.ajax({
    url: '/resources/html/question/questionItem/qi' + seq + '.html',
    type: 'GET',
  });
}

function type7Common(target, qi) {
  target
    .find('.j-select-question-type-box')
    .addClass(qi.seq + ' ' + qi.questionSeq);
  target.find('input[type="text"]').addClass('qi');
  target.find('input[type="text"]').addClass('' + qi.seq);
  target.find('.j-option-order').text(qi.orderNum);
  target.find('.j-option-input-radio > input').val(qi.content);
  target.find('.j-chAndRa').attr('name', qi.questionSeq);
}

async function fetchSubmitFrame() {
  return $.ajax({
    url: '/resources/html/question/submitFrame.html',
    type: 'GET',
  });
}

// questionSubmit 파일 불러오기
async function fetchSubmitContent(ccSeq) {
  return $.ajax({
    url: '/resources/html/question/questionSubmit/submit' + ccSeq + '.html',
    type: 'GET',
  });
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

function setPageBtn() {
  if (page <= 1) {
    $('#prev-btn').hide();
    $('#prev-btn > img').hide();
  } else {
    $('#prev-btn').show();
    $('#prev-btn > img').show();
  }
  if (page >= end) {
    $('#next-btn').hide();
    $('#next-btn > img').hide();
  } else {
    $('#next-btn').show();
    $('#next-btn > img').show();
  }
  if (page === end) {
    $('#j-submit').show();
  } else {
    $('#j-submit').hide();
  }
}
