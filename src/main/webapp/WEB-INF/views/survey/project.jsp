<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="/resources/common/nav.css">
    <link rel="stylesheet" type="text/css"
          href="/resources/css/question/questionNav.css">
    <link rel="stylesheet" type="text/css"
          href="/resources/css/question/question.css">
    <link rel="stylesheet" type="text/css"
          href="/resources/css/question/condition.css">
    <link rel="stylesheet" type="text/css"
          href="/resources/css/survey/post.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.15.6/js/jsplumb.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script
            src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script type="text/javascript"
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f7372f613dea5dbd8f49b7be0a73bbb8"></script>

    <script type="text/javascript">
        $(function () {
            let surveyName = "${survey.name}";
            updateSurveyName(surveyName);
            console.log("surveyName In jsp" + surveyName);
        })

    </script>
    <script src="/resources/js/question/questionIUD.js"></script>
    <script src="/resources/js/question/questionEvent.js"></script>
    <script src="/resources/js/question/questionParse.js"></script>

    <script type="text/javascript">

        $(function () {
            $('.content').on('keyup', '.j-survey-name-input', function () {
                let idx = $(this).parent().parent().index();
                $('.j-question-list').find('.j-question').eq(idx).find('.question-name > span').html($(this).val());
            })

            let survey = '${surveyJson}';
            parseJson(survey);

        })
    </script>


</head>

<body>

<input type="hidden" id="surveySeq" value="${survey.seq}"/>
<%@include file="/resources/common/header.jsp" %>
<%-- <%@ include file="/resources/common/miniNav.jsp" %> --%>
<%@ include file="/resources/common/nav.jsp" %>

<!-- 컨텐트 내용 -->
<!-- [대시보드] 스타일 -->
<!-- style="height: 700px; background-color: green; margin-top: 100px; margin-left: 240px; margin-right: 40px; -->
<!-- [대시보드 이외]의 모든 페이지 스타일 -->
<!-- style="height: 700px; background-color: green; margin-top: 100px; margin-left: 100px; margin-right: 40px; -->

<div id="j-question-nav">
    <div class="j-questionNav-tab-Box j-flex-row-center">
        <div class="j-question-nav-tab j-question-nav-color">
            질문 상세
        </div>
        <div class="j-deploy-nav-tab">
            게시 정보
        </div>

    </div>
    <div class="j-question-box">
        <div class="j-total-question-box j-flex-row-center">
            <span>전체문항수</span>
            <div class="j-ai-img">AI</div>
        </div>

        <div class="j-question-list">


        </div>

        <div class="j-question-plus-button j-flex-row-center">
            <button class="j-flex-row-center">
                <div>
                    <img src="/resources/img/question/plus-circle-fill.png"/>
                </div>
                추가하기
            </button>
        </div>
    </div>

    <div class="j-deploy-box">


    </div>

    <div class="j-condition-button j-flex-row-center j-fix-height">
        <input type="button" value="질문 고급조건" class="j-nav-input-button j-con-btn">
    </div>

    <div class="j-depoly-button j-flex-row-center j-fix-height">
        <input id="post-btn" type="button" value="게시하기" class="j-nav-input-button" data-bs-toggle="modal"
               data-bs-target="#firstModal">
    </div>

    <!-- 첫 번째 모달 -->
    <div class="modal fade" id="firstModal" tabindex="-1" aria-labelledby="firstModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="firstModalLabel">첫 번째 모달</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    첫 번째 모달 내용
                    <button id="openSecondModal" type="button" class="btn btn-primary">두 번째 모달 열기</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 두 번째 모달 -->
    <%--    <div class="modal second-modal fade" id="secondModal" tabindex="-1" aria-labelledby="secondModalLabel"--%>
    <%--         aria-hidden="true">--%>
    <%--        <div class="modal-dialog">--%>
    <%--            <div class="modal-content">--%>
    <%--                <div class="modal-header">--%>
    <%--                    <h5 class="modal-title" id="secondModalLabel">두 번째 모달</h5>--%>
    <%--                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>--%>
    <%--                </div>--%>
    <%--                <div class="modal-body">--%>
    <%--                    두 번째 모달 내용--%>
    <%--                </div>--%>
    <%--            </div>--%>
    <%--        </div>--%>
    <%--    </div>--%>

    <div class="j-save-button j-flex-row-center j-fixSave-height">
        <input type="button" value="저장하기" class="j-nav-input-button j-nav-save-button">
    </div>

</div>
<div class="content">

</div>

