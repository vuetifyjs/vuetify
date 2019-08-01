FROM mhart/alpine-node:12

COPY . .

EXPOSE 8095

RUN yarn
RUN yarn build
CMD ["yarn", "start"]
