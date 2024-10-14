<%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <!DOCTYPE html>
  <html lang="ko">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Form Layout</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="/resources/css/survey/participant.css">
    <link rel="stylesheet" href="/resources/css/survey/participantFlex.css">
    <link rel="stylesheet" href="/resources/css/landingPage.css">
<script
	src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f7372f613dea5dbd8f49b7be0a73bbb8"></script>
    <script>

      $(function () {
    	 /*  let map = createDefaultMap('j-map-ji');
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
      function execDaumPostcode(button) {
      	let $button = $(button);
      	new daum.Postcode({
      		oncomplete: function(data) {
      			// 팝업을 통한 검색 결과 항목 클릭 시 실행
      			var addr = ''; // 주소_결과값이 없을 경우 공백 
      			var extraAddr = ''; // 참고항목

      			//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      			if (data.userSelectedType === 'R') { // 도로명 주소를 선택
      				addr = data.roadAddress;
      			} else { // 지번 주소를 선택
      				addr = data.jibunAddress;
      			}

      			if (data.userSelectedType === 'R') {
      				if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
      					extraAddr += data.bname;
      				}
      				if (data.buildingName !== '' && data.apartment === 'Y') {
      					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
      				}
      				if (extraAddr !== '') {
      					extraAddr = ' (' + extraAddr + ')';
      				}
      			} else {
      				document.getElementById("UserAdd1").value = '';
      			}

      			// 선택된 우편번호와 주소 정보를 input 박스에 넣는다.
      			$parent = $button.parent();
      			$parent.find('.zipp_code_id').val(data.zonecode);
      			$parent.find('.UserAdd1').val(addr + extraAddr);
      			$parent.find('.UserAdd2').focus();
      			/*document.getElementById('zipp_code_id').value = data.zonecode;
      			document.getElementById("UserAdd1").value = addr;
      			document.getElementById("UserAdd1").value += extraAddr;
      			document.getElementById("UserAdd2").focus(); // 우편번호 + 주소 입력이 완료되었음으로 상세주소로 포커스 이동*/
      		}
      	}).open();
      }
      //주소입력
      
      
      //위치 가져오기
      function createDefaultMap(mapdiv) {

	let container = document.getElementById(mapdiv);

	let options = { //지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(36.5760, 128.0000), //지도의 중심좌표.
		level: 13 //지도의 레벨(확대, 축소 정도)
	};
	let map = new kakao.maps.Map(container, options);
	return map;
}

function getMyPosittion(id) {
	navigator.geolocation.getCurrentPosition((position) => {
		createKaKaoMap(id, position.coords.latitude, position.coords.longitude);
	});
}

