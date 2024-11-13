<%@ page contentType="text/html;charset=UTF-8" language="java" %>
  <script>
    $(function () {

      getUserSurvey();

      $('.j-sur-content-box').on('click', '.j-sur-content', function () {
        const nextNumber = $(this).find('.surveySeq').val(); // 숨겨둔 번호를 가져옴
        const currentPath = window.location.pathname; // 현재 URL 경로

        // 현재 경로에서 숫자를 제거하고 `/survey` 기본 경로로 설정
        const basePath = currentPath.replace(/\/\d+$/, ''); // 숫자로 끝나면 제거

        // 다음 URL로 이동
        window.location.href = basePath + '/' + nextNumber;
      })
    })

    async function getUserSurvey() {
      $.ajax({

        url: '/api/member/survey',
        type: 'GET',
        success: async function (response) {
          console.log(response.data);
          await fillModalData(response.data);
          await setSurveyTitle();
        },
        error: function () {

        }

      })
    }

    async function fillModalData(dataList) {
      let $box = $('.j-sur-content-box');
      dataList.forEach(el => {
        el.name = el.name === null ? '-' : el.name;
        el.postDate = el.postDate === null ? '-' : el.postDate;
        el.endDate = el.endDate === null ? '-' : el.endDate;
        let html = "" +
          "<div class=\"j-sur-content j-sur-exp\">" +
          "<div class=\"j-sur-item j-sur-title\">" + el.name + "</div>" +
          "<div class=\"j-sur-date j-sur-cre\">" + el.createdAt + "</div>" +
          "<div class=\"j-sur-date j-sur-de\">" + el.postDate + "</div>" +
          "<div class=\"j-sur-date j-sur-end\">" + el.endDate + "</div>" +
          "<input type=\"hidden\" class=\"surveySeq\" value=\"" + el.seq + "\">" +
          "</div>";
        $box.append(html);
      });
    }
    async function setSurveyTitle() {
      const currentPath = window.location.pathname;
      const lastSegment = currentPath.split('/').pop(); // URL의 마지막 부분을 가져옴
      const surveyNumber = /^\d+$/.test(lastSegment) ? lastSegment : null; // 숫자인지 확인

      let target = $('.surveyTitle');
      let matchingTitle = '설문 선택'
      if (surveyNumber) {
        // 숫자가 있는 경우, 해당 번호와 일치하는 j-sur-content를 찾아서 제목을 가져옴
        matchingTitle = $('.j-sur-content')
          .find('.surveySeq')
          .filter(function () {
            return $(this).val() === surveyNumber;
          })
          .closest('.j-sur-content')
          .find('.j-sur-title')
          .text();
        console.log(matchingTitle);
        if (matchingTitle === '') matchingTitle = '설문 선택';
      }
      target.html(matchingTitle);
    }
  </script>
  <style>
    .j-sur-exp {
      display: flex;
      gap: 28px;
      margin-bottom: 2%;

    }

    .j-sur-exp>div:nth-child(1) {
      width: 55%;
    }

    .j-user-sur-content {
      width: 755px !important;


    }

    .j-user-sur-body {
      width: 750px !important;
      max-height: 475px !important;
      overflow: auto;
    }



    .j-user-sur-body::-webkit-scrollbar {
      width: 7px;
    }

    .j-user-sur-body::-webkit-scrollbar-thumb {
      background-color: #005bac;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }

    .j-user-sur-body::-webkit-scrollbar-track {
      background-color: white;
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }

    .j-sur-date {
      width: 15%;
    }

    .j-sur-modal-tr {

      border-bottom: 1px solid;
      padding-bottom: 1%;
    }

    .j-sur-content:hover {
      font-weight: bold;
      color: #005bac;
    }
  </style>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div class="modal fade j-user-sur-Modal" id="j-user-sur-Modal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content j-user-sur-content">
        <div class="modal-header j-user-sur-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body j-user-sur-body">
          <div class="j-sur-exp fw-bold j-sur-modal-tr">
            <div>설문명</div>
            <div class="j-sur-date">생성일</div>
            <div class="j-sur-date">설문 게시일</div>
            <div class="j-sur-date">설문 종료일</div>
          </div>
          <div class="j-sur-content-box">





          </div>



        </div>
        <div class="modal-footer j-user-sur-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>

        </div>
      </div>
    </div>
  </div>