FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm install prom-client
EXPOSE 3000
CMD ["node", "index.js"]
