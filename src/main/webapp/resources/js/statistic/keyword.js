$(document).ready(function() {
    // 검색 버튼 클릭 시 이벤트 처리
    $('button:contains("검색")').click(function() {
        filterTable();
    });

    // 키보드 입력이 발생할 때마다 테이블 필터링 처리
    $('input[placeholder="가격"]').on('keyup', function() {
        var keyword = $(this).val().trim();

        if (keyword === "") {
            // 키워드가 비어 있으면 모든 행을 보여줌
            $('.result-table tbody tr').show();
        } else {
            filterTable();
        }
    });

    // 테이블 필터링 함수
    function filterTable() {
        var keyword = $('input[placeholder="가격"]').val().trim(); // 공백 제거

        // 테이블의 모든 행을 대상으로 반복문 실행
        $('.result-table tbody tr').each(function() {
            var rowText = $(this).text();  // 각 행의 텍스트 가져옴

            // 행에 키워드가 포함되어 있는지 확인
            if (rowText.includes(keyword)) {
                $(this).show();  // 키워드가 포함된 경우 해당 행을 보여줌
            } else {
                $(this).hide();  // 키워드가 포함되지 않은 경우 해당 행을 숨김
            }
        });
    }
});
