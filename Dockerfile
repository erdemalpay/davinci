FROM node:8

RUN apt-get install -y tzdata
RUN cp /usr/share/zoneinfo/Europe/Istanbul /etc/localtime

RUN npm install pm2 -g

WORKDIR /srv/davinci/

COPY . .

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

ARG API_URL
ENV API_URL=$API_URL

RUN touch ./.env
RUN printenv > ./.env

RUN npm install

RUN npm run build

CMD ["pm2-docker", "pm2.json"]

