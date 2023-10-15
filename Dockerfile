# build container
FROM node:16.18-alpine

RUN apk --no-cache add git

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

ARG db_url=https://db.stoogoff.com/weevolve
ARG db_user
ARG db_password
ARG api_url=https://we-evolve.co.uk
ARG cdn_url=https://cdn.we-evolve.co.uk

ENV DB_URL=$db_url
ENV DB_USER=$db_user
ENV DB_PASSWORD=$db_password
ENV API_URL=$api_url
ENV CDN_URL=$cdn_url

ENV NODE_ENV=production
ENV HOST=0.0.0.0

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
