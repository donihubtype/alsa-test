import { Plugin, PluginPreRequest } from '@botonic/core'

import {
  FALLBACK_FIRST_TRY_MESSAGE_ID,
  FALLBACK_MAX_RETRIES_MESSAGE_ID,
  MAX_RETRIES,
} from '../constants'
import { BotRequest } from '../types'
import { getRequestData } from '../utils/actions'

export default class Retries implements Plugin {
  pre(request: PluginPreRequest): void {
    const botRequest = request as unknown as BotRequest
    const { userData, input, payload } = getRequestData(botRequest)

    if (!input || payload) {
      return
    }

    initRetries(botRequest)

    if (isFirstTry(botRequest)) {
      request.input.payload = FALLBACK_FIRST_TRY_MESSAGE_ID
    }

    addUserRetry(botRequest)

    if (hasReachedMaximumOfRetries(botRequest)) {
      userData.userRetries = 0
      request.input.payload = FALLBACK_MAX_RETRIES_MESSAGE_ID
    }
  }
}

function initRetries(request: BotRequest): void {
  const { userData } = getRequestData(request)
  if (!userData.userRetries) {
    userData.userRetries = 0
  }
}

function isFirstTry(request: BotRequest): boolean {
  const { userData } = getRequestData(request)
  return userData.userRetries === 0
}

function addUserRetry(request: BotRequest): void {
  const { userData } = getRequestData(request)
  userData.userRetries = (userData.userRetries as number) + 1
}

function hasReachedMaximumOfRetries(request: BotRequest): boolean {
  const { userData } = getRequestData(request)
  return userData.userRetries === MAX_RETRIES
}
