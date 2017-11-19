#!/bin/bash

set -e

BRANCH=$(git symbolic-ref --short HEAD)
LATEST=$(npm view vuetify version)
echo #
echo "Current branch is $BRANCH"
echo "Last git version (from the current location) was $(git describe --abbrev=0 --tags)"
echo "Latest npm version is $LATEST"

echo #

read -e -p "Enter release version: " VERSION

TAG=$(node ./parse-npm-tag.js ${VERSION})

if [ "$BRANCH" != 'master' ] && [ "$TAG" == 'latest' ]; then
  echo #
  echo "Releasing on a branch other than 'master'"
  echo "This may have unintended side-effects"
  options=("Switch to master" "Continue anyway")
  select opt in "${options[@]}"; do
    if [ "$opt" = "${options[0]}" ]; then
      echo #
      git checkout master
      git fetch
      BRANCH=$(git symbolic-ref --short HEAD)
      break
    elif [ "$opt" = "${options[1]}" ]; then
      break
    fi
  done
fi

echo #

echo "Releasing $VERSION on $BRANCH"
echo "Tag: $TAG"
read -p "Are you sure? [Y/n]" -n 1 -r
echo #
[ ${REPLY,,} != "y" ] && exit

echo "Releasing $VERSION ..."

npm run lint
npm run test -i

npm_config_commit_hooks=false
npm version $VERSION --message "[release] $VERSION"

git push --no-verify --follow-tags

if [ "$BRANCH" == 'master' ]; then
  echo #
  echo "You should now merge master into dev"
  echo "Run 'git fetch . master:dev' then 'git push origin dev:dev'"
fi
