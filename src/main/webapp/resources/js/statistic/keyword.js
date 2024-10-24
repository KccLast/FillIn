//단계바
// const surveyId = '<%= request.getParameter("surveyId") %>';

/*document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const dividers = document.querySelectorAll(".step-divider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const updateSteps = () => {
        // 단계 상태 업데이트
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });
        dividers.forEach((divider, index) => {
            divider.classList.toggle("active", index < currentStep);
        });

        // 이전/다음 버튼 활성화 상태 업데이트
        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === steps.length - 1;
    };

    // 이전 버튼 클릭 이벤트
    prevBtn.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            updateSteps();
        }
    });

    // 다음 버튼 클릭 이벤트
    nextBtn.addEventListener("click", function () {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateSteps();
        }
    });

    // 단계 클릭 이벤트
    steps.forEach((step, index) => {
        step.addEventListener("click", function () {
            currentStep = index;
            updateSteps();

            // 각 단계에 맞는 페이지로 이동
            switch (index) {
                case 0:
                    window.location.href = '/statistic/keyword'; // 키워드 분석 페이지로 이동
                    break;
                case 1:
                    window.location.href = '#'; // K-평균 군집화 페이지로 이동
                    break;
                case 2:
                    window.location.href = '#'; // 군집별 비교분석 페이지로 이동
                    break;
                default:
                    break;
            }
        });
    });

    // 초기 단계 업데이트
    updateSteps();

    // Bootstrap 툴팁 초기화 코드
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});



//단계바 끝


// 결과 수, 점수 필터 값 업데이트(슬라이더)
function updateResultValue(value) {
    // 결과 수 값을 업데이트
    document.getElementById("rangeValue").innerText = value;
}

function updateScoreValue(value) {
    // 점수 필터 값을 업데이트
    document.getElementById("score-value").innerText = value;
}

// Ajax 요청을 통한 서버와 연동
$(document).ready(function () {
    let tableData = []; // 테이블 데이터를 저장할 글로벌 변수

    // 테이블 검색 버튼 클릭 시
    $('#table-search-btn').click(function () {
        let keyword = $('#keyword-input').val().trim();
        if (keyword) {
            filterTable(keyword); // 테이블 데이터 조회
        } else {
            alert("검색 키워드를 입력해주세요.");
        }
    });

    // 테이블 필터링 함수
    function filterTable(keyword) {
        $.ajax({
            url: "/api/statistic/search",
            type: "GET",
            data: {keyword: keyword},
            headers: {
                'Accept': 'application/json',
            },
            success: function (data) {
                renderTable(data);
                tableData = data; // 조회된 데이터 저장
            },
            error: function (xhr, status, error) {
                console.error("Error: " + status + " " + error);
            }
        });
    }

    // 서버에서 받은 데이터를 테이블에 표시하는 함수
    function renderTable(data) {
        let tbody = $(".result-table tbody");
        tbody.empty();
        if (data.length === 0) {
            tbody.append("<tr><td colspan='5'>검색 결과가 없습니다.</td></tr>");
        } else {
            data.forEach(function (item) {
                tbody.append(
                    `<tr>
                        <td>${item.seq}</td>
                        <td>${item.questionSeq}</td>
                        <td>${item.participantSeq}</td>
                        <td>${item.contents}</td>
                        <td>${item.answerDate}</td>
                    </tr>`
                );
            });
        }
    }

    // 워드 클라우드 생성 버튼 클릭 시
    $('#wordcloud-btn').click(function () {
        if (tableData.length === 0) {
            alert("워드 클라우드를 생성하기 전에 테이블 데이터를 먼저 조회해주세요.");
            return;
        }

        let keyword = $('#keyword-input').val().trim();
        if (keyword) {
            generateWordCloud(keyword); // 워드 클라우드 생성
        } else {
            alert("워드 클라우드를 생성할 키워드를 입력해주세요.");
        }
    });

    // 불용어 리스트
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

    function preprocessText(text) {

        // let cleanText = lowerCaseText.replace(/[^가-힣\s]/g, ''); // 한글만 남기고 영어 및 특수문자 제거
        // 소문자로 변환하고 특수문자 제거
        let processedText = text.replace(/[a-zA-Z]/g, "").replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");

        // 공백으로 분리한 단어들
        let words = processedText.split(/\s+/);

        // 불용어 필터링
        let filteredWords = words.filter(word => !stopWords.includes(word) && word.length > 1);

        return filteredWords;
    }

    // 워드 클라우드 생성 함수
    function generateWordCloud(keyword) {
        $('#wordCloudContainer').empty(); // 기존 콘텐츠 제거
        $.ajax({
            url: "/api/statistic/wordcloud",
            type: "GET",
            data: {keyword: keyword},
            success: function (data) {
                console.log("Received data:", data); // 서버에서 받아온 데이터 확인

                $('#wordCloudContainer').css("display", "block");
                $('#emotionChartContainer').css("display", "none"); // 감정 분석 차트 숨기기

                // 콘텐츠 추출 및 전처리
                let allTexts = data
                    .map(item => item.word)
                    .join(" "); // 단어를 공백으로 합침

                console.log("Extracted CONTENTS:", allTexts); // 추출한 콘텐츠 확인


                let processedWords = preprocessText(allTexts); // 전처리 수행
                console.log("Processed words:", processedWords); // 전처리 후 단어 목록 확인

                // 단어 빈도 계산
                let wordFrequency = {};
                processedWords.forEach(word => {
                    wordFrequency[word] = (wordFrequency[word] || 0) + 1; // 단어 빈도 계산
                });

                // WordCloud에 사용할 데이터 형태로 변환
                let wordCloudData = Object.entries(wordFrequency);
                console.log("Word cloud data:", wordCloudData); // 최종 워드 클라우드 데이터 확인

                // 빈 데이터 확인 및 알림
                if (wordCloudData.length === 0) {
                    alert("워드클라우드를 생성할 단어가 없습니다.");
                    return;
                }


                // WordCloud(document.getElementById('wordCloudContainer'), {
                //     list: data.map(item => [item.word, item.frequency]),
                //     gridSize: 10,
                //     weightFactor: function (size) {
                //         return size * 8;
                //     },
                //     fontFamily: 'Times, serif',
                //     color: 'random-dark',
                //     backgroundColor: '#f8f9fc',
                //     rotateRatio: 0.5,
                //     minSize: 10,
                //     drawOutOfBound: false,
                // });
                WordCloud(document.getElementById('wordCloudContainer'), {
                    list: data.map(item => [item.word, item.frequency]),
                    // list: wordCloudData,
                    gridSize: 10,
                    weightFactor: function (size) {
                        return size * 8;
                    },
                    fontFamily: 'Times, serif',
                    color: 'random-dark',
                    backgroundColor: '#f8f9fc',
                    rotateRatio: 0.5,
                    minSize: 10,
                    drawOutOfBound: false,
                });

                const wordCloudContainer = document.getElementById('wordCloudContainer');
                wordCloudContainer.scrollIntoView({behavior: 'smooth', block: 'center'});
                // 워드 클라우드 컨테이너 강조
                wordCloudContainer.classList.add("highlight");
                setTimeout(() => {
                    wordCloudContainer.classList.remove("highlight");
                }, 2000);
            },
            error: function () {
                alert("워드 클라우드를 생성하는 중 오류가 발생했습니다.");
            }
        });
    }

    // 감정 분석 시작 버튼 클릭 이벤트
    $('#analyze-emotion-btn').click(function () {
        if (tableData.length === 0) {
            alert("감정 분석을 실행하기 전에 테이블 데이터를 먼저 조회해주세요.");
            return;
        }

        let allTexts = tableData.map(item => item.contents).join(" ");
        if (allTexts) {
            analyzeEmotion(allTexts);
        } else {
            alert('분석할 텍스트가 없습니다.');
        }
    });

    // 감정 분석 함수
    function analyzeEmotion(text) {
        $('#chart-container').empty(); // 기존 차트 제거
        $.ajax({
            url: "/api/statistic/analyzeEmotion",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({content: text}),
            success: function (response) {
                $('#emotionChartContainer').show();
                $('#wordCloudContainer').css("display", "none");

                window.currentChartData = response;
                renderChart(response);

                const emotionChartContainer = document.getElementById('emotionChartContainer');
                emotionChartContainer.scrollIntoView({behavior: 'smooth', block: 'center'});
            },
            error: function () {
                alert("감정 분석 중 오류가 발생했습니다.");
            }
        });
    }


    // 차트 렌더링 함수
    function renderChart(data) {
        if (!data || !data.document || !data.document.confidence) {
            console.error("Invalid data for chart:", data);
            return;
        }
        const ctx = document.getElementById('chart-container').getContext('2d');

        const chartType = $('#chart-type-selector').val(); // 선택된 차트 유형

        if (window.currentChart) {
            window.currentChart.destroy(); // 기존 차트 제거
        }

        // 선택된 차트 유형에 따라 적절한 차트를 그리기
        if (chartType === 'pie') {
            window.currentChart = drawPieChart(ctx, data);
        } else if (chartType === 'bar') {
            window.currentChart = drawBarChart(ctx, data);
        }
    }

// 차트 유형 선택 드롭다운 변경 이벤트
    $('#chart-type-selector').change(function () {
        if (window.currentChartData) {
            renderChart(window.currentChartData); // 차트 다시 그리기
        }
    });


    // 파이 차트 그리기 함수
    function drawPieChart(ctx, data) {
        let pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'], // 감정 레이블
                datasets: [{
                    label: 'Sentiment Analysis',
                    data: [
                        data.document.confidence.positive,
                        data.document.confidence.neutral,
                        data.document.confidence.negative
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)', // 밝은 청록색
                        'rgba(54, 162, 235, 0.6)', // 밝은 파랑색
                        'rgba(255, 99, 132, 0.6)'  // 밝은 분홍색
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top', // 상단에 레전드 배치
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                let label = tooltipItem.label || '';
                                let value = tooltipItem.raw || 0;
                                return `${label}: ${value}%`; // 퍼센트 표시
                            }
                        }
                    }
                }
            }
        });
        return pieChart; // 생성된 차트 객체 반환
    }

// 막대 차트 그리기 함수
    function drawBarChart(ctx, data) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    label: 'Sentiment Analysis',
                    data: [
                        data.document.confidence.positive,
                        data.document.confidence.neutral,
                        data.document.confidence.negative
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false // 막대 차트의 레전드 숨기기
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                let label = tooltipItem.label || '';
                                let value = tooltipItem.raw || 0;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 20 // Y축 간격 조정 (예: 20씩 증가)
                        }
                    }
                }
            }
        });
    }
});*/

