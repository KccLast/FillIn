<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/resources/css/statistic/progressBar.css">
    <title>Insert title here</title>
</head>

<body>

<div id="content" class="content"
     style="height: 700px; margin-top: 100px; margin-left: 100px; margin-right: 40px;">
    <div class="container">


        <div class="container" style="margin-top: 3px; margin-bottom: 28px; text-align: center;">
            <div class="step-wrapper">
                <div class="step active">
                    <i class="fas fa-search"></i>
                    <p>키워드 분석</p>
                </div>
                <div class="step-divider"></div>
                <div class="step">
                    <i class="fas fa-braille"></i>
                    <p>K-평균 군집화</p>
                </div>
                <div class="step-divider"></div>
                <div class="step">
                    <i class="fas fa-chart-bar"></i>
                    <p>군집별 비교분석</p>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <button id="prevBtn" class="nav-btn" style="padding: 12px 30px; font-size:16px;">이전</button>
                <button id="nextBtn" class="nav-btn" style="padding: 12px 30px; font-size:16px;">다음</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>