<!-- 모달 창 -->
<div id="optionModal" class="modifiy-modal">
    <div class="modal-content">
        <div class="modal-header">
            <h4>옵션 추가</h4>
        </div>
        <div class="modal-body j-flex-col-center">
            <div>옵션을 입력하고 엔터로 구분해주세요</div>
            <textarea id="optionTextarea" rows="5" cols="50"
                      style="resize: none;" placeholder="옵션1&#10;옵션2&#10;옵션3"></textarea>
        </div>
        <div class="modal-btn">
            <button id="addOptionsBtn">옵션 저장</button>
            <button class="close">닫기</button>
        </div>
    </div>
</div>
<!-- check Box 모달 -->

<!-- chart 모달창 -->
<div id="preview-modal" class="modifiy-modal" style="display: none;">
    <div class="preview-modal-content">
        <span class="preview-modal-close">&times;</span>
        <h3>표 미리보기</h3>
        <div id="preview-table-container"></div>
    </div>
</div>
<!-- chart 모달창 -->

<!-- add type 모달창 -->
<div id="add-type-modal" class="add-type-modal-class">
    <div class="add-type-modal-content">
        <span class="add-type-modal-close">&times;</span>
        <div id="add-type-modal-container" class="j-flex-row-center">
            <div class="j-quantity-box j-flex-col-center">
                <span>Quantity</span>
                <div class="j-type-box ">
                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/choice.png"/>
                        <div class="j-type-name-modal">객관식</div>
                        <input type="hidden" value="7"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/checkBox.png"/>
                        <div class="j-type-name-modal">체크박스</div>
                        <input type="hidden" value="8"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/Liner.png"/>
                        <div class="j-type-name-modal">선형</div>
                        <input type="hidden" value="9"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/dropdown.png"/>
                        <div class="j-type-name-modal">드롭다운</div>
                        <input type="hidden" value="10"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/chart.png"/>
                        <div class="j-type-name-modal">객관식표</div>
                        <input type="hidden" value="11"/>
                    </div>
                </div>
            </div>
            <div class="j-qual-box j-flex-col-center">
                <span>Qualitative</span>
                <div class="j-type-box">

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/short.png"/>
                        <div class="j-type-name-modal">단답형</div>
                        <input type="hidden" value="12"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/long.png"/>
                        <div class="j-type-name-modal">주관식</div>
                        <input type="hidden" value="13"/>
                    </div>


                </div>
            </div>
            <div class="j-data-box j-flex-col-center">
                <span>Data</span>
                <div class="j-type-box ">


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/location.png"/>
                        <div class="j-type-name-modal">위치기록</div>
                        <input type="hidden" value="17"/>
                    </div>


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/secu.png"/>
                        <div class="j-type-name-modal">개인정보</div>
                        <input type="hidden" value="18"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/gender.png"/>
                        <div class="j-type-name-modal">성별</div>
                        <input type="hidden" value="19"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/day.png"/>
                        <div class="j-type-name-modal">날짜</div>
                        <input type="hidden" value="20"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/picture.png"/>
                        <div class="j-type-name-modal">사진</div>
                        <input type="hidden" value="21"/>
                    </div>
                </div>
            </div>

            <div class="j-contact-box j-flex-col-center">
                <span>Contact</span>

                <div class="j-type-box ">


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/email.png"/>
                        <div class="j-type-name-modal">이메일</div>
                        <input type="hidden" value="14"/>
                    </div>


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/house.png"/>
                        <div class="j-type-name-modal">주소</div>
                        <input type="hidden" value="15"/>
                    </div>


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/phones.png"/>
                        <div class="j-type-name-modal">전화번호</div>
                        <input type="hidden" value="16"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- add type 모달창 -->