// 슬라이더 값 업데이트 함수 추가
function updateResultValue(value) {
    document.getElementById("rangeValue").innerText = value;
}

document.addEventListener("DOMContentLoaded", function () {
    // Step navigation control
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const dividers = document.querySelectorAll(".step-divider");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const updateSteps = () => {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });
        dividers.forEach((divider, index) => {
            divider.classList.toggle("active", index < currentStep);
        });

        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === steps.length - 1;
    };

    // 버튼 클릭 이벤트 추가
    prevBtn.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            updateSteps();
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateSteps();
        }
    });

    steps.forEach((step, index) => {
        step.addEventListener("click", function () {
            currentStep = index;
            updateSteps();
        });
    });

    updateSteps();

    // 클러스터링 데이터 반영
    let clusterDropdown = $('#phrase');
    let uniqueClusters = [...new Set(clusteringData.map(item => item.cluster))];
    uniqueClusters.forEach(cluster => {
        clusterDropdown.append(new Option(`Cluster ${cluster}`, cluster));
    });

    // 드롭다운 메뉴로 필터링 기능 추가
    clusterDropdown.change(function () {
        let selectedCluster = $(this).val();
        if (selectedCluster !== "phrase") {
            let filteredData = clusteringData.filter(item => item.cluster == selectedCluster);
            renderTable(filteredData);
        } else {
            renderTable(clusteringData);
        }
    });

    // 테이블 렌더링 함수
    function renderTable(data) {
        let tbody = $(".result-table tbody");
        tbody.empty();
        if (data.length === 0) {
            tbody.append("<tr><td colspan='4'>검색 결과가 없습니다.</td></tr>");
        } else {
            data.forEach(function (item, index) {
                tbody.append(
                    `<tr>
                        <td>${index + 1}</td>
                        <td>${item.cluster}</td>
                        <td>${item.answerContent}</td>
                        <td>${item.answerDate}</td>
                    </tr>`
                );
            });
        }
    }

    renderTable(clusteringData); //페이지 로드 시 전체 데이터 표시



    // 불용어 리스트
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


    function preprocessText(text) {
        let processedText = text.toLowerCase().replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");
        let words = processedText.split(/\s+/);
        return words.filter(word => !stopWords.includes(word) && word.length > 1);
    }

    $('#wordcloud-btn').click(function () {
        if (clusteringData.length === 0) {
            alert("데이터를 조회해주세요.");
            return;
        }


        let allTexts = clusteringData.map(item => item.answerContent).join(" ");
        let processedWords = preprocessText(allTexts);
        let wordFrequency = {};
        processedWords.forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });

        let wordCloudData = Object.entries(wordFrequency);

        if (wordCloudData.length === 0) {
            alert("워드클라우드를 생성할 단어가 없습니다.");
            return;
        }

        WordCloud(document.getElementById('wordCloudContainer'), {
            list: wordCloudData,
            gridSize: 10,
            weightFactor: function (size) { return size * 8; },
            fontFamily: 'Times, serif',
            color: 'random-dark',
            backgroundColor: '#f8f9fc',
            rotateRatio: 0.5,
            minSize: 10,
            drawOutOfBound: false,
        });
    });



    $('#analyze-emotion-btn').click(function () {
        if (clusteringData.length === 0) {
            alert("데이터를 조회해주세요.");
            return;
        }

        let allTexts = clusteringData.map(item => item.answerContent).join(" ");
        analyzeEmotion(allTexts);
    });

    function analyzeEmotion(text) {
        $.ajax({
            url: "/api/statistic/analyzeEmotion",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ content: text }),
            success: function (response) {
                $('#emotionChartContainer').show();
                $('#wordCloudContainer').css("display", "none");
                renderChart(response);
            },
            error: function () {
                alert("감정 분석 중 오류가 발생했습니다.");
            }
        });
    }

    $('#chart-type-selector').change(function () {
        if (window.currentChartData) {
            renderChart(window.currentChartData);
        }
    });

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

        if (chartType === 'pie') {
            window.currentChart = drawPieChart(ctx, data);
        } else {
            window.currentChart = drawBarChart(ctx, data);
        }
    }

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
            options: {
                responsive: true,
            }
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
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
});




