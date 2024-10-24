var config = {
  container: '#conditionCardCon', // 트리 컨테이너 설정
  rootOrientation: 'NORTH', // 트리 방향 설정 (위에서 아래로)
  nodeAlign: 'CENTER', // 노드 정렬
  levelSeparation: 40, // 레벨 간 간격
  siblingSeparation: 30, // 형제 노드 간 간격
  subTeeSeparation: 30, // 서브 트리 간 간격
  connectors: {
    type: 'bCurve', // 연결선 모양
    style: {
      stroke: 'black', // 연결선 색상
      'stroke-width': 2, // 연결선 두께
    },
  },
  node: {
    HTMLclass: 'mini-card', // 노드의 CSS 클래스
    collapsable: true, // 노드 접기 가능 여부
    drawLineThrough: true, // 노드를 가로지르는 선
    stackChildren: true,
  },
};
var chart_structure = {
  chart: config,
  nodeStructure: {
    text: {
      name: 'Root Node',
      title: 'Root Card',
      desc: 'This is the root node',
    },
    HTMLid: 'root-node',
    children: [
      {
        text: {
          order: '1',
          name: '질문명',
        },
        image: '/resources/img/question/type/type7.png', // 질문 유형 이미지를 표시할 경로
        HTMLid: 'card1',
      },
      {
        text: {
          order: '2',
          name: 'Card 2',
        },
        image: '/resources/img/question/type/type7.png',
        HTMLid: 'card2',
        children: [
          {
            text: {
              order: '3',
              name: '질문명',
            },
            HTMLid: 'card3',
            image: '/resources/img/question/type/type7.png',
          },
        ],
      },
    ],
  },
};

function parseConditionHTML(data) {
  return `
        <div class="node-content j-flex-row-center" value=${data.seq}>
            <input type="hidden" class="con-questionSeq">
            <div class="node-order fs-5">${data.order}</div>
            <img src="/resources/img/question/type/type${data.ccSeq}.png" alt="Node Image" class="node-img">
            <div class="node-name fs-5">${data.name}</div>
        </div>
    `;
}

//새로운 노드를 생성하는 함수
function makeNewNode(data) {
  let node = {
    innerHTML: '',
    children: [],
  };

  node.innerHTML = parseConditionHTML(data);
  return node;
}
//두 노드를 연결하는 함수
function linkTwoNode(parent, child) {
  p;
}

// 트리를 생성하는 함수
function renderTree() {
  new Treant(chart_structure);
}

// 트리 재랜더링 함수 (트리 데이터 업데이트 후 호출)
function updateTree(newData) {
  // 기존 트리 컨테이너 비우기
  document.querySelector('#conditionCardCon').innerHTML = '';
  // 새 데이터로 트리 구조 업데이트
  chart_structure.nodeStructure = newData;
  // 트리 다시 렌더링
  renderTree();
}

// 초기 트리 렌더링
renderTree();
