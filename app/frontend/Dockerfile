FROM node:12-alpine

# work directory
WORKDIR /app

ENV PORT 3000

# Copy dependencies first for effective caching
COPY package*.json ./


RUN npm install --silent

# copy source
COPY . .


EXPOSE 3000

CMD ["npm", "run", "start"]