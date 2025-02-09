FROM node:23.3.0

WORKDIR /app

COPY package*.json .

RUN pnpm install --no-frozen-lockfile

COPY . .

RUN npm i -g pnpm

RUN pnpm build

CMD ["pnpm", "start", "--character=trump.character.json"]
