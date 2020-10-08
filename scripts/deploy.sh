#!/usr/bin/env bash

npm config set //registry.npmjs.org/:_authToken ${NPM_API_KEY:?}
yarn lerna publish from-git --npm-tag $(node ./scripts/parse-npm-tag.js ${TAG_NAME:?}) --yes
