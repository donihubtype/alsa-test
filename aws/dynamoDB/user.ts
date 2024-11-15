/* eslint-disable node/no-unpublished-import */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as aws from '@pulumi/aws'

import { environment } from '../pulumi-config'
import { dynamoDbTable } from './dynamodb'
import { tags } from './shared'

const botUser = new aws.iam.User(`alsa-${environment}`, {
  path: '/hubtype/bots/',
  tags,
})

export const botAccessKey = new aws.iam.AccessKey(
  `alsa-${environment}-accessKey`,
  { user: botUser.name }
)

const botPolicy = new aws.iam.UserPolicy('botPermissions', {
  user: botUser.name,
  policy: dynamoDbTable.arn.apply((tableArn: any) =>
    JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Action: ['dynamodb:*'],
          Effect: 'Allow',
          Resource: tableArn,
        },
      ],
    })
  ),
})
