# OpenJDK 17 이미지 사용
FROM openjdk:17-jdk-slim

# 애플리케이션 WAR 파일을 컨테이너에 복사
COPY target/*.war /app/app.war

# 애플리케이션 실행 (내장 톰캣 사용)
CMD ["java", "-jar", "/app/app.war"]