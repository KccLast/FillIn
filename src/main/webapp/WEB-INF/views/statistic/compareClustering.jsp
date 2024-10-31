<%--
  Created by IntelliJ IDEA.
  User: KOSA
  Date: 2024-10-29
  Time: 오후 5:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<script>
    <%--var tableData = ${tableData};--%>
    <%--var tableDataParsed = JSON.parse(tableData);--%>
    const tableDataJson = JSON.parse('${tableData}');
    console.log("Received Table Data: ", tableDataJson );
</script>
</body>
</html>
