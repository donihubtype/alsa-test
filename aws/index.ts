/* eslint-disable node/no-unpublished-import */
import * as awsx from '@pulumi/awsx'

import { dynamoDbTable } from './dynamoDB/dynamodb'
import { botAccessKey } from './dynamoDB/user'
import { environment } from './pulumi-config'
import routes from './routes'

const apiGateway = new awsx.classic.apigateway.API(`api-${environment}-alsa`, {
  stageName: 'v1',
  stageArgs: {
    tags: {
      Maintainer: 'team.services',
      Scope: 'Bots',
      Customer: 'Alsa',
      Component: 'API',
    },
  },
  routes: routes,
})

export const apiUrl = apiGateway.url
export const credentials = { id: botAccessKey.id, secret: botAccessKey.secret }
export const tableName = dynamoDbTable.name
