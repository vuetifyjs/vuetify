FROM mhart/alpine-node:12 AS build
COPY . .
RUN yarn && yarn build

FROM mhart/alpine-node:12
COPY --from=build packages/docs .
COPY --from=build yarn.lock .
RUN rm -rf node_modules && yarn --production=true && yarn cache clean
EXPOSE 8095
CMD ["yarn", "start"]
