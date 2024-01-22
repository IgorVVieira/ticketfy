FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git
RUN apk add --no-cache bash
RUN npm install

COPY . .
RUN cp .env.example .env

ENV PORT=3000

EXPOSE ${PORT}

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD [ "npm", "run", "start:docker" ]
