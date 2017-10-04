#!/bin/bash

set -e

BRANCH=$(git symbolic-ref --short HEAD)
echo #
echo "Current branch is $BRANCH"
echo "Last version was $(git describe)"
echo #

read -e -p "Enter release version: " VERSION

read -e -p "Enter release tag (latest): " TAG
TAG=${TAG:-"latest"}

echo #

echo "Releasing $VERSION on $BRANCH"
echo "Tag: $TAG"
read -p "Are you sure? [Y/n]" -n 1 -r
echo #
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  npm run lint
  npm run test

  npm version $VERSION --message "[release] $VERSION"

  git push --follow-tags --no-verify
  npm publish --tag "$TAG"
fi
