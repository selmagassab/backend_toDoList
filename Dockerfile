FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

# RUN npm install --global pm2

COPY package*.json ./
RUN npm install --silent
# COPY . .

COPY ./ ./

# ARG APP_ENV
ENV APP_ENV=$APP_ENV

EXPOSE 5000

# USER node

# ENTRYPOINT [ "npm", "run", "start:prod"]
# CMD [ "pm2", "start", "server.js"]
# CMD [ "pm2-runtime", "npm", "--", "start" ]
CMD ["yarn", "start"]

# WORKDIR /usr/src/node-app

# COPY package.json yarn.lock ./

# # USER node

# RUN yarn install --pure-lockfile
# # RUN npm install --production

# COPY --chown=node:node . .

# EXPOSE 5000
