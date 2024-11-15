import { InternalServerError } from '../../shared/errors'
import { generateResponse, getErrorResponse } from '../../shared/lambda'
import { Token } from '../token'

export const handler = async function () {
  try {
    const token = new Token()
    const tokenResponse = await token.getToken()
    return generateResponse(200, { access_token: tokenResponse })
  } catch (error: any) {
    console.error('Error getting token... ', error)

    return getErrorResponse(
      'Error getting token',
      new InternalServerError(error)
    )
  }
}
