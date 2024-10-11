/*
$(document).ready(function(){
    $('#sendCode').on('click', function(){
        const phoneNumber = $('#phone').val();
        if(phoneNumber) {
            alert('인증 코드가 전송되었습니다.');
            
        } else {
            alert('전화번호를 입력해주세요.');
        }
    });

    $('#emailForm').on('submit', function(event){
        event.preventDefault();
        const name = $('#name').val();
        const phone = $('#phone').val();

        if(name && phone) {
            alert('이름과 전화번호가 인증되었습니다.');
           
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    });
});

*/

$(document).ready(function(){
    $('#emailForm').on('submit', function(event){
        event.preventDefault();
        const name = $('#name').val();
        const phoneNumber = $('#phoneNumber').val();

        if(name && phoneNumber) {
            // AJAX 요청을 통해 서버로 데이터를 보내고 결과를 받는다.
            $.ajax({
                url: '/api/member/email', // 서버의 URL
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name: name, phone: phoneNumber }),
                success: function(email) {
                    // 서버로부터 받은 이메일 일부를 표시 & 결과 컨테이너를 활성화
                    $('#resultContainer').html(`<p>귀하의 이메일 주소는 ${email} 입니다.</p>`).show();
                },
                error: function() {
                    $('#resultContainer').html(`<p>일치하는 정보가 없습니다.</p>`).show();
                }
            });
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    });
});
