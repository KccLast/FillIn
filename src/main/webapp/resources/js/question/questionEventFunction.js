/*function saveDropDownInStorage(options,questionSeq){
    let optionListObject = {};
    optionListObject.seq = parseInt(questionSeq);
    optionListObject.content=" ";
    optionListObject.dropdownOptionList = [];
    let orderNum=1;
    options.forEach(function(option) {
    if (option.trim()) { // 공백은 추가하지 않음
            let optionObject = {};
             optionObject.dropContent = option.trim();
             optionObject.questionSeq = questionSeq;
             optionObject.orderNum = orderNum++;
             optionListObject.dropdownOptionList.push(optionObject);
    	}
    });


      storeUpdateQuestionItemInLocal(optionListObject,questionSeq,'updatedQuestionItemList');
}*/

/*function storeUpdateQuestionItemInLocal(updateItem,seq,listId){
     //로컬 스토리지에서 꺼내오기
     let updatedQuestionItemList = JSON.parse(localStorage.getItem(listId)) || [];
      //이미 있는 데이터인지 검사
      let index = updatedQuestionItemList.findIndex(item => item.seq === seq);
             //있으면 업데이트
             if(index !== -1){
                 updatedQuestionItemList[index] = updateItem;
             //없으면 새로 넣기
             }else{
                 updatedQuestionItemList.push(updateItem);
             }
             
             localStorage.setItem(listId, JSON.stringify(updatedQuestionItemList));
}*/

/*async function setQiCheckBoxAndRadioName(html,prev,next,idx){
	let prevName = prev.find('.j-chAndRa').attr('name');
	
	prev.after(html);
	prev.next().addClass('j-new-checkAndRadio');
	prev.next().find('.j-option-order').text(next);*/
	/*$(html).find('.j-option-order').text(next);*/
	/*if(prevName === undefined || prevName === null )
	prev.next().find('.j-option-input-radio > input').eq(1).attr('name',idx);
	else{
		prev.next().find('.j-option-input-radio > input').eq(1).attr('name',prevName);
	}
}*/

/*const questionItemStrategies = {
	7: function(target) {
		return getQuestionItemFor7(target);
	},
	8: function(target) {
		return getQuestionItemFor7(target);
	},
	9: function(target) {
		return getQuestionItemFor9(target);
	},
	10: function(target) {
		return getQuestionItemFor10(target);
	},
	11: function(target) {
		return getQuestionItemFor11(target);
	},
	default: function(target) {
		return defaultQuestionItem(target);
	}
};*/
/* question 넣는 함수 모음 */

/*async function insertQuestion(){
	 let surveySeq = $('#surveySeq').val();
    let questions = [];

    $('.content').find('.j-new-card').each(function(index, item) {
        let $item = $(item);
        let ccSeq = $item.find('.j-cseq').val();
        let isEssential = $item.find('.j-essential').data('essential'); 
        let question = {};
        
        question.surveySeq = surveySeq;
        question.order = $item.index();
        question.name = ($item.find('.j-survey-name-input').val() || ' ').trim() || ' ';
        question.description = ($item.find('.j-survey-content > textarea').val() || ' ').trim() || ' ';
        question.ccSeq = ccSeq;
        question.isEssential = isEssential;
        
        if (ccSeq >= 7 && ccSeq <= 11) {
            question.questionItems = getQuestionItemFunction(ccSeq, item);
        }
        
        questions.push(question);
    });
    
    
    return saveQuestionInDB(questions);
}*/



/*async function updateQuestion(){
	 let surveySeq = $('#surveySeq').val();
    let updatedQuestions = [];
    
    $('.content').find('.j-u-card').not('.j-new-card').each(function(index, item) {
        let $item = $(item);
        let ccSeq = $item.find('.j-cseq').val();
        let isEssential = $item.find('.j-essential').data('essential');
        let updateQuestion = {};
        
        updateQuestion.seq = $item.find('.j-qseq').val();
        updateQuestion.surveySeq = surveySeq;
        updateQuestion.order = $item.index();
        updateQuestion.name = ($item.find('.j-survey-name-input').val() || ' ').trim() || ' ';
        updateQuestion.description = ($item.find('.j-survey-content > textarea').val() || ' ').trim() || ' ';
        updateQuestion.ccSeq = ccSeq;
        updateQuestion.isEssential = isEssential;
        
        
        updatedQuestions.push(updateQuestion);
    });
    
    
    return updateQuestionInDB(updatedQuestions);
	
}*/

