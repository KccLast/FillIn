$(document).ready(function () {
    // 확인 버튼 클릭 시 동작
    $('#confirmPost').on('click', function () {
        // 게시 로직 추가 (예: AJAX 요청)
        console.log('게시물이 게시되었습니다.');

        // 모달 닫기
        $('#postModal').modal('hide');
    });
});