$(document).ready(function () {
  const $questionList = $('.j-question-list');
  let $clonedCard = null;

  Sortable.create($questionList[0], {
    animation: 150,
    handle: '.j-question',

    onStart: function (evt) {
      const draggedItem = $(evt.item);
      const draggedIndex = evt.oldIndex;

      // 해당 index의 j-question-card 요소 복제하여 화면 중앙 근처에 배치
      const $cardContainer = $('.content');
      const $originalCard = $cardContainer
        .children('.j-question-card')
        .eq(draggedIndex);

      // 복제본 생성 및 스타일 설정
      $clonedCard = $originalCard.clone();
      $clonedCard
        .css({
          position: 'absolute',

          transform: 'translate(-50%, -50%)',
          width: $originalCard.outerWidth(),
          height: $originalCard.outerHeight(),
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 1001,
        })
        .appendTo('body');

      // 드래그 시작 시 클릭 이벤트 호출
      draggedItem.click();
    },

    onChange: function (evt) {
      const draggedItem = $(evt.item);
      // 드래그 중인 j-question 요소
      const currentIndex = draggedItem.index(); // 현재 인덱스 가져오기
      const $changeCard = $('.content').find('.j-card-selected');
      console.log(draggedItem.outerWidth());
      if ($clonedCard) {
        // $changeCard의 위치에 맞춰 $clonedCard를 이동
        //$clonedCard.css({});
      }

      draggedItem.click();
    },

    onEnd: function (evt) {
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;
      const draggedItem = $(evt.item);

      console.log(`Moved item from index ${oldIndex} to ${newIndex}`);

      // j-question-card의 부모 요소
      const $cardContainer = $('.content');
      const $cards = $cardContainer.children('.j-question-card').toArray();

      // 배열에서 요소 위치 변경
      const [movedCard] = $cards.splice(oldIndex, 1);
      $cards.splice(newIndex, 0, movedCard);

      // 변경된 순서대로 .content에 재배치
      $cardContainer.empty();
      $cards.forEach((card) => $cardContainer.append(card));

      // 복제된 요소 제거
      if ($clonedCard) {
        $clonedCard.remove();
        $clonedCard = null;
      }

      updateQuestionNavOrder();

      // 드래그가 끝난 후 클릭 이벤트 호출
      draggedItem.click();

      //DB에 때려 박으면 댐
      sortResultUpdateInDB();
    },
  });

  // 스크롤 이벤트를 통해 `$clonedCard`를 화면 중앙에 유지
  $(window).on('scroll', function () {
    let plus = $('.j-question-box').width();

    if ($clonedCard) {
      $clonedCard.css({
        top:
          $(window).scrollTop() +
          $(window).height() / 2 -
          $clonedCard.outerHeight() / 2,

        left: plus + $clonedCard.outerWidth() - 210,
      });
    }
  });
});

function sortResultUpdateInDB() {}