function createKaKaoMap(id, latitude, longitude) {

	var container = document.getElementById(id); //지도를 담을 영역의 DOM 레퍼런스
	var options = { //지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(36.5760, 128.0000),
		level: 3
	};


	var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

	var moveLatLng = new kakao.maps.LatLng(latitude, longitude);
	map.panTo(moveLatLng);


	var markerPosition = new kakao.maps.LatLng(latitude, longitude);
	// 마커를 생성합니다
	var marker = new kakao.maps.Marker({
		position: markerPosition
	});

	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);
}
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
      <div class="j-line"></div>
    </div>
    <div class="content">

      <!-- 카드가 여기에 들어감 -->

      <!-- 반응형 객관식이랑 체크 박스-->

      <div class="j-question-card j-flex-col-center">
        <div class="j-survey-es-type j-flex-row-center">
          <button class="j-essential">필수</button>
        </div>
        <div class="j-survey-name">
          <textarea class="j-survey-input" placeholder="" disabled>정해진게 없는데</textarea>
        </div>
        <div class="j-survey-content">
          <textarea rows="" cols="" placeholder=""
            disabled>다음 내용으로 설문 진행할 것 설문 내용은 다음과 같습니다 이게 길어지면 어케되는 걸까요? 아시는지용 킥킥킥</textarea>
        </div>


        <div class="j-question-content-box">

          <!-- 반응형 객관식이랑 체크 박스-->
          <!-- <div class="j-select-optionBox j-flex-row-center">
            <div class="j-option-order">1</div>
            <div class="j-option-input-radio">
              <input type="text" placeholder="" value="매우좋음">
              <input type="radio" class="j-chAndRa">
            </div>
          </div>

          <div class="j-select-optionBox j-flex-row-center">
            <div class="j-option-order">2</div>
            <div class="j-option-input-radio">
              <input type="text" placeholder="" value="매우안좋음">
              <input type="radio" class="j-chAndRa">
            </div>
          </div>

          <div class="j-select-optionBox j-flex-row-center">
            <div class="j-option-order">3</div>
            <div class="j-option-input-radio">
              <input type="text" placeholder="" value="매우안좋음">
              <input type="radio" class="j-chAndRa">
            </div>
          </div>

          <div class="j-select-optionBox j-flex-row-center">
            <div class="j-option-order">4</div>
            <div class="j-option-input-radio">
              <input type="text" placeholder="" value="매우안좋음">
              <input type="radio" class="j-chAndRa">
            </div>
          </div>


          <div class="j-select-optionBox j-flex-row-center">
            <div class="j-option-order">5</div>
            <div class="j-option-input-radio">
              <input type="text" placeholder="" value="매우안좋음">
              <input type="radio" class="j-chAndRa">
            </div>
          </div>

          <div class="j-select-optionBox j-flex-row-center">
            <div class="j-option-order">5</div>
            <div class="j-option-input-radio">
              <input type="text" placeholder="" value="매우안좋음">
              <input type="radio" class="j-chAndRa">
            </div>
          </div>


          <div class="j-select-optionBox j-flex-row-center">
            <div class="j-option-order">5</div>
            <div class="j-option-input-radio">
              <input type="text" placeholder="" value="매우안좋음">
              <input type="radio" class="j-chAndRa">
            </div>
          </div>

          <div class="j-select-optionBox j-flex-row-center">
            <div class="j-option-order">5</div>
            <div class="j-option-input-radio">
              <input type="text" placeholder="" value="매우안좋음">
              <input type="radio" class="j-chAndRa">
            </div>
          </div> -->
          <!-- 반응형 객관식이랑 체크 박스-->


          <!--선형 배율-->
          <!-- <div class="j-dropdown-box">
            <div class="j-LineAndnumber j-flex-col-center">
              <div class="j-line"></div>
              <div class="j-number">
                <span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span>
              </div>
            </div>
          </div> -->

          <!--선형 배율-->

          <!--드롭다운-->
          <!-- <div class="j-dropdwon-box j-flex-col-center">
            <div class="j-dropdwon">
              <select>
                <option value="">선택해주세요</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div> -->
          <!--드롭다운-->

          <!--단답형-->
          <!-- <div class="j-short-box j-flex-row-center">
            <div class="j-short-inputBox j-flex-row-center">
              <input type="text" placeholder="단답형은 100자 제한입니다.">
            </div>
          </div> -->
          <!--단답형-->

          <!--서술형-->
          <!-- <div class="j-long-box j-flex-row-center">
            <div class="j-long-inputBox j-flex-row-center">
              <textarea class="j-long-input" placeholder="&#13;&#10;서술형은 500자 제한입니다."></textarea>
            </div>
          </div> -->
          <!--서술형-->

          <!--이메일-->
          <!-- <div class="j-email-input-box j-flex-row-center">
            <input tpye="text" class="j-email-header-input">
            <span>@</span>
            <input type="text" class="j-email-tail-input">
            <select class="j-email-select">
              <option value="0"></option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.com">daum.com</option>
            </select>
          </div> -->
          <!--이메일-->
			
		  <!-- 주소 -->
	<!-- 	  	<div class="j-address j-flex-row-center">
    <div class="col-sm-10 j-address-box">
        <label for="zipp_btn" class="form-label">주소</label><br />
        <input
            type="text"
            class="form-control mb-2 zipp_code_id"
            id="zipp_code_id"
            name="zipp_code"
            maxlength="10"
            placeholder="우편번호"
            style="width: 50%; display: inline;"
        >
        <input
            type="button"
            id="zipp_btn"
            class="btn btn-primary"
            onclick="execDaumPostcode(this)"
            value="우편번호 찾기"
        ><br>
        <input
            type="text"
            class="form-control mb-2 UserAdd1"
            name="user_add1"
            id="UserAdd1"
            maxlength="40"
            placeholder="기본 주소를 입력하세요"
            required
        >
        <div class="invalid-feedback">
        </div>
        <input
            type="text"
            class="form-control UserAdd2"
            name="user_add2"
            id="UserAdd2"
            maxlength="40"
            placeholder="상세 주소를 입력하세요"
        >
         </div>
            </div> -->
		  
		  <!-- 주소 -->	
		  
		  
		  <!-- 위치기록 -->
		  <!-- <div class="j-map j-flex-col-center" >
					<div class="j-map-container" id="j-map-ji"></div>
					<button class="j-location">위치 가져오기</button>
				</div> -->
		  <!-- 위치기록 -->
		  
		  <!-- 전화번호 -->
		  <!-- <div class="j-flex-row-center">
				<div class="j-phone-inputBox">
					<input text="text" class="j-phone-1" maxlength="3"/>
					<input text="text" class="j-phone-2" maxlength="4"/>
					<input text="text" class="j-phone-2" maxlength="4"/>
				</div>
				</div> -->
		  <!-- 전화번호 -->
		<!-- 개인정보 -->
		<!-- <div>
					<h5>개인 정보 수집 및 이용 동의서 </h5>
				</div>
				<div class="j-groupName">
				 <input type="text" placeholder="단체명" class="j-group-name">은 <input type="text" placeholder="개인정보 수집 목적" class="j-goal">을
				 위하여 아래와 같이 개인정보를 수집 및 이용 및 제3자에게 제공하고자 합니다.</br>
				 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오 
				</div>
				
				<div class="j-ok-box">
				<div>개인정보 수집 및 이용 내역</div>
					<table>
						<thead>
							<th>항목</th>
							<th>수집 및 이용 목적</th>
							<th>보유기간</th>
						</thead>
						<tbody>
							<tr>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
							</tr>
						</tbody>
						
					</table>
				</div>
				
				<div class="j-ok-box">
				<div>민감 정보 처리 내역</div>
					<table>
						<thead>
							<th>항목</th>
							<th>수집 및 이용 목적</th>
							<th>보유기간</th>
						</thead>
						<tbody>
							<tr>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
							</tr>
						</tbody>
						
					</table>
				
				</div>
				
				<div class="j-ok-box">
				<div>개인정보 제3자 제공 내역</div>
					<table>
						<thead>
							<th>제공받는 자</th>
							<th>제공 목적</th>
							<th>제공항목</th>
							<th>보유기간</th>
						</thead>
						<tbody>
							<tr>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
								<td class="j-td"><input type="text"/></td>
							</tr>
						</tbody>
						
					</table>
				
				</div>
				<div class="j-plus-ok-info">
					※ 응답자는 위의 개인정보 수집∙이용에 대한 동의를 거부할 권리가 있으며,</br>
					동의를 거부할 경우 <span>개인정보가 필요한 서비스의 이용에 제한</span>을 받을 수 있습니다.
				</div>
				<div>
					<h5 class="j-bottom">위와 같이 개인정보를 수집 및 이용하는 것에 동의하십니까?</h5>
				</div>
				<div>
					<div class="j-bottom-buttom">
					<div class="j-select-optionBox j-flex-row-center">
						<div class="j-option-order">1</div>
						<div class="j-option-input-radio">
							<input type="text" placeholder="동의" disabled="disabled"> 
							<input type="radio" name="ok">
						</div>
					</div>
					<div class="j-select-optionBox j-flex-row-center">
						<div class="j-option-order">2</div>
						<div class="j-option-input-radio">
							<input type="text" placeholder="동의하지 않음" disabled="disabled"> 
							<input type="radio" name="ok">
						</div>
					</div>
					</div>
				</div> -->
		<!-- 개인정보 -->
		
		<!-- 젠더 -->
	<!-- 	<div class="gender-selection j-flex-row-center">
    <div class="radio-container">
        <input type="radio" name="gender" value="male" class="j-gender-radio">
        <span class="radio-text">남자</span>
    </div>
    <div class="radio-container">
        <input type="radio" name="gender" value="female" class="j-gender-radio">
        <span class="radio-text">여자</span>
    </div>
    </div> -->
		<!-- 젠더 -->
		
		<!-- 날짜 -->
		<!-- <div class='j-dayBox j-flex-row-center'>
					<input type="date">
					</div> -->
		<!-- 날짜 -->
		
		<!-- 사진 -->
		<!-- <div class="j-img-box j-flex-col-center">
					<input type="file" class="j-file-input">
					<div class="j-img-preview j-flex-row-center">
						<img class="j-file-up-img" src="/resources/img/question/file-up.png" />
					</div>
					<div class="j-img-answerBox">
						<textarea rows="" cols=""></textarea>
					</div>
				</div> -->
		<!-- 사진 -->
		
		
		
        </div>

      </div>
    </div>
    <!-- 다음 버튼 -->
    <div class="nextBtn j-flex-row-center">
      <button id="prev-btn">
        <img src="/resources/img/survey/play-left.png">
      </button>
      <button id="next-btn">
        <img src="/resources/img/survey/play-right.png">
      </button>
    </div>

  </body>

  </html>