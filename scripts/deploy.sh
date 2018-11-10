#!/usr/bin/env bash

npm config set //registry.npmjs.org/:_authToken ${NPM_API_KEY:?}
lerna publish from-git --npm-tag $(node ./scripts/parse-npm-tag.js ${TRAVIS_TAG:?}) --yes
