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
        },
        error: function (error) {
            console.error('오류 발생 : ', error);
        }
    });
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