/*document.addEventListener("DOMContentLoaded", function () {
    $('#wordCloudContainer').focus();

    const maxChunkSize = 1000;

    const stopWords = [
        "이", "가", "을", "를", "은", "는", "의", "에", "에서", "그리고", "하지만", "또한", "너무", "아주", "매우",
        "않습니다", "왜냐하면", "되기", "것입니다", "저희", "여러분", "우리", "아", "휴", "아이구", "아이쿠", "아이고", "어",
        "나", "우리", "저희", "따라", "의해", "을", "를", "에", "의", "가", "으로", "로", "에게", "뿐이다", "의거하여",
        "근거하여", "입각하여", "기준으로", "예하면", "예를", "들면", "저", "소인", "소생", "지말고", "하지마", "하지마라",
        "다른", "물론", "또한", "그리고", "비길수", "없다", "해서는", "안된다", "만이", "아니다", "막론하고", "관계없이", "그치지",
        "않다", "그러나", "그런데", "하지만", "든간에", "논하지", "않다", "따지지", "않다", "설사", "비록", "더라도",
        "아니면", "만", "못하다", "편이", "낫다", "불문하고", "향하여", "향해서", "향하다", "쪽으로", "틈타", "이용하여",
        "타다", "오르다", "제외하고", "이외에", "이밖에", "해야", "한다", "한다면", "몰라도", "외에도", "이곳", "여기",
        "부터", "기점으로", "따라서", "할", "생각이다", "하려고하다", "이리하여", "그리하여", "그렇게", "함으로써", "하지만",
        "일때", "할때", "앞에서", "중에서", "보는데서", "으로써", "로써", "까지", "해야한다", "일것이다", "반드시", "할줄알다",
        "할수있다", "할수있어", "임에", "틀림없다", "한다면", "등", "등등", "제", "겨우", "단지", "다만", "할뿐", "딩동",
        "댕그", "대해서", "대하여", "대하면", "훨씬", "얼마나", "얼마만큼", "얼마큼", "남짓", "여", "얼마간", "약간", "다소",
        "좀", "조금", "다수", "몇", "얼마", "지만", "하물며", "또한", "그러나", "그렇지만", "하지만", "이외에도", "대해",
        "말하자면", "뿐이다", "다음에", "반대로", "반대로", "말하자면", "이와", "반대로", "바꾸어서", "말하면", "바꾸어서",
        "한다면", "만약", "그렇지않으면", "비교적", "보다더", "비하면", "시키다", "하게하다", "할만하다", "의해서", "연이서",
        "잇따라", "뒤따라", "뒤이어", "결국", "의지하여", "기대여", "통하여", "자마자", "더욱더", "불구하고", "얼마든지",
        "마음대로", "주저하지", "않고", "즉시", "바로", "당장", "하자마자", "밖에", "안된다", "하면된다", "그런즉", "구체적으로",
        "비교하면", "구체적으로", "위에서", "서술한바와같이", "인", "듯하다", "하지", "않는다면", "비록", "이르기까지",
        "한계로", "인해", "따라", "이해", "역할", "따른다", "어떻게", "어찌", "또한", "대체로", "기타", "해보니", "뿐만",
        "아니라", "남자", "여자", "남성", "여성", "의해", "기점으로"
    ];

    // 페이지 로드 시 전체 데이터로 워드클라우드 생성
    if (clusteringData && clusteringData.length > 0) {
        generateWordCloudFromAll();
    } else {
        console.warn("clusteringData is empty or undefined.");
    }

    const wordCloudContainer = $('#wordCloudContainer');
    wordCloudContainer.focus();
    wordCloudContainer[0].scrollIntoView({behavior: 'smooth', block: 'start'});
    wordCloudContainer.addClass('highlight');

    setTimeout(() => {
        wordCloudContainer.removeClass('highlight');
    }, 2000);


    let currentStep = 1;
    const steps = document.querySelectorAll(".step");
    const dividers = document.querySelectorAll(".step-divider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const updateSteps = () => {
        steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
        dividers.forEach((divider, index) => divider.classList.toggle("active", index < currentStep));
        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === steps.length - 1;
    };

    prevBtn.addEventListener("click", () => {
        if (currentStep > 0) currentStep--;
        updateSteps();
    });
    nextBtn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) currentStep++;
        updateSteps();
    });
    steps.forEach((step, index) => step.addEventListener("click", () => {
        currentStep = index;
        updateSteps();
    }));
    updateSteps();

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


    let clusterDropdown = $('#phrase');
    [...new Set(clusteringData.map(item => item.cluster))].forEach(cluster => {
        clusterDropdown.append(new Option(`Cluster ${cluster}`, cluster));
    });

    clusterDropdown.change(function () {
        let selectedCluster = $(this).val();
        currentData = selectedCluster !== "phrase" ? clusteringData.filter(item => item.cluster == selectedCluster) : clusteringData;
        renderTable(currentData); // 현재 데이터로 테이블 렌더링
        generateWordCloudFromCurrentData(); // 현재 데이터로 워드클라우드 생성
    });

    function calculateWordFrequency(text) {
        if (!text) return 0;
        return text.trim().split(/\s+/).length;
    }


    renderTable(clusteringData);


    $('#table-search-btn').click(() => {
        let keyword = $('#keyword-input').val().trim();
        currentData = keyword ? clusteringData.filter(item => item.answerContent.includes(keyword)) : clusteringData; // 현재 데이터를 업데이트
        renderTable(currentData); // 현재 데이터로 테이블 렌더링
        generateWordCloudFromCurrentData(); // 현재 데이터로 워드클라우드 생성
    });

    $('#wordcloud-tab').click(function () {
        setActiveTab($(this));
        $(this).prop("disabled", true);
        clusteringData.length === 0 ? alert("데이터를 조회해주세요.") : generateWordCloudFromAll();
    });

    function setActiveTab(tab) {
        $('#wordcloud-tab, #emotion-tab').removeClass('active');
        tab.addClass('active');

        const isWordCloudActive = tab.attr("id") === "wordcloud-tab";
        $('#wordCloudContainer').toggle(isWordCloudActive);
        $('#emotionChartContainer').toggle(!isWordCloudActive);

        // 포커스 설정 및 강조 효과 추가
        if (isWordCloudActive) {
            $('#wordCloudContainer').focus();
            $('#wordCloudContainer').addClass('highlight'); // 강조 효과를 위한 클래스 추가
        } else {
            $('#emotionChartContainer').focus();
            $('#emotionChartContainer').removeClass('highlight'); // 강조 효과 제거
        }
    }

    // 워드클라우드 생성함수
    function generateWordCloudFromCurrentData() {
        createWordCloud(currentData.map(item => item.answerContent).join(" ").split(/\s+/)
            .reduce((freq, word) => {
                word = word.trim();
                if (!stopWords.includes(word) && word.length > 1) {
                    freq[word] = (freq[word] || 0) + 1;
                }
                return freq;
            }, {}));
    }


    // 빈도수 계산
    function generateWordCloudFromAll() {
        createWordCloud(clusteringData.map(item => item.answerContent).join(" ").split(/\s+/)
            .reduce((freq, word) => {
                word = word.trim();
                if (!stopWords.includes(word) && word.length > 1) {
                    freq[word] = (freq[word] || 0) + 1;
                }
                return freq;
            }, {}));
    }

    // 상위 단어 추출 함수 추가
    function calculateTopWords(text, topN = 3) {
        if (!text) return [];
        const wordFrequency = text.trim().split(/\s+/).reduce((freq, word) => {
            word = word.trim();
            if (!stopWords.includes(word) && word.length > 1) {
                freq[word] = (freq[word] || 0) + 1;
            }
            return freq;
        }, {});

        // 가장 높은 N개의 단어를 정렬하여 반환
        return Object.entries(wordFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, topN)
            .map(([word]) => word);
    }



    function createWordCloud(wordFrequency) {
        if (!Object.keys(wordFrequency).length) {
            alert("워드클라우드를 생성할 단어가 없습니다.");
            resetButtons();
            return;
        }
        WordCloud(document.getElementById('wordCloudContainer'), {
            list: Object.entries(wordFrequency),
            gridSize: 15,
            weightFactor: size => size * 17,
            fontFamily: 'Poppins, sans-serif',
            color: 'random-dark',
            backgroundColor: '#f8f9fc',
            rotateRatio: 0,
            minSize: 15,
            drawOutOfBound: false
        });
        resetButtons();
    }

    function resetButtons() {
        $('#wordcloud-btn').prop("disabled", false);
        $('#emotion-tab').prop("disabled", false);
    }

    // 감정 분석 탭을 누를 때마다 감정 빈도수를 집계하고 시각화
    $('#emotion-tab').click(function () {
        setActiveTab($(this));
        $(this).prop("disabled", true);
        if (currentData.length === 0) {
            alert("데이터를 조회해주세요.");
            resetButtons();
            return;
        }
        analyzeEmotionByRow(currentData); // 현재 데이터로 감정 분석 수행
    });


    function renderTable(data) {
        let tbody = $(".result-table tbody");
        tbody.empty();
        if (data.length === 0) {
            tbody.append("<tr><td colspan='7'>검색 결과가 없습니다.</td></tr>");
        } else {
            data.forEach((item, index) => {
                const topWords = calculateTopWords(item.answerContent); // 가장 높은 단어 추출
                tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.cluster}</td>
                    <td class="ans-content">${item.answerContent}</td>
                    <td>${item.answerDate}</td>
                    <td>${calculateWordFrequency(item.answerContent)}</td>
                     <td class="top-words">${topWords.join(', ')}</td> <!-- 상위 단어 추가 -->
                    <td>
                        <button class="btn btn-primary btn-sm analyze-btn" data-index="${index}">상세보기</button>
                    </td>
                    <td class="emotion-result" data-index="${index}">-</td>
                </tr>
            `);
            });
        }
    }

}); //이벤트리스너 종료부분

// 각 행의 감정분석 버튼 클릭 이벤트
$(".analyze-btn").click(function () {
    let text = $(this).parents('tr').find('.ans-content').text();
    const rowIndex = $(this).data("index");

    // 감정 결과 열 데이터를 비우기
    // $(`.emotion-result[data-index="${rowIndex}"]`).text("-"); // 데이터 비우기 또는 기본값 설정

    analyzeEmotionForRow(text, rowIndex);
});

function analyzeEmotionForRow(rowData, rowIndex) {
    $.ajax({
        url: "/api/statistic/analyzeEmotion",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({text: rowData}),
        success: function (response) {
            if (response && response.document && response.document.confidence) {
                const {positive, neutral, negative} = response.document.confidence;
                const sentiment = positive > neutral && positive > negative ? "긍정" :
                    negative > positive && negative > neutral ? "부정" : "중립";

                const colorMap = {
                    positive: "green",
                    neutral: "blue",
                    negative: "red"
                };

                const highlightedText = `<span style="color: ${colorMap[sentiment]}">${rowData}</span>`;

                $("#modalContent").html(`
                    <div><strong>테스트 문장:</strong> ${highlightedText}</div>
                    <div><strong>감정 분류 결과:</strong> <span style="color: ${colorMap[sentiment]}">${sentiment}</span></div>
                    <div>긍정: <span style="color: ${colorMap.positive};">${positive.toFixed(2)}</span>, 
                     <div>중립: <span style="color: ${colorMap.neutral};">${neutral.toFixed(2)}</span>, 
                        <div>부정: <span style="color: ${colorMap.negative};">${negative.toFixed(2)}</span></div>
                `);
                $("#emotionModal").modal("show");
            } else {
                console.error("Invalid sentiment analysis response:", response);
                $("#modalContent").text("감정 분석에 실패했습니다.");
                $("#emotionModal").modal("show");
            }
        },
        error: function (xhr, status, error) {
            console.error("Sentiment analysis request failed:", status, error);
            $("#modalContent").text("오류 발생: 감정 분석 요청에 실패했습니다.");
            $("#emotionModal").modal("show");
        }
    });
}


// 감정 분석 버튼 클릭 시 모달 표시 이벤트
// $(document).on("click", ".analyze-btn", function () {
//     const rowIndex = $(this).data("index");
//     const text = $(this).closest("tr").find(".ans-content").text();
//
//     // 감정 결과 열 데이터를 비우기
//     // $(`.emotion-result[data-index="${rowIndex}"]`).text("-"); // 데이터 비우기 또는 기본값 설정
//
//     $.ajax({
//         url: "/api/statistic/analyzeEmotion",
//         method: "POST",
//         contentType: "application/json",
//         data: JSON.stringify({text: text}),
//         success: function (response) {
//             if (response && response.document && response.document.confidence) {
//                 const {positive, neutral, negative} = response.document.confidence;
//                 const sentiment = positive > neutral && positive > negative ? "긍정" :
//                     negative > positive && negative > neutral ? "부정" : "중립";
//
//
//                 $("#modalContent").html(`
//             <div><strong>테스트 문장:</strong> ${text}</div>
//             <div><strong>감정 분류 결과:</strong> ${sentiment}</div>
//             <div>긍정: ${positive.toFixed(2)}, 중립: ${neutral.toFixed(2)}, 부정: ${negative.toFixed(2)}</div>
//         `);
//                 $("#emotionModal").modal("show");
//             } else {
//                 $("#modalContent").text("감정 분석에 실패했습니다.");
//                 $("#emotionModal").modal("show");
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error("Sentiment analysis request failed:", error);
//             $("#modalContent").text("오류 발생: 감정 분석 요청에 실패했습니다.");
//             $("#emotionModal").modal("show");
//         }
//     });
// });


// 전체 감정 분석 버튼 클릭 이벤트
document.getElementById("analyzeAllBtn").addEventListener("click", function () {
    const tableData = collectTableData().map(data => ({ text: data.answerContent,order:data.seq }));
    console.log(tableData);
    $.ajax({
        url: "/api/statistic/analyzeAllEmotions",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(tableData),
        success: function (response) {
            console.log(response);
            response.forEach((result) => {
                const orderIndex = result.order - 1; // order는 1부터 시작하므로 -1...!!

                const highestEmotion = result.name; // name 속성에서 감정 값을 가져옴
                // const { positive, neutral, negative } = result;

                // 가장 높은 감정 결정
                // let highestEmotion = "중립"; // 기본값
                // if (positive > neutral && positive > negative) {
                //     highestEmotion = "긍정";
                // } else if (negative > positive && negative > neutral) {
                //     highestEmotion = "부정";
                // }

                // 감정 결과 업데이트
                const emotionHTML = getStyledEmotionHTML(highestEmotion);
                $(`.emotion-result[data-index="${orderIndex}"]`).html(emotionHTML);
            });

        },
        error: function (xhr, status, error) {
            console.error("전체 감정 분석 실패:", error);
        }
    });
});

function getStyledEmotionHTML(emotion) {
    let iconHTML = "";
    let color = "";

    switch (emotion) {
        case "긍정":
            iconHTML = "✔️";
            color = "#007bff";
            break;
        case "중립":
            iconHTML = "➖";
            color = "#6c757d";
            break;
        case "부정":
            iconHTML = "❌";
            color = "#dc3545";
            break;
    }
    return `<span style="color: ${color}; font-weight: bold;">${iconHTML} ${emotion}</span>`;
}


function analyzeEmotionByRow(data) {
    let positiveCount = 0, neutralCount = 0, negativeCount = 0;
    let totalPositive = 0, totalNeutral = 0, totalNegative = 0;
    let processedCount = 0;

    data.forEach((item, index) => {
        $.ajax({
            url: "/api/statistic/analyzeEmotion",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({text: item.answerContent}),
            success: function (response) {
                if (response && response.document && response.document.confidence) {
                    const {positive, neutral, negative} = response.document.confidence;

                    // 가장 높은 confidence 값을 기준으로 감정을 결정하여 카운트
                    if (positive >= neutral && positive >= negative) {
                        positiveCount++;
                    } else if (neutral >= positive && neutral >= negative) {
                        neutralCount++;
                    } else {
                        negativeCount++;
                    }

                    // 각 감정의 합산을 위해 값을 저장
                    totalPositive += positive;
                    totalNeutral += neutral;
                    totalNegative += negative;
                }

                processedCount++;
                if (processedCount === data.length) {
                    // 퍼센티지 계산을 위한 비율 변환
                    let total = totalPositive + totalNeutral + totalNegative;
                    let avgPositive = (totalPositive / total) * 100;
                    let avgNeutral = (totalNeutral / total) * 100;
                    let avgNegative = (totalNegative / total) * 100;

                    renderChart({
                        document: {
                            confidence: {
                                positive: avgPositive,
                                neutral: avgNeutral,
                                negative: avgNegative
                            }
                        }
                    });
                    resetButtons();
                }
            },
            error: function (xhr, status, error) {
                console.error("감정 분석 API 요청 중 오류 발생:", status, error);
                processedCount++;
                if (processedCount === data.length) {
                    resetButtons();
                }
            }
        });
    });
}

function renderChart(data) {
    if (!data || !data.document || !data.document.confidence) {
        console.error("Invalid data for chart:", data);
        return;
    }
    // 현재 데이터를 저장하여 차트 타입 변경 시 사용
    window.currentChartData = data;

    const ctx = document.getElementById('chart-container').getContext('2d');
    const chartType = $('#chart-type-selector').val();


    if (window.currentChart) {
        window.currentChart.destroy();
    }

    window.currentChart = (chartType === 'pie' ? drawPieChart : drawBarChart)(ctx, data);
}


$('#chart-type-selector').change(() => {
    if (window.currentChartData) {
        renderChart(window.currentChartData);
    }
});

function drawPieChart(ctx, data) {
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['긍정', '중립', '부정'],
            datasets: [{
                data: [
                    data.document.confidence.positive,
                    data.document.confidence.neutral,
                    data.document.confidence.negative
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)']
            }]
        },
        options: {responsive: true}
    });
};

function drawBarChart(ctx, data) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['긍정', '중립', '부정'],
            datasets: [{
                label: '감정 분석 결과',
                data: [
                    data.document.confidence.positive,
                    data.document.confidence.neutral,
                    data.document.confidence.negative
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)']
            }]
        },
        options: {
            responsive: true,
            scales: {y: {beginAtZero: true}}
        }
    });
};


// 개별 감정분석 버튼 클릭 시 모달 표시 이벤트
$(document).on("click", ".analyze-btn", function () {
    const rowIndex = $(this).data("index");
    const text = $(this).closest("tr").find(".ans-content").text();

    // 감정 결과 열 데이터를 비우기
    // $(`.emotion-result[data-index="${rowIndex}"]`).text("-"); // 데이터 비우기 또는 기본값 설정

    $.ajax({
        url: "/api/statistic/analyzeEmotion",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({text: text}),
        success: function (response) {
            if (response && response.document && response.document.confidence) {
                const {positive, neutral, negative} = response.document.confidence;
                const sentiment = positive > neutral && positive > negative ? "긍정" :
                    negative > positive && negative > neutral ? "부정" : "중립";

                let highestSentiment = "neutral";
                let highestValue = neutral;
                if (positive > highestValue) {
                    highestSentiment = "positive";
                    highestValue = positive;
                }
                if (negative > highestValue) {
                    highestSentiment = "negative";
                    highestValue = negative;
                }

                const colorMap = {
                    positive: "green",
                    neutral: "blue",
                    negative: "red"
                };

                const highlightedText = `<span style="color: ${colorMap[highestSentiment]}; font-weight: bold;">${text}</span>`;

                $("#modalContent").html(`
                    <div><strong>테스트 문장:</strong> ${highlightedText}</div>
                    <div><strong>감정 분류 결과:</strong> <span style="color: ${colorMap[highestSentiment]}; font-weight: bold;">${sentiment}</span></div>
                    <div>긍정: <span style="color: ${colorMap.positive};">${positive.toFixed(2)}</span>, 
                         중립: <span style="color: ${colorMap.neutral};">${neutral.toFixed(2)}</span>, 
                         부정: <span style="color: ${colorMap.negative};">${negative.toFixed(2)}</span></div>
                `);
                $("#emotionModal").modal("show");
            } else {
                $("#modalContent").text("감정 분석에 실패했습니다.");
                $("#emotionModal").modal("show");
            }
        },
        error: function (xhr, status, error) {
            console.error("Sentiment analysis request failed:", error);
            $("#modalContent").text("오류 발생: 감정 분석 요청에 실패했습니다.");
            $("#emotionModal").modal("show");
        }
    });
});


// 다음페이지 버튼 후 군집별 비교분석페이지로 이동
$("#nextBtn").click(function () {
    console.log("다음 버튼 클릭");
    const tableData = collectTableData();


    const tableDataJsonString = JSON.stringify(tableData);


    let form = document.createElement("form");
    form.method = "POST";
    form.action = "/statistic/compareClustering";


    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "tableData";
    input.value = tableDataJsonString;


    form.appendChild(input);
    document.body.appendChild(form);


    form.submit();

    // $.ajax({
    //     url: "/api/statistic/compareClustering",
    //     method: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify(tableData),
    //     success: function(response) {
    //         console.log("데이터 전송 성공:", response);
    //
    //         //window.location.href = "/statistic/compareClustering";
    //     },
    //     error: function(xhr, status, error) {
    //         console.error("데이터 전송 실패:", error);
    //     }
    // });
});

// JSON형식으로 테이블 데이터 수집
function collectTableData() {
    let tableData = [];
    $(".result-table tbody tr").each(function () {
        let rowData = {
            seq: $(this).find("td:eq(0)").text().trim(),
            cluster: $(this).find("td:eq(1)").text().trim(),
            answerContent: $(this).find("td:eq(2)").text().trim(),
            answerDate: $(this).find("td:eq(3)").text().trim(),
            frequency: $(this).find("td:eq(4)").text().trim(),
            topwords: $(this).find("td:eq(5)").text().trim(),
            details: $(this).find("td:eq(6)").text().trim(),
            sentimentResult: $(this).find(".emotion-result").text().trim()
        };
        console.log(rowData);
        tableData.push(rowData);
    });
    return tableData;
}

// 서버로 전송
function sendDataToServer() {
    let tableData = collectTableData();
    fetch("/statistic/compareClustering", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tableData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("서버 응답 에러");
            }
            return response.json();
        })
        .then(data => console.log("서버 응답 데이터:", data))
        .catch(error => console.error("에러 발생:", error));
}*/

