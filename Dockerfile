FROM node:lts
WORKDIR /app
COPY package.json package.json
RUN yarn install
COPY . ./app
CMD ["yarn", "start"]
