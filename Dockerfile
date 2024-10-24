FROM openjdk:17-jdk-slim
COPY build/libs/docker-test-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
