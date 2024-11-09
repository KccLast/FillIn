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
    if (validCheck()) {
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
      let removeQuestionItemData = localStorage.getItem(
        'removeQuestionItemList'
      );
      if (removeQuestionItemData) {
        await sendremoveQquestionItemLocalData(
          JSON.parse(removeQuestionItemData)
        );
      }
    }
    //window.location.reload();
  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
  }
}
/**save버튼 눌렀을때 실행되는 함수 */
async function handleSaveButtonClick() {
  const saveButton = document.querySelector('.j-nav-save-button');
  const buttonText = saveButton.querySelector('.button-text');

  // 로딩 상태로 변경
  buttonText.style.display = 'none'; // 텍스트 숨기기
  const spinner = document.createElement('div'); // 스피너 생성
  spinner.className = 'spinner-border';
  spinner.setAttribute('role', 'status');
  saveButton.appendChild(spinner); // 버튼에 스피너 추가

  try {
    // 저장 작업 수행
    await saveQuestion();
    if (hasError.length === 0) {
      Swal.fire({
        icon: 'success',
        title: '저장 완료',
        text: '작업을 성공적으로 저장했습니다!',
      });
    } else {
      showError();
    }
  } catch (error) {
    console.error('저장 중 오류 발생:', error);
    Swal.fire({
      icon: 'error',
      title: '저장 실패',
      text: '저장 중 오류가 발생했습니다. 잠시후 다시 시도해주세요',
    });
  } finally {
    // 로딩 종료 및 UI 복구
    spinner.remove(); // 스피너 제거
    buttonText.style.display = 'inline'; // 텍스트 복구
  }
}

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
  console.log(surveySeq);
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

      if ($item.find('.j-survey-name-input').length === 0 && ccSeq === '18') {
        question.name = '개인 정보 수집 이용 동의서';
      } else {
        question.name =
          ($item.find('.j-survey-name-input').val() || ' ').trim() || ' ';
      }
      if (
        $item.find('.j-survey-content > textarea').length === 0 &&
        ccSeq === '18'
      ) {
        question.description = '개인 정보 수집 이용 동의서';
      } else {
        question.description =
          ($item.find('.j-survey-content > textarea').val() || ' ').trim() ||
          ' ';
      }
      console.log(isEssential);
      question.ccSeq = ccSeq;
      question.isEssential = isEssential !== undefined ? isEssential : 'Y';

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
        console.log(response);
        let newCard = $('.content').find('.j-new-card');
        newCard.find('.j-q-order').val(response.data.order);
        newCard.append(
          `<input type="hidden" value="${response.data.seq}" class="j-qseq">`
        );
        newCard.removeClass('j-new-card');

        if (response.data.ccSeq === 7 || response.data.ccSeq === 8) {
          let questionItemSeq = response.data.questionItems[0].seq;
          newCard
            .find('.j-option-input-radio > input[type="text"]')
            .attr('id' + questionItemSeq);
          // .each((idx, item) => {
          //   $(item).addClass('qi ' + qi.seq);
          // });
        } else if (response.data.ccSeq === 9) {
          let startSeq = response.data.questionItems[0].seq;
          //newCard.find('.j-num-start').addClass('qi ' + startSeq);
          newCard.find('.j-num-start').attr('id' + startSeq);
          let endSeq = response.data.questionItems[1].seq;
          // newCard.find('.j-num-end').addClass('qi ' + endSeq);
          newCard.find('.j-num-end').attr('id' + startSeq);
        } else if (response.data.ccSeq === 10) {
          newCard.find('select').addClass('qiBox');
        } else if (response.data.ccSeq === 11) {
          let rowSeq = response.data.questionItems[0].seq;
          newCard
            .find('.j-row-input')
            .eq(0)
            .addClass('qi ' + rowSeq);
          let colSeq = response.data.questionItems[1].seq;
          newCard
            .find('.j-col-input')
            .eq(0)
            .addClass('qi ' + colSeq);
        }

        newCard.removeClass('j-new-card');

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
      console.log('content = ' + content);
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
let hasError = [];

function lenValid(target, length, questionorder, type) {
  if (target.length > length) {
    const error = errorCreate(
      questionorder,
      `${type}에 대한 입력은 ${length}자까지만 가능합니다.`
    );
    hasError.push(error);
    return false;
  }
  return true;
}

function errorCreate(order, message) {
  return {
    order: order,
    message: message,
  };
}

