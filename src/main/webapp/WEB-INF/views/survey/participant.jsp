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

    <script>

      $(function () {

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
          <div class="j-email-input-box j-flex-row-center">
            <input tpye="text" class="j-email-header-input">
            <span>@</span>
            <input type="text" class="j-email-tail-input">
            <select class="j-email-select">
              <option value="0"></option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.com">daum.com</option>
            </select>
          </div>
          <!--이메일-->

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