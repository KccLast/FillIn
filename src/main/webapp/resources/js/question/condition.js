let conditionWhiteList = ['7', '9', '10', '12', '13', '19'];
/** condition event*/
$(function () {
  // $('.top-basic').click(function () {
  //   if (!$(this).hasClass('condition-nav-1-selected')) {
  //     $('.top-condition').removeClass('condition-nav-1-selected');
  //     $(this).addClass('condition-nav-1-selected');
  //     $('.nav-body-1').show();
  //     $('.nav-body-2').hide();
  //   }
  // });
  $('.top-condition').click(function () {
    if (!$(this).hasClass('condition-nav-1-selected')) {
      //$('.top-basic').removeClass('condition-nav-1-selected');
      $(this).addClass('condition-nav-1-selected');
      $('.nav-body-1').hide();
      $('.nav-body-2').show();
    }
  });

  $('.j-condition-plus-img > div, .j-condition-plus-img > img').click(
    async function () {
      let questionSeq = $(this)
        .parents('.condition-nav-box')
        .find('input[type="hidden"]')
        .val();
      let filteredLengthConditionList = getQuestionConditions(questionSeq);
      let filteredLength;
      console.log(filteredLengthConditionList);
      if (filteredLengthConditionList) {
        filteredLength = filteredLengthConditionList.length;
        filteredLength++;
      } else {
        filteredLength = 1;
      }
      let targetCard = $('.j-question-card').filter(function () {
        return $(this).find('.j-qseq').val() === questionSeq + '';
      });
      let ccSeq = targetCard.find('.j-cseq').val();
      console.log(ccSeq);
      if (ccSeq === '' || ccSeq === undefined || ccSeq === null) {
        Swal.fire({
          icon: 'warning',
          title: '질문을 선택해 주세요 ',
          text: '조건을 생성할 질문을 선택해주세요!.',
        });
        return;
      } else if (!compareConditionWhiteList(ccSeq)) {
        Swal.fire({
          icon: 'error',
          title: '조건 생성 실패 ',
          text: '조건을 생성할 수 있는 타입의 질문이 아닙니다.',
        });
        return;
      }

      let conditionList = $(this).parent().prev().find('.accordion');
      let getConditionFrame = await fetchConditionFrame();

      // 조건 프레임 추가
      conditionList.append(getConditionFrame);
      let conditions = getQuestionConditions(questionSeq);

      let lastAccordionItem = conditionList.find('.accordion-item:last');

      // await fillItemOption(lastAccordionItem, questionSeq, 0);
      // await fillNextItemOption(lastAccordionItem, questionSeq, 0);

      // 새로운 조건 데이터를 로컬스토리지에 저장
      let conditionData = {
        seq: '-1',
        from: parseInt(questionSeq),
        to: '', // 'to' 값은 필요에 따라 설정
        condition: ' ', // 조건에 해당하는 값 설정
        operation: ' ', // 연산 또는 동작 설정
      };

      conditionData = await saveAccordionToLocalStorage(
        questionSeq,
        conditionData
      );

      await fillItemOption(lastAccordionItem, questionSeq, conditionData.id);
      await fillNextItemOption(
        lastAccordionItem,
        questionSeq,
        conditionData.id
      );

      // if (
      //   filteredLength === '' ||
      //   filteredLength === undefined ||
      //   filteredLength === null ||
      //   filteredLength === 0
      // ) {
      //   filteredLength = 1;
      // } else {
      //   filteredLength++;
      // }

      console.log(filteredLength);
      lastAccordionItem.find('.con-order').text(filteredLength);
    }
  );

  // $('.nav-body-2').on(
  //   'change',
  //   '.contition-option-se, .contition-next-se',
  //   function () {
  //     let questionSeq = $(this)
  //       .closest('.condition-nav-box')
  //       .find('input[type="hidden"]')
  //       .val(); // questionSeq 가져오기

  //     // 현재 select 요소와 선택된 값 가져오기
  //     let selectName = $(this).attr('class'); // .contition-option-se 또는 .contition-next-se
  //     let selectedValue = $(this).val();

  //     // 로컬스토리지에 저장
  //     // saveSelectedOptionToLocalStorage(questionSeq, selectName, selectedValue);
  //   }
  // );

  // 아코디언 이벤트 위임
  // 아코디언 클릭 이벤트 처리
  // 아코디언 클릭 이벤트 처리
  $('.accordion').on('click', '.accordion-button', function () {
    const $button = $(this); // 클릭한 버튼
    const $collapse = $button
      .closest('.accordion-item')
      .find('.accordion-collapse'); // 해당 아코디언의 내용
    const $arrow = $button.find('.arrow'); // 화살표 선택

    // 현재 열려 있는지 확인
    const isOpen = $collapse.is(':visible');

    // 모든 아코디언 닫기
    $('.accordion-collapse').slideUp(300);
    $('.accordion-button').removeClass('active'); // 모든 버튼에서 active 제거
    $('.arrow').removeClass('rotate'); // 모든 화살표 초기화

    if (!isOpen) {
      // 클릭한 아코디언 열기
      $collapse.stop().slideDown(300);
      $button.addClass('active'); // 현재 버튼에 active 추가
      $arrow.addClass('rotate'); // 화살표 회전
    }
  });

  //변경된 select 값 로컬 스토리지에 저장
  $('.nav-body-2').on('change', '.condition-ac-body select', function () {
    //조건 번호, questionSeq,operation, nextSeq
    let body = $(this).parents('.accordion-item');
    let conOrder = body.find('.con-order').text();
    let questionSeq = findQuestionSeqInConditionNav(this);

    let conditionList = getQuestionConditions(questionSeq);

    let ConditionId = body.find('input[type="hidden"]').val();
    let operation = '같음';
    let nextSeq = body.find('.contition-next-se').val();
    let optionVal = body.find('.contition-option-se').val();

    if (optionVal === '' || optionVal === null || optionVal === undefined) {
      optionVal = '같음';
    }
    console.log(ConditionId);
    console.log(conditionList);
    let findCon = conditionList.filter(
      (con) => con.id === parseInt(ConditionId)
    )[0];
    console.log('찾은조건=', findCon.seq);
    let saveCondition = {
      seq: findCon.seq,
      id: parseInt(ConditionId),
      from: parseInt(questionSeq),
      to: parseInt(nextSeq), // 'to' 값은 필요에 따라 설정
      condition: optionVal, // 조건에 해당하는 값 설정
      operation: operation, // 연산 또는 동작 설정
    };
    console.log(saveCondition);
    saveConditionDataInLocal(saveCondition);
    saveConditionInDB(saveCondition);
    let nodeId = getNodeIdByQuestionSeq(saveCondition.to, saveCondition.from);
    deleteEdge(nodeId.from, saveCondition.id);
    addConditionalFlow(nodeId.from, nodeId.to, saveCondition.id, conOrder);
    setConditionNav2(questionSeq, nextSeq);
    redrawNetWork();
  });

  $('.nav-body-2').on('change', '.contition-next-se', function () {
    //이게 변경되면, 기존의 condition을 버리고, 새롭게 이어줘야함 아 애초에 condition에 Id가 있구낭
    // let conditionItem = $(this).parents('.accordion-item');
    // let conditionId = parseInt(
    //   conditionItem.find('input[type="hidden"]').val() //conditionId;
    // );
    // let questionSeq = $(this)
    //   .closest('.condition-nav-box')
    //   .find('input[type="hidden"]')
    //   .val(); //questionSeq;
    // let conditions = getQuestionConditions(questionSeq);
  });

  // $('.basic-move').on('change', 'select', function () {
  //   //일단 questionSeq를 찾아와야함
  //   let questionSeq = $(this)
  //     .parents('.condition-nav-box')
  //     .find('input[type="hidden"]')
  //     .val();
  //   //from
  //   console.log('quSeq' + questionSeq);

  //   //to
  //   let toSeq = $(this).val();
  //   if (toSeq === null || toSeq === '' || toSeq === undefined) return;
  //   console.log('toSeq' + toSeq);
  //   //node에 변화가 있는건 아니고, edge만 옮기면 됨
  //   //기본 node에 원래 연결되어 있던 edge는 conditionId = 0이면서, from과 to가 일치하는 것
  //   let edgeId = { from: parseInt(questionSeq), to: parseInt(toSeq) };
  //   edgeId.conditionId = 0;
  //   let newEdge = convertConditionToedge(edgeId, '기본 흐름');

  //   //condition 수정
  //   let conditions = getQuestionConditions(questionSeq);

  //   let findCondition = conditions.find(
  //     (condition) =>
  //       condition.id === 0 && condition.from === parseInt(questionSeq)
  //   );
  //   if (
  //     findCondition === null ||
  //     findCondition === undefined ||
  //     findCondition === ''
  //   ) {
  //     let saveCondition = {
  //       id: 0,
  //       from: parseInt(questionSeq),
  //       to: parseInt(toSeq), // 'to' 값은 필요에 따라 설정
  //       condition: ' ', // 조건에 해당하는 값 설정
  //       operation: ' ', // 연산 또는 동작 설정
  //     };
  //     saveConditionDataInLocal(saveCondition);
  //     saveConditionInDB(saveCondition);
  //   } else {
  //     findCondition.to = parseInt(toSeq);
  //     saveConditionListInLocalStorage(conditions, questionSeq);
  //     saveConditionInDB(findCondition);
  //   }

  //   //edge 수정
  //   redrawDefaultOrder();
  // });

  // $('.top-basic').click(function () {
  //   let questionSeq = $(this)
  //     .parents('.condition-nav-box')
  //     .find('input[type="hidden"]')
  //     .val();

  //   let conditionList = getQuestionConditions(questionSeq);

  //   let findCondition = conditionList.find((con) => con.id === 0);
  //   console.log(findCondition);

  //   setConditionNav2(findCondition.from, findCondition.to);
  // });

  $('.nav-body-2').on('click', '.accordion-button', function () {
    let questionSeq = findQuestionSeqInConditionNav(this);
    // $(this)
    //   .parents('.condition-nav-box')
    //   .find('input[type="hidden"]')
    //   .val();
    let toSeq = $(this)
      .parents('.accordion-item')
      .find('.contition-next-se')
      .val();
    let conditionList = getQuestionConditions(questionSeq);

    setConditionNav2(questionSeq, toSeq);
  });

  $('#fixedNode >button').click(function () {
    let currentText = $(this).text(); // 버튼의 현재 텍스트 가져오기

    if (currentText === '조건 펼치기') {
      $(this).text('조건 접기'); // 텍스트 변경
      showAllConditionFlow();
    } else {
      $(this).text('조건 펼치기'); // 원래 텍스트로 변경
      deleteAllConditionalFlow();
    }
    console.log(edges.get());
    network.redraw();
  });

  /*조건 삭제*/
  $('.condition-nav-1').on(
    'click',
    '.ac-x-btn > img, .ac-x-btn > span',
    function () {
      var confirmResult;
      let _this = this;
      Swal.fire({
        title: '정말로 조건을 삭제하시겠습니까??',
        text: '한번 삭제한 조건은 다시는 되돌릴 수 없습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '취소',
        confirmButtonText: '삭제',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCondition(_this)
            .then(() => {
              // 삭제 완료 메시지 표시
              Swal.fire({
                title: '삭제 완료!',
                text: '조건을 성공적으로 삭제했습니다.',
                icon: 'success',
              });
              //아코디언 아이템 삭제와 동시에 재졍렬 해줘야함
              sortConditionAccordion(_this);
            })
            .catch((error) => {
              // 오류 메시지 표시
              Swal.fire({
                title: '삭제 실페!',
                text: '조건 삭제에 실패했습니다. 삭제하시려는 조건을 다시 한번 확인해주세요',
                icon: 'error',
              });
              console.error('삭제 중 오류 발생:', error); // 오류 로그 출력
            });
        }
      });
    }
  );
});