function showError() {
  let targetCard = $('.content')
    .find('.j-question-card')
    .filter(function () {
      return $(this).find('.j-q-order').val() === hasError[0].order;
    })
    .eq(0); // 첫 번째 요소만 선택

  console.log('ihih');
  console.log(targetCard);

  targetCard
    .addClass('j-error-card')[0]
    .scrollIntoView({ behavior: 'smooth', block: 'center' });
  Swal.fire({
    icon: 'error',
    title: '작성하신 질문을 다시 확인해주세요',
    text: hasError[0].message,
  });
  hasError = [];
}

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

      // updateQuestion.name =
      //   ($item.find('.j-survey-name-input').val() || ' ').trim() || ' ';
      updateQuestion.name = $item.find('.j-survey-name-input').val();
      console.log('이름' + updateQuestion.name);
      if (
        updateQuestion.name === '' ||
        updateQuestion.name === null ||
        updateQuestion.name === ' '
      ) {
        hasError.push(
          createError(questionOrder, '질문명은 반드시 작성해주셔야 합니다.')
        );
      } else {
        lenValid(updateQuestion.name, 100, questionOrder);
      }

      updateQuestion.description =
        ($item.find('.j-survey-content > textarea').val() || ' ').trim() || ' ';
      lenValid(updateQuestion.description, 500, questionOrder);
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
//row랑 cal에 데이터 삭제시 removeQuestionItemList에 추가
function storeItemChartListInLocal(target) {
  let questionSeqs = $(target)
    .parents('.j-question-card')
    .find('.j-qseq')
    .val();
  if (questionSeqs === null && questionSeqs === undefined) return;
  questionSeqs = parseInt(questionSeqs);
  let extractedNumber = seqExtract($(target).prev());

  let obj = { seq: extractedNumber, questionSeq: questionSeqs };
  storeUpdateQuestionItemInLocal(
    obj,
    extractedNumber,
    'removeQuestionItemList'
  );
}

function validCheck() {
  let errorResult = true;
  $('.content')
    .find('.j-question-card')
    .each((idx, item) => {
      let $target = $(item);
      console.log($target);
      let order = $target.find('.j-q-order').val();
      let name = $target.find('.j-survey-name-input').val();
      console.log('name' + name);
      let description = $target.find('.j-survey-content').val();
      let ccSeq = $target.find('.j-cseq').val();
      notEmptyAndnotNullValid('질문명', name, order);
      lenValid(name, 100, order, '질문명');
      lenValid(description, 500, order, '질문 설명');
      if (ccSeq === '8' || ccSeq === '7') {
        //item item List
        $(item)
          .find('.j-question-content-box input[type="text"]')
          .each((idx, item) => {
            let val = $(item).val();
            lenValid(val, 50, order, '옵션 입력');
          });
      } else if (ccSeq === '10') {
        console.log('hi');
        $(item)
          .find('.j-dropdwon option')
          .each((idx, item) => {
            let val = $(item).val();
            console.log(val);
            lenValid(val, 50, order, '옵션 입력');
          });
      }
    });

  if (hasError.length !== 0) {
    errorResult = false;
  }
  return errorResult;
}

function notEmptyAndnotNullValid(targetSection, target, order) {
  if (target === '' || target === ' ' || target === null) {
    hasError.push(errorCreate(order, targetSection + '은 반드시 입력해주세요'));
  }
}

// 작업 큐를 위한 배열 생성
let jobQueue = [];

// 작업을 등록하는 함수
function addJob(job) {
  jobQueue.push(job);
}

