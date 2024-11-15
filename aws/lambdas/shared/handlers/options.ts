import { httpStatusCodes } from '../errors'
import { headers } from '../lambda'

export const handler = async function () {
  return { statusCode: httpStatusCodes.OK, headers, body: '' }
}
