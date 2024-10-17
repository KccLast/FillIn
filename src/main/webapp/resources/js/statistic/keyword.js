//단계바
// const surveyId = '<%= request.getParameter("surveyId") %>';
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".progress-bar .step").forEach(function (step, index) {
        step.addEventListener("click", function () {
            switch (index) {
                case 0:
                    window.location.href = '/statistic/keyword'; // 키워드 분석 페이지로 이동
                    break;
                case 1:
                    window.location.href = '#'; // K-평균 군집화 페이지로 이동
                    break;
                case 2:
                    window.location.href = '#'; // 군집별 비교분석 페이지, 아직 미정
                    break;
            }
        });
    });
});
//단계바 끝

//결과 수, 점수 필터 값 업데이트(슬라이더)
function updateResultValue(value) {
    // 결과 수 값을 업데이트
    document.getElementById("result-value").innerText = value;
}

function updateScoreValue(value) {
    // 점수 필터 값을 업데이트
    document.getElementById("score-value").innerText = value;
}


// Ajax 요청을 통한 서버와 연동 -> Ajax를 이용해 필터링된 데이터를 서버에서 받아옴
$(document).ready(function () {
    let debounceTimer;

    // 키워드 입력시 필터링 (Debounce 적용)
    $('input[placeholder="가격"]').on('keyup', function () {
        clearTimeout(debounceTimer);
        let keyword = $(this).val().trim();
        debounceTimer = setTimeout(function () {
            filterTable(keyword);
        }, 300);  // 300ms 지연
    });

    // 검색 버튼 클릭 시 워드 클라우드 생성
    $('#search-btn').click(function () {
        let keyword = $('#keyword-input').val().trim();
        generateWordCloud(keyword);
    });

    // 테이블 필터링 함수
    function filterTable(keyword) {
        $.ajax({
            url: "/api/statistic/search",
            type: "GET",
            data: {keyword: keyword},
            success: function (data) {
                console.log(data);
                renderTable(data);
            },
            error: function () {
                alert("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        });
    }


    // 서버에서 받은 데이터를 테이블에 표시하는 함수
    function renderTable(data) {
        let tbody = $(".result-table tbody");
        tbody.empty();  // 기존 데이터 삭제
        if (data.length === 0) {
            tbody.append("<tr><td colspan='5'>검색 결과가 없습니다.</td></tr>");
        } else {
            data.forEach(function (item) {

                tbody.append(`
                <tr>
                    <td>${item.seq}</td>
                    <td>${item.questionSeq}</td>
                    <td>${item.participantSeq}</td>
                    <td>${item.contents}</td>
                    <td>${item.answerDate}</td>
                </tr>
            `);
            });
        }
    }


    // 워드 클라우드 생성 함수
    function generateWordCloud(keyword) {
        $.ajax({
            url: "/api/statistic/wordcloud",
            type: "GET",
            data: {keyword: keyword},
            success: function (data) {
                WordCloud(document.getElementById('wordCloudContainer'), {
                    list: data.map(item => [item.word, item.frequency]),  // 단어 리스트,단어와 빈도수 리스트
                    gridSize: 7,  // 그리드 크기. 숫자를 작게 할수록 단어가 더 촘촘하게 배치됨.
                    weightFactor: function (size) {
                        return size * 12;  // 폰트 크기 조정. 숫자를 더 크게 하면 폰트가 커짐.
                    },
                    fontFamily: 'Times, serif',
                    color: 'random-dark',  // 색상 지정, 무작위 어두운 색
                    backgroundColor: '#f8f9fc',  // 배경색
                    rotateRatio: 0.5,  // 회전 비율(단어)
                    minSize: 15,  // 최소 폰트 크기
                });
            },
            error: function () {
                alert("워드 클라우드를 생성하는 중 오류가 발생했습니다.");
            }
        });
    }

    // 감정 분석 버튼 클릭 이벤트
    $('#analyze-emotion-btn').click(function() {
        let text = $('#emotion-text').val().trim();
        if (text) {
            analyzeEmotion(text);
        } else {
            alert('텍스트를 입력해주세요.');
        }
    });

    // 감정 분석 결과를 요청하고 화면에 표시하는 함수 추가
    function analyzeEmotion(text) {
        $.ajax({
            url: "/api/statistic/analyzeEmotion",
            type: "GET",
            data: {text: text},
            success: function (response) {
                console.log('Emotion: ' + response.emotion);
                // 여기에 감정 결과를 DOM에 추가하는 로직
            },
            error: function () {
                alert("감정 분석 중 오류가 발생했습니다.");
            }
        });
    }

});