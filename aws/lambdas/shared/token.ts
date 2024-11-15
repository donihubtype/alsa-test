import BotonicPluginDynamoDB from '@hubtype/dynamoDB'

import { TokenResponse } from '../alsa/types'
import { getEnv } from './lambda'

export type DynamoDbTokenInfo2 = {
  chatId: string
  accessToken: string
  refreshToken: string
  expiresIn: string
  refreshExpiresIn: string
}
export type DynamoDbTokenInfo = {
  accessToken: string
  expiresIn: string
}

const ALSA_TOKEN_KEY = 'alsaToken'

export async function storeTokenInfoToDynamoDb(tokenInfo: TokenResponse) {
  const credentials = {
    id: getEnv('dynamoDBAccessKeyId'),
    secret: getEnv('dynamoDBAccessKeySecret'),
  }
  const tableName = getEnv('dynamoDBTableName')
  const dynamoDB = new BotonicPluginDynamoDB({
    accessKeyId: credentials.id as any,
    secretAccessKey: credentials.secret as any,
    tableName: tableName as any,
    region: 'eu-west-1',
  })
  await dynamoDB.write({
    key: ALSA_TOKEN_KEY,
    accessToken: tokenInfo.access_token,
    expiresIn: getDate(),
  })
}

export async function getTokenFromDynamoDb(): Promise<DynamoDbTokenInfo> {
  const credentials = {
    id: getEnv('dynamoDBAccessKeyId'),
    secret: getEnv('dynamoDBAccessKeySecret'),
  }
  const tableName = getEnv('dynamoDBTableName')
  const dynamoDB = new BotonicPluginDynamoDB({
    accessKeyId: credentials.id as any,
    secretAccessKey: credentials.secret as any,
    tableName: tableName as any,
    region: 'eu-west-1',
  })
  return await dynamoDB.read<DynamoDbTokenInfo>({
    key: ALSA_TOKEN_KEY,
  })
}

export function getDate() {
  const now = new Date().getTime()
  const millisecondsToExpire = now + 3600 * 1000
  return new Date(millisecondsToExpire).toISOString()
}
