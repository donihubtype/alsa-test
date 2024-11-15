/* eslint-disable node/no-unpublished-import */
import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

import { dynamoDbTable } from '../../dynamoDB/dynamodb'
import { botAccessKey } from '../../dynamoDB/user'
import {
  clientId,
  clientSecret,
  environment,
  tokenUrl,
} from '../../pulumi-config'
import { LAMBDA_RUNTIME, LAMBDA_TIMEOUT_SECONDS, lambdaRole } from '../shared'

export const TokenLambda = new aws.lambda.Function(
  'token',
  getLambdaArgs('token')
)

export const OriginLambda = new aws.lambda.Function(
  'origin',
  getLambdaArgs('origin')
)

function getLambdaArgs(handlerFileName: string): aws.lambda.FunctionArgs {
  return {
    code: new pulumi.asset.AssetArchive({
      alsa: new pulumi.asset.FileArchive('./dist/alsa'),
      node_modules: new pulumi.asset.FileArchive('./dist/node_modules'),
      shared: new pulumi.asset.FileArchive('./dist/shared'),
    }),
    role: lambdaRole.arn,
    runtime: LAMBDA_RUNTIME,
    handler: `./alsa/handlers/${handlerFileName}.handler`,
    timeout: LAMBDA_TIMEOUT_SECONDS,
    environment: {
      variables: {
        environment,
        tokenUrl,
        clientId,
        clientSecret: clientSecret,
        dynamoDBTableName: dynamoDbTable.name,
        dynamoDBAccessKeyId: botAccessKey.id,
        dynamoDBAccessKeySecret: botAccessKey.secret,
      },
    },
  }
}