var container;
var network;
var defaultNodeList;
var defaultEdgeList;

var edges;
var nodes;

var options = {
  nodes: {
    shape: 'box',
    borderWidth: 0, // 테두리 없음
    shadow: {
      enabled: true,
      color: 'rgba(100, 100, 111, 0.2)', // 그림자 색상
      size: 20, // 그림자의 크기
      x: 5, // X축 이동
      y: 5, // Y축 이동
    },
    widthConstraint: {
      maximum: 150, // 박스 너비 고정
      minimum: 150, // 최소 너비
    },
    heightConstraint: {
      minimum: 50, // 최소 높이
    },
    color: {
      background: '#ffffff', // 기본 배경 흰색
      highlight: {
        background: '#e6f7ff', // 하이라이트 시 배경
        border: '#1890ff', // 하이라이트 테두리
      },
      hover: {
        background: '#f8f9fa', // 호버 시 배경색
        border: '#1890ff', // 호버 시 테두리
      },
    },
    font: {
      color: '#000000', // 글자 색상 검정
      size: 14,
      face: 'Arial',
      multi: true, // 여러 줄 지원
    },
    margin: 10, // 내부 여백
  },
  edges: {
    width: 2,
    color: {
      color: '#848484', // 기본 엣지 색상
      highlight: '#005bac', // 하이라이트 엣지 색상
      hover: '#848484', // 호버 시 엣지 색상
    },
    arrows: { to: { enabled: true } }, // 화살표 활성화
    smooth: {
      type: 'curvedCCW', // 커브 스타일
      roundness: 0.2, // 곡률 설정
    },
  },
  physics: {
    enabled: false, // 물리 엔진 비활성화
  },
};

