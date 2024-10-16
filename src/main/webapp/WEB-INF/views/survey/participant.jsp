<%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <%@ taglib prefix="c" uri="jakarta.tags.core" %>
    <!DOCTYPE html>
    <html lang="ko">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Google Form Layout</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      <link rel="stylesheet" href="/resources/css/survey/participant.css">
      <link rel="stylesheet" href="/resources/css/survey/participantFlex.css">
      <link rel="stylesheet" href="/resources/css/landingPage.css">
      <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
      <script type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f7372f613dea5dbd8f49b7be0a73bbb8&libraries=services"></script>
      <script src="/resources/js/question/submit.js"></script>
      <script>


        $(function () {
          // createDefaultMap("j-map");
          /* let map = createDefaultMap('j-map-ji');
          map.relayout(); */
          showCard($('.content').find('.j-question-card').eq(0));

          $('.j-question-card').click(function () {
            showCard($(this));
          })
        })

        //카드로 표시설정
        function showCard(curCard) {
          $('.j-question-card').removeClass('active'); // 모든 카드에서 active 클래스 제거
          curCard.addClass('active'); // 현재 인덱스에 해당하는 카드에 active 클래스 추가
        }


        // 화면 크기 변경 시 동작
        $(window).on('resize', function () {
          let $cards = $('.j-question-card');
          if ($(window).width() > 768) {
            // 데스크탑 크기일 때 모든 카드 보여주기
            $cards.show(); // 모든 카드를 표시
          } else {
            // 모바일 크기일 때는 현재 카드 하나만 보이도록
            $cards.hide(); // 모든 카드를 숨김
            let $curCard = $cards.filter('.active'); // active 클래스를 가진 카드 선택
            $curCard.show(); // 선택된 active 카드를 보여줌
          }
        });



        // 초기 화면 크기에 따른 동작 설정
        $(window).trigger('resize');
        //주소입력
        // function execDaumPostcode(button) {
        //   let $button = $(button);
        //   new daum.Postcode({
        //     oncomplete: function (data) {
        //       // 팝업을 통한 검색 결과 항목 클릭 시 실행
        //       var addr = ''; // 주소_결과값이 없을 경우 공백
        //       var extraAddr = ''; // 참고항목

        //       //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        //       if (data.userSelectedType === 'R') { // 도로명 주소를 선택
        //         addr = data.roadAddress;
        //       } else { // 지번 주소를 선택
        //         addr = data.jibunAddress;
        //       }

        //       if (data.userSelectedType === 'R') {
        //         if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        //           extraAddr += data.bname;
        //         }
        //         if (data.buildingName !== '' && data.apartment === 'Y') {
        //           extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        //         }
        //         if (extraAddr !== '') {
        //           extraAddr = ' (' + extraAddr + ')';
        //         }
        //       } else {
        //         document.getElementById("UserAdd1").value = '';
        //       }

        //       // 선택된 우편번호와 주소 정보를 input 박스에 넣는다.
        //       $parent = $button.parent();
        //       $parent.find('.zipp_code_id').val(data.zonecode);
        //       $parent.find('.UserAdd1').val(addr + extraAddr);
        //       $parent.find('.UserAdd2').focus();
        //       /*document.getElementById('zipp_code_id').value = data.zonecode;
        //       document.getElementById("UserAdd1").value = addr;
        //       document.getElementById("UserAdd1").value += extraAddr;
        //       document.getElementById("UserAdd2").focus(); // 우편번호 + 주소 입력이 완료되었음으로 상세주소로 포커스 이동*/
        //     }
        //   }).open();
        // }
        //주소입력


        //위치 가져오기
        // function createDefaultMap(mapdiv) {

        //   let container = document.getElementById(mapdiv);

        //   let options = { //지도를 생성할 때 필요한 기본 옵션
        //     center: new kakao.maps.LatLng(36.5760, 128.0000), //지도의 중심좌표.
        //     level: 13 //지도의 레벨(확대, 축소 정도)
        //   };
        //   let map = new kakao.maps.Map(container, options);
        //   return map;
        // }

        // function getMyPosittion(id) {
        //   navigator.geolocation.getCurrentPosition((position) => {
        //     createKaKaoMap(id, position.coords.latitude, position.coords.longitude);
        //   });
        // }

        // function createKaKaoMap(id, latitude, longitude) {

        //   var container = document.getElementById(id); //지도를 담을 영역의 DOM 레퍼런스
        //   var options = { //지도를 생성할 때 필요한 기본 옵션
        //     center: new kakao.maps.LatLng(36.5760, 128.0000),
        //     level: 3
        //   };


        //   var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        //   var moveLatLng = new kakao.maps.LatLng(latitude, longitude);
        //   map.panTo(moveLatLng);


        //   var markerPosition = new kakao.maps.LatLng(latitude, longitude);
        //   // 마커를 생성합니다
        //   var marker = new kakao.maps.Marker({
        //     position: markerPosition
        //   });

        //   // 마커가 지도 위에 표시되도록 설정합니다
        //   marker.setMap(map);
        // }
        //위치 가져오기

      </script>
    </head>

    <body>

      <div class="navbar">
        <div class="nav-left">
          <a href="#">
            <img src="/resources/img/common/logo.png" alt="Logo" class="logo">
          </a>
        </div>
      </div>
      <div class="titleAndProgressBar">
        <div class="j-title">24년도 4분기 만족도 설문조사</div>
        <div class="j-progress-line"></div>
      </div>
      <div class="content">

        <!-- 카드가 여기에 들어감 -->



      </div>
      <!-- 다음 버튼 -->
      <div class="nextBtn j-flex-row-center">


        <button id="prev-btn">
          <img src="/resources/img/survey/play-left.png">
          <button type="button" class="btn btn-outline-primary" id="j-submit">제출하기</button>
        </button>



        <button id="next-btn">
          <img src="/resources/img/survey/play-right.png">
        </button>


      </div>

    </body>

    </html>