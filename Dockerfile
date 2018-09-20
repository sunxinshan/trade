FROM centos:7.2.1511

MAINTAINER Airwallex


LABEL version=${APP_VERSION:-unknown}
LABEL info="Airwallex Pty Ltd"
LABEL description="The internal service endpoint admin page"

RUN yum -y install wget

# install Nodejs 6.91
RUN wget http://nodejs.org/dist/v6.9.1/node-v6.9.1-linux-x64.tar.gz -P /app \
 && tar -vzxf /app/node-v6.9.1-linux-x64.tar.gz -C /app \
 && rm -rf /app/node-v6.9.1-linux-x64.tar.gz

ENV NODE_HOME /app/node-v6.9.1-linux-x64/bin
ENV PATH $NODE_HOME:$PATH
ENV DATABASE_URL postgres://postgres:postgres@localhost:5432/bos
ENV RAIL bos

COPY src /app/src
COPY package.json /app
COPY webpack-production.config.js /app
COPY build /app/build
COPY node_modules /app/node_modules

#RUN cd /app \
#    && npm install
ADD scripts/startup.sh /app
RUN chmod +x /app/startup.sh

EXPOSE 8080

#WORKDIR /app
ENTRYPOINT ["/app/startup.sh"]
#CMD ["${DATABASE_URL}", "${RAIL}"]