function sortConditionAccordion(target) {
  let $parentsAccordion = $(target).parents('.accordion');

  let questionSeq = $(target)
    .parents('.condition-nav-box')
    .find('input[type="hidden"]')
    .val();
  console.log(questionSeq);
  let nodeList = nodes.get();
  console.log(nodeList);
  let findnode = nodeList.filter((node) => node.seq === parseInt(questionSeq));
  console.log(findnode);
  let nodeId = findnode[0].id;
  //일단 conditions를 가지고 와야함
  $(target).parents('.accordion-item').remove();

  $parentsAccordion.find('.accordion-item').each((idx, item) => {
    $(item)
      .find('.con-order')
      .text(idx + 1);
  });

  redrawNetWork();

  console.log(nodeId);
  if (nodeId !== undefined) {
    // 노드를 선택한 후 강제로 클릭 이벤트 발생
    network.selectNodes([nodeId]); // 노드를 선택
    network.emit('click', { nodes: [nodeId] }); // 해당 노드에 click 이벤트 트리거
  }
}
async function deleteCondition(target) {
  return new Promise((resolve, reject) => {
    try {
      if (target === undefined || target === null || target === '') {
        resolve();
      }

      let questionSeq = findQuestionSeqInConditionNav(target);
      let conditionId = $(target)
        .parent()
        .prev()
        .find('.contition-next-se > option')
        .attr('class');
      let conditions = getQuestionConditions(questionSeq);

      let findCondition = conditions.filter(
        (con) => con.id === parseInt(conditionId)
      )[0];
      console.log(findCondition);

      // Edge 삭제 및 DB 반영
      let targetEdge = convertConditionToedge(
        findCondition,
        '조건부 흐름',
        findCondition.id
      );

      if (targetEdge === false) resolve();

      // 비동기 작업들을 수행하고 모두 완료된 후 resolve 호출
      deleteEdge(targetEdge.from, parseInt(conditionId));
      if (findCondition.seq !== '-1') {
        deleteConditionInDB(findCondition);
      }

      deleteConditionInLocalSt(findCondition);
      // 모든 작업이 성공적으로 완료되면 resolve 호출
      resolve();
    } catch (error) {
      // 에러 발생 시 reject 호출
      reject(error);
    }
  });
}

function deleteConditionInLocalSt(findCondition) {
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  console.log(storedData);
  // 해당 questionSeq의 조건 배열 가져오기
  let conditions = storedData[findCondition.from] || [];

  console.log(findCondition);
  console.log(conditions);

  // 조건 배열에서 동일한 ID를 가진 조건의 인덱스 찾기
  let existingIndex = conditions.findIndex(
    (condition) =>
      condition.id === findCondition.id &&
      condition.from === findCondition.from &&
      condition.seq === findCondition.seq &&
      condition.to === findCondition.to
  );

  if (existingIndex !== -1) {
    // 조건이 존재하면 삭제
    conditions.splice(existingIndex, 1);
  }

  // 수정된 배열을 로컬스토리지에 다시 저장
  storedData[findCondition.from] = conditions;
  localStorage.setItem('accordionData', JSON.stringify(storedData));
}

async function deleteConditionInDB(targetCondition) {
  return $.ajax({
    url: '/api/question/condition',
    type: 'DELETE',
    data: JSON.stringify(targetCondition),
    contentType: 'application/json',
    success: function (response) {},
    error: function (error) {},
  });
}

function findQuestionSeqInConditionNav(target) {
  return $(target)
    .parents('.condition-nav-box')
    .find('input[type="hidden"]')
    .val();
}
function saveConditionDataInLocal(saveCondition) {
  let { id, from } = saveCondition;

  // 로컬스토리지에서 데이터 불러오기
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};

  // 해당 questionSeq의 조건 배열 가져오기
  let conditions = storedData[from] || [];

  // 조건 배열에서 동일한 ID를 가진 조건의 인덱스 찾기
  let existingIndex = conditions.findIndex(
    (condition) => condition.id === saveCondition.id
  );

  if (existingIndex !== -1) {
    // 조건이 존재하면 교체
    conditions[existingIndex] = saveCondition;
    console.log(`Condition with ID ${id} updated.`);
  }

  // 수정된 배열을 로컬스토리지에 다시 저장
  storedData[from] = conditions;
  localStorage.setItem('accordionData', JSON.stringify(storedData));

  //생각해보니 걍 여기서 다시 그리게 하면 되겠구나ㅓ?
}

function getQuestionConditions(questionSeq) {
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};

  let conditions = storedData[questionSeq];

  return conditions;
}

function saveConditionListInLocalStorage(conditions, questionSeq) {
  console.log('저장할 condition = ', conditions);
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  storedData[questionSeq] = conditions;

  localStorage.setItem('accordionData', JSON.stringify(storedData));
}

async function parseCondition(json) {
  let question = JSON.parse(json);

  //모든 엣지와 condition node들을 삭제해야함 localstoreage도 비워야함

  initcondition(question.questions);
  createDefaultOrder(question.questions);
  showAllConditionFlow();
  //conditionCardCon
}

