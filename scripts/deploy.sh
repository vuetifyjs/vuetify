#!/usr/bin/env bash

npm config set //registry.npmjs.org/:_authToken ${NPM_API_KEY:?}
npm whoami
pnpm lerna publish from-git --dist-tag $(node ./scripts/parse-npm-tag.js ${RELEASE_TAG:?}) --yes