document.addEventListener("DOMContentLoaded", function () {
    $('#wordCloudContainer').focus();

    const maxChunkSize = 1000;

    const stopWords = [
        "이", "가", "을", "를", "은", "는", "의", "에", "에서", "그리고", "하지만", "또한", "너무", "아주", "매우",
        "않습니다", "왜냐하면", "되기", "것입니다", "저희", "여러분", "우리", "아", "휴", "아이구", "아이쿠", "아이고", "어",
        "나", "우리", "저희", "따라", "의해", "을", "를", "에", "의", "가", "으로", "로", "에게", "뿐이다", "의거하여",
        "근거하여", "입각하여", "기준으로", "예하면", "예를", "들면", "저", "소인", "소생", "지말고", "하지마", "하지마라",
        "다른", "물론", "또한", "그리고", "비길수", "없다", "해서는", "안된다", "만이", "아니다", "막론하고", "관계없이", "그치지",
        "않다", "그러나", "그런데", "하지만", "든간에", "논하지", "않다", "따지지", "않다", "설사", "비록", "더라도",
        "아니면", "만", "못하다", "편이", "낫다", "불문하고", "향하여", "향해서", "향하다", "쪽으로", "틈타", "이용하여",
        "타다", "오르다", "제외하고", "이외에", "이밖에", "해야", "한다", "한다면", "몰라도", "외에도", "이곳", "여기",
        "부터", "기점으로", "따라서", "할", "생각이다", "하려고하다", "이리하여", "그리하여", "그렇게", "함으로써", "하지만",
        "일때", "할때", "앞에서", "중에서", "보는데서", "으로써", "로써", "까지", "해야한다", "일것이다", "반드시", "할줄알다",
        "할수있다", "할수있어", "임에", "틀림없다", "한다면", "등", "등등", "제", "겨우", "단지", "다만", "할뿐", "딩동",
        "댕그", "대해서", "대하여", "대하면", "훨씬", "얼마나", "얼마만큼", "얼마큼", "남짓", "여", "얼마간", "약간", "다소",
        "좀", "조금", "다수", "몇", "얼마", "지만", "하물며", "또한", "그러나", "그렇지만", "하지만", "이외에도", "대해",
        "말하자면", "뿐이다", "다음에", "반대로", "반대로", "말하자면", "이와", "반대로", "바꾸어서", "말하면", "바꾸어서",
        "한다면", "만약", "그렇지않으면", "비교적", "보다더", "비하면", "시키다", "하게하다", "할만하다", "의해서", "연이서",
        "잇따라", "뒤따라", "뒤이어", "결국", "의지하여", "기대여", "통하여", "자마자", "더욱더", "불구하고", "얼마든지",
        "마음대로", "주저하지", "않고", "즉시", "바로", "당장", "하자마자", "밖에", "안된다", "하면된다", "그런즉", "구체적으로",
        "비교하면", "구체적으로", "위에서", "서술한바와같이", "인", "듯하다", "하지", "않는다면", "비록", "이르기까지",
        "한계로", "인해", "따라", "이해", "역할", "따른다", "어떻게", "어찌", "또한", "대체로", "기타", "해보니", "뿐만",
        "아니라", "남자", "여자", "남성", "여성", "의해", "기점으로"
    ];

    // 페이지 로드 시 전체 데이터로 워드클라우드 생성
    if (clusteringData && clusteringData.length > 0) {
        generateWordCloudFromAll();
    } else {
        console.warn("clusteringData is empty or undefined.");
    }

    const wordCloudContainer = $('#wordCloudContainer');
    wordCloudContainer.focus();
    wordCloudContainer[0].scrollIntoView({behavior: 'smooth', block: 'start'});
    wordCloudContainer.addClass('highlight');

    setTimeout(() => {
        wordCloudContainer.removeClass('highlight');
    }, 2000);


    let currentStep = 1;
    const steps = document.querySelectorAll(".step");
    const dividers = document.querySelectorAll(".step-divider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const updateSteps = () => {
        steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
        dividers.forEach((divider, index) => divider.classList.toggle("active", index < currentStep));
        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === steps.length - 1;
    };

    prevBtn.addEventListener("click", () => {
        if (currentStep > 0) currentStep--;
        updateSteps();
    });
    nextBtn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) currentStep++;
        updateSteps();
    });
    steps.forEach((step, index) => step.addEventListener("click", () => {
        currentStep = index;
        updateSteps();
    }));
    updateSteps();

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


    let clusterDropdown = $('#phrase');
    [...new Set(clusteringData.map(item => item.cluster))].forEach(cluster => {
        clusterDropdown.append(new Option(`Cluster ${cluster}`, cluster));
    });

    clusterDropdown.change(function () {
        let selectedCluster = $(this).val();
        currentData = selectedCluster !== "phrase" ? clusteringData.filter(item => item.cluster == selectedCluster) : clusteringData;
        renderTable(currentData); // 현재 데이터로 테이블 렌더링
        generateWordCloudFromCurrentData(); // 현재 데이터로 워드클라우드 생성
    });

    function calculateWordFrequency(text) {
        if (!text) return 0;
        return text.trim().split(/\s+/).length;
    }


    renderTable(clusteringData);


    $('#table-search-btn').click(() => {
        let keyword = $('#keyword-input').val().trim();
        currentData = keyword ? clusteringData.filter(item => item.answerContent.includes(keyword)) : clusteringData; // 현재 데이터를 업데이트
        renderTable(currentData); // 현재 데이터로 테이블 렌더링
        generateWordCloudFromCurrentData(); // 현재 데이터로 워드클라우드 생성
    });

    $('#wordcloud-tab').click(function () {
        setActiveTab($(this));
        $(this).prop("disabled", true);
        clusteringData.length === 0 ? alert("데이터를 조회해주세요.") : generateWordCloudFromAll();
    });

    function setActiveTab(tab) {
        $('#wordcloud-tab, #emotion-tab').removeClass('active');
        tab.addClass('active');

        const isWordCloudActive = tab.attr("id") === "wordcloud-tab";
        $('#wordCloudContainer').toggle(isWordCloudActive);
        $('#emotionChartContainer').toggle(!isWordCloudActive);

        // 포커스 설정 및 강조 효과 추가
        if (isWordCloudActive) {
            $('#wordCloudContainer').focus();
            $('#wordCloudContainer').addClass('highlight'); // 강조 효과를 위한 클래스 추가
        } else {
            $('#emotionChartContainer').focus();
            $('#emotionChartContainer').removeClass('highlight'); // 강조 효과 제거
        }
    }

    // 워드클라우드 생성함수
    function generateWordCloudFromCurrentData() {
        createWordCloud(currentData.map(item => item.answerContent).join(" ").split(/\s+/)
            .reduce((freq, word) => {
                word = word.trim();
                if (!stopWords.includes(word) && word.length > 1) {
                    freq[word] = (freq[word] || 0) + 1;
                }
                return freq;
            }, {}));
    }


    // 빈도수 계산
    function generateWordCloudFromAll() {
        createWordCloud(clusteringData.map(item => item.answerContent).join(" ").split(/\s+/)
            .reduce((freq, word) => {
                word = word.trim();
                if (!stopWords.includes(word) && word.length > 1) {
                    freq[word] = (freq[word] || 0) + 1;
                }
                return freq;
            }, {}));
    }

    // 상위 단어 추출 함수 추가
    function calculateTopWords(text, topN = 3) {
        if (!text) return [];
        const wordFrequency = text.trim().split(/\s+/).reduce((freq, word) => {
            word = word.trim();
            if (!stopWords.includes(word) && word.length > 1) {
                freq[word] = (freq[word] || 0) + 1;
            }
            return freq;
        }, {});

        // 가장 높은 N개의 단어를 정렬하여 반환
        return Object.entries(wordFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, topN)
            .map(([word]) => word);
    }


    function createWordCloud(wordFrequency) {
        if (!Object.keys(wordFrequency).length) {
            alert("워드클라우드를 생성할 단어가 없습니다.");
            resetButtons();
            return;
        }
        WordCloud(document.getElementById('wordCloudContainer'), {
            list: Object.entries(wordFrequency),
            gridSize: 15,
            weightFactor: size => size * 17,
            fontFamily: 'Poppins, sans-serif',
            color: 'random-dark',
            backgroundColor: '#f8f9fc',
            rotateRatio: 0,
            minSize: 15,
            drawOutOfBound: false
        });
        resetButtons();
    }

    function resetButtons() {
        $('#wordcloud-btn').prop("disabled", false);
        $('#emotion-tab').prop("disabled", false);
    }

    // 감정 분석 탭을 누를 때마다 감정 빈도수를 집계하고 시각화
    $('#emotion-tab').click(function () {
        setActiveTab($(this));
        $(this).prop("disabled", true);
        if (currentData.length === 0) {
            alert("데이터를 조회해주세요.");
            resetButtons();
            return;
        }
        analyzeEmotionByRow(currentData); // 현재 데이터로 감정 분석 수행
    });


    function renderTable(data) {
        let tbody = $(".result-table tbody");
        tbody.empty();
        if (data.length === 0) {
            tbody.append("<tr><td colspan='7'>검색 결과가 없습니다.</td></tr>");
        } else {
            data.forEach((item, index) => {
                const topWords = calculateTopWords(item.answerContent); // 가장 높은 단어 추출
                tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.cluster}</td>
                    <td class="ans-content">${item.answerContent}</td>
                    <td>${item.answerDate}</td>
                    <td>${calculateWordFrequency(item.answerContent)}</td>
                     <td class="top-words">${topWords.join(', ')}</td> <!-- 상위 단어 추가 -->
                    <td>
                        <button class="btn btn-primary btn-sm analyze-btn" data-index="${index}">상세보기</button>
                    </td>
                    <td class="emotion-result" data-index="${index}">-</td>
                </tr>
            `);
            });
        }
    }

}); //이벤트리스너 종료부분

let emotionResults  = {}; // 전역 변수로 "상세보기" 모달창의 결과 각 감정 수치들 받아 넘기기

// 각 행의 감정분석 버튼 클릭 이벤트
$(".analyze-btn").click(function () {
    let text = $(this).parents('tr').find('.ans-content').text();
    const rowIndex = $(this).data("index");

    // 감정 결과 열 데이터를 비우기
    // $(`.emotion-result[data-index="${rowIndex}"]`).text("-"); // 데이터 비우기 또는 기본값 설정

    analyzeEmotionForRow(text, rowIndex);
});



// function analyzeEmotionForRow(rowData, rowIndex) {
//     $.ajax({
//         url: "/api/statistic/analyzeEmotion",
//         method: "POST",
//         contentType: "application/json",
//         data: JSON.stringify({text: rowData}),
//         success: function (response) {
//             if (response && response.document && response.document.confidence) {
//                 const {positive, neutral, negative} = response.document.confidence;
//                 const sentiment = positive > neutral && positive > negative ? "긍정" :
//                     negative > positive && negative > neutral ? "부정" : "중립";
//
//                 const colorMap = {
//                     positive: "green",
//                     neutral: "blue",
//                     negative: "red"
//                 };
//
//                 // 감정 결과를 details 변수에 추가
//                 const detailsText = `긍정: ${positive.toFixed(2)}, 중립: ${neutral.toFixed(2)}, 부정: ${negative.toFixed(2)}`;
//                 const highlightedText = `<span style="color: ${colorMap[sentiment]}">${rowData}</span>`;
//
//                 $("#modalContent").html(`
//                     <div><strong>테스트 문장:</strong> ${highlightedText}</div>
//                     <div><strong>감정 분류 결과:</strong> <span style="color: ${colorMap[sentiment]}">${sentiment}</span></div>
//                     <div>${detailsText}</div>
//
//                     <!--                    <div>긍정: <span style="color: ${colorMap.positive};">${positive.toFixed(2)}</span>, -->
// <!--                     <div>중립: <span style="color: ${colorMap.neutral};">${neutral.toFixed(2)}</span>, -->
// <!--                        <div>부정: <span style="color: ${colorMap.negative};">${negative.toFixed(2)}</span></div>-->
//
//                 `);
//                 // 감정 결과를 전역 변수에 저장
//                 emotionResults[rowIndex] = { positive, neutral, negative };
//
//                 // 모달에서 데이터를 넘기기 위해 details 업데이트
//                 let tableRow = $(".result-table tbody tr").eq(rowIndex);
//                 tableRow.find(".details").text(detailsText); // details 열에 감정 결과 추가
//
//                 $("#emotionModal").modal("show");
//             } else {
//                 console.error("Invalid sentiment analysis response:", response);
//                 $("#modalContent").text("감정 분석에 실패했습니다.");
//                 $("#emotionModal").modal("show");
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error("Sentiment analysis request failed:", status, error);
//             $("#modalContent").text("오류 발생: 감정 분석 요청에 실패했습니다.");
//             $("#emotionModal").modal("show");
//         }
//     });
// }
function analyzeEmotionForRow(rowData, rowIndex) {
    $.ajax({
        url: "/api/statistic/analyzeEmotion",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ text: rowData }),
        success: function (response) {
            console.log("Response from server:", response); // Log the server response
            if (response && response.document && response.document.confidence) {
                const { positive, neutral, negative } = response.document.confidence;
                const sentiment = positive > neutral && positive > negative ? "긍정" :
                    negative > positive && negative > neutral ? "부정" : "중립";

                const detailsText = `긍정: ${positive.toFixed(2)}, 중립: ${neutral.toFixed(2)}, 부정: ${negative.toFixed(2)}`;
                console.log("Details text:", detailsText); // Log the details text

                let tableRow = $(".result-table tbody tr").eq(rowIndex);
                tableRow.find(".details").text(detailsText); // Update details

                // Show modal with sentiment information
                $("#modalContent").html(`
                    <div><strong>테스트 문장:</strong> ${rowData}</div>
                    <div><strong>감정 분류 결과:</strong> ${sentiment}</div>
                    <div>${detailsText}</div>
                `);
                $("#emotionModal").modal("show");
            } else {
                console.error("Invalid sentiment analysis response:", response);
                $("#modalContent").text("감정 분석에 실패했습니다.");
                $("#emotionModal").modal("show");
            }
        },
        error: function (xhr, status, error) {
            console.error("Sentiment analysis request failed:", status, error);
            $("#modalContent").text("오류 발생: 감정 분석 요청에 실패했습니다.");
            $("#emotionModal").modal("show");
        }
    });
}



// 감정 분석 버튼 클릭 시 모달 표시 이벤트
// $(document).on("click", ".analyze-btn", function () {
//     const rowIndex = $(this).data("index");
//     const text = $(this).closest("tr").find(".ans-content").text();
//
//     // 감정 결과 열 데이터를 비우기
//     // $(`.emotion-result[data-index="${rowIndex}"]`).text("-"); // 데이터 비우기 또는 기본값 설정
//
//     $.ajax({
//         url: "/api/statistic/analyzeEmotion",
//         method: "POST",
//         contentType: "application/json",
//         data: JSON.stringify({text: text}),
//         success: function (response) {
//             if (response && response.document && response.document.confidence) {
//                 const {positive, neutral, negative} = response.document.confidence;
//                 const sentiment = positive > neutral && positive > negative ? "긍정" :
//                     negative > positive && negative > neutral ? "부정" : "중립";
//
//
//                 $("#modalContent").html(`
//             <div><strong>테스트 문장:</strong> ${text}</div>
//             <div><strong>감정 분류 결과:</strong> ${sentiment}</div>
//             <div>긍정: ${positive.toFixed(2)}, 중립: ${neutral.toFixed(2)}, 부정: ${negative.toFixed(2)}</div>
//         `);
//                 $("#emotionModal").modal("show");
//             } else {
//                 $("#modalContent").text("감정 분석에 실패했습니다.");
//                 $("#emotionModal").modal("show");
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error("Sentiment analysis request failed:", error);
//             $("#modalContent").text("오류 발생: 감정 분석 요청에 실패했습니다.");
//             $("#emotionModal").modal("show");
//         }
//     });
// });


// 전체 감정 분석 버튼 클릭 이벤트
document.getElementById("analyzeAllBtn").addEventListener("click", function () {
    const tableData = collectTableData().map(data => ({text: data.answerContent, order: data.seq}));
    console.log(tableData);
    $.ajax({
        url: "/api/statistic/analyzeAllEmotions",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(tableData),
        success: function (response) {
            console.log(response);
            response.forEach((result) => {
                const orderIndex = result.order - 1; // order는 1부터 시작하므로 -1...!!

                const highestEmotion = result.name; // name 속성에서 감정 값을 가져옴
                // const { positive, neutral, negative } = result;

                // 가장 높은 감정 결정
                // let highestEmotion = "중립"; // 기본값
                // if (positive > neutral && positive > negative) {
                //     highestEmotion = "긍정";
                // } else if (negative > positive && negative > neutral) {
                //     highestEmotion = "부정";
                // }

                // 감정 결과 업데이트
                const emotionHTML = getStyledEmotionHTML(highestEmotion);
                $(`.emotion-result[data-index="${orderIndex}"]`).html(emotionHTML);
            });

        },
        error: function (xhr, status, error) {
            console.error("전체 감정 분석 실패:", error);
        }
    });
});

function getStyledEmotionHTML(emotion) {
    let iconHTML = "";
    let color = "";

    switch (emotion) {
        case "긍정":
            iconHTML = "✔️";
            color = "#007bff";
            break;
        case "중립":
            iconHTML = "➖";
            color = "#6c757d";
            break;
        case "부정":
            iconHTML = "❌";
            color = "#dc3545";
            break;
    }
    return `<span style="color: ${color}; font-weight: bold;">${iconHTML} ${emotion}</span>`;
}


function analyzeEmotionByRow(data) {
    let positiveCount = 0, neutralCount = 0, negativeCount = 0;
    let totalPositive = 0, totalNeutral = 0, totalNegative = 0;
    let processedCount = 0;

    data.forEach((item, index) => {
        $.ajax({
            url: "/api/statistic/analyzeEmotion",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({text: item.answerContent}),
            success: function (response) {
                if (response && response.document && response.document.confidence) {
                    const {positive, neutral, negative} = response.document.confidence;

                    // 가장 높은 confidence 값을 기준으로 감정을 결정하여 카운트
                    if (positive >= neutral && positive >= negative) {
                        positiveCount++;
                    } else if (neutral >= positive && neutral >= negative) {
                        neutralCount++;
                    } else {
                        negativeCount++;
                    }

                    // 각 감정의 합산을 위해 값을 저장
                    totalPositive += positive;
                    totalNeutral += neutral;
                    totalNegative += negative;
                }

                processedCount++;
                if (processedCount === data.length) {
                    // 퍼센티지 계산을 위한 비율 변환
                    let total = totalPositive + totalNeutral + totalNegative;
                    let avgPositive = (totalPositive / total) * 100;
                    let avgNeutral = (totalNeutral / total) * 100;
                    let avgNegative = (totalNegative / total) * 100;

                    renderChart({
                        document: {
                            confidence: {
                                positive: avgPositive,
                                neutral: avgNeutral,
                                negative: avgNegative
                            }
                        }
                    });
                    resetButtons();
                }
            },
            error: function (xhr, status, error) {
                console.error("감정 분석 API 요청 중 오류 발생:", status, error);
                processedCount++;
                if (processedCount === data.length) {
                    resetButtons();
                }
            }
        });
    });
}

function renderChart(data) {
    if (!data || !data.document || !data.document.confidence) {
        console.error("Invalid data for chart:", data);
        return;
    }
    // 현재 데이터를 저장하여 차트 타입 변경 시 사용
    window.currentChartData = data;

    const ctx = document.getElementById('chart-container').getContext('2d');
    const chartType = $('#chart-type-selector').val();


    if (window.currentChart) {
        window.currentChart.destroy();
    }

    window.currentChart = (chartType === 'pie' ? drawPieChart : drawBarChart)(ctx, data);
}


$('#chart-type-selector').change(() => {
    if (window.currentChartData) {
        renderChart(window.currentChartData);
    }
});

function drawPieChart(ctx, data) {
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['긍정', '중립', '부정'],
            datasets: [{
                data: [
                    data.document.confidence.positive,
                    data.document.confidence.neutral,
                    data.document.confidence.negative
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)']
            }]
        },
        options: {responsive: true}
    });
};

