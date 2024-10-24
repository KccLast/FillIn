# 톰캣 기반 이미지 사용
FROM tomcat:9.0-jdk17

# WAR 파일 복사
COPY target/*.war /usr/local/tomcat/webapps/app.war

# 톰캣 실행
CMD ["catalina.sh", "run"]