function createDefaultOrder(questions) {
  let nodeList = [];
  let edgeList = [];

  for (let i = 0; i < questions.length; i++) {
    nodeList.push(createNode(i, questions[i], (i + 1) * 150));
  }
  nodes = new vis.DataSet(nodeList);

  // for (let i = 0; i < questions.length - 1; i++) {
  //   // 로컬스토리지에서 조건 불러오기
  //   let existingConditionList = getQuestionConditions(questions[i].seq) || [];
  //   console.log(`기존 조건 리스트:`, existingConditionList);

  //   // conditionId가 0인 조건이 있는지 확인
  //   let conditionWithIdZero = existingConditionList.find(
  //     (condition) => condition.id === 0
  //   );

  //   let conditionToUse;

  //   if (conditionWithIdZero) {
  //     // 조건 ID가 0인 조건이 존재하면 그대로 사용
  //     console.log(`기존 조건 사용:`, conditionWithIdZero);
  //     conditionToUse = conditionWithIdZero;
  //   } else {
  //     // 조건 ID가 0인 조건이 없는 경우 새로 생성
  //     let defaultCondition = createDefaultCondition(
  //       questions[i].seq,
  //       questions[i + 1].seq
  //     );
  //     console.log(`새로운 기본 조건 생성:`, defaultCondition);

  //     if (existingConditionList.length > 0) {
  //       // 기존 리스트에 새 기본 조건 추가
  //       existingConditionList.push(defaultCondition);
  //       console.log(`새 조건이 추가된 리스트:`, existingConditionList);
  //     } else {
  //       // 기존 리스트가 없는 경우, 새 리스트로 초기화
  //       existingConditionList = [defaultCondition];
  //       console.log(
  //         `기존 리스트가 없어 새 리스트로 초기화:`,
  //         existingConditionList
  //       );
  //     }

  //     // 수정된 리스트를 로컬스토리지에 저장
  //     saveConditionListInLocalStorage(existingConditionList, questions[i].seq);

  //     conditionToUse = defaultCondition;
  //   }

  //   // edgeList에 조건을 변환하여 추가
  //   edgeList.push(convertConditionToedge(conditionToUse, '기본 흐름'));
  // }

  for (let i = 0; i < questions.length - 1; i++) {
    // 로컬스토리지에서 조건 불러오기
    // let existingConditionList = getQuestionConditions(questions[i].seq) || [];
    // console.log(`기존 조건 리스트:`, existingConditionList);

    edgeList.push(createEdge(i, i + 1));
    // edgeList에 조건을 변환하여 추가
    //edgeList.push(convertConditionToedge(conditionToUse, '기본 흐름'));
  }

  edges = new vis.DataSet(edgeList);
  let data = { nodes: nodes, edges: edges };

  container = document.getElementById('conditionCardCon');
  network = new vis.Network(container, data, options);
}

function convertConditionToedge(condition, label, conditionOrder, viewIdx) {
  let nodeList = nodes.get();
  let fromNode = nodeList.find((node) => node.seq === condition.from);
  let toNode = nodeList.find((node) => node.seq === condition.to);
  let edge;
  if (toNode === undefined) return false;

  if (label.includes('기본 흐름')) {
    edge = createEdge(fromNode.id, toNode.id);
  } else {
    edge = createConditionedge(fromNode.id, toNode.id, conditionOrder, viewIdx);
  }

  return edge;
}
function convertEdgeToSeq(edge) {
  let nodeList = nodes.get();
  let fromSeq = nodeList.find((node) => node.id === edge.from);
  let toSeq = nodeList.find((node) => node.id === edge.to);
  return {
    from: fromSeq.seq,
    to: toSeq.seq,
  };
}

function createNode(idx, question, yp) {
  return {
    id: idx,
    label: truncateLabel(question.name, 10), // 라벨 길이 제한
    shape: 'box',
    title: question.name, // 전체 이름은 툴팁에 표시
    color: {
      background: '#ffffff', // 배경색 흰색
      highlight: {
        background: '#e6f7ff', // 하이라이트 시 배경
        border: '#1890ff', // 하이라이트 테두리
      },
      hover: {
        background: '#f8f9fa', // 호버 시 배경
        border: '#1890ff', // 호버 시 테두리
      },
    },
    x: 480, // 노드 X 위치
    y: yp, // 노드 Y 위치
    condition: 0,
    seq: question.seq,
    surveySeq: question.surveySeq,
    shadow: {
      enabled: true, // 그림자 활성화
      color: 'rgba(100, 100, 111, 0.2)', // 그림자 색상
      size: 20, // 그림자 크기
      x: 5, // X축 이동
      y: 5, // Y축 이동
    },
  };
}
function createDefaultCondition(from, to) {
  return {
    seq: '-1',
    id: 0,
    from: from,
    to: to, // 'to' 값은 필요에 따라 설정
    condition: ' ', // 조건에 해당하는 값 설정
    operation: ' ', // 연산 또는 동작 설정
  };
}
async function createNewNode(idx, nodeSeq, surveySeq) {
  console.log(edges.get());
  console.log(nodes.get());
  let nextNodeSeq = nodes.get().filter((node) => node.id === idx - 1).seq;

  let condition = createDefaultCondition(nodeSeq, nextNodeSeq);

  let newnode = createNode(
    idx,
    { name: '질문명', seq: nodeSeq, surveySeq: surveySeq },
    (idx + 1) * 140
  );
  newnode.seq = nodeSeq;
  //node는 이렇게 만들면 됨
  nodes.add(newnode);

  edges.add(createEdge(idx - 1, idx));

  redrawNetWork();
}

function createEdge(from, to) {
  return {
    from: from,
    to: to,
    label: '기본 흐름',
    color: { color: 'black' },
    conditionId: 0,
    smooth: false,
  };
}

function createConditionedge(from, to, conditionOrder, viewIdx) {
  return {
    from: from,
    to: to,
    label: `조건부 흐름 (${viewIdx})`,
    color: { color: 'red' },
    dashes: true,
    width: 2,
    smooth: {
      type: 'curvedCCW', // 곡선 방향 설정 (CCW: 시계 반대 방향)
      roundness: 0.5 + conditionOrder * 0.2, // 곡률 증가
      forceDirection: 'vertical', // 수직 방향으로 곡선 강제
    },
    conditionId: conditionOrder, //from과  conditionOrder로 조건을 구분
  };
}

