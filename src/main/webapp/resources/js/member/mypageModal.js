function openMypageModal() {
	$('.modal-content').empty();
	$('.modal-content').load("/member/mypage", function() {
		$('#mypageModal').modal('show');
	});
}