// 작업을 순차적으로 처리하는 함수
async function processJobs() {
  while (true) {
    if (jobQueue.length > 0) {
      // 큐에서 첫 번째 작업을 꺼내서 처리
      const job = jobQueue.shift();

      await handleJob(job);
    } else {
      // 큐가 비어있으면 잠시 대기
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

// 각 작업에 해당하는 처리 함수들 (기존과 동일)
const jobHandlers = {
  title: updateSurveyNameAuto, // 설문 제목 수정
  contentUpdate: updateSurveyContent, // 질문 내용 수정
  deleteQuestion: deleteSurveyQuestion,
  essentialUpdate: updateRequiredField, // 질문 필수 표시 수정
  typeChange: updateQuestionCcseq, // 질문 타입 변경
  addResponseItem: addSurveyResponseItem, // 질문 응답 항목 추가
  deleteResponseItem: deleteSurveyResponseItem, // 질문 응답 항목 삭제
  updateResponseContent: updateSurveyResponseContent, // 질문 응답 항목 내용 수정
};

// 작업 처리 함수
async function handleJob(job) {
  console.log('처리 중인 작업:', job);
  let handler;
  if (Array.isArray(job)) {
    handler = jobHandlers[job[0].job];
  } else {
    handler = jobHandlers[job.job];
  }
  if (handler) {
    return await handler(job);
  } else {
    console.log('알 수 없는 작업 코드:', job.job);
  }
}

// 각 작업에 해당하는 함수들
async function updateSurveyNameAuto(job) {
  await questionUpdateProcess({ name: job.content, seq: job.seq });
}

async function updateSurveyContent(job) {
  await questionUpdateProcess({ description: job.content, seq: job.seq });
}

async function updateRequiredField(job) {
  await questionUpdateProcess({ isEssential: job.content, seq: job.seq });
}

async function addSurveyResponseItem(job) {
  // job이 배열인지 확인 후 배열 형태로 변환
  const jobList = Array.isArray(job) ? job : [job];

  // jobList를 서버로 전송할 데이터 형식으로 변환
  const requestData = jobList.map((j) => ({
    seq: 0,
    questionSeq: j.questionSeq,
    orderNum: j.orderNum,
    description: j.content,
    ccSeq: j.ccSeq,
  }));

  // questionItemInsertProcess 호출 및 seqList 반환
  const seqList = await questionItemInsertProcess(requestData);

  console.log(seqList);
  // seqList가 배열 형태로 반환된다고 가정하고 각 DOM 요소에 id 적용
  jobList.forEach((j, index) => {
    const seq = seqList[index].seq;
    $(j.dom).attr('id', seq);
  });
}

async function deleteSurveyResponseItem(job) {
  await questionItemDeleteProcess({ questionItemSeq: job.questionItemSeq });
}

async function updateSurveyResponseContent(job) {
  if (!job.seq) {
    return addSurveyResponseItem(job);
  } else {
    await questionItemUpdateProcess({
      description: job.content,
      questionItemSeq: job.seq,
    });
  }
}

async function deleteSurveyQuestion(job) {
  await questionDeleteProcess({
    seq: job.questionSeq,
    SurveySeq: job.surveySeq,
  });
}

async function updateSurveyResponseContent(job) {
  if (!job.seq) {
    return addSurveyResponseItem(job);
  } else {
    await questionItemUpdateProcess({
      description: job.content,
      questionItemSeq: job.seq,
    });
  }
}

async function updateQuestionCcseq(job) {
  questionUpdateProcess({ seq: job.questionSeq, ccSeq: job.ccSeq });
}

// 서버로 데이터 전송 관련 함수들 (기존과 동일)
async function questionUpdateProcess(data) {
  let formData = new FormData();
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  return $.ajax({
    url: '/api/question/auto',
    type: 'PATCH',
    data: formData,
    processData: false,
    contentType: false,
  }).catch((error) => {
    console.error('AJAX 요청 오류:', error);
    throw error;
  });
}

async function questionItemUpdateProcess(data) {
  return $.ajax({
    url: '/api/question/item/auto',
    type: 'PATCH',
    data: data,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (response) {
      console.log('요청 성공:', response);
    },
    error: function (error) {
      console.error('AJAX 요청 오류:', error);
      throw error;
    },
  });
}

async function questionItemInsertProcess(data) {
  console.log(data);
  return $.ajax({
    url: '/api/question/item/auto',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
  })
    .then((response) => {
      return response.data; // 응답 데이터 반환
    })
    .catch((error) => {
      throw error;
    });
}

async function questionItemDeleteProcess(data) {
  return $.ajax({
    url: '/api/question/item/auto',
    type: 'DELETE',
    data: data,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  })
    .then((response) => {
      return response.data; // 응답 데이터 반환
    })
    .catch((error) => {
      throw error;
    });
}

async function questionDeleteProcess(data) {
  return $.ajax({
    url: '/api/question/auto',
    type: 'DELETE',
    data: data,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  })
    .then((response) => {
      return response.data; // 응답 데이터 반환
    })
    .catch((error) => {
      throw error;
    });
}

// 초기화 시 작업 처리 시작
processJobs();

// function addJob(newJob) {
//   // delete 작업이 들어온 경우 모든 관련 작업 제거 후 추가
//   if (newJob.priority === 'delete') {
//     removeJobsByQuestionSeq(newJob.questionSeq);
//     jobQueue.push(newJob);
//   } else {
//     // create 또는 update 작업
//     if (!hasDeleteJob(newJob.questionSeq)) {
//       const existingJobIndex = findJobIndex(newJob.questionSeq, newJob.questionItemSeq);
//       if (existingJobIndex !== -1) {
//         // 기존 작업 덮어쓰기
//         jobQueue[existingJobIndex] = newJob;
//       } else {
//         jobQueue.push(newJob);
//       }
//     }
//   }

//   // 우선순위별 정렬
//   sortJobQueueByPriority();
// }

// // 특정 questionSeq에 대한 모든 작업 제거 (delete 작업을 위해)
// function removeJobsByQuestionSeq(questionSeq) {
//   jobQueue = jobQueue.filter((job) => job.questionSeq !== questionSeq);
// }

// // 동일 questionSeq의 delete 작업이 있는지 확인
// function hasDeleteJob(questionSeq) {
//   return jobQueue.some((job) => job.questionSeq === questionSeq && job.priority === 'delete');
// }

// // 동일 questionSeq와 questionItemSeq 작업 찾기
// function findJobIndex(questionSeq, questionItemSeq) {
//   return jobQueue.findIndex(
//     (job) => job.questionSeq === questionSeq && job.questionItemSeq === questionItemSeq
//   );
// }

// // 우선순위별 정렬: delete > create > update 순
// function sortJobQueueByPriority() {
//   const priorityOrder = { delete: 3, create: 2, update: 1 };
//   jobQueue.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
// }

// 작업 큐 객체로 구조화
// let jobQueue = {};

// // 작업 등록 함수
// function addJob(newJob) {
//   const { questionSeq, priority } = newJob;

//   // questionSeq별로 작업 배열이 없으면 생성
//   if (!jobQueue[questionSeq]) {
//     jobQueue[questionSeq] = [];
//   }

//   // 우선순위가 delete인 경우 모든 관련 작업 제거 후 추가
//   if (priority === 'delete') {
//     jobQueue[questionSeq] = [newJob];
//   } else {
//     // delete 작업이 없는 경우에만 추가
//     const deleteJobExists = jobQueue[questionSeq].some((job) => job.priority === 'delete');
//     if (!deleteJobExists) {
//       // 동일 questionItemSeq 작업이 있는지 확인
//       const existingJobIndex = jobQueue[questionSeq].findIndex(
//         (job) => job.questionItemSeq === newJob.questionItemSeq
//       );

//       if (existingJobIndex !== -1) {
//         // 기존 작업 덮어쓰기
//         jobQueue[questionSeq][existingJobIndex] = newJob;
//       } else {
//         // 새로운 작업 추가
//         jobQueue[questionSeq].push(newJob);
//       }
//     }
//   }

//   // 우선순위별 정렬: delete > create > update 순
//   jobQueue[questionSeq].sort((a, b) => {
//     const priorityOrder = { delete: 3, create: 2, update: 1 };
//     return priorityOrder[b.priority] - priorityOrder[a.priority];
//   });
// }

// // processJobs 함수 수정
// async function processJobs() {
//   while (true) {
//     const questionSeqs = Object.keys(jobQueue);
//     if (questionSeqs.length > 0) {
//       // 각 questionSeq에 대해 첫 번째 작업을 꺼내서 처리
//       for (const questionSeq of questionSeqs) {
//         const job = jobQueue[questionSeq].shift();
//         await handleJob(job);

//         // 작업 처리 후 해당 questionSeq에 작업이 더 없다면 삭제
//         if (jobQueue[questionSeq].length === 0) {
//           delete jobQueue[questionSeq];
//         }
//       }
//     } else {
//       // 큐가 비어있으면 잠시 대기
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//     }
//   }
// }

// // 예제 작업 객체
// let job = {
//   job: 'updateResponseContent',
//   content: val,
//   seq: questionItemSeq,
//   priority: 'update', // 우선순위
//   target: 'question_item',
//   orderNum: orderNum, // orderNum 값을 job 객체에 추가
//   dom: this,
//   questionSeq: questionSeq,
// };

// // 초기화 시 작업 처리 시작
// processJobs();
