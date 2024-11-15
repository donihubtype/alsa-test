import { Plugin, PluginPreRequest } from '@botonic/core'

import { BotRequest } from '../types'
import { getRequestData } from '../utils/actions'
import { isProduction } from '../utils/env-utils'

export default class ResetFirstInteraction implements Plugin {
  pre(request: PluginPreRequest): void {
    const botRequest = request as unknown as BotRequest
    const { userData, input } = getRequestData(botRequest)
    if (!isProduction() && input && /^###reset/.test(input)) {
      request.session.is_first_interaction = true
      userData.userRetries = 0
    }
  }
}
