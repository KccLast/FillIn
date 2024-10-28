/** condition event*/
$(function () {
  $('.top-basic').click(function () {
    if (!$(this).hasClass('condition-nav-1-selected')) {
      $('.top-condition').removeClass('condition-nav-1-selected');
      $(this).addClass('condition-nav-1-selected');
      $('.nav-body-1').show();
      $('.nav-body-2').hide();
    }
  });
  $('.top-condition').click(function () {
    if (!$(this).hasClass('condition-nav-1-selected')) {
      $('.top-basic').removeClass('condition-nav-1-selected');
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

      if (
        questionSeq === null ||
        questionSeq === undefined ||
        questionSeq === ''
      ) {
        alert('조건을 추가할 질문을 선택해주세요!');
        return;
      }

      let conditionList = $(this).parent().prev();
      let getConditionFrame = await fetchConditionFrame();

      // 조건 프레임 추가
      conditionList.append(getConditionFrame);
      let lastAccordionItem = conditionList.find('.accordion-item:last');

      // await fillItemOption(lastAccordionItem, questionSeq, 0);
      // await fillNextItemOption(lastAccordionItem, questionSeq, 0);

      // 새로운 조건 데이터를 로컬스토리지에 저장
      let conditionData = {
        from: parseInt(questionSeq),
        to: '', // 'to' 값은 필요에 따라 설정
        condition: '', // 조건에 해당하는 값 설정
        operation: '', // 연산 또는 동작 설정
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
    }
  );

  $('.nav-body-2').on(
    'change',
    '.contition-option-se, .contition-next-se',
    function () {
      let questionSeq = $(this)
        .closest('.condition-nav-box')
        .find('input[type="hidden"]')
        .val(); // questionSeq 가져오기

      // 현재 select 요소와 선택된 값 가져오기
      let selectName = $(this).attr('class'); // .contition-option-se 또는 .contition-next-se
      let selectedValue = $(this).val();

      // 로컬스토리지에 저장
      // saveSelectedOptionToLocalStorage(questionSeq, selectName, selectedValue);
    }
  );

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
    let questionSeq = $(this)
      .parents('.condition-nav-box')
      .find('input[type="hidden"]')
      .val();
    // 클래스 문자열 가져오기
    let ConditionId = body.find('input[type="hidden"]').val(); // 정규식을 사용해 숫자만 추출
    let operation = body.find('.condition-oper').val();
    let nextSeq = body.find('.contition-next-se').val();
    let optionVal = body.find('.contition-option-se').val();

    let saveCondition = {
      id: parseInt(ConditionId),
      from: parseInt(questionSeq),
      to: parseInt(nextSeq), // 'to' 값은 필요에 따라 설정
      condition: optionVal, // 조건에 해당하는 값 설정
      operation: operation, // 연산 또는 동작 설정
    };

    saveConditionDataInLocal(saveCondition);

    let nodeId = getNodeIdByQuestionSeq(saveCondition.to, saveCondition.from);
    deleteEdge(nodeId.from, saveCondition.id);
    addConditionalFlow(nodeId.from, nodeId.to, saveCondition.id);
    network.redraw();
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

  $('.basic-move').on('change', 'select', function () {
    //일단 questionSeq를 찾아와야함
    let questionSeq = $(this)
      .parents('.condition-nav-box')
      .find('input[type="hidden"]')
      .val();
    //from
    console.log('quSeq' + questionSeq);

    //to
    let toSeq = $(this).val();
    if (toSeq === null || toSeq === '' || toSeq === undefined) return;

    //node에 변화가 있는건 아니고, edge만 옮기면 됨
    //기본 node에 원래 연결되어 있던 edge는 conditionId = 0이면서, from과 to가 일치하는 것
    let edgeId = { from: parseInt(questionSeq), to: parseInt(toSeq) };
    edgeId.conditionId = 0;
    let newEdge = convertConditionToedge(edgeId, '기본 흐름');

    //condition 수정
    let conditions = getQuestionConditions(questionSeq);

    let findCondition = conditions.find(
      (condition) =>
        condition.id === 0 && condition.from === parseInt(questionSeq)
    );
    if (
      findCondition === null ||
      findCondition === undefined ||
      findCondition === ''
    ) {
      let saveCondition = {
        id: 0,
        from: parseInt(questionSeq),
        to: parseInt(toSeq), // 'to' 값은 필요에 따라 설정
        condition: '', // 조건에 해당하는 값 설정
        operation: '', // 연산 또는 동작 설정
      };
      saveConditionDataInLocal(saveCondition);
    } else {
      findCondition.to = parseInt(toSeq);
      saveConditionListInLocalStorage(conditions, questionSeq);
    }
    //edge 수정
    redrawDefaultOrder();
  });
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
    borderWidth: 2,
    widthConstraint: {
      maximum: 150, // 박스 너비를 고정
      minimum: 150, // 최소 너비
    },
    heightConstraint: {
      minimum: 50, // 최소 높이 설정
    },
    color: {
      background: '#ffffff',
      border: '#cccccc',
      highlight: {
        background: '#e6f7ff',
        border: '#1890ff',
      },
    },
    font: {
      color: '#000000',
      size: 14,
      face: 'Arial',
      multi: true, // 여러 줄 지원
    },
    margin: 10,
  },
  edges: {
    width: 2,
    color: {
      color: '#848484',
      highlight: '#005bac',
      hover: '#848484',
    },
    arrows: { to: { enabled: true } },
    smooth: {
      type: 'curvedCCW',
      roundness: 0.2,
    },
  },
  physics: {
    enabled: false,
  },
};

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
  let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
  storedData[questionSeq] = conditions;
  localStorage.setItem('accordionData', JSON.stringify(storedData));
}

function parseCondition(json) {
  let question = JSON.parse(json);
  createDefaultOrder(question.questions);
  //conditionCardCon
}

function createDefaultOrder(questions) {
  let nodeList = [];
  let edgeList = [];

  for (let i = 0; i < questions.length; i++) {
    nodeList.push(createNode(i, questions[i], (i + 1) * 150));
  }
  nodes = new vis.DataSet(nodeList);
  //추후 변경 defaultcondition이 등록된게 있다면 변화해야함
  // edge 그리는 건 condition -> edge로 변환해야할 듯

  for (let i = 0; i < questions.length - 1; i++) {
    let defaultCondition = createDefaultCondition(
      questions[i].seq,
      questions[i + 1].seq
    );
    let conditionList = [];
    conditionList.push(defaultCondition);
    saveConditionListInLocalStorage(conditionList, questions[i].seq);
    edgeList.push(convertConditionToedge(defaultCondition, '기본 흐름'));
  }

  // for (let i = 0; i < questions.length - 1; i++) {
  //   edgeList.push(createEdge(i, i + 1));
  // }

  edges = new vis.DataSet(edgeList);
  let data = { nodes: nodes, edges: edges };

  container = document.getElementById('conditionCardCon');
  network = new vis.Network(container, data, options);
}

function convertConditionToedge(condition, label, conditionOrder) {
  let nodeList = nodes.get();
  let fromNode = nodeList.find((node) => node.seq === condition.from);
  let toNode = nodeList.find((node) => node.seq === condition.to);
  let edge;
  if (label.includes('기본 흐름')) {
    edge = createEdge(fromNode.id, toNode.id);
  } else {
    edge = createConditionedge(fromNode.id, toNode.id, conditionOrder);
  }

  return edge;
}

function createNode(idx, question, yp) {
  return {
    id: idx,
    label: truncateLabel(question.name, 10), // 라벨 길이 제한
    shape: 'box',
    title: question.name, // 전체 이름은 툴팁에 표시
    color: { background: '#f0f0f0' },
    x: 480,
    y: yp,
    condition: 0,
    seq: question.seq,
    surveySeq: question.surveySeq,
  };
}
function createDefaultCondition(from, to) {
  return {
    id: 0,
    from: from,
    to: to, // 'to' 값은 필요에 따라 설정
    condition: '', // 조건에 해당하는 값 설정
    operation: '', // 연산 또는 동작 설정
  };
}
function createNewNode(idx) {
  nodes.add(
    createNode(idx, { name: '질문명', seq: 0, surveySeq: 0 }, (idx + 1) * 120)
  );
  edges.add(createEdge(idx - 1, idx));
  network.redraw();
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

function createConditionedge(from, to, conditionOrder) {
  return {
    from: from,
    to: to,
    label: `조건부 흐름 (${conditionOrder})`,
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
function addConditionalFlow(fromNode, toNode, conditionOrder) {
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
    label: `조건부 흐름 (${conditionOrder})`,
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

function redrawNetWork() {
  network.off('click');
  network.on('click', async function (params) {
    if (params.nodes.length > 0) {
      let nodeId = params.nodes[0]; // 클릭된 노드의 ID 가져오기
      let nodeData = nodes.get(nodeId); // 해당 노드 데이터 가져오기
      $('.condition-nav-box > input[type="hidden"]').val(nodeData.seq);

      // 로컬스토리지에서 해당 노드의 조건 배열 불러오기
      let storedData = JSON.parse(localStorage.getItem('accordionData')) || {};
      let conditions = storedData[nodeData.seq] || [];

      //기본 질문 select box처리
      filldefaultMoveSelectBox(nodeData.seq);

      //아코디언들 처리
      // 조건 배열을 반복하여 조건 프레임 생성 및 처리
      let conditionList = $('.accordion');
      conditionList.empty(); // 기존 조건 프레임 초기화

      for (let i = 1; i < conditions.length; i++) {
        let condition = conditions[i];
        let getConditionFrame = await fetchConditionFrame();
        conditionList.append(getConditionFrame);
        let lastAccordionItem = conditionList.find('.accordion-item:last');

        // 조건 데이터에 따라 옵션 및 프레임 설정

        await fillItemOption(lastAccordionItem, condition.from, condition.id);
        await fillNextItemOption(
          lastAccordionItem,
          condition.from,
          condition.id
        );
      }

      deleteAllConditionalFlow();

      let nodeList = nodes.get();
      for (let i = 1; i < conditions.length; i++) {
        let condition = conditions[i];

        // fromNode 찾기
        let fromNode = nodeList.find((node) => node.seq === condition.from);
        let toNode = nodeList.find((node) => node.seq === condition.to);

        let fromNodeId = fromNode ? fromNode.id : null; // ID가 없을 경우 null 처리
        let toNodeId = toNode ? toNode.id : null;

        // fromNodeId나 toNodeId가 없는 경우 처리
        if (fromNodeId === null || toNodeId === null) {
          console.warn('노드 ID를 찾을 수 없습니다.');
          continue; // 다음 반복으로 넘어감
        }
        addConditionalFlow(fromNodeId, toNodeId, condition.id);
      }
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
      y: (newNodeId + 1) * 100,
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
    idNum = storedData[nodeId].length + 1;
  }

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

  // 옵션 추가를 비동기로 수행
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
  console.log(storedData);
  let matchingCondition = conditions.find((condition) => condition.id === 0);
  console.log(conditions);
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

  console.log('조건 ID가 0인 조건:', conditionsWithIdZero);

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

  console.log('모든 conditionId가 0인 엣지들이 삭제되었습니다.');
}
