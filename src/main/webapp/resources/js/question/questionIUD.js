//헤더에 질문명 출력을 위한 함수
function updateSurveyName(name) {
  $('.dashboard').text(name);
}

function removeUpdatedCardClass() {
  $('.content div.j-u-card').removeClass('j-u-card');
}

/**class에서 seq 추출 */
function seqExtract(target) {
  if (target.hasClass('qi')) {
    const classValue = target.attr('class'); // 클래스 값 가져오기
    console.log(classValue);
    // 정규표현식으로 숫자만 추출

    const number = parseInt(classValue.match(/\d+/)[0], 10);

    return number;
  }
  return null;
}

//다양한 로컬스토리지에 값을 넣기 위한 함수
function storeUpdateQuestionItemInLocal(updateItem, seq, listId) {
  //로컬 스토리지에서 꺼내오기
  let updatedQuestionItemList = JSON.parse(localStorage.getItem(listId)) || [];
  //이미 있는 데이터인지 검사
  let index = updatedQuestionItemList.findIndex((item) => item.seq === seq);
  //있으면 업데이트
  if (index !== -1) {
    updatedQuestionItemList[index] = updateItem;
    //없으면 새로 넣기
  } else {
    updatedQuestionItemList.push(updateItem);
  }

  localStorage.setItem(listId, JSON.stringify(updatedQuestionItemList));
}
//다양한 로컬스토리지에 값을 넣기 위한 함수

/**save버튼 눌렀을때 실행되는 함수 */
async function saveQuestion() {
  try {
    await insertQuestion();
    await updateQuestion();
    await updateAndInsertQuestionItem();
    // 로컬 스토리지 데이터 가져오기
    let updateQuestionItemlocalData = localStorage.getItem(
      'updatedQuestionItemList'
    ); // 로컬 스토리지의 특정 데이터 가져오기
    if (updateQuestionItemlocalData) {
      await sendLocalStorageData(JSON.parse(updateQuestionItemlocalData));
    }
    let removeQuestionLocalData = localStorage.getItem('removeQuestionList');
    if (removeQuestionLocalData) {
      await sendremoveQeiostnLocalData(JSON.parse(removeQuestionLocalData));
    }
    let removeQuestionItemData = localStorage.getItem('removeQuestionItemList');
    if (removeQuestionItemData) {
      await sendremoveQquestionItemLocalData(
        JSON.parse(removeQuestionItemData)
      );
    }
    window.location.href = '/survey/82';
  } catch (error) {
    console.error('오류 발생:', error);
  }
}
/**save버튼 눌렀을때 실행되는 함수 */

/**질문을 모달을 통해 생성시 (DB 조회 x) 필요한 ajax모음 */

/** 질문을 DB에 저장하기 위한 function모음 */
//if문을 줄이기 위한 전략 패턴
const questionItemStrategies = {
  7: function (target) {
    return getQuestionItemFor7(target);
  },
  8: function (target) {
    return getQuestionItemFor7(target);
  },
  9: function (target) {
    return getQuestionItemFor9(target);
  },
  10: function (target) {
    return getQuestionItemFor10(target);
  },
  11: function (target) {
    return getQuestionItemFor11(target);
  },
  default: function (target) {
    return defaultQuestionItem(target);
  },
};
function getQuestionItemFunction(ccSeq, target) {
  return (questionItemStrategies[ccSeq] || questionItemStrategies['default'])(
    target
  );
}

