FROM openjdk:17-alpine
COPY build/libs/docker-test-*.jar app.jar
ENTRYPOINT [ "java", "-jar", "app.jar" ]