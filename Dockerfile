FROM node:12

ADD wait /opt/wait
ADD src /opt/app/src
ADD package.json /opt/app/package.json
ADD yarn.lock /opt/app/yarn.lock

WORKDIR /opt/app

# RUN yarn install --production
RUN yarn install

EXPOSE 3333

CMD ["yarn", "start"]