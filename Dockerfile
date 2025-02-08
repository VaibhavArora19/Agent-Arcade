FROM node:23.3.0

WORKDIR /app

RUN npm i -g pnpm

COPY ./elizaOnFlow .

CMD ["pnpm", "start", "--character=trump.character.json"]