/*async function saveQuestion() {

	 try {
        await insertQuestion();  
        await updateQuestion(); 
        await updateAndInsertQuestionItem();
         // 로컬 스토리지 데이터 가져오기
                let updateQuestionItemlocalData = localStorage.getItem('updatedQuestionItemList'); // 로컬 스토리지의 특정 데이터 가져오기
                if (updateQuestionItemlocalData) {
                    await sendLocalStorageData(JSON.parse(updateQuestionItemlocalData));
                }
                let removeQuestionLocalData = localStroage.getItem('');
                if(removeQuestionLocalData){
					await sendremoveQeiostnLocalData(JSON.parse(removeQuestionLocalData));
				}
				let removeQuestionItemData = localStorage.getItem('');
				if(removeQuestionItemData){
					await sendremoveQquestionItemLocalData(JSON.parse(removeQuestionItemData));
				}
         window.location.href ='/survey/82'; 
    } catch (error) {
        console.error('오류 발생:', error);
    }
}
*/
/*function sendremoveQeiostnLocalData(localData){
	
    return $.ajax({
        url: '/api/question',
        type: 'delete',
        contentType: 'application/json',
        data: JSON.stringify(data),  // 서버로 보낼 데이터
        success: function(response) {
            console.log(response.data);
        },
        error: function(error) {
            console.error('데이터 전송 오류:', error);
        }
    });
}

function sendremoveQquestionItemLocalData(localData){
	 //question이 지워지면서 이미 n처리된 질문 제거
	 let removeQeustionList = JSON.parse(localStorage.getItem('removeQuestionList'));
	 //제거된 qeustionSeq 추출
     const removeSeqs = removeQeustionList.map(item => item.seq);
     //제거할 질문 항목 중 이미 제거된 것이 있다면 제외
     localData = localData.filter(item => !removeSeqs.includes(item.questionSeq));
	return $.ajax({
        url: '/api/question/item',
        type: 'delete',
        contentType: 'application/json',
        data: JSON.stringify(data),  // 서버로 보낼 데이터
        success: function(response) {
            console.log(response.data);
            
        },
        error: function(error) {
            console.error('데이터 전송 오류:', error);
        }
    });	
}*/


/*async function sendLocalStorageData(data) {
	
    return $.ajax({
        url: '/api/question/item',
        type: 'patch',
        contentType: 'application/json',
        data: JSON.stringify(data),  // 서버로 보낼 데이터
        success: function(response) {
            console.log(response.data);
            
        },
        error: function(error) {
            console.error('데이터 전송 오류:', error);
        }
    });
}*/

/*function seqExtract(target){
		 const classValue = target.attr('class'); // 클래스 값 가져오기
  		console.log(classValue);
         // 정규표현식으로 숫자만 추출
         const number = parseInt(classValue.match(/\d+/)[0], 10);

  		return number;
	}*/
/*async function updateAndInsertQuestionItem() {
    let tasks = [];

    // 각각의 비동기 작업을 Promise로 저장
    $('.content').find('.j-item-u').not('.j-new-card').each(function (idx, item) {
        let questionSeq = $(item).find('.j-qseq').val();
        let insertedItems = $(item).find('.j-new-checkAndRadio');
        //let updatedItems = $(item).find('.j-u-item').not('.j-new-checkAndRadio');
		let questionType = $(item).find('.j-cseq').val();
        // 각각의 작업을 Promise에 추가
        tasks.push(insertQuestionItem(questionType, questionSeq, insertedItems));*/
        /*tasks.push(updateQuestionItem(questionType, questionSeq, updatedItems));*/
   /* });*/

    // 모든 비동기 작업이 완료될 때까지 대기
  /*  await Promise.all(tasks);
}*/
/*function isListExists(itemList){
    if(!itemList || itemList.length === 0){
            return false;
     }
     return true;
}
async function insertQuestionItem(questionType,questionSeq,insertedItems){
       if(isListExists(insertedItems)){
        return;
       }

	  let itemList = [];

    insertedItems.each(function (idx, item) {
		
        let insertItem = {};
        let order;
        let content;
        
        if(questionType == '11'){
			let rowAndcol = $(item).find('.j-rowAndcol-input');
			let orderString = rowAndcol.attr('placeholder');
			order = parseInt(orderString.match(/\d+/)[0]);
			if(rowAndcol.hasClass('j-col-input')){
			order += 85;	 	
			}
			content = rowAndcol.val();
		}else{
        order = $(item).find('.j-option-order').text();
        content = $(item).find('.j-option-input-radio > input[type="text"]').val();
        }
       
        
        insertItem.orderNum = order;
        insertItem.content = content;
        insertItem.questionSeq = questionSeq;
        itemList.push(insertItem);
    });

    
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/api/question/item",
            type: "post",
            contentType: 'application/json',
            data: JSON.stringify(itemList),
            success: function (response) {
                console.log(response.data);
                resolve(response);
            },
            error: function (error) {
                console.error('에러 발생:', error);
                reject(error);
            }
        });
    });
}*/


