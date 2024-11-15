#!/usr/bin/env sh
if [ ! -f Pulumi.yaml ]; then
    echo "Not in the root folder."
    exit 1
fi

case "$1" in
  (capps-staging)
    stack=alsa-capps-prod-staging
  ;;
  (capps-prod)
    stack=alsa-capps-prod-production
  ;;
  (capps-dev)
    stack=alsa-capps-dev
  ;;
  (*)
      echo "Wrong param. It must be capps-staging, capps-prod or capps-dev"
      exit 1
  ;;
esac

alias ht-pulumi="aws-mfa && AWS_PROFILE=use-pulumi pulumi"

rm -rf dist
mkdir dist
cp package.json package-lock.json .npmrc dist/
cd dist
npm ci --only=production
cd ..
npm run build
ht-pulumi stack -C ./../aws select $stack
ht-pulumi up -f -y -C ./../aws -s $stack
