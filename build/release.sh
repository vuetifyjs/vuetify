#!/bin/bash

set -e

BRANCH=$(git symbolic-ref --short HEAD)
LATEST=$(npm view vuetify version)
echo #
echo "Current branch is $BRANCH"
echo "Last git version was $(git describe --abbrev=0 --tags)"
echo "Last npm version was $LATEST"
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

  npm version $VERSION --message "[release] $VERSION"

  git push --follow-tags --no-verify
  npm publish --tag "$TAG"
fi
