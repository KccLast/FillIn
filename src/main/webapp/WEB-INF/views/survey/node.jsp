<%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vis.js Customized Conditional Flow Example</title>
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
    <style>
      #network {
        width: 100%;
        height: 600px;
        border: 1px solid lightgray;
      }

      #addNode,
      #showData {
        margin: 10px 0;
      }
    </style>
  </head>

  <body>
    <div id="network"></div>
    <button id="addNode">새로운 질문 추가</button>
    <button id="showData">현재 데이터 표시</button>

    <script>
      // 초기 노드 데이터
      var originalNodes = new vis.DataSet([
        { id: 1, label: "질문 1", shape: "box", title: "질문명", color: { background: "#f0f0f0" }, x: 0, y: 0, condition: 0 },
        { id: 2, label: "질문 2", shape: "box", title: "질문명", color: { background: "#f0f0f0" }, x: 0, y: 100, condition: 0 },
        { id: 3, label: "질문 3", shape: "box", title: "질문명", color: { background: "#f0f0f0" }, x: 0, y: 200, condition: 0 },
        { id: 4, label: "질문 4", shape: "box", title: "질문명", color: { background: "#f0f0f0" }, x: 0, y: 300, condition: 0 },
        { id: 5, label: "질문 5", shape: "box", title: "질문명", color: { background: "#f0f0f0" }, x: 0, y: 400, condition: 0 },
        { id: 6, label: "질문 6", shape: "box", title: "질문명", color: { background: "#f0f0f0" }, x: 0, y: 500, condition: 0 },
        { id: 7, label: "질문 7", shape: "box", title: "질문명", color: { background: "#f0f0f0" }, x: 0, y: 600, condition: 0 }
      ]);

      // 기본 연결선 데이터
      var edges = new vis.DataSet([
        // 기본 흐름 - 직선
        { from: 1, to: 2, label: "기본 흐름", color: { color: "black" }, condition: 0, smooth: false },
        { from: 2, to: 3, label: "기본 흐름", color: { color: "black" }, condition: 0, smooth: false },
        { from: 3, to: 4, label: "기본 흐름", color: { color: "black" }, condition: 0, smooth: false },
        { from: 4, to: 5, label: "기본 흐름", color: { color: "black" }, condition: 0, smooth: false },
        { from: 5, to: 6, label: "기본 흐름", color: { color: "black" }, condition: 0, smooth: false },
        { from: 6, to: 7, label: "기본 흐름", color: { color: "black" }, condition: 0, smooth: false }
      ]);

      // 네트워크 옵션 설정
      var container = document.getElementById('network');
      var data = { nodes: originalNodes, edges: edges };

      var options = {
        nodes: {
          shape: 'box',
          borderWidth: 2,
          color: {
            background: '#ffffff',
            border: '#cccccc',
            highlight: {
              background: '#e6f7ff',
              border: '#1890ff'
            }
          },
          font: {
            color: '#000000',
            size: 14,
            face: 'Arial'
          },
          margin: 10
        },
        edges: {
          width: 2,
          color: {
            color: '#848484', // 기본 선 색상
            highlight: '#005bac', // 노드 클릭 시 유지될 색상
            hover: '#848484' // 마우스 호버 시 색상
          },
          arrows: { to: { enabled: true } },
          smooth: {
            type: 'curvedCCW', // 선을 곡선으로 만듭니다.
            roundness: 0.2 // 곡률 정도 조정 (0.1 ~ 1.0)
          }
        },
        physics: {
          enabled: false // 물리적 움직임 비활성화
        }
      };
      // 네트워크 생성
      var network = new vis.Network(container, data, options);



      // 예제: 2번 질문에서 조건부 흐름 추가
      document.getElementById('addNode').addEventListener('click', function () {
        addConditionalFlow(2, 5, 1); // 1차 조건부 흐름: 2 -> 5
        addConditionalFlow(2, 6, 2); // 2차 조건부 흐름: 2 -> 6
        addConditionalFlow(3, 6, 5);
        addConditionalFlow(2, 7, 3); // 추가된 조건부 흐름
        addConditionalFlow(5, 7, 4); // 추가된 조건부 흐름
      });

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
          color: { color: "red" },
          dashes: true,
          width: 2,
          smooth: {
            type: 'curvedCCW', // 곡선 방향 설정 (CCW: 시계 반대)
            roundness: 0.3 + (conditionOrder * 0.1) // 조건에 따라 곡률 증가
          }
        });

        network.redraw();
      }

      // 현재 데이터 표시 버튼 클릭 이벤트
      document.getElementById('showData').addEventListener('click', function () {
        var nodesData = originalNodes.get();
        var edgesData = edges.get();
        var nodesOutput = nodesData.map(node => `ID: ${node.id}, Label: ${node.label}, X: ${node.x}, Y: ${node.y}`).join("\n");
        var edgesOutput = edgesData.map(edge => `From: ${edge.from}, To: ${edge.to}, Label: ${edge.label}, Condition: ${edge.condition}`).join("\n");

        alert(`현재 노드 데이터:\n${nodesOutput}\n\n현재 엣지 데이터:\n${edgesOutput}`);
      });
    </script>
  </body>

  </html>