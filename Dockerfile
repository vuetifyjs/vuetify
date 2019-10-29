FROM mhart/alpine-node:12

COPY . .
RUN yarn && \
    yarn build && \
    rm -rf node_modules && \
    # shitty workaround for cypress installing
    # binaries into root cache because kitchen
    # uses it.
    rm -rf root/.cache && \
    yarn --production=true && \
    yarn cache clean

EXPOSE 8095
CMD ["yarn", "start"]