<!-- add type 모달창2 -->
<div id="add-type-modal2" class="add-type-modal-class">
    <div class="add-type-modal-content">
        <span class="add-type-modal-close">&times;</span>
        <div id="add-type-modal-container2" class="j-flex-row-center">
            <div class="j-quantity-box j-flex-col-center">
                <span>Quantity</span>
                <div class="j-type-box ">
                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/choice.png"/>
                        <div class="j-type-name-modal">객관식</div>
                        <input type="hidden" value="7"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/checkBox.png"/>
                        <div class="j-type-name-modal">체크박스</div>
                        <input type="hidden" value="8"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/Liner.png"/>
                        <div class="j-type-name-modal">선형</div>
                        <input type="hidden" value="9"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/dropdown.png"/>
                        <div class="j-type-name-modal">드롭다운</div>
                        <input type="hidden" value="10"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/chart.png"/>
                        <div class="j-type-name-modal">객관식표</div>
                        <input type="hidden" value="11"/>
                    </div>
                </div>
            </div>
            <div class="j-qual-box j-flex-col-center">
                <span>Qualitative</span>
                <div class="j-type-box">

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/short.png"/>
                        <div class="j-type-name-modal">단답형</div>
                        <input type="hidden" value="12"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/long.png"/>
                        <div class="j-type-name-modal">주관식</div>
                        <input type="hidden" value="13"/>
                    </div>


                </div>
            </div>
            <div class="j-data-box j-flex-col-center">
                <span>Data</span>
                <div class="j-type-box ">


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/location.png"/>
                        <div class="j-type-name-modal">위치기록</div>
                        <input type="hidden" value="17"/>
                    </div>


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/secu.png"/>
                        <div class="j-type-name-modal">개인정보</div>
                        <input type="hidden" value="18"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/gender.png"/>
                        <div class="j-type-name-modal">성별</div>
                        <input type="hidden" value="19"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/day.png"/>
                        <div class="j-type-name-modal">날짜</div>
                        <input type="hidden" value="20"/>
                    </div>

                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/picture.png"/>
                        <div class="j-type-name-modal">사진</div>
                        <input type="hidden" value="21"/>
                    </div>
                </div>
            </div>

            <div class="j-contact-box j-flex-col-center">
                <span>Contact</span>

                <div class="j-type-box ">


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/email.png"/>
                        <div class="j-type-name-modal">이메일</div>
                        <input type="hidden" value="14"/>
                    </div>


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/house.png"/>
                        <div class="j-type-name-modal">주소</div>
                        <input type="hidden" value="15"/>
                    </div>


                    <div class="j-typeAndImg-modal j-flex-row-center">
                        <img src="/resources/img/question/phones.png"/>
                        <div class="j-type-name-modal">전화번호</div>
                        <input type="hidden" value="16"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- add type 모달창2 -->
<div class="j-condition-box">

    <div class="j-condition-card-container">

        <div class="j-que-con-card j-flex-row-center" id="card1">
            <div class="j-corder j-flex-row-center">1</div>
            <div class="j-type-con-img j-flex-row-center">
                <img src="/resources/img/question/checkBox.png"/>
            </div>
            <div class="j-con-que-name">질문명</div>
        </div>


        <div class="j-que-con-card j-flex-row-center" id="card2">
            <div class="j-corder j-flex-row-center">2</div>
            <div class="j-type-con-img j-flex-row-center">
                <img src="/resources/img/question/checkBox.png"/>
            </div>
            <div class="j-con-que-name">질문명</div>
        </div>


        <div class="j-que-con-card j-flex-row-center" id="card3">
            <div class="j-corder j-flex-row-center">3</div>
            <div class="j-type-con-img j-flex-row-center">
                <img src="/resources/img/question/checkBox.png"/>
            </div>
            <div class="j-con-que-name">질문명</div>
        </div>
    </div>
</div>

<div id="j-con-modal">
    <div id="j-con-modal-hader" class="j-flex-row-center">
        <div id="j-nextQuestion" class="j-flex-row-center j-con-modal-h-select">
            <span>이어지는 질문</span>
        </div>
        <div id="j-subQuestion" class="j-flex-row-center">
            <span>대체 질문 등록</span>
        </div>
    </div>
    <div id="j-con-modal-body">
        <div class="j-basic-move">
            <div>기본이동</div>
            <select class="form-select">
                <option value="" disabled>다음질문</option>
            </select>
        </div>
        <div class="j-condition-move">
            <div class="j-condition-plus j-flex-row-center">
                <span>로직 추가하기</span>
                <div class="j-con-plus-button j-flex-row-center">
                    <span>+</span>
                </div>
            </div>
            <div class="j-condition-content-box">

                <div class="j-condition">

                    <div class="j-condition-header j-flex-row-center">
                        <div class="j-arrow j-flex-row-center">
                            <img src="/resources/img/question/arrow-up.png">
                        </div>
                        <div class="j-con-sur-name">로직 1</div>
                    </div>

                    <div class="j-condition-c">
                        <div>조건</div>
                        <input type="text" class="form-control" placeholder="조건 값을 입력해주세요">
                        <select class="operations form-select">
                            <option value="" disabled="disabled">조건</option>
                        </select>
                        <div>결과</div>
                        <select class="next-ques form-select">
                            <option value="" disabled="disabled">다음질문</option>
                        </select>
                    </div>

                </div>

            </div>
        </div>
    </div>
</div>
</body>

</html>