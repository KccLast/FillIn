# OpenJDK 17 이미지 사용
FROM openjdk:17-jdk-slim

# 타임존 설정 (Asia/Seoul)
ENV TZ=Asia/Seoul

# 리눅스 타임존 설정 파일 설치
RUN apt-get update && apt-get install -y tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    echo "Asia/Seoul" > /etc/timezone

# 애플리케이션 WAR 파일을 컨테이너에 복사
COPY target/*.war /app/app.war

# JVM 옵션에 시간대 설정 추가하여 애플리케이션 실행
CMD ["java", "-Duser.timezone=Asia/Seoul", "-jar", "/app/app.war"]