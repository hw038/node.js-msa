FROM node:12-alpine

# work directory
WORKDIR /app

# ENV 설정

# Copy dependencies first for effective caching
COPY package*.json ./

RUN npm install --silent

# copy source
COPY . .

EXPOSE 9000

CMD ["node", "distributor.js"]