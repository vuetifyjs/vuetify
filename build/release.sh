#!/bin/bash

set -e

BRANCH=$(git symbolic-ref --short HEAD)
LATEST=$(npm view vuetify version)
echo #
echo "Current branch is $BRANCH"
echo "Last git version was $(git describe --abbrev=0 --tags)"
echo "Latest npm version is $LATEST"
echo #

if [ "$BRANCH" != 'dev' ]; then
  echo "Releasing on a branch other than 'dev'"
  echo "This may have unintended side-effects"
  options=("Switch to dev" "Continue anyway")
  select opt in "${options[@]}"; do
    if [ "$opt" = "${options[0]}" ]; then
      echo #
      git checkout dev
      BRANCH=$(git symbolic-ref --short HEAD)
      break
    elif [ "$opt" = "${options[1]}" ]; then
      break
    fi
  done
fi

echo #

read -e -p "Enter release version: " VERSION

TAG=$(node -e "v=(require('semver').prerelease('$VERSION')||[])[0]||'';console.log(/^[a-zA-Z]+$/.test(v)?v:'latest')")

echo #

echo "Releasing $VERSION on $BRANCH"
echo "Tag: $TAG"
read -p "Are you sure? [Y/n]" -n 1 -r
echo #
[ ! $REPLY =~ ^[Yy]$ ] && exit

echo "Releasing $VERSION ..."

npm run lint
npm run test -i

npm_config_commit_hooks=false
npm version $VERSION --message "[release] $VERSION"

git push --no-verify --follow-tags

if [ "$BRANCH" == 'dev' ] && [ "$TAG" == 'latest' ]; then
  echo "Fast-forwarding 'master'..."
  echo #
  git fetch . dev:master
  git push origin master --no-verify
fi