/*async function updateQuestionInDB(updatedQuestions) {
    if(isListExists(updatedQuestions));
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/question',    // 서버 URL
            type: 'PATCH',
            contentType: 'application/json',  // JSON 형식으로 보낸다는 것을 명시
            data: JSON.stringify(updatedQuestions), // 자바스크립트 객체를 JSON 형식으로 변환
            success: function(response) {
                console.log('서버 응답:', response);
                resolve(response);  // 요청이 완료되면 Promise 해결
            },
            error: function(error) {
                console.error('에러 발생:', error);
                reject(error);  // 오류 발생 시 Promise 거부
            }
        });
    });
}*/


/*function saveQuestionInDB(questions) {
   if(isListExists(questions));
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/question',    // 서버 URL
            type: 'POST',
            contentType: 'application/json',  // JSON 형식으로 보낸다는 것을 명시
            data: JSON.stringify(questions), // 자바스크립트 객체를 JSON 형식으로 변환
            success: function(response) {
                console.log('서버 응답:', response);
                resolve(response);  // 요청이 완료되면 Promise 해결
            },
            error: function(error) {
                console.error('에러 발생:', error);
                reject(error);  // 오류 발생 시 Promise 거부
            }
        });
    });
}*/
/*function removeUpdatedCardClass(){
 $('.content div.j-u-card').removeClass('j-u-card');
}*/

/*function getQuestionItemFunction(ccSeq, target) {
	return (questionItemStrategies[ccSeq] || questionItemStrategies['default'])(target);
}

function getQuestionItemFor7(target) {

	let parent = $(target).find('.j-select-optionBox');

	let questionItems = [];  // 빈 배열 선언

	parent.each(function(index, item) {
		let questionItem = {};  // 매번 새로운 questionItem 객체 생성
		let order = $(item).find('.j-option-order').text();
		let content = $(item).find('.j-option-input-radio > input[type="text"]').val();
		questionItem.orderNum = order;
		questionItem.content = content;
		questionItems.push(questionItem);
	});
	return questionItems;  // 배열 반환
}

function getQuestionItemFor9(target) {
	let questionItems = [];
	let start = $(target).find('.j-num-start').val();
	let end = $(target).find('.j-num-end').val();
	let item1 = {
		orderNum: 1,
		content: start
	}
	let item2 = {
		orderNum: 2,
		content: end
	}
	questionItems.push(item1);
	questionItems.push(item2);
	return questionItems;
}
function getQuestionItemFor10(target) {
	let questionItems = [];

	$(target).find('.j-dropdwon  option').each(function(index, item) {
		if(index >0){
		let questionItem = {};
		let order = (index);
		let content = $(item).val();
		questionItem.orderNum = order;
		questionItem.content = content;
		questionItems.push(questionItem);
		}
	})
	return questionItems;
}

function getQuestionItemFor11(target) {
	let questionItems = [];
	$(target).find('.j-row-input').each(function(index, item) {
		let questionItem = {};
		let order = (index + 1);
		let content = $(item).val();
		questionItem.orderNum = order;
		questionItem.content = content;
		questionItems.push(questionItem);
	})
	$(target).find('.j-col-input').each(function(index, item) {
		let questionItem = {};
		let order = (index + 85);
		let content = $(item).val();
		questionItem.orderNum = order;
		questionItem.content = content;
		questionItems.push(questionItem);
	})

	return questionItems;

}*/

/* question 넣는 함수 모음 */

/*function updateSurveyName(name) {

	$('.dashboard').text(name);
}*/

/*// questionFrame.html 파일 불러오기
async function fetchQuestionFrame() {
	return $.ajax({
		url: "/resources/html/question/questionFrame.html",
		type: "GET"
	});
}

// header 파일 불러오기
async function fetchHeader(ccSeq) {
	return $.ajax({
		url: '/resources/html/question/header/header' + ccSeq + '.html',
		type: "GET"
	});
}

// content 파일 불러오기
async function fetchContent(ccSeq) {
	return $.ajax({
		url: '/resources/html/question/content/content' + ccSeq + '.html',
		type: "GET"
	});
}*/