// 조건부 흐름 추가 함수 (간격 조정 포함)
function addConditionalFlow(fromNode, toNode, conditionOrder, conViewOrder) {
  // 조건부 흐름의 노드 위치 계산
  var nodeData = nodes.get(toNode);

  // 조건에 비례하여 노드의 X 좌표를 변경 (간격 조정)
  // var newX = 100 * toNode + (conditionOrder * 50); // 조건이 높을수록 멀리 배치
  // if (nodeData.x < newX) {
  //   nodeData.x = newX;
  // }

  nodeData.condition = conditionOrder;

  // 노드 위치 업데이트 및 재랜더링
  nodes.update(nodeData);

  // 조건부 엣지 추가 - 커브 점선 (조건에 따라 곡률 조정)
  edges.add({
    from: fromNode,
    to: toNode,
    label: `조건부 흐름 (${conViewOrder})`,
    color: { color: 'red' },
    dashes: true,
    width: 2,
    smooth: {
      type: 'curvedCCW', // 곡선 방향 설정 (CCW: 시계 반대 방향)
      roundness: 0.5 + conditionOrder * 0.2, // 곡률 증가
      forceDirection: 'vertical', // 수직 방향으로 곡선 강제
    },
    conditionId: conditionOrder, //from과  conditionOrder로 조건을 구분
  });

  //redrawNetWork();
}

async function redrawNetWork() {
  network.off('click');

  network.on('click', async function (params) {
    if (params.nodes.length > 0) {
      // 노드를 클릭한 경우
      await clickNode(params);
    } else if (params.edges.length > 0) {
      // 엣지를 클릭한 경우
      await clickEdge(params);
    } else {
      // 노드나 엣지가 아닌 배경을 클릭한 경우
      let conditionList = $('.accordion');
      conditionList.empty(); // 기존 조건 프레임 초기화
      $('.con-question-input > input').val(' ');
      // `j`로 시작하고 `color`로 끝나는 클래스를 제거
      $('.con-question-type').empty();

      $('.condition-nav-box').find('input[type="hidden"]').val('');
    }
  });

  network.redraw();
}
//node의 id는 index임
function deleteNode(nodeId) {
  // 노드에 연결된 엣지 찾기
  var connectedEdges = network.getConnectedEdges(nodeId);
  // 연결된 엣지 삭제
  connectedEdges.forEach(function (edgeId) {
    edges.remove(edgeId);
  });
  // 노드 삭제
  nodes.remove(nodeId);

  //노드 재정렬
  reindexNodesAndEdges();

  // 네트워크 다시 그리기
  redrawNetWork();
}

function reindexNodesAndEdges() {
  var allNodes = nodes.get(); // 모든 노드 가져오기
  var newNodes = [];
  var newEdges = [];

  // 1. 모든 노드에 대해 새로운 ID 부여 (0부터 순서대로)
  allNodes.forEach((node, index) => {
    var newNodeId = index; // 새로운 ID는 0부터 시작
    newNodes.push({
      ...node, // 기존 노드의 정보 유지
      id: newNodeId,
      y: (newNodeId + 1) * 140,
    });

    // 2. 노드가 첫 번째가 아니라면, 이전 노드와 연결하는 엣지 생성
    if (index > 0) {
      newEdges.push(createEdge(newNodeId - 1, newNodeId));
    }
  });

  // 3. 기존 노드와 엣지 데이터 초기화 후 새 데이터 추가
  nodes.clear();
  edges.clear();
  nodes.add(newNodes);
  edges.add(newEdges);
}

function changeNodeName(idx, nameVal) {
  // 1. 노드 데이터 가져오기
  let findNode = nodes.get(idx);

  if (findNode) {
    // 2. 노드의 레이블을 새로운 값으로 변경

    findNode.label = truncateLabel(nameVal, 10);
    findNode.title = nameVal;

    // 3. 변경된 노드를 데이터셋에 업데이트
    nodes.update(findNode);

    // 4. 네트워크 다시 그리기
    redrawNetWork();
  } else {
    console.error(`ID가 ${idx}인 노드를 찾을 수 없습니다.`);
  }
}
// 긴 텍스트를 자르고 "..."를 붙이는 함수
function truncateLabel(label, maxLength) {
  return label.length > maxLength
    ? label.substring(0, maxLength) + '...'
    : label;
}

// 로컬스토리지에 아코디언 데이터 저장
async function saveAccordionToLocalStorage(nodeId, conditionData) {
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  let idNum;
  // 노드 ID에 해당하는 조건 배열이 없으면 초기화
  if (!storedData[nodeId]) {
    storedData[nodeId] = [];
    idNum = 1;
  } else {
    // 가장 큰 id를 찾기
    const maxId = storedData[nodeId].reduce(
      (max, item) => Math.max(max, item.id),
      0
    );

    console.log('가장 큰 id:', maxId);
    idNum = maxId + 1;
  }
  console.log(storedData[nodeId]);

  // 중복된 조건이 있는지 확인
  const isDuplicate = storedData[nodeId].some(
    (condition) =>
      condition.from === conditionData.from &&
      condition.to === conditionData.to &&
      condition.condition === conditionData.condition &&
      condition.operation === conditionData.operation
  );

  conditionData.id = idNum;

  // 중복되지 않은 경우에만 조건 추가
  if (!isDuplicate || isDuplicate) {
    storedData[nodeId].push(conditionData);
  }

  // 로컬스토리지에 저장
  localStorage.setItem('accordionData', JSON.stringify(storedData));
  return conditionData;
}

// 특정 노드에 대한 아코디언 리스트를 로드
function loadAccordionFromLocalStorage(nodeId) {
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  return storedData[nodeId] || ''; // 해당 노드의 아코디언 HTML 반환
}

