#!/usr/bin/env sh
alias ht-pulumi="aws-mfa && AWS_PROFILE=use-pulumi pulumi"
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
      return
  ;;
esac

echo "Installing AWS dependencies..."
npm i
echo "Login to Pulumi..."
ht-pulumi login
ht-pulumi stack -C ./../aws select $stack