/*//질문 추가될 때 nav에 추가하기
function setQuestionNav(idx, src) {
	let html = '<div class="j-question j-flex-row-center j-quorder' + idx + '">' +
		'<div class="question-img j-flex-row-center">' +
		'<img src="' + src + '">' +
		'</div>' +
		'<div class="question-name">' +
		'<span>질문명</span>' +
		'</div>' +
		'<div class="j-list-xbutton j-flex-row-center">' +
		'<img src="/resources/img/question/x-circle.png">' +
		'</div>' +
		'</div>';

	$('.j-question-list').append(html);
	return $('.j-question-list');
}
*/

// 행과 열을 기반으로 테이블 생성
/*function generatePreviewTable(target) {

	let rows = $(target).parent().find('.j-row-input').map(function() { return $(this).val(); }).get(); // 모든 행 이름 가져오기
	let cols = $(target).parent().find('.j-col-input').map(function() { return $(this).val(); }).get(); // 모든 열 이름 가져오기


	let tableHtml = '<table class="j-chart-table" border="1"><thead><tr><th></th>'; // 테이블 시작

	// 열 헤더 생성
	cols.forEach(function(colName) {
		tableHtml += '<th class="j-col-name-th"><span class="j-col-name">' + colName + '<span></th>';
	});
	tableHtml += '</tr></thead><tbody>';

	// 각 행마다 열 생성
	rows.forEach(function(rowName, rowIndex) {
		tableHtml += '<tr><td>' + rowName + '</td>'; // 행 헤더

		cols.forEach(function(colName, colIndex) {
			// 라디오 버튼을 각 셀에 추가
			tableHtml += '<td>' +
				'<input type="radio" name="row' + -rowIndex + '" value="' + rowName + '">' +
				'</td>';
		});
		tableHtml += '</tr>';
	});

	tableHtml += '</tbody></table>'; // 테이블 끝

	// 모달에 테이블 추가
	$('#preview-table-container').html(tableHtml);
}*/


/*function updateVerticalLine(target) {

	let row = target.find('.j-row-box').outerHeight();
	let col = target.find('.j-col-box').outerHeight();

	target.find('.j-vertical-line').outerHeight(row > col ? row : col);
}
function updateNumberRange(target) {
	
	var start = parseInt($(target).find('.j-num-start').val()); // 시작 값
	var end = parseInt($(target).find('.j-num-end').val()); // 끝 값
	
	let numRangeLine = $(target).prev();
	let numRange = numRangeLine.find('.j-number');
	// 숫자 범위 표시 초기화
	numRange.empty();

	// start에서 end까지 span으로 숫자를 동적으로 추가
	for (var i = start; i <= end; i++) {
		numRange.append('<span>' + i + '</span>');
	}

	// 선 초기화
	updateLine(numRangeLine,0, end - start); // 첫 클릭 전 초기화
}
*/
// 클릭한 숫자에 따라 선 채우기
/*function updateLine(numRangeLine,clickedIndex,totalNumbers) {
	var percentage = (clickedIndex / totalNumbers) * 100; // 클릭한 비율 계산
	numRangeLine.find('.j-line').css('background-image', 'linear-gradient(90deg, #005bac ' + percentage + '%, rgba(0, 91, 172, 0.4) ' + percentage + '%)');
}*/

/*function changeFocus(el) {
	$('.j-question-card').removeClass('j-card-selected');
	$(el).addClass('j-card-selected');
}*/
//주소입력
/*function execDaumPostcode(button) {
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
			$parent.find('.UserAdd2').focus();*/
			/*document.getElementById('zipp_code_id').value = data.zonecode;
			document.getElementById("UserAdd1").value = addr;
			document.getElementById("UserAdd1").value += extraAddr;
			document.getElementById("UserAdd2").focus(); // 우편번호 + 주소 입력이 완료되었음으로 상세주소로 포커스 이동*/
	/*	}
	}).open();
}*/
//주소입력



/*// 숫자 입력만 허용 (한글, 영어 및 기타 문자 차단)
function onlyNumbers(event) {
	const value = $(this).val();
	$(this).val(value.replace(/[^0-9]/g, ''));
}


// 입력 후 자동 포커스 이동
function autoMoveToNext(currentInput, nextInput, maxLength) {
	$(currentInput).on('input', function() {
		if ($(this).val().length >= maxLength) {
			$(nextInput).focus();
		}
	});
}


function createDefaultMap(mapdiv) {

	let container = document.getElementById(mapdiv);

	let options = { //지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(36.5760, 128.0000), //지도의 중심좌표.
		level: 13 //지도의 레벨(확대, 축소 정도)
	};
	let map = new kakao.maps.Map(container, options);
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
}*/

