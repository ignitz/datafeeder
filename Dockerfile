FROM node:12

ADD src /opt/app/src
ADD .env /opt/app/.env
ADD package.json /opt/app/package.json
ADD yarn.lock /opt/app/yarn.lock

WORKDIR /opt/app

RUN yarn

EXPOSE 3333

CMD ["yarn", "dev"]