function drawBarChart(ctx, data) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['긍정', '중립', '부정'],
            datasets: [{
                label: '감정 분석 결과',
                data: [
                    data.document.confidence.positive,
                    data.document.confidence.neutral,
                    data.document.confidence.negative
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)']
            }]
        },
        options: {
            responsive: true,
            scales: {y: {beginAtZero: true}}
        }
    });
};


let arr = {
    positive: 0,
    neutral: 0,
    negative: 0,
}

// 개별 감정분석 버튼 클릭 시 모달 표시 이벤트
$(document).on("click", ".analyze-btn", function () {
    const rowIndex = $(this).data("index");
    const text = $(this).closest("tr").find(".ans-content").text();

    // 감정 결과 열 데이터를 비우기
    // $(`.emotion-result[data-index="${rowIndex}"]`).text("-"); // 데이터 비우기 또는 기본값 설정

    $.ajax({
        url: "/api/statistic/analyzeEmotion",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({text: text}),
        success: function (response) {
            if (response && response.document && response.document.confidence) {
                const {positive, neutral, negative} = response.document.confidence;
                arr.positive = positive;
                arr.neutral = neutral;
                arr.negative = negative;
                const sentiment = positive > neutral && positive > negative ? "긍정" :
                    negative > positive && negative > neutral ? "부정" : "중립";

                let highestSentiment = "neutral";
                let highestValue = neutral;
                if (positive > highestValue) {
                    highestSentiment = "positive";
                    highestValue = positive;
                }
                if (negative > highestValue) {
                    highestSentiment = "negative";
                    highestValue = negative;
                }

                const colorMap = {
                    positive: "green",
                    neutral: "blue",
                    negative: "red"
                };

                const highlightedText = `<span style="color: ${colorMap[highestSentiment]}; font-weight: bold;">${text}</span>`;

                $("#modalContent").html(`
                    <div><strong>테스트 문장:</strong> ${highlightedText}</div>
                    <div><strong>감정 분류 결과:</strong> <span style="color: ${colorMap[highestSentiment]}; font-weight: bold;">${sentiment}</span></div>
                    <div>긍정: <span style="color: ${colorMap.positive};">${positive.toFixed(2)}</span>, 
                         중립: <span style="color: ${colorMap.neutral};">${neutral.toFixed(2)}</span>, 
                         부정: <span style="color: ${colorMap.negative};">${negative.toFixed(2)}</span></div>
                `);


                $("#emotionModal").modal("show");
            } else {
                $("#modalContent").text("감정 분석에 실패했습니다.");
                $("#emotionModal").modal("show");
            }
        },
        error: function (xhr, status, error) {
            console.error("Sentiment analysis request failed:", error);
            $("#modalContent").text("오류 발생: 감정 분석 요청에 실패했습니다.");
            $("#emotionModal").modal("show");


        }
    });
});


