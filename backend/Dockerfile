FROM eclipse-temurin:17-jdk AS build

WORKDIR /workspace

COPY . .

RUN chmod +x gradlew \
    && ./gradlew clean bootJar --no-daemon -x test \
    && JAR="$(find build/libs -maxdepth 1 -type f -name '*.jar' ! -name '*-plain.jar' | head -n1)" \
    && test -n "$JAR" \
    && cp "$JAR" /tmp/app.jar

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /tmp/app.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
