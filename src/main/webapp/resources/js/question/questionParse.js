

function parseJson(jsonString){

    const surveyObject = JSON.parse(jsonString);
    const questions = surveyObject.questions;



    questions.forEach((question,index)=>{
        //일단 제목하고 내용가지고 프레임 불러와서 만들기 해야함
        // questionFrame.html 불러오기
          appendQuestionCard(question,index)
    })
}

async function appendQuestionCard(question,index){

           try{
           //일단 제목하고 내용가지고 프레임 불러와서 만들기 해야함
          // questionFrame.html 불러오기
           let questionData = await fetchQuestionFrame();

           // 새롭게 추가할 고유한 컨테이너 생성
        	let $newContainer = $('<div class="j-question-card j-flex-col-center"></div>');
        	$newContainer.html(questionData); // 불러온 questionFrame.html을 삽입
        	$newContainer.append('<input type="hidden" value="' + question.ccSeq + '" class="j-cseq"/>');
            $newContainer.append('<input type="hidden" value="' + question.seq + '" class="j-qseq"/>');
        	if (ccSeq === '18') {
            	$newContainer.find('.j-survey-name').remove();
            	$newContainer.find('.j-survey-content').remove();
            }
        	else{
        	$newContainer.find('.j-survey-name-input').val(question.name);
        	$newContainer.find('.j-survey-content > textarea').val(question.description);
            }
            if(question.isEssential === "Y"){

            }
            $('.content').append($newContainer);

            $newContainer.find('.j-q-order').val(question.order);

            let headerData = await fetchHeader(question.ccSeq);
            $newContainer.find(".j-survey-es-type").append(headerData);

             if(question.questionItemExist === true){
                   await setQuestionItem(question,$newContainer);
             }else{
            // content 파일 불러오기
            let contentData = await fetchContent(question.ccSeq);
            $newContainer.find(".j-question-content-box").append(contentData);
            }
            // 이미지 src 값을 추출하고 setQuestionNav 호출
            let src = $newContainer.find('.j-typeAndImg > img').attr('src');

            let nav = setQuestionNav(question.order, src);
            nav.find('.question-name').text(question.name);

            if (ccSeq === '17') {
            	$newContainer.find('.j-map-container').attr('id', 'map' + idx);
            	setTimeout(() => createDefaultMap('map' + idx), 100);
            	}


          }catch (error) {
			console.error("AJAX 요청 실패:", error);
		}

}




async function setQuestionItem(question, container) {
    // seq랑 question seq를 클래스에다가 집어넣어야겠다 j-seq-22, j-question-seq-23이런식으로 대가리에 넣자
     let contentData = await fetchContent(question.ccSeq);
      let $contentData = $(contentData);
      container.find(".j-question-content-box").append(contentData);
    // forEach 대신 for...of 사용하여 async/await가 제대로 동작하도록 수정
    for (let [index, qi] of question.questionItems.entries()) {

        if (question.ccSeq === 7 || question.ccSeq === 8) {
            if (index === 0) {
               type7Common(container,qi);
            } else {
                let fetchContent = await fetchQuestionItem(question.ccSeq);
                container.find('.j-option-plus').before(fetchContent);
                let cur = container.find('.j-select-optionBox').eq(index);
                type7Common($(cur),qi);

            }
        }
        if(question.ccSeq === 9){

        }

        if(question.ccSeq === 10){

        }

        if(question.ccSeq === 11){

        }


    }
}

async function fetchQuestionItem(seq){
    return $.ajax({
		url: '/resources/html/question/questionItem/qi' + seq + '.html',
		type: "GET"
	});
}

function type7Common(target,qi){
    target.addClass(qi.seq + ' ' + qi.questionSeq);
    target.find('.j-option-order').text(qi.orderNum);
     target.find('.j-option-input-radio > input[type="text"]').val(qi.content);
}