async function fillItemOption(accorditonItem, questionSeq, conditionId) {
  let selectBox = $(accorditonItem).find('.contition-option-se');
  let operBox = $(accorditonItem).find('.condition-oper');
  let targetInput = $('.j-qseq').filter(function () {
    return $(this).val() === questionSeq + '';
  });

  let targetCard = targetInput.parents('.j-question-card');
  selectBox.addClass(conditionId); // 조건 ID 추가

  let targetType = targetCard.find('.j-cseq').val();

  // 옵션 추가를 비동기로 수행
  if (targetType === '7' || targetType === '8') {
    await new Promise((resolve) => {
      targetCard
        .find('.j-select-question-type-box input[type="text"]')
        .each(function (index, item) {
          let inputValue = $(this).val();

          // 옵션 생성, 첫 번째 옵션은 선택됨
          let option = $('<option>', {
            class: conditionId,
            value: inputValue,
            text: inputValue,
          });

          if (index === 0) {
            option.prop('selected', true); // 첫 번째 옵션 선택
          }

          selectBox.append(option);
        });

      resolve(); // 옵션 추가 완료 후 resolve 호출
    });
  } else if (targetType === '9') {
    await new Promise((resolve) => {
      let start = targetCard.find('.j-num-start').val();
      let end = targetCard.find('.j-num-end').val();

      for (let i = parseInt(start); i <= parseInt(end); i++) {
        let option = $('<option>', {
          class: conditionId,
          value: i + '',
          text: i + '',
        });
        selectBox.append(option);
      }
      resolve();
    });
  } else if (targetType === '10') {
    await new Promise((resolve) => {
      let targetSelectBox = targetCard.find('select');
      $(targetSelectBox)
        .find('option')
        .each(function () {
          if (!$(this).is(':disabled')) {
            let option = $('<option>', {
              class: conditionId,
              value: $(this).val(),
              text: $(this).val(),
            });
            selectBox.append(option);
          }
        });
      resolve();
    });
  }

  // 로컬스토리지에서 저장된 값 불러오기

  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  let conditions = storedData[questionSeq] || [];
  let matchingCondition = conditions.find(
    (condition) => condition.id === conditionId
  );

  // 저장된 값 선택 또는 기본 첫 번째 옵션 선택
  if (matchingCondition) {
    if (
      matchingCondition.condition !== '' &&
      matchingCondition.condition !== null
    ) {
      selectBox.val(matchingCondition.condition);
    } else {
      selectBox.prop('selectedIndex', 0);
    }
    if (
      matchingCondition.operation !== '' &&
      matchingCondition.operation !== null
    ) {
      operBox.val(matchingCondition.operation);
    } else {
      operBox.prop('selectedIndex', 0);
    }
  }
}
async function fetchConditionFrame() {
  return $.ajax({
    url: '/resources/html/question/conditionFrame.html',
    type: 'GET',
  });
}

async function fillNextItemOption(accorditonItem, questionSeq, conditionId) {
  let targetInput = $('.j-qseq').filter(function () {
    return $(this).val() === questionSeq + '';
  });

  let targetCard = targetInput.parents('.j-question-card');

  let nextSelectBox = $(accorditonItem).find('.contition-next-se');
  $(accorditonItem).find('input[type="hidden"]').val(conditionId);

  // 옵션 추가를 비동기로 수행하여 완료 후 선택 설정
  await new Promise((resolve) => {
    $('.content .j-question-card')
      .not(targetCard) // 자기 자신을 제외한 모든 카드 선택
      .each(function (index, item) {
        let card = $(this);
        let qseqValue = card.find('.j-qseq').val();
        let surveyName = card.find('.j-survey-name-input').val();

        // select 요소에 옵션 추가, 첫 번째 옵션은 selected 설정
        let option = $('<option>', {
          class: conditionId,
          value: qseqValue,
          text: surveyName,
        });

        if (index === 0) {
          option.prop('selected', true); // 첫 번째 옵션 선택
        }

        nextSelectBox.append(option);
      });

    resolve(); // 모든 옵션 추가 완료 후 resolve 호출
  });

  // 로컬스토리지에서 저장된 값 불러오기
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  let conditions = storedData[questionSeq] || [];

  let matchingCondition = conditions.find(
    (condition) => condition.id === conditionId
  );

  // 저장된 'from' 값 선택 또는 첫 번째 옵션 기본 선택
  if (matchingCondition) {
    if (matchingCondition.to !== '' && matchingCondition.to !== null) {
      nextSelectBox.val(matchingCondition.to);
    } else {
      nextSelectBox.prop('selectedIndex', 0); // 첫 번째 옵션 선택
    }
  }
}

async function filldefaultMoveSelectBox(questionSeq) {
  let targetInput = $('.j-qseq').filter(function () {
    return $(this).val() === questionSeq + '';
  });
  let targetCard = targetInput.parents('.j-question-card');

  // 모든 카드 중 자기 자신은 제외한 나머지 선택
  let nextSelectBox = $('.basic-move > select');
  nextSelectBox.empty();

  await new Promise((resolve) => {
    $('.content .j-question-card')
      .not(targetCard) // 자기 자신을 제외한 모든 카드 선택
      .each(function (index, item) {
        let card = $(this);
        let qseqValue = card.find('.j-qseq').val();
        let surveyName = card.find('.j-survey-name-input').val();

        // select 요소에 옵션 추가, 첫 번째 옵션은 selected 설정
        let option = $('<option>', {
          class: 0,
          value: qseqValue,
          text: surveyName,
        });

        if (index === 0) {
          option.prop('selected', true); // 첫 번째 옵션 선택
        }

        nextSelectBox.append(option);
      });

    resolve(); // 모든 옵션 추가 완료 후 resolve 호출
  });

  // 로컬스토리지에서 저장된 값 불러오기
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  let conditions = storedData[questionSeq] || [];

  let matchingCondition = conditions.find((condition) => condition.id === 0);

  // 저장된 'from' 값 선택 또는 첫 번째 옵션 기본 선택
  if (matchingCondition) {
    if (matchingCondition.to !== '' && matchingCondition.to !== null) {
      nextSelectBox.val(matchingCondition.to);
    }
  } else {
    nextSelectBox.prepend('<option></option>');
    nextSelectBox.prop('selectedIndex', 0);
  }
}

async function createConditionFrame(target) {
  let questionSeq = $(target)
    .parents('.condition-nav-box')
    .find('input[type="hidden"]')
    .val();
  let conditionList = $(this).parent().prev();
  let getConditionFrame = await fetchConditionFrame();
  conditionList.append(getConditionFrame);
  let lastAccordionItem = conditionList.find('.accordion-item:last');
  await fillItemOption(lastAccordionItem, questionSeq);
  await fillNextItemOption(lastAccordionItem, questionSeq);

  // // 아코디언 리스트를 로컬스토리지에 저장
  // await saveAccordionToLocalStorage(questionSeq, conditionList.html());
}

