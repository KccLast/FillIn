$(function () {
				$('.content').on('click', '.j-question-card', function (e) {
					changeFocus(this);
					this.scrollIntoView({ behavior: 'smooth', block: 'center' });
				})

				$('.j-question-list').on('click', '.j-question', function () {
					let target = $('.content').children().eq($(this).index());
					target[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
					changeFocus(target);
				})

				//필수버튼 클릭이벤트 
				$('.content').on('click', '.j-essential', function () {
					if ($(this).hasClass('j-es-seleted')) {
						$(this).removeClass('j-es-seleted');
					} else {
						$(this).addClass('j-es-seleted');
					}
				})

				//객관식 옵션 추가하기 버튼 
				$('.content').on('click', '.j-option-plus', function () {
					let $prev = $(this).prev();
					let number = $prev.find('.j-option-order').text();
					let next = parseInt(number) + 1;
					let html = '<div class="j-select-optionBox j-flex-row-center">' +
						'<div class="j-option-order">' + next + '</div>' +
						'<div class="j-option-input-radio">' +
						'<input type="text" placeholder="옵션 입력란">' +
						'<input type="checkbox">' +
						'</div>' +
						'<div class="j-xbutton">' +
						'<img src="/resources/img/question/x-circle.png">' +
						'</div></div>';
					$prev.after(html);
				})

				
				//옵션 삭제 order 다시 계산
				$('.content').on('click', '.j-xbutton > img', function () {
					let $parentDiv = $(this).parent().parent();
					if ($parentDiv.index() === 0) {
						return;
					}
					let $higherParent = $parentDiv.parent();
					$(this).parent().parent().remove();
					$higherParent.find('.j-option-order').each(function (idx, el) {
						$(el).text(idx + 1);
					})
				})

				$('.content').on('click', '.j-dropdwon-modifiy', function () {

				})
				
				//모달 바디 클릭하면, 

				// 처음에 숫자 범위 설정
                updateNumberRange();

                // 숫자를 클릭하면 해당 숫자만큼 선을 채우는 이벤트 설정
               $('.content').on('click', '.j-number span', function (e) {
               var clickedIndex = $(this).index(); // 클릭된 숫자의 인덱스
               var totalNumbers = $('.j-number span').length - 1; // 전체 숫자의 갯수 (인덱스 기준으로 -1)

                // 선 채우기 업데이트
                updateLine(clickedIndex, totalNumbers);
                e.stopPropagation();
                });

                 // start와 end select 변경 시 숫자 범위 업데이트
                 $('.content').on('change', '.j-num-start, .j-num-end', function () {
                 updateNumberRange();
                  });
				

				/*모달관련*/
				// 모달 열기
				let currentCard;
				$(document).on('click', '.j-dropdwon-modifiy', function () {
					currentCard = $(this).closest('.j-question-card'); // 현재 카드 저장
					currSelect = $(this).prev().find('select > option');
					let mbody='';
					currSelect.each(function(idx,item){
						if(idx >0){
						mbody += $(item).text()+'\n';
						}
					})
					$('.modal-body > textarea').val(mbody);
					
					// 현재 카드의 위치 및 크기 계산
					var cardOffset = currentCard.offset(); // 카드의 화면에서의 위치
					var cardHeight = currentCard.outerHeight(); // 카드의 높이
					var cardWidth = currentCard.outerWidth(); // 카드의 너비

					// 모달의 위치 설정 (카드 중앙에 위치)
					var modal = $('#optionModal');
					var modalHeight = modal.outerHeight();
					var modalWidth = modal.outerWidth();

					// 카드 중앙에 모달을 배치
					modal.css({
						top: cardOffset.top + (cardHeight / 2) - (modalHeight / 2) + 'px', // 카드 중앙 기준
						left: cardOffset.left + (cardWidth / 2) - (modalWidth / 2) + 'px'
					});

					// 모달 표시
					modal.fadeIn();
				});

				// 모달 닫기
				$('.close').click(function () {
					$('#optionModal').fadeOut(); // 모달 숨기기
				});

				// 옵션 추가 버튼 클릭 이벤트
				$('#addOptionsBtn').click(function () {
					var optionsText = $('#optionTextarea').val(); // textarea 값 가져오기
					var options = optionsText.split('\n'); // 줄바꿈으로 구분된 옵션 배열 생성

					// 해당 카드의 select 요소 찾기
					var selectBox = currentCard.find('select');

					// 기존 옵션 초기화
					selectBox.find('option:not([disabled])').remove();

					// 새로운 옵션 추가
					options.forEach(function (option) {
						if (option.trim()) { // 공백은 추가하지 않음
							selectBox.append('<option>' + option.trim() + '</option>');
						}
					});

					// 모달 닫기 및 입력 초기화
					$('#optionModal').fadeOut();
					$('#optionTextarea').val('');
				});
				/*모달 관련*/
			
				/*객관식 표 관련*/
				/*row And col 추가*/
				$('.content').on('click','.j-row-plus-button',function(e){
					/*<input class="j-rowAndcol-input" type="text" placeholder="&nbsp;&nbsp;Row 1">*/
					let $row = $(this).parent().parent().find('.j-row-box');
					let idx = ($row.find('input').length) +1;
					
					let inputHtml = '<div class="j-rowAndcol-input-x-box j-flex-row-center">'+
						            '<input class="j-rowAndcol-input j-row-input" type="text" placeholder="&nbsp;&nbsp;Row '+idx+'">'+
				                    '<button class="j-rowAndcol-input-xbutton">x</button>'+
				                    '</div>';
					$row.append(inputHtml);
					
					updateVerticalLine($(this).parent().parent());
				})
				$('.content').on('click','.j-col-plus-button',function(){
					let $col = $(this).parent().parent().find('.j-col-box');
					let idx = ($col.find('input').length) +1;
			
					let inputHtml = '<div class="j-rowAndcol-input-x-box j-flex-row-center">'+
		            '<input class="j-rowAndcol-input j-col-input" type="text" placeholder="&nbsp;&nbsp;Col '+idx+'">'+
                    '<button class="j-rowAndcol-input-xbutton">x</button>'+
                    '</div>';
					$col.append(inputHtml);
					
					updateVerticalLine($(this).parent().parent());
				})
				
				/*row And col 추가*/
				
				
				/* row And col 삭제 */
				$('.content').on('mouseenter', '.j-rowAndcol-input-x-box', function() {
                
                $(this).find('.j-rowAndcol-input-xbutton').css('display', 'inline-block');
                 });

                $('.content').on('mouseleave', '.j-rowAndcol-input-x-box', function() {
    
                $(this).find('.j-rowAndcol-input-xbutton').css('display', 'none');
                });
                
               
                
                
             // Row의 삭제버튼을 눌렀을 때
                $('.content').on('click', '.j-row-box .j-rowAndcol-input-xbutton', function(){
                    // 해당 row를 삭제
                    if($(this).parent().parent().find('.j-rowAndcol-input-x-box').length === 1){
                    	return;
                    }
                    let $pp = $(this).parent().parent().parent();
                    $(this).parent().remove();

                    // 남아있는 Row들의번호를 다시 계산
                    $('.j-row-box .j-rowAndcol-input').each(function(index){
                        
                        $(this).attr('placeholder', '  Row ' + (index + 1));
                    });
                    updateVerticalLine($pp);
                });

                // Col의 삭제버튼을 눌렀을 때
                $('.content').on('click', '.j-col-box .j-rowAndcol-input-xbutton', function(){
                    // 해당 col을 삭제
                	 if($(this).parent().parent().find('.j-rowAndcol-input-x-box').length === 1){
                     	return;
                     }
                     let $pp = $(this).parent().parent().parent();
                    $(this).parent().remove();

                    // 남아있는 Col들의 placeholder 번호를 다시 계산
                    $('.j-col-box .j-rowAndcol-input').each(function(index){
                      
                        $(this).attr('placeholder', '  Col ' + (index + 1));
                    });
                    updateVerticalLine($pp);
                });
                
                
                /*객관식 표 미리보기*/
                // 미리보기 버튼 클릭 시 모달 띄우기
                let currentCharCard;
                $('.content').on('click','.j-preview-chart',function(){
                	
                	currentCharCard = $(this).closest('.j-question-card'); // 현재 카드 저장
					
					// 현재 카드의 위치 및 크기 계산
					let cardOffset = currentCharCard.offset(); // 카드의 화면에서의 위치
					let cardHeight = currentCharCard.outerHeight(); // 카드의 높이
					let cardWidth = currentCharCard.outerWidth(); // 카드의 너비

					// 모달의 위치 설정 (카드 중앙에 위치)
					let modal = $('#preview-modal');
					let modalHeight = modal.outerHeight();
					let modalWidth = modal.outerWidth();

					// 카드 중앙에 모달을 배치
					modal.css({
						top: cardOffset.top + (cardHeight / 2) - (modalHeight / 2) + 'px', // 카드 중앙 기준
						left: cardOffset.left + (cardWidth / 2) - (modalWidth / 2) + 'px'
					});

					// 모달 표시
					modal.fadeIn(); 	
    
                   // 테이블 미리보기 생성
                  generatePreviewTable(this);
                });

               // 모달 닫기
               $('.preview-modal-close').on('click', function() {
               $('#preview-modal').css('display', 'none');
               });

                /*객관식 표 미리보기*/
                
				/*객관식 표 관련*/
				
				/*위치 가져오기*/
				$('.content').on('click','.j-location',function(){
					let myId = $(this).prev().attr('id'); 
					getMyPosittion(myId);
				})
				
				$('.j-question-plus-button').click(function(){
					let modal = $('#add-type-modal');
					 // 모달이 이미 보이는 상태라면 숨기기
			        if (modal.is(':visible')) {
			        	
			       
			            modal.fadeOut();
			            return; // 이미 보이는 상태일 때는 모달을 숨기고 함수 종료
			        }
					let buttonOffset = $(this).offset();
					let buttonWidth = $(this).outerWidth();
					let buttonHeight = $(this).outerHeight();
					
					let modalHeight = modal.outerHeight();
					let modalWidth = modal.outerWidth();
					
					modal.css({
						position: 'absolute',
						top: buttonOffset.top - (buttonHeight/2) - (modalHeight/4) + 'px', // 카드 중앙 기준
						left: buttonOffset.left + buttonWidth+ 'px'
					});
					
					modal.fadeIn(); 
					// 모달을 화면에 고정 
				    modal.css({
				        position: 'fixed', // 화면에 고정
				        top: modal.offset().top - $(window).scrollTop() + 'px', // 현재 화면에 보이는 위치로 고정
				        left: modal.offset().left - $(window).scrollLeft() + 'px'
				    });
				})
				
				
				 // 모달 바깥을 클릭했을 때 모달 숨기기
			    $(document).mouseup(function(e) {
			        let modal = $('#add-type-modal');
			        if (!modal.is(e.target) && modal.has(e.target).length === 0) {
			           
			            modal.fadeOut();
			        }
			    });
                
               

			    // j-group-name과 j-goal에 입력 이벤트 리스너 추가
			    $('.content').on('input','.j-groupName> input', function(){
			    	$(this).css('width', ((this.value.length + 1) * 20) + 'px');
			    });

		
				
			 // .content에 이벤트 위임 사용
			    $('.content').on('keyup', '.j-phone-inputBox > input',onlyNumbers);  
				 // .content에 이벤트 위임 사용
			    $('.content').on('keydown', '.j-phone-inputBox > input',onlyNumbers);  


			    $('.content').on('input', '.j-phone-1', function() {
			        if ($(this).val().length >= 3) {
			            $(this).next('.j-phone-2').focus();  // 다음 j-phone-2로 포커스 이동
			        }
			    });

			    $('.content').on('input', '.j-phone-2', function() {
			        if ($(this).val().length >= 4) {
			            $(this).next('.j-phone-2').focus();  // 다음 j-phone-2로 포커스 이동
			        }
			    });
			    
			    $('.content').on('click','.radio-container',function(){
					let $thisRadio = $(this).find('input[type="radio"]');
					let $sibling = $(this).siblings();
					 
					 $thisRadio.prop('checked',true);
					 $(this).addClass('clicked-radio-css');
					 $sibling.removeClass('clicked-radio-css');
				})
			    
			    //모달을 통해 질문 생성
			    $('#add-type-modal-container').on('click','.j-typeAndImg-modal',async function(){
			    	 let ccSeq = $(this).find('input[type="hidden"]').val();
					 
    				try {
       					 // questionFrame.html 불러오기
       					 let questionData = await fetchQuestionFrame();
						
        				// 새롭게 추가할 고유한 컨테이너 생성
       					 let $newContainer = $('<div class="j-question-card j-flex-col-center"></div>');
       					 $newContainer.html(questionData); // 불러온 questionFrame.html을 삽입
						if(ccSeq === '18'){
							$newContainer.find('.j-survey-name').remove();
							$newContainer.find('.j-survey-content').remove();
						}
        				// .content에 동적으로 새 프레임을 추가
        				$('.content').append($newContainer);
       					 let idx = $newContainer.index();
						 //질문순서 기입 
						 $newContainer.find('.j-q-order').val(idx);
        				// header 파일 불러오기
        				let headerData = await fetchHeader(ccSeq);
        				$newContainer.find(".j-survey-es-type").append(headerData);

       					 // content 파일 불러오기
        				let contentData = await fetchContent(ccSeq);
        				$newContainer.find(".j-question-content-box").append(contentData);
						
        				// 이미지 src 값을 추출하고 setQuestionNav 호출
        				let src = $newContainer.find('.j-typeAndImg > img').attr('src');
        				
        				setQuestionNav(idx, src);

   						
   						if(ccSeq === '17'){
							$newContainer.find('.j-map-container').attr('id','map'+idx);
							setTimeout(() => createDefaultMap('map'+idx), 100);
						}
   						
   						
   						 } catch (error) {
     					   console.error("AJAX 요청 실패:", error);
    					}
    					
			    	   
			    })
			    
			    //list를 통해 질문 삭제
			    $('.j-question-list').on('click','.j-list-xbutton > img',function(){
					 let className = $(this).parent().parent().attr('class');
					 
    				
                       // 'j-quorder' 이후 숫자를 추출
                     let idx = className.match(/j-quorder(\d+)/);
					 idx = idx[1];
					 console.log(idx);
					 $(this).parent().parent().remove();
					 $('.content').find('.j-question-card > .j-q-order').each(function(){
						 if($(this).val() === idx){
							 $(this).parent().remove();
							
						 }
					 })
				})
				
				//이미지 미리보기
				$('.content').on('click', '.j-img-preview', function() {
                 // 미리보기 이미지를 클릭하면 해당 카드의 파일 입력이 트리거됨
                   $(this).closest('.j-img-box').find('.j-file-input').click();
                 });

                 $('.content').on('change', '.j-file-input', function(event) {
                 // 파일 입력에서 파일이 선택되면 미리보기를 업데이트
                  const fileInput = this;
                  const file = fileInput.files[0];
                  const $previewDiv = $(fileInput).closest('.j-img-box').find('.j-img-preview');
				  $previewDiv.find('.j-file-up-img').remove();
                  if (file) {
                  const reader = new FileReader();
                  reader.onload = function(e) {
                  // 미리보기 div의 background-image에 파일을 표시
                  $previewDiv.css({
                    'background-image': `url(${e.target.result})`,
                    'background-size': 'cover',
                    'background-position': 'center',
                    'background-repeat': 'no-repeat'
                   });
                  }
                 reader.readAsDataURL(file);
                 }
                 
              
                  });
				
				//select box event
				 $('.content').on('change', '.j-email-select', function() {
                 // 선택한 select 요소의 부모 div를 찾아 해당 card 안의 input을 찾음
                 let selectedValue = $(this).val();  // 선택된 값
                 let $emailTailInput = $(this).closest('.j-email-input-box').find('.j-email-tail-input'); // 해당 input 찾기
				console.log('hi');
                 // 기존 글자를 비우고 선택한 값을 넣음
                  $emailTailInput.val(''); // 기존 내용 비우기
                 if (selectedValue) {
                   $emailTailInput.val(selectedValue); // 선택된 값을 tail input에 넣기
                  }
               });
               
               $('.content').on('click','.j-typeAndImg', function() {
                // j-typeAndImg의 위치를 가져옴
               var $this = $(this);
               var offset = $this.offset(); // j-typeAndImg의 위치

               // 모달을 설정
               var $modal = $('#add-type-modal2');
              $modal.css({
                 top: offset.top, // j-typeAndImg의 상단 위치
                  left: offset.left - $modal.outerWidth() // j-typeAndImg의 왼쪽 위치에서 모달 폭만큼 뺌
               });

               // 모달을 보이게 함
               $modal.show();
                });
                
                $(document).on('click', function(event) {
               if (!$(event.target).closest('.j-typeAndImg').length && !$(event.target).closest('#add-type-modal2').length) {
               $('#add-type-modal2').hide(); // 모달 숨기기
                }
              });
              
              $('#add-type-modal-container2 .j-typeAndImg-modal').on('click',async function(){
				  let ccSeq = $(this).find('input[type="hidden"').val()
				  let selectDiv = $('.content').find('.j-card-selected');
			  	  
			  	 try{
				  let header = await fetchHeader(ccSeq);
				   selectDiv.find('.j-typeAndImg').remove();
				   selectDiv.find('.j-survey-es-type').append(header);
			  	  let content = await fetchContent(ccSeq);
			  	  selectDiv.find('.j-question-content-box').remove();
			  	  let frame = $('<div class="j-question-content-box"></div>');
			  	   frame.append(content);
			  	   console.log(frame);
			  	   selectDiv.append(frame);
				}
			      catch (error) {
     					   console.error("AJAX 요청 실패:", error);
    			   }
			  	  	
			  	  
			  	  
			  	 
			  })
})



// questionFrame.html 파일 불러오기
async function fetchQuestionFrame() {
    return $.ajax({
        url: "/resources/html/question/questionFrame.html",
        type: "GET"
    });
}

// header 파일 불러오기
async function fetchHeader(ccSeq) {
    return $.ajax({
        url: '/resources/html/question/header/header'+ccSeq+'.html',
        type: "GET"
    });
}

// content 파일 불러오기
async function fetchContent(ccSeq) {
    return $.ajax({
        url: '/resources/html/question/content/content'+ccSeq+'.html',
        type: "GET"
    });
}



//질문 추가될 때 nav에 추가하기
function setQuestionNav(idx,src){
	let html = '<div class="j-question j-flex-row-center j-quorder'+idx+'">'+
			   '<div class="question-img j-flex-row-center">'+
			   '<img src="'+src+'">'+
			    '</div>'+
				'<div class="question-name">'+
				'<span>질문명</span>'+
				'</div>'+
				'<div class="j-list-xbutton j-flex-row-center">'+
				'<img src="/resources/img/question/x-circle.png">'+
				'</div>'+
				'</div>';
	$('.j-question-list').append(html);
}

// 행과 열을 기반으로 테이블 생성
function generatePreviewTable(target) {
				
    let rows = $(target).parent().find('.j-row-input').map(function() { return $(this).val(); }).get(); // 모든 행 이름 가져오기
    let cols = $(target).parent().find('.j-col-input').map(function() { return $(this).val(); }).get(); // 모든 열 이름 가져오기
	
	
    let tableHtml = '<table class="j-chart-table" border="1"><thead><tr><th></th>'; // 테이블 시작
    
    // 열 헤더 생성
    cols.forEach(function(colName) {
        tableHtml += '<th class="j-col-name-th"><span class="j-col-name">'+colName+'<span></th>';
    });
    tableHtml += '</tr></thead><tbody>';

    // 각 행마다 열 생성
    rows.forEach(function(rowName, rowIndex) {
        tableHtml += '<tr><td>'+rowName+'</td>'; // 행 헤더
        
        cols.forEach(function(colName, colIndex) {
            // 라디오 버튼을 각 셀에 추가
            tableHtml += '<td>'+
                    '<input type="radio" name="row'+-rowIndex+'" value="'+rowName+'">'+
                     '</td>';
        });
        tableHtml += '</tr>';
    });
    
    tableHtml += '</tbody></table>'; // 테이블 끝

    // 모달에 테이블 추가
    $('#preview-table-container').html(tableHtml);
   }
			
			
			function updateVerticalLine(target){
			
			 let row = target.find('.j-row-box').outerHeight();
			 let col = target.find('.j-col-box').outerHeight();
			
			 target.find('.j-vertical-line').outerHeight(row > col ? row:col);
			}
			function updateNumberRange() {
				var start = parseInt($('.j-num-start').val()); // 시작 값
				var end = parseInt($('.j-num-end').val()); // 끝 값

				// 숫자 범위 표시 초기화
				$('.j-number').empty();

				// start에서 end까지 span으로 숫자를 동적으로 추가
				for (var i = start; i <= end; i++) {
					$('.j-number').append('<span>' + i + '</span>');
				}

				// 선 초기화
				updateLine(0, end - start); // 첫 클릭 전 초기화
			}

			// 클릭한 숫자에 따라 선 채우기
			function updateLine(clickedIndex, totalNumbers) {
				var percentage = (clickedIndex / totalNumbers) * 100; // 클릭한 비율 계산
				console.log('clickedIndex:', clickedIndex, 'totalNumbers:', totalNumbers, 'percentage:', percentage); // 값 확인용 로그
				$('.j-line').css('background-image', 'linear-gradient(90deg, #005bac ' + percentage + '%, rgba(0, 91, 172, 0.4) ' + percentage + '%)');
			}

			function changeFocus(el) {
				$('.j-question-card').removeClass('j-card-selected');
				$(el).addClass('j-card-selected');
			}
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
			
			                if(data.userSelectedType === 'R'){
			                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
			                        extraAddr += data.bname;
			                    }
			                    if(data.buildingName !== '' && data.apartment === 'Y'){
			                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			                    }
			                    if(extraAddr !== ''){
			                        extraAddr = ' (' + extraAddr + ')';
			                    }
			                } else {
			                    document.getElementById("UserAdd1").value = '';
			                }
			
			                // 선택된 우편번호와 주소 정보를 input 박스에 넣는다.
			                $parent = $button.parent();
			                $parent.find('.zipp_code_id').val(data.zonecode);
			                $parent.find('.UserAdd1').val(addr+extraAddr);
			                $parent.find('.UserAdd2').focus();
			                /*document.getElementById('zipp_code_id').value = data.zonecode;
			                document.getElementById("UserAdd1").value = addr;
			                document.getElementById("UserAdd1").value += extraAddr;
			                document.getElementById("UserAdd2").focus(); // 우편번호 + 주소 입력이 완료되었음으로 상세주소로 포커스 이동*/
			            }
			        }).open();
			    }
			//주소입력
			
			
			
   // 숫자 입력만 허용 (한글, 영어 및 기타 문자 차단)
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
    
    
    function createDefaultMap(mapdiv){
		
		let container = document.getElementById(mapdiv);
		
		let options = { //지도를 생성할 때 필요한 기본 옵션
					center: new kakao.maps.LatLng(36.5760, 128.0000), //지도의 중심좌표.
					level: 13 //지도의 레벨(확대, 축소 정도)
				};
		let map = new kakao.maps.Map(container, options);
	}
	
	        function getMyPosittion(id){
				navigator.geolocation.getCurrentPosition((position) => {
					  createKaKaoMap(id,position.coords.latitude, position.coords.longitude);
					});
			}
			
			function createKaKaoMap(id,latitude,longitude){
				 
				 var container = document.getElementById(id); //지도를 담을 영역의 DOM 레퍼런스
				 var options = { //지도를 생성할 때 필요한 기본 옵션
						center: new kakao.maps.LatLng(36.5760, 128.0000),
						level:3
					};
				
				   
				var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
				
				var moveLatLng = new kakao.maps.LatLng(latitude, longitude);
				map.panTo(moveLatLng);		
					
				
				var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
				// 마커를 생성합니다
				var marker = new kakao.maps.Marker({
				    position: markerPosition
				});

				// 마커가 지도 위에 표시되도록 설정합니다
				marker.setMap(map);
			}
	
	
    