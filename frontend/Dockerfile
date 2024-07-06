FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install yarn --global --force
RUN yarn install

COPY . .

EXPOSE 5173

RUN chmod -R 755 node_modules
RUN chmod +x node_modules/.bin/vite

CMD ["yarn", "dev"]
