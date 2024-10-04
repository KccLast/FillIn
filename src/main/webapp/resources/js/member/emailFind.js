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