async function insertQuestion() {
  let surveySeq = $('#surveySeq').val();
  let questions = [];

  $('.content')
    .find('.j-new-card')
    .each(function (index, item) {
      let $item = $(item);
      let ccSeq = $item.find('.j-cseq').val();
      let isEssential = $item.find('.j-essential').data('essential');
      let questionOrder = $item.index() + 1;
      let question = {};

      question.surveySeq = surveySeq;
      question.order = questionOrder;

      if ($item.find('.j-survey-name-input').length === 0) {
        question.name = '개인정보동의항목';
      } else {
        question.name =
          ($item.find('.j-survey-name-input').val() || ' ').trim() || ' ';
      }
      if ($item.find('.j-survey-content > textarea').length === 0) {
        question.description = '개인정보동의항목';
      } else {
        question.description =
          ($item.find('.j-survey-content > textarea').val() || ' ').trim() ||
          ' ';
      }
      question.ccSeq = ccSeq;
      question.isEssential = isEssential;

      if (ccSeq >= 7 && ccSeq <= 11) {
        question.questionItems = getQuestionItemFunction(ccSeq, item);
      }

      questions.push(question);
    });

  return saveQuestionInDB(questions);
}
//새로 생긴 question을 DB에 저장하기 위한 ajax 호출 함수
function saveQuestionInDB(questions) {
  if (isListExists(questions));
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/api/question', // 서버 URL
      type: 'POST',
      contentType: 'application/json', // JSON 형식으로 보낸다는 것을 명시
      data: JSON.stringify(questions), // 자바스크립트 객체를 JSON 형식으로 변환
      success: function (response) {
        console.log('서버 응답:', response);
        resolve(response); // 요청이 완료되면 Promise 해결
      },
      error: function (error) {
        console.error('에러 발생:', error);
        reject(error); // 오류 발생 시 Promise 거부
      },
    });
  });
}
async function insertQuestionItem(questionType, questionSeq, insertedItems) {
  if (!isListExists(insertedItems)) {
    return;
  }

  let itemList = [];

  insertedItems.each(function (idx, item) {
    let insertItem = {};
    let order;
    let content;

    if (questionType == '11') {
      let rowAndcol = $(item).find('.j-rowAndcol-input');
      let orderString = rowAndcol.attr('placeholder');
      order = parseInt(orderString.match(/\d+/)[0]);
      if (rowAndcol.hasClass('j-col-input')) {
        order += 85;
      }
      content = rowAndcol.val();
    } else {
      order = $(item).find('.j-option-order').text();
      content = $(item)
        .find('.j-option-input-radio > input[type="text"]')
        .val();
    }

    insertItem.orderNum = order;
    insertItem.content = content;
    insertItem.questionSeq = questionSeq;
    itemList.push(insertItem);
  });

  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/api/question/item',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(itemList),
      success: function (response) {
        console.log(response.data);
        resolve(response);
      },
      error: function (error) {
        console.error('에러 발생:', error);
        reject(error);
      },
    });
  });
}

function isListExists(itemList) {
  if (!itemList || itemList.length === 0) {
    return false;
  }
  return true;
}

/**DB에 아이템을 저장할 때 타입에 따라 값이 조금씩 다름 이를 처리하기 위한 함수 모음 */
function getQuestionItemFor7(target) {
  let parent = $(target).find('.j-select-optionBox');

  let questionItems = []; // 빈 배열 선언

  parent.each(function (index, item) {
    let questionItem = {}; // 매번 새로운 questionItem 객체 생성
    let order = $(item).find('.j-option-order').text();
    let content = $(item)
      .find('.j-option-input-radio > input[type="text"]')
      .val();
    questionItem.orderNum = order;
    questionItem.content = content;
    questionItems.push(questionItem);
  });
  return questionItems; // 배열 반환
}

function getQuestionItemFor9(target) {
  let questionItems = [];
  let start = $(target).find('.j-num-start').val();
  let end = $(target).find('.j-num-end').val();
  let item1 = {
    orderNum: 1,
    content: start,
  };
  let item2 = {
    orderNum: 2,
    content: end,
  };
  questionItems.push(item1);
  questionItems.push(item2);
  return questionItems;
}
function getQuestionItemFor10(target) {
  let questionItems = [];

  $(target)
    .find('.j-dropdwon  option')
    .each(function (index, item) {
      if (index > 0) {
        let questionItem = {};
        let order = index;
        let content = $(item).val();
        questionItem.orderNum = order;
        questionItem.content = content;
        questionItems.push(questionItem);
      }
    });
  return questionItems;
}

function getQuestionItemFor11(target) {
  let questionItems = [];
  $(target)
    .find('.j-row-input')
    .each(function (index, item) {
      let questionItem = {};
      let order = index + 1;
      let content = $(item).val();
      questionItem.orderNum = order;
      questionItem.content = content;
      questionItems.push(questionItem);
    });
  $(target)
    .find('.j-col-input')
    .each(function (index, item) {
      let questionItem = {};
      let order = index + 85;
      let content = $(item).val();
      questionItem.orderNum = order;
      questionItem.content = content;
      questionItems.push(questionItem);
    });

  return questionItems;
}

/**DB에 아이템을 저장할 때 타입에 따라 값이 조금씩 다름 이를 처리하기 위한 함수 모음 */

/** 질문을 DB에 저장하기 위한 function모음 */

