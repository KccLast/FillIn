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
    },
    margin: 10,
  },
  edges: {
    width: 2,
    color: {
      color: '#848484', // 기본 선 색상
      highlight: '#005bac', // 노드 클릭 시 유지될 색상
      hover: '#848484', // 마우스 호버 시 색상
    },
    arrows: { to: { enabled: true } },
    smooth: {
      type: 'curvedCCW', // 선을 곡선으로 만듭니다.
      roundness: 0.2, // 곡률 정도 조정 (0.1 ~ 1.0)
    },
  },
  physics: {
    enabled: false, // 물리적 움직임 비활성화
  },
};

function parseCondition(json) {
  let question = JSON.parse(json);
  createDefaultOrder(question.questions);
  //conditionCardCon
}

function createDefaultOrder(questions) {
  let nodeList = [];
  let edgeList = [];

  for (let i = 0; i < questions.length; i++) {
    nodeList.push(createNode(i + 1, questions[i], (i + 1) * 100));
  }
  for (let i = 1; i <= questions.length - 1; i++) {
    edgeList.push(createEdge(i, i + 1));
  }

  nodes = new vis.DataSet(nodeList);
  edges = new vis.DataSet(edgeList);
  let data = { nodes: nodes, edges: edges };

  container = document.getElementById('conditionCardCon');
  network = new vis.Network(container, data, options);
}

function createNode(idx, question, yp) {
  return {
    id: idx,
    label: question.name,
    shape: 'box',
    title: question.name,
    color: { background: '#f0f0f0' },
    x: 680,
    y: yp,
    condition: 0,
    seq: question.seq,
    surveySeq: question.surveySeq,
  };
}
function createNewNode(idx) {
  nodes.add(
    createNode(idx, { name: '질문명', seq: 0, surveySeq: 0 }, idx * 100)
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
    condition: 0,
    smooth: false,
  };
}

// 조건부 흐름 추가 함수 (간격 조정 포함)
function addConditionalFlow(fromNode, toNode, conditionOrder) {
  // 조건부 흐름의 노드 위치 계산
  var nodeData = originalNodes.get(toNode);

  // 조건에 비례하여 노드의 X 좌표를 변경 (간격 조정)
  // var newX = 100 * toNode + (conditionOrder * 50); // 조건이 높을수록 멀리 배치
  // if (nodeData.x < newX) {
  //   nodeData.x = newX;
  // }
  nodeData.condition = conditionOrder;

  // 노드 위치 업데이트 및 재랜더링
  originalNodes.update(nodeData);

  // 조건부 엣지 추가 - 커브 점선 (조건에 따라 곡률 조정)
  edges.add({
    from: fromNode,
    to: toNode,
    label: `조건부 흐름 (${conditionOrder})`,
    color: { color: 'red' },
    dashes: true,
    width: 2,
    smooth: {
      type: 'curvedCCW', // 곡선 방향 설정 (CCW: 시계 반대)
      roundness: 0.3 + conditionOrder * 0.1, // 조건에 따라 곡률 증가
    },
  });

  network.redraw();
}

function redrawNetWork() {
  network.redraw();
}