function deleteEdge(fromId, conditionId) {
  let edgeList = edges.get();

  let targetIdx = edgeList.findIndex((edge) => {
    return (
      edge.conditionId === conditionId && // conditionId와 일치하는지 확인
      edge.from === fromId && // from 값이 일치하는지 확인
      edge.label.includes('조건부 흐름') // 조건부 흐름인지 확인
    );
  });
  if (targetIdx !== -1) {
    // 인덱스를 찾은 경우 해당 엣지 제거
    let edgeToRemove = edgeList[targetIdx];
    edges.remove(edgeToRemove.id); // edges 데이터셋에서 해당 엣지 제거

    console.log(`Edge removed:`, edgeToRemove);
  } else {
    console.log('No matching edge found.');
  }
}

function getNodeIdByQuestionSeq(to, from) {
  let nodeList = nodes.get();
  let fromNode = nodeList.find((node) => node.seq === from);
  let toNode = nodeList.find((node) => node.seq === to);

  let fromNodeId = fromNode ? fromNode.id : null; // ID가 없을 경우 null 처리
  let toNodeId = toNode ? toNode.id : null;

  return { to: toNodeId, from: fromNodeId };
}

function deleteAllConditionalFlow() {
  // 모든 엣지 가져오기
  let edgeList = edges.get();

  // 조건부 흐름에 해당하는 엣지들만 필터링
  let conditionalEdges = edgeList.filter((edge) =>
    edge.label.includes('조건부 흐름')
  );

  // 필터링된 엣지들 삭제
  conditionalEdges.forEach((edge) => {
    edges.remove(edge.id); // edge의 id를 사용해 삭제
    console.log(`Deleted Edge:`, edge);
  });
}

function showAllConditionFlow() {
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  let conditionalEdges = [];

  // 로컬스토리지에서 조건을 불러와 conditionId가 0이 아닌 조건만 필터링
  for (let key in storedData) {
    let conditions = storedData[key].filter((condition) => condition.id !== 0);

    // 각 조건을 엣지로 변환하여 추가
    conditions.forEach((condition, index) => {
      let edge = convertConditionToedge(
        condition,
        `조건부 흐름`,
        condition.id,
        index + 1
      );
      console.log('생성된 엣지:', edge); // 디버깅용 로그
      if (edge) {
        conditionalEdges.push(edge);
      }
    });
  }

  // 필터링된 조건부 엣지들을 네트워크에 추가
  try {
    edges.add(conditionalEdges); // 엣지를 한 번에 추가
    network.setData({ nodes: nodes, edges: edges }); // 네트워크에 데이터 설정
    //network.redraw(); // 네트워크 다시 그리기
    redrawNetWork();
  } catch (error) {
    console.error('조건부 엣지 추가 중 오류 발생:', error);
  }
}

function redrawDefaultOrder() {
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};

  // 모든 array에서 id가 0인 condition만 추출
  let conditionsWithIdZero = [];

  for (let key in storedData) {
    let conditions = storedData[key];

    // 각 조건 배열에서 id가 0인 항목만 필터링
    let filtered = conditions.filter((condition) => condition.id === 0);
    conditionsWithIdZero.push(...filtered);
  }

  // 기존 기본 흐름 엣지 삭제
  deleteEdgesWithConditionIdZero();

  // 새롭게 기본 흐름 엣지 생성 및 추가
  let newDefaultEdgeList = conditionsWithIdZero.map((condition) =>
    convertConditionToedge(condition, '기본 흐름')
  );

  newDefaultEdgeList.forEach((edge) => edges.add(edge));

  console.log('새로운 기본 흐름 엣지가 추가되었습니다:', newDefaultEdgeList);

  // 네트워크 다시 그리기
  network.redraw();
}

function deleteEdgesWithConditionIdZero() {
  // 모든 edge 목록 가져오기
  let edgeList = edges.get();

  // conditionId가 0인 엣지들을 필터링
  let edgesToDelete = edgeList.filter((edge) => edge.conditionId === 0);

  // 필터링된 엣지들을 삭제
  edgesToDelete.forEach((edge) => {
    edges.remove(edge.id); // edge의 id로 삭제
    console.log(`Deleted Edge:`, edge); // 삭제된 엣지 로그
  });
}

function saveConditionInDB(condition) {
  if (
    condition.operation === null ||
    condition.operation === undefined ||
    condition.operation === ''
  ) {
    condition.operation = ' ';
  }
  if (
    condition.condition === null ||
    condition.condition === undefined ||
    condition.condition === ''
  ) {
    condition.condition = ' ';
  }
  $.ajax({
    url: '/api/question/condition',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(condition),
    success: function (response) {
      console.log(response);
      let conditions = getQuestionConditions(response.data.from + '');

      let findCondition = conditions.filter(
        (con) => con.id === response.data.id
      )[0];

      findCondition.seq = response.data.seq;

      console.log('찾은 컨디션 = ', findCondition);
      saveConditionListInLocalStorage(conditions, response.data.from);
    },
    error: function (error) {},
  });
}

function initcondition(questions) {
  var conditionSeq; // 외부에서 선언
  for (let q = 0; q < questions.length; q++) {
    let conditions = questions[q].conditions;
    let conditionList = [];
    for (let c = 0; c < conditions.length; c++) {
      let condition = conditions[c];
      conditionSeq = condition.questionSeq;
      let saveCondition = {
        seq: condition.seq,
        from: condition.questionSeq,
        to: condition.nextQuestionSeq,
        operation: condition.operation,
        condition: condition.cvalue,
        id: condition.orderNum,
      };
      conditionList.push(saveCondition);
    }

    if (
      conditions.length > 0 &&
      conditionSeq !== null &&
      conditionSeq !== undefined &&
      conditionSeq !== ''
    ) {
      conditionList.sort((a, b) => a.id - b.id);

      saveConditionListInLocalStorage(conditionList, conditionSeq);
    }
  }
}

