FROM node:12-alpine

# work directory
WORKDIR /app

# ENV 설정

# ENV DATABASE_HOST "aksmysqldb01.mysql.database.azure.com"
# ENV DATABASE_NAME "mysql"
# ENV DATABASE_USERNAME "adminuser@aksmysqldb01"
# ENV DATABASE_PASSWORD "qwer1234*"

ENV DATABASE_HOST "172.30.1.16"
ENV DATABASE_PORT "3306"
ENV DATABASE_USERNAME "micro"
ENV DATABASE_NAME "monolithic"
ENV DATABASE_PASSWORD "service"
ENV REDIS_HOST "172.30.1.16"
ENV PORT 3000
# ENV REDIS_HOST "my-redis.redis-ns.svc.cluster.local"
ENV REDIS_PORT 6379

# Copy dependencies first for effective caching
COPY package*.json ./

RUN npm install --silent

# copy source
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]