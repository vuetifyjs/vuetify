set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure (y/n)" -n 1 -r
echo #
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  npm run build
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"

  git push
  npm publish
fi