function setConditionNav2(from, to) {
  let fromInput = $('.j-qseq').filter(function () {
    return $(this).val() === from + '';
  });

  let toInput = $('.j-qseq').filter(function () {
    return $(this).val() === to + '';
  });

  // 부모 카드 찾기
  let fromCard = fromInput.parents('.j-question-card');
  let toCard = toInput.parents('.j-question-card');

  // fromCard에서 데이터 추출
  let fromName = fromCard.find('.j-survey-name-input').val();
  let fromType = fromCard.find('.j-typeAndImg').prop('outerHTML'); // 오타 수정: fomrType → fromType
  // let fromDes = fromCard.find('.j-survey-content > textarea').val(); // .val() 사용

  // toCard에서 데이터 추출
  let toName = toCard.find('.j-survey-name-input').val(); // toCard 사용
  let toType = toCard.find('.j-typeAndImg').prop('outerHTML'); // toCard 사용
  // let toDes = toCard.find('.j-survey-content > textarea').val(); // .val() 사용
  if (fromName === undefined) {
    fromName = '개인정보동의항목';
  }
  if (toName === undefined) {
    toName = '개인정보동의항목';
  }
  if (to === -1) {
    $('.cur-con-question-box')
      .find('.con-question-input > input')
      .val(fromName + ' ');
    $('.cur-con-question-box .con-question-type').html(fromType);
    // $('.cur-con-question-box')
    //   .find('.con-question-description > textarea')
    //   .val(fromDes + ' ');

    // 다음 질문 박스에 값 설정
    $('.next-question-box').find('.con-question-input > input').val(' ');
    $('.next-question-box .con-question-type').html('');
    return;
  }
  // 현재 질문 박스에 값 설정
  $('.cur-con-question-box')
    .find('.con-question-input > input')
    .val(fromName + ' ');
  $('.cur-con-question-box .con-question-type').html(fromType);
  // $('.cur-con-question-box')
  //   .find('.con-question-description > textarea')
  //   .val(fromDes + ' ');

  // 다음 질문 박스에 값 설정
  $('.next-question-box')
    .find('.con-question-input > input')
    .val(toName + ' ');
  $('.next-question-box .con-question-type').html(toType);
  // $('.next-question-box')
  //   .find('.con-question-description > textarea')
  //   .val(toDes + ' ');
}

function compareConditionWhiteList(ccSeq) {
  for (let i = 0; i < conditionWhiteList.length; i++) {
    if (ccSeq === conditionWhiteList[i]) return true;
  }
  return false;
}

//엣지클릭 이벤트
function clickEdge(params) {
  let edgeId = params.edges[0]; // 클릭된 엣지의 ID 가져오기
  let edgeData = edges.get(edgeId); // 해당 엣지 데이터 가져오기
  if (edgeData.conditionId === 0) return;
  console.log('클릭된 엣지 ID:', edgeId);
  console.log('엣지 데이터:', edgeData);

  // 엣지 데이터를 기반으로 원하는 작업 수행
  // 예를 들어, 엣지 스타일 변경, 팝업 표시 등
  if (edgeData) {
    let seqs = convertEdgeToSeq(edgeData);
    console.log(seqs);
    setConditionNav2(seqs.from, seqs.to);
  }
}

async function clickNode(params) {
  let nodeId = params.nodes[0]; // 클릭된 노드의 ID 가져오기
  let nodeData = nodes.get(nodeId); // 해당 노드 데이터 가져오기
  $('.condition-nav-box > input[type="hidden"]').val(nodeData.seq);

  // 로컬스토리지에서 해당 노드의 조건 배열 불러오기
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  let conditions = storedData[nodeData.seq] || [];
  conditions.sort((a, b) => a.id - b.id);
  //기본 질문 select box처리
  // filldefaultMoveSelectBox(nodeData.seq);

  //아코디언들 처리
  // 조건 배열을 반복하여 조건 프레임 생성 및 처리
  let conditionList = $('.accordion');
  conditionList.empty(); // 기존 조건 프레임 초기화

  for (let i = 0; i < conditions.length; i++) {
    let condition = conditions[i];
    if (condition.id === 0) continue;
    let getConditionFrame = await fetchConditionFrame();
    conditionList.append(getConditionFrame);
    let lastAccordionItem = conditionList.find('.accordion-item:last');
    lastAccordionItem.find('.con-order').text(i + 1);

    // 조건 데이터에 따라 옵션 및 프레임 설정

    await fillItemOption(lastAccordionItem, condition.from, condition.id);
    await fillNextItemOption(lastAccordionItem, condition.from, condition.id);
  }

  deleteAllConditionalFlow();

  let nodeList = nodes.get();
  console.log(conditions);
  for (let i = 0; i < conditions.length; i++) {
    let condition = conditions[i];
    if (condition.id === 0) continue;
    // fromNode 찾기
    let fromNode = nodeList.find((node) => node.seq === condition.from);
    let toNode = nodeList.find((node) => node.seq === condition.to);

    let fromNodeId = fromNode ? fromNode.id : null; // ID가 없을 경우 null 처리
    let toNodeId = toNode ? toNode.id : null;

    // fromNodeId나 toNodeId가 없는 경우 처리
    if (fromNodeId === null || toNodeId === null) {
      // console.warn('노드 ID를 찾을 수 없습니다.');
      continue; // 다음 반복으로 넘어감
    } else {
      let conViewOrder = conditionList
        .find('.accordion-item')
        .eq(i)
        .find('.con-order')
        .text();
      addConditionalFlow(fromNodeId, toNodeId, condition.id, conViewOrder);
    }
  }
  let edgeList = edges.get();

  let findEdge = edgeList.filter(
    (eg) => eg.from === nodeData.id && eg.conditionId === 0
  )[0];
  let nextEdgeSeq;
  try {
    nextEdgeSeq = nodeList.filter((nod) => nod.id === findEdge.to)[0];
  } catch {
    setConditionNav2(nodeData.seq, -1);
  }
  // if (findNode.length > 0) {
  //   setConditionNav2(nodeData.seq, findNode[0].to);
  // } else {
  if (findEdge && nextEdgeSeq) {
    setConditionNav2(nodeData.seq, nextEdgeSeq.seq);
  } else {
    setConditionNav2(nodeData.seq, -1);
  }
  //}
}
