# build container
FROM node:16.18-alpine

RUN apk --no-cache add git

WORKDIR /app

COPY ./src/package.json .
COPY ./src/yarn.lock .

RUN yarn install

COPY ./src .

ARG db_url=https://db.we-evolve.co.uk/weevolve
ARG db_auth
ARG cdn_url=https://cdn.we-evolve.co.uk

ENV DB_URL=$db_url
ENV DB_AUTH=$db_auth
ENV CDN_URL=$cdn_url

ENV NODE_ENV=production
ENV HOST=0.0.0.0

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
