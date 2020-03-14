FROM tomcat:8.5.51-jdk8-openjdk
ENV PYTHONUNBUFFERED 1
ENV TERM xterm

# helpful aliases
COPY /docker/bashrc_to_docker /root/.bashrc

# ARG vars exist only during build
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -q
RUN apt-get install -q -y --no-install-recommends maven

RUN rm -rf /var/lib/apt/lists/*

WORKDIR /home
COPY /demo article_funnel
# Maven wants to run in this dir
WORKDIR /home/article_funnel
RUN mvn --batch-mode install
RUN cp -av target/demo-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps

#WORKDIR /home/nlp_worker
#COPY /docker/requirements.txt .
#RUN pip install --upgrade pip && pip install -r requirements.txt
#ENV PYTHONPATH=/home/nlp_worker

WORKDIR $CATALINA_HOME
WORKDIR /home/article_funnel