/**질문을 DB에 update하기 위한 function모음 */
async function updateQuestion() {
  let surveySeq = $('#surveySeq').val();
  let updatedQuestions = [];

  $('.content')
    .find('.j-u-card')
    .not('.j-new-card')
    .each(function (index, item) {
      let $item = $(item);
      let ccSeq = $item.find('.j-cseq').val();
      let isEssential = $item.find('.j-essential').data('essential');
      let questionOrder = $item.find('.j-q-order').val();
      let updateQuestion = {};

      updateQuestion.seq = $item.find('.j-qseq').val();
      updateQuestion.surveySeq = surveySeq;
      updateQuestion.order = questionOrder;
      updateQuestion.name =
        ($item.find('.j-survey-name-input').val() || ' ').trim() || ' ';
      updateQuestion.description =
        ($item.find('.j-survey-content > textarea').val() || ' ').trim() || ' ';
      updateQuestion.ccSeq = ccSeq;
      updateQuestion.isEssential = isEssential;

      updatedQuestions.push(updateQuestion);
    });

  return updateQuestionInDB(updatedQuestions);
}
/**질문 DB 업데이트 */

/** update 처리를 위한 함수 모음 (질문 자체 업데이트)*/
async function updateQuestionInDB(updatedQuestions) {
  if (isListExists(updatedQuestions));
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/api/question', // 서버 URL
      type: 'PATCH',
      contentType: 'application/json', // JSON 형식으로 보낸다는 것을 명시
      data: JSON.stringify(updatedQuestions), // 자바스크립트 객체를 JSON 형식으로 변환
      success: function (response) {
        console.log('서버 응답:', response);
        resolve(response); // 요청이 완료되면 Promise 해결
      },
      error: function (error) {
        console.error('에러 발생:', error);
        reject(error); // 오류 발생 시 Promise 거부
      },
    });
  });
}
//업데이트된 항목 추적용 (질문 자체 업데이트)
async function updateAndInsertQuestionItem() {
  let tasks = [];

  // 각각의 비동기 작업을 Promise로 저장
  $('.content')
    .find('.j-item-u')
    .not('.j-new-card')
    .each(function (idx, item) {
      let questionSeq = $(item).find('.j-qseq').val();
      let insertedItems = $(item).find('.j-new-checkAndRadio');
      //let updatedItems = $(item).find('.j-u-item').not('.j-new-checkAndRadio');
      let questionType = $(item).find('.j-cseq').val();
      // 각각의 작업을 Promise에 추가
      tasks.push(insertQuestionItem(questionType, questionSeq, insertedItems));
    });

  // 모든 비동기 작업이 완료될 때까지 대기
  await Promise.all(tasks);
}

//드랍다운 업데이트 처리를 위함
function saveDropDownInStorage(options, questionSeq) {
  let optionListObject = {};
  optionListObject.seq = parseInt(questionSeq);
  optionListObject.content = ' ';
  optionListObject.dropdownOptionList = [];
  let orderNum = 1;
  options.forEach(function (option) {
    if (option.trim()) {
      // 공백은 추가하지 않음
      let optionObject = {};
      optionObject.dropContent = option.trim();
      optionObject.questionSeq = questionSeq;
      optionObject.orderNum = orderNum++;
      optionListObject.dropdownOptionList.push(optionObject);
    }
  });

  storeUpdateQuestionItemInLocal(
    optionListObject,
    questionSeq,
    'updatedQuestionItemList'
  );
}
//질문 항목 업데이트 ajax
async function sendLocalStorageData(data) {
  return $.ajax({
    url: '/api/question/item',
    type: 'patch',
    contentType: 'application/json',
    data: JSON.stringify(data), // 서버로 보낼 데이터
    success: function (response) {
      console.log(response.data);
    },
    error: function (error) {
      console.error('데이터 전송 오류:', error);
    },
  });
}
/**업데이트 처리를 위한 함수 모음 */

/**삭제를 위한 함수 모음 */
async function sendremoveQeiostnLocalData(localData) {
  return $.ajax({
    url: '/api/question',
    type: 'delete',
    contentType: 'application/json',
    data: JSON.stringify(localData), // 서버로 보낼 데이터
    success: function (response) {
      console.log(response.data);
    },
    error: function (error) {
      console.error('데이터 전송 오류:', error);
    },
  });
}

async function sendremoveQquestionItemLocalData(localData) {
  //question이 지워지면서 이미 n처리된 질문 제거
  let removeQeustionList = JSON.parse(
    localStorage.getItem('removeQuestionList')
  );
  //제거된 qeustionSeq 추출
  const removeSeqs = removeQeustionList.map((item) => item.seq);
  //제거할 질문 항목 중 이미 제거된 것이 있다면 제외
  localData = localData.filter(
    (item) => !removeSeqs.includes(item.questionSeq)
  );
  return $.ajax({
    url: '/api/question/item',
    type: 'delete',
    contentType: 'application/json',
    data: JSON.stringify(localData), // 서버로 보낼 데이터
    success: function (response) {
      console.log(response.data);
    },
    error: function (error) {
      console.error('데이터 전송 오류:', error);
    },
  });
}

/**삭제를 위한 함수 모음 */
