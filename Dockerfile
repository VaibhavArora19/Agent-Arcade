FROM node:23.3.0

WORKDIR /app

COPY ./elizaOnFlow .

CMD ["pnpm", "start", "--character=trump.character.json"]

