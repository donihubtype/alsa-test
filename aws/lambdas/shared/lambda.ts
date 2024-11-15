import { httpStatusCodes } from './errors'

export const headers = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, PATCH, POST, OPTIONS',
}

type ErrorInfo = {
  statusCode: number
  message: string
  exception?: string
  data?: any
}

type MiddlewareResponse = {
  statusCode: number
  headers: Record<string, string>
  body: string
}

export const generateResponse = (
  statusCode: number,
  body: any
): MiddlewareResponse => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
})

export function getErrorInfo(error: any): ErrorInfo {
  if (error.code === 'ECONNABORTED') {
    return { statusCode: httpStatusCodes.TIMEOUT, message: 'Request Timeout' }
  }
  const errorCode = error.status ?? error.response?.status
  const errorMessage =
    error.msg ??
    error.response?.data?.msg ??
    error.response?.data?.moreInformation ??
    error.response?.statusText ??
    error.toString()
  const exception = error.response?.data?.exception ?? error.exception
  const data = error.response?.data

  return {
    statusCode: errorCode ?? httpStatusCodes.INTERNAL_SERVER_ERROR,
    message: errorMessage,
    data,
    exception,
  }
}

export function getErrorResponse(
  callName: string,
  error: any
): MiddlewareResponse {
  const { statusCode, message, exception } = getErrorInfo(error)

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      error: {
        statusCode,
        endpoint: callName,
        message,
        exception,
      },
    }),
  }
}

export function getJSONRequestBody<T>(event: any): T {
  const body = Buffer.from(event.body, 'base64')
  return JSON.parse(body.toString('utf8'))
}

export function getEnv(name: string): string {
  const val = process.env[name]
  if (val === undefined || val === null) {
    throw 'missing env var for ' + name
  }
  return val
}

export const isDev = () => getEnv('environment') === 'dev'
