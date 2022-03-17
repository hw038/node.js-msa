FROM node:12-alpine

# work directory
WORKDIR /app

ENV APPPORT 3000
ENV REDIS_HOST "172.30.1.16"
ENV REDIS_PORT 6379
# Copy dependencies first for effective caching
COPY package*.json ./


RUN npm install --silent

# copy source
COPY . .


EXPOSE 3000

CMD ["npm", "run", "start"]