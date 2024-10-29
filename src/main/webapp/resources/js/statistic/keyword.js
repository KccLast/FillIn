document.addEventListener("DOMContentLoaded", function () {
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

    let clusterDropdown = $('#phrase');
    [...new Set(clusteringData.map(item => item.cluster))].forEach(cluster => {
        clusterDropdown.append(new Option(`Cluster ${cluster}`, cluster));
    });

    clusterDropdown.change(function () {
        let selectedCluster = $(this).val();
        let data = selectedCluster !== "phrase" ? clusteringData.filter(item => item.cluster == selectedCluster) : clusteringData;
        renderTable(data);
    });

    function calculateWordFrequency(text) {
        if (!text) return 0;
        return text.trim().split(/\s+/).length;
    }


    renderTable(clusteringData);

    $('#table-search-btn').click(() => {
        let keyword = $('#keyword-input').val().trim();
        renderTable(keyword ? clusteringData.filter(item => item.answerContent.includes(keyword)) : clusteringData);
    });

    $('#wordcloud-tab').click(function () {
        setActiveTab($(this));
        $(this).prop("disabled", true);
        clusteringData.length === 0 ? alert("데이터를 조회해주세요.") : generateWordCloudFromAll();
    });

    function setActiveTab(tab) {
        $('#wordcloud-tab, #emotion-tab').removeClass('active');
        tab.addClass('active');
        $('#wordCloudContainer').toggle(tab.attr("id") === "wordcloud-tab");
        $('#emotionChartContainer').toggle(tab.attr("id") === "emotion-tab");
    }

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
        if (clusteringData.length === 0) {
            alert("데이터를 조회해주세요.");
            resetButtons();
            return;
        }
        analyzeEmotionByRow(clusteringData);
    });


    function renderTable(data) {
        let tbody = $(".result-table tbody");
        tbody.empty();
        if (data.length === 0) {
            tbody.append("<tr><td colspan='6'>검색 결과가 없습니다.</td></tr>");
        } else {
            data.forEach((item, index) => {
                tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.cluster}</td>
                    <td class="ans-content">${item.answerContent}</td>
                    <td>${item.answerDate}</td>
                    <td>${calculateWordFrequency(item.answerContent)}</td>
                    <td>
                        <button class="btn btn-primary btn-sm analyze-btn" data-index="${index}">감정분석</button>
                    </td>
                    <td class="emotion-result" data-index="${index}">-</td>
                </tr>
            `);
            });
        }

        // 각 행의 감정분석 버튼 클릭 이벤트
        $(".analyze-btn").click(function () {
            let text = $(this).parents('tr').find('.ans-content').text();
            console.log(text);
            const rowIndex = $(this).data("index");
            analyzeEmotionForRow(text, rowIndex);
        });
    }

    // 가중치 적용 수정 후
    function analyzeEmotionForRow(rowData, rowIndex) {
        $.ajax({
            url: "/api/statistic/analyzeEmotion",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ text: rowData }),
            success: function (response) {
                if (response && response.document && response.document.confidence) {
                    const { positive, neutral, negative } = response.document.confidence;
                    $(`.emotion-result[data-index="${rowIndex}"]`).text(
                        `긍정: ${positive.toFixed(2)}, 중립: ${neutral.toFixed(2)}, 부정: ${negative.toFixed(2)}`
                    );
                } else {
                    console.error("Invalid sentiment analysis response:", response);
                    $(`.emotion-result[data-index="${rowIndex}"]`).text("오류 발생");
                }
            },
            error: function (xhr, status, error) {
                console.error("Sentiment analysis request failed:", status, error);
                $(`.emotion-result[data-index="${rowIndex}"]`).text("오류 발생");
            }
        });
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
    }

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
                scales: { y: { beginAtZero: true } }
            }
        });
    }

});

// 다음페이지 버튼 후 군집별 비교분석페이지로 이동
$("#nextBtn").click(function() {
    console.log("다음 버튼 클릭");
    const tableData = collectTableData();

    // Convert your JSON data to a string
    const tableDataJsonString = JSON.stringify(tableData); // Assuming tableData is your JSON data

// Create a hidden form and append it to the body
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "/statistic/compareClustering";

// Create a hidden input to hold the JSON string
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "tableData"; // This should match the server's expected parameter name
    input.value = tableDataJsonString;

// Append the input to the form and the form to the body
    form.appendChild(input);
    document.body.appendChild(form);

// Submit the form
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
    $(".result-table tbody tr").each(function() {
        let rowData = {
            seq: $(this).find("td:eq(0)").text().trim(),
            cluster: $(this).find("td:eq(1)").text().trim(),
            answerContent: $(this).find("td:eq(2)").text().trim(),
            answerDate: $(this).find("td:eq(3)").text().trim(),
            frequency: $(this).find("td:eq(4)").text().trim(),
            sentimentResult: $(this).find(".emotion-result").text().trim()
        };
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



/*document.addEventListener("DOMContentLoaded", function () {
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

    if (clusteringData && clusteringData.length > 0) {
        generateWordCloudFromAll();
    } else {
        console.warn("clusteringData is empty or undefined.");
    }

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

    prevBtn.addEventListener("click", () => { if (currentStep > 0) currentStep--; updateSteps(); });
    nextBtn.addEventListener("click", () => { if (currentStep < steps.length - 1) currentStep++; updateSteps(); });
    steps.forEach((step, index) => step.addEventListener("click", () => { currentStep = index; updateSteps(); }));
    updateSteps();

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    let clusterDropdown = $('#phrase');
    [...new Set(clusteringData.map(item => item.cluster))].forEach(cluster => {
        clusterDropdown.append(new Option(`Cluster ${cluster}`, cluster));
    });

    clusterDropdown.change(function () {
        let selectedCluster = $(this).val();
        let data = selectedCluster !== "phrase" ? clusteringData.filter(item => item.cluster == selectedCluster) : clusteringData;
        renderTable(data);
    });

    function calculateWordFrequency(content) {
        if (!content) return 0;
        return content.trim().split(/\s+/).length;
    }

    function renderTable(data) {
        let tbody = $(".result-table tbody");
        tbody.empty();
        if (data.length === 0) {
            tbody.append("<tr><td colspan='5'>검색 결과가 없습니다.</td></tr>");
        } else {
            data.forEach((item, index) => {
                tbody.append(`
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.cluster}</td>
                        <td>${item.answerContent}</td>
                        <td>${item.answerDate}</td>
                        <td>${calculateWordFrequency(item.answerContent)}</td>
                    </tr>
                `);
            });
        }
    }

    renderTable(clusteringData);

    $('#table-search-btn').click(() => {
        let keyword = $('#keyword-input').val().trim();
        renderTable(keyword ? clusteringData.filter(item => item.answerContent.includes(keyword)) : clusteringData);
    });

    $('#wordcloud-tab').click(function () {
        setActiveTab($(this));
        $(this).prop("disabled", true);
        clusteringData.length === 0 ? alert("데이터를 조회해주세요.") : generateWordCloudFromAll();
    });

    function setActiveTab(tab) {
        $('#wordcloud-tab, #emotion-tab').removeClass('active');
        tab.addClass('active');
        $('#wordCloudContainer').toggle(tab.attr("id") === "wordcloud-tab");
        $('#emotionChartContainer').toggle(tab.attr("id") === "emotion-tab");
    }

    function generateWordCloud(keyword = '') {
        $('#wordCloudContainer').empty();
        $.ajax({
            url: "/api/statistic/wordcloud",
            type: "GET",
            data: { keyword },
            success: function (data) {
                if (!data || data.length === 0) {
                    alert("워드클라우드를 생성할 데이터가 없습니다.");
                    resetButtons();
                    return;
                }
                createWordCloud(data.reduce((freq, item) => {
                    let word = item.word.trim();
                    if (!stopWords.includes(word) && word.length > 1) {
                        freq[word] = (freq[word] || 0) + 1;
                    }
                    return freq;
                }, {}));
            },
            error: function () {
                alert("워드 클라우드를 생성하는 중 오류가 발생했습니다.");
                resetButtons();
            }
        });
    }

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
            drawOutOfBound: false,
        });
        resetButtons();
    }

    function resetButtons() {
        $('#wordcloud-btn').prop("disabled", false);
        $('#emotion-tab').prop("disabled", false);
    }

    function preprocessText(text) {
        return text.replace(/[a-zA-Z]/g, "").replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "").split(/\s+/)
            .filter(word => !stopWords.includes(word) && word.length > 1);
    }

    $('#emotion-tab').click(function () {
        setActiveTab($(this));
        $(this).prop("disabled", true);
        clusteringData.length === 0 ? alert("데이터를 조회해주세요.") : analyzeEmotionByRow(clusteringData);
    });



    function analyzeEmotionByRow(data) {
        let totalPositive = 0, totalNeutral = 0, totalNegative = 0;
        let processedCount = 0;

        data.forEach((item, index) => {
            $.ajax({
                url: "/api/statistic/analyzeEmotion",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({ content: item.answerContent }),
                success: function (response) {
                    console.log("Sentiment analysis response for row " + (index + 1) + ":", response);
                    if (response && response.document && response.document.confidence) {
                        totalPositive += response.document.confidence.positive;
                        totalNeutral += response.document.confidence.neutral;
                        totalNegative += response.document.confidence.negative;
                    } else {
                        console.error("유효하지 않은 감정 분석 데이터:", response);
                    }

                    processedCount++;
                    if (processedCount === data.length) {
                        let avgPositive = totalPositive / data.length;
                        let avgNeutral = totalNeutral / data.length;
                        let avgNegative = totalNegative / data.length;

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
                    console.error("서버 응답:", xhr.responseText);
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
        const ctx = document.getElementById('chart-container').getContext('2d');
        const chartType = $('#chart-type-selector').val();

        if (window.currentChart) {
            window.currentChart.destroy();
        }

        window.currentChart = (chartType === 'pie' ? drawPieChart : drawBarChart)(ctx, data);
    }

    $('#chart-type-selector').change(() => window.currentChartData && renderChart(window.currentChartData));

    function drawPieChart(ctx, data) {
        return new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    data: [
                        data.document.confidence.positive,
                        data.document.confidence.neutral,
                        data.document.confidence.negative
                    ],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)']
                }]
            },
            options: { responsive: true }
        });
    }

    function drawBarChart(ctx, data) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
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
                scales: { y: { beginAtZero: true } }
            }
        });
    }
});*/









