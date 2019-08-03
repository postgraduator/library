FROM openjdk:8
ARG JAR_FILE_VERSION
ARG DB_PASSWORD
ARG DB_USERNAME
ARG DB_PORT
ARG DB_NAME
ARG FILE_STORAGE=/data/library/storage
COPY ./library-web/target/library-web-${JAR_FILE_VERSION}.jar /usr/local/bin/app.jar
RUN mkdir -p ${FILE_STORAGE}
VOLUME $FILE_STORAGE
ENV DB_PASSWORD=$DB_PASSWORD DB_USERNAME=$DB_USERNAME DB_PORT=$DB_PORT DB_NAME=$DB_NAME FILE_STORAGE=$FILE_STORAGE
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=docker","-jar","/usr/local/bin/app.jar",\
"-Ddb-password","${DB_PASSWORD}","-Ddb-username","${DB_USERNAME}","-Ddb-port", "${DB_PORT}","-Ddb-name","${DB_NAME}",\
"-Dfile-storage", "${FILE_STORAGE}"]