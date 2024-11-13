$(document).ready(function () {

    console.log(tableDataJson);

    // update cluster table (군집 별 분석결과)
    updateClusterAnalysisTable(tableDataJson.clusterList);
    // update comparison analysis (클러스터 별 정량 평가 응답 분석)
    loadQuestionData();
});

function loadQuestionData() {
    const payload = {
        surveySeq: tableDataJson.surveySeq,
        clusterList: tableDataJson.clusterList.map(cluster => ({
            clusterId: cluster.clusterId,
            participantList: cluster.itemList.map(item => item.participantSeq)
        }))
    };

    console.log(payload);

    $.ajax({
        url: `/api/statistic/comparison`,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(payload),
        success: function (response) {
            console.log('서버 응답 : ', response);

            if (response.status === 'success' && response.statusCode === 200) {
                updateTable(response.data);
            } else {
                console.error('서버 응답이 성공 상태가 아닙니다.');
            }
        },
        error: function (error) {
            console.error('오류 발생 : ', error);
        }
    });
}

// 분석 버튼 클릭 이벤트
$(document).on('click', '.ai-analysis-button', function() {
    sendDataToServer();
});

// 서버에 AJAX 요청 보내기
function sendDataToServer() {
    const data = prepareDataForRequest();
    console.log(data);

    $.ajax({
        url: '/api/question/make-clustering',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log("서버 응답:", response);
            // 서버 응답을 분석 텍스트에 삽입
            $('#analysisContent').html(response.data); // 응답 텍스트를 삽입
        },
        error: function(error) {
            console.error("에러 발생:", error);
        }
    });
}

// AJAX 요청을 위한 데이터 정리 함수
function prepareDataForRequest() {
    // 위쪽 테이블 - 클러스터와 키워드 리스트
    const clusterKeywords = [];
    $('.cluster-analysis-table tbody tr').each(function() {
        const clusterNum = $(this).find('td:nth-child(1)').text();
        const keywords = [];

        // 각 키워드 추출
        $(this).find('td:nth-child(2) .keyword-rank').each(function() {
            keywords.push($(this).text().trim());
        });

        // 클러스터 번호와 키워드 리스트 추가
        clusterKeywords.push({
            clusterNumber: clusterNum,
            keywords: keywords
        });
    });

    // 아래쪽 오른쪽 테이블 - 질문명과 클러스터 응답 리스트
    const selectedQuestion = $('.table-right h5').text();
    const clusterResponses = [];
    $('.table-right tbody tr').each(function() {
        const clusterNumbers = $(this).find('td:nth-child(3)').text().split(',').map(cluster => cluster.trim());  // Cluster들을 분리
        const responseText = $(this).find('td:nth-child(2)').text().trim();

        // 각 클러스터 번호에 대해 응답 내용 추가
        clusterNumbers.forEach(clusterNum => {
            if (clusterNum) {  // clusterNumber가 빈 값이 아니면
                clusterResponses.push({
                    clusterNumber: clusterNum,
                    response: responseText
                });
            }
        });
    });

    // AJAX 데이터 객체
    const requestData = {
        question1: tableDataJson.questionName,
        question2: selectedQuestion,
        clusterKeywords: clusterKeywords,
        clusterResponses: clusterResponses
    };

    return requestData;
}

function updateTable(data) {
    // 테이블 tbody 요소를 가져와서 초기화합니다.
    const leftTbody = $('.table-left.styled-table table tbody');
    leftTbody.empty();

    data.forEach(question => {
        // 새로운 <tr> 요소를 생성하고 데이터 넣기
        const row = $('<tr></tr>');

        row.html( `
                <td><span class="circle-number">${question.questionOrderNum}</span></td>
                <td class="question-name" title="${question.questionName}">${question.questionName}</td>
                <td style="color: #005bac; font-weight: bold;">
                    <img src="/resources/img/question/type/type${question.ccSeq}.png" style="width: 20px; height: 20px; margin-right: 5px">
                    ${question.ccName}
                </td>
        `);

        // 왼쪽 테이블의 각 행에 클릭 이벤트 추가
        row.on('click', function () {
            updateRightTable(question);
        });

        // 생성한 행을 tbody에 추가
        leftTbody.append(row);
    });
}

// 오른쪽 테이블 업데이트 함수
function updateRightTable(question) {
    const rightTbody = $('.table-right.styled-table table tbody');
    rightTbody.empty();

    question.answerList.forEach((answer, index) => {
        const clusters = answer.clusterList.map(cluster => `Cluster ${cluster}`).join(', ');
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${answer.answerName}</td>
                <td>${clusters}</td>
            </tr>
        `;

        // 생성한 행을 오른쪽 테이블 tbody에 추가합니다.
        rightTbody.append(row);
    });

    // 오른쪽 테이블의 제목도 업데이트
    $('.table-right h5').text(`${question.questionOrderNum}번 ${question.questionName}`);
}

function updateClusterAnalysisTable(dataArray) {
    const tableBody = document.querySelector(".cluster-analysis-table tbody");

    dataArray.forEach(data => {
        // 군집 별 데이터 처리
        const row = document.createElement("tr");

        // 군집 ID
        const clusterCell = document.createElement("td");
        clusterCell.textContent = `Cluster ${data.clusterId}`;
        row.appendChild(clusterCell);

        // 주요 키워드
        const keywordCell = document.createElement("td");
        data.topword.forEach((word, index) => {
            const keywordSpan = document.createElement("span");
            keywordSpan.classList.add("keyword-rank");

            // 키워드 순위에 따라 이미지 추가
            const icon = document.createElement("img");
            icon.src = `/resources/img/statistic/${['first', 'second', 'third'][index] || 'first'}.png`;
            icon.alt = `${index + 1}위 아이콘`;
            keywordSpan.appendChild(icon);

            // 키워드 텍스트 추가
            keywordSpan.append(` ${word}`);
            keywordCell.appendChild(keywordSpan);
        });

        row.appendChild(keywordCell);

        // 감정 분석
        const sentimentCell = document.createElement("td");
        const sentimentLabel = document.createElement("span");

        let sentimentClass = "neutral"; // 기본값 중립
        let sentimentText = "중립";

        if (data.emotion.positive > data.emotion.neutral && data.emotion.positive > data.emotion.negative) {
            sentimentClass = "positive";
            sentimentText = "긍정";
        } else if (data.emotion.negative > data.emotion.neutral && data.emotion.negative > data.emotion.positive) {
            sentimentClass = "negative";
            sentimentText = "부정";
        }

        sentimentLabel.classList.add("sentiment-label", sentimentClass);

        const sentimentIcon = document.createElement("img");
        sentimentIcon.src = `/resources/img/statistic/${sentimentClass}.png`;
        sentimentIcon.alt = `${sentimentText} 아이콘`;
        sentimentLabel.appendChild(sentimentIcon);
        sentimentLabel.append(` ${sentimentText}`);

        sentimentCell.appendChild(sentimentLabel);
        row.appendChild(sentimentCell);

        // 테이블에 행 추가
        tableBody.appendChild(row);
    });
}