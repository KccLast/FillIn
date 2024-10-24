FROM openjdk:17-jdk
COPY build/libs/docker-test-*.jar app.jar
ENTRYPOINT [ "java", "-jar", "app.jar" ]
