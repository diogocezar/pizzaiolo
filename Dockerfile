FROM node:16-bullseye as ts-compiler

WORKDIR /usr/app

COPY package*.json ./

COPY tsconfig*.json ./

RUN yarn

COPY . ./

RUN yarn prisma:generate

RUN yarn run build

RUN yarn prisma:push

FROM node:16-bullseye as ts-remover

WORKDIR /usr/app

COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/yarn.lock ./
COPY --from=ts-compiler /usr/app/dist ./
COPY --from=ts-compiler /usr/app/tsconfig.*.json ./
COPY --from=ts-compiler /usr/app/tsconfig.json ./
COPY --from=ts-compiler /usr/app/prisma ./

# Remove comment when test local
COPY --from=ts-compiler /usr/app/.env ./

RUN yarn

RUN yarn prisma:generate

RUN yarn prisma:push

FROM node:16-bullseye

RUN apt update \
    && apt install -y \
    bzip2 \
    build-essential \
    chrpath \
    libssl-dev \
    libxft-dev 

RUN npm install -g @nestjs/cli

WORKDIR /usr/app

COPY --from=ts-remover /usr/app ./

EXPOSE 3000:3000

CMD ["yarn", "run" ,"start:prod"]