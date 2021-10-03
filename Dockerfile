FROM node:14-alpine
WORKDIR /app
COPY ./package.json package.json
COPY ./src ./src
COPY ./utils/wait-for.sh ./wait-for.sh
RUN chmod +x wait-for.sh
RUN ls && npm install -f
EXPOSE 3000
