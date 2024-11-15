## What to do if you want to use a package from CodeArtifact:

All the NPM commands will be executed against AWS CodeArtifact and there are some configuration to be made previously. All the documentation needed is [here](https://github.com/metis-ai/professional-services/blob/main/botonic-tools/README.md#how-to-install-a-published-package).

## How to deploy the bot

These are the commands to deploy the bot for staging and production:

- **staging**: `npm run deploy_staging`
- **production**: `npm run deploy_production`

The right configuration will be used automatically thanks to the `env.environment` variable used in the build commands (see `scripts` object inside `package.json`)

**ALERT! Don't use `botonic deploy` to deploy to production because sometimes it doesn't get the `env.environment` variable correctly!**
