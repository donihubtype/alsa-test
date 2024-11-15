/* eslint-disable node/no-unpublished-import */
import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

import { privateSubnetIds, securityGroupsIds } from '../pulumi-config'

export const LAMBDA_RUNTIME = aws.lambda.Runtime.NodeJS20dX
export const LAMBDA_TIMEOUT_SECONDS = 30

export const lambdaRole = new aws.iam.Role('AlsaLambdaRole', {
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Effect: 'Allow',
        Sid: '',
        Principal: {
          Service: 'lambda.amazonaws.com',
        },
      },
    ],
  }),
  managedPolicyArns: [
    aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
    aws.iam.ManagedPolicy.AWSLambdaVPCAccessExecutionRole,
  ],
})

export const OptionsLambda = new aws.lambda.Function('options', {
  code: new pulumi.asset.AssetArchive({
    shared: new pulumi.asset.FileArchive('./dist/shared'),
  }),
  vpcConfig: {
    securityGroupIds: securityGroupsIds,
    subnetIds: privateSubnetIds,
  },
  role: lambdaRole.arn,
  runtime: LAMBDA_RUNTIME,
  handler: `./shared/handlers/options.handler`,
})
