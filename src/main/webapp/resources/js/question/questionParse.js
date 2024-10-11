
$(function(){
	
	$('.content').on('change','.j-survey-name-input, .j-survey-content > textarea',function(){
		
		let selectDiv = $('.content').find('.j-card-selected');
		selectDiv.addClass('j-u-card');
		
	})
	
	
	
})

/** 질문 조회 및 등록 관련 */
function parseJson(jsonString) {
    const surveyObject = JSON.parse(jsonString);
    const questions = surveyObject.questions;

    console.log(questions);

    // 비동기 함수로 질문을 순차적으로 처리하기 위해 async/await 사용
    processQuestions(questions);
}



async function processQuestions(questions) {
    for (const [index, question] of questions.entries()) {
        
        await appendQuestionCard(question, index);  // 비동기 함수가 순차적으로 실행되도록 처리
    }
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
        	if (question.ccSeq === 18) {
            	$newContainer.find('.j-survey-name').remove();
            	$newContainer.find('.j-survey-content').remove();
            }
        	else{
        	$newContainer.find('.j-survey-name-input').val(question.name.trim());
        	$newContainer.find('.j-survey-content > textarea').val(question.description.trim());
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
           	
           	if(question.name ===' ' || question.name === null) question.name='질문명';
            nav.find('.question-name').eq(index).text(question.name);

            if (question.ccSeq === 17) {
            	$newContainer.find('.j-map-container').attr('id', 'map' + question.seq);
            	setTimeout(() => createDefaultMap('map' + question.seq), 100);
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
                $(cur).addClass(qi.seq + ' ' + qi.questionSeq);
                type7Common($(cur),qi);

            }
        }
        if(question.ccSeq === 9){
			if(index === 0 ){
			container.find('.j-num-start').val(qi.content);
			}else{
			 container.find('.j-num-end').val(qi.content);
			}
        }

        if(question.ccSeq === 10){
			
			let html = `<option value="${qi.content}" class="${qi.seq}">${qi.content}</option>`;
			container.find('.j-dropdwon > select').append(html);
        }

        if(question.ccSeq === 11){
			let row = $(container.find('.j-row-box'));
			let col = $(container.find('.j-col-box'));
			if(qi.orderNum === 1){
				row.find('.j-row-input').eq(0).val(qi.content);
				row.find('.j-row-input').eq(0).addClass('qi'+qi.seq);
			}else if(qi.orderNum > 1 && qi.orderNum <85){
				let html = `
<div class="j-rowAndcol-input-x-box j-flex-row-center">
    <input class="j-rowAndcol-input j-row-input qi${qi.seq}" type="text" value="${qi.content}" placeholder="&nbsp;&nbsp;Row 1">
    <button class="j-rowAndcol-input-xbutton j-flex-row-center">
        <span>x</span>
    </button>
</div>
`;
			row.append(html); 
			}else if(qi.orderNum == 85){
				col.find('.j-col-input').eq(0).val(qi.content);
				col.find('.j-col-input').eq(0).addClass('qi'+qi.seq);
			}else{
								let html = `
<div class="j-rowAndcol-input-x-box j-flex-row-center">
    <input class="j-rowAndcol-input j-col-input qi${qi.seq}" type="text" value="${qi.content}" placeholder="&nbsp;&nbsp;Col 1">
    <button class="j-rowAndcol-input-xbutton j-flex-row-center">
        <span>x</span>
    </button>
</div>
`;
			col.append(html); 
			}
			updateVerticalLine($(container));
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
    target.find('.j-select-optionBox').addClass(qi.seq + ' ' + qi.questionSeq);
    target.find('.j-option-order').text(qi.orderNum);
     target.find('.j-option-input-radio > input[type="text"]').val(qi.content);
     target.find('.j-chAndRa').attr('name',qi.questionSeq);
     
}
function type9Common(target,qi){
		
}
/** 질문 조회 및 등록 관련 */


/** 질문 업데이트 관련 제목, 내용, 타입이 수정될 수 있음 */

