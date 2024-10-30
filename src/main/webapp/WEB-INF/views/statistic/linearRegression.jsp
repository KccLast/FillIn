<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>맞춤형 통계</title>
    <!-- jQuery 라이브러리 -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <!-- jQuery UI 라이브러리 -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>

    <!-- Bootstrap CSS 추가 -->
    <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/resources/common/statisticsNav.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/linearRegression.css">
</head>

<body>
<%@ include file="/resources/common/header.jsp" %>
<%@ include file="/resources/common/statisticsNav.jsp" %>

<div class="content">

</div>
<%@include file="/WEB-INF/views/statistic/modal-customized-statistics.jsp" %>
</body>
</html>
