#!/usr/bin/env bash

npm whoami
pnpm lerna publish from-git --dist-tag $(node ./scripts/parse-npm-tag.js ${RELEASE_TAG:?}) --yes
