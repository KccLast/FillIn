FROM openjdk:17-jre
COPY build/libs/docker-test-*.jar app.jar
ENTRYPOINT [ "java", "-jar", "app.jar" ]