// 다음페이지 버튼 후 군집별 비교분석페이지로 이동
$("#nextBtn").click(function () {
    console.log("다음 버튼 클릭");
    const tableData = collectTableData();

// 감정 분석 결과를 포함한 데이터 추가
//     tableData.forEach(item => {
//         item.sentimentResults = sentimentResults; // 감정 결과를 추가
//     });
    tableData.forEach((row, index) => {
        if (emotionResults[index]) {
            row.sentimentResults = emotionResults[index]; // 추가된 감정 분석 결과
        }
    });

    const tableDataJsonString = JSON.stringify(tableData);


    let form = document.createElement("form");
    form.method = "POST";
    form.action = "/statistic/compareClustering";


    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "tableData";
    input.value = tableDataJsonString;


    form.appendChild(input);
    document.body.appendChild(form);


    form.submit();

    // $.ajax({
    //     url: "/api/statistic/compareClustering",
    //     method: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify(tableData),
    //     success: function(response) {
    //         console.log("데이터 전송 성공:", response);
    //
    //         //window.location.href = "/statistic/compareClustering";
    //     },
    //     error: function(xhr, status, error) {
    //         console.error("데이터 전송 실패:", error);
    //     }
    // });
});

// JSON형식으로 테이블 데이터 수집
function collectTableData() {
    let tableData = [];
    $(".result-table tbody tr").each(function () {
        let rowData = {
            seq: $(this).find("td:eq(0)").text().trim(),
            cluster: $(this).find("td:eq(1)").text().trim(),
            answerContent: $(this).find("td:eq(2)").text().trim(),
            answerDate: $(this).find("td:eq(3)").text().trim(),
            frequency: $(this).find("td:eq(4)").text().trim(),
            topwords: $(this).find("td:eq(5)").text().trim(),
            //details: $(this).find(".details").text().trim(), // 감정 결과가 담긴 details 추가


            details:  arr,
            sentimentResult: $(this).find(".emotion-result").text().trim()
        };
        console.log(rowData);
        tableData.push(rowData);
    });
    return tableData;
}

// 서버로 전송
function sendDataToServer() {
    let tableData = collectTableData();
    fetch("/statistic/compareClustering", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tableData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("서버 응답 에러");
            }
            return response.json();
        })
        .then(data => console.log("서버 응답 데이터:", data))
        .catch(error => console.error("에러 발생:", error));
}
