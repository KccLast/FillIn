$(document).ready(function() {
    // 모달을 여는 버튼
    const $openModalBtn = $(".add-survey-card"); // 설문지 추가 버튼
    // 모달 요소
    const $modal = $("#survey-plus-modal"); // 모달 ID
    // 모달 닫기 버튼
    const $closeModalBtn = $("#survey-closeModal"); // 닫기 버튼 ID

    // 모달 열기
    $openModalBtn.on("click", function() {
        $modal.css("display", "block");
    });

    // 모달 닫기
    $closeModalBtn.on("click", function() {
        $modal.css("display", "none");
    });

    // 모달 외부 클릭 시 닫기
    $(window).on("click", function(event) {
        if ($(event.target).is($modal)) {
            $modal.css("display", "none");
        }
    });
});