FROM node:16-bullseye as ts-compiler

WORKDIR /usr/app

COPY package*.json ./

COPY tsconfig*.json ./

RUN yarn

COPY . ./

RUN npx prisma generate

RUN yarn run build

FROM node:16-bullseye as ts-remover

WORKDIR /usr/app

COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/yarn.lock ./
COPY --from=ts-compiler /usr/app/dist ./
COPY --from=ts-compiler /usr/app/tsconfig.*.json ./
COPY --from=ts-compiler /usr/app/tsconfig.json ./

# When implements the prisma client, uncomment this line
COPY --from=ts-compiler /usr/app/prisma ./

# Run when test local
# COPY --from=ts-compiler /usr/app/.env ./

RUN yarn

RUN npx prisma generate

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

RUN npx prisma db push

EXPOSE 3000

CMD ["yarn", "run" ,"start:prod"]