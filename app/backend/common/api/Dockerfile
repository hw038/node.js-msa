FROM node:12-alpine

# work directory
WORKDIR /app

# ENV 설정
ENV DISTRIBUTOR_HOST "172.30.1.16"
ENV DISTRIBUTOR_PORT "9000"
ENV GATE_PORT "8000"

# Copy dependencies first for effective caching
COPY package*.json ./

RUN npm install --silent

# copy source
COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]