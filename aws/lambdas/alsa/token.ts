import axios from 'axios'

import { getEnv } from '../shared/lambda'
import {
  DynamoDbTokenInfo,
  getTokenFromDynamoDb,
  storeTokenInfoToDynamoDb,
} from '../shared/token'
import { TokenResponse } from './types'

export class Token {
  async getToken() {
    const token = await getTokenFromDynamoDb()

    if (!token || this.isTokenExpired(token)) {
      const newToken = await this.requestToken()
      await storeTokenInfoToDynamoDb(newToken)
      return newToken.access_token
    }

    return token.accessToken
  }

  private isTokenExpired(token: DynamoDbTokenInfo): boolean {
    const now = new Date().getTime()
    const tokenExpirationTime = new Date(token.expiresIn).getTime()
    const timeMaginMs = 5 * 1000
    return now >= tokenExpirationTime - timeMaginMs
  }

  private async requestToken(): Promise<TokenResponse> {
    const tokenUrl = `${getEnv('tokenUrl')}/?application_name=Bot`

    const resp = await axios.post<TokenResponse>(
      tokenUrl,
      new URLSearchParams({
        client_id: getEnv('clientId'),
        grant_type: 'client_credentials',
        client_secret: getEnv('clientSecret'),
      })
    )

    const tokenResponse = resp.data

    await storeTokenInfoToDynamoDb(tokenResponse)

    return tokenResponse
  }
}
