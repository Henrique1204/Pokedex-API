FROM node:latest

WORKDIR /pokedex-api

COPY  . .

RUN rm -rf node_modules
RUN npm i

ENV PORT=3000

CMD ["npm", "start"];

EXPOSE 3000
