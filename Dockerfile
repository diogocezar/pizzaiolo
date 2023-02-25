FROM node:lts AS builder

WORKDIR /app

COPY package.json yarn.lock tsconfig* nest-cli.json ./
COPY prisma ./prisma/

RUN yarn install --prod

RUN npx prisma generate --schema ./prisma/schema.prisma

COPY . .

RUN yarn add @nestjs/cli

RUN yarn run build

FROM node:lts

WORKDIR /app

ARG PORT=4000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE $PORT

CMD [ "node", "dist/src/main" ]