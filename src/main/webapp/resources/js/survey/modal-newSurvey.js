$(document).ready(function () {
   $('#create-survey-btn').on('click', function () {
       const surveyName = $('#survey-name').val().trim();

      if (surveyName.length === 0) {
         Swal.fire({
            icon: "warning",
            text: "설문지 이름을 입력해 주세요.",
            backdrop: false
         });
         return;
      }
      $('#createSurveyForm').submit();
      // $.ajax({
      //    url: '/api/survey/create-survey',
      //    type: 'POST',
      //    contentType: 'application/json',
      //    data: JSON.stringify({ surveyName: surveyName }),
      //    success: function (response) {
      //       console.log(response);
      //
      //    },
      //    error: function (xhr) {
      //       console.error('Error:', xhr.responseText);
      //    }
      // });
   });
});