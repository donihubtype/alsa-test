import { Route } from '@botonic/core'

import { BotInfoBackdoorAction } from './actions/backdoors/bot-info'
import { ResetBackdoorAction } from './actions/backdoors/reset'
import { ContentIdAction } from './actions/default/content-id'
import { ExtendedFlowBuilderAction } from './actions/default/extended-flow-builder'
import { StartConversationAction } from './actions/default/start-conversation'
import { UpdateSessionAction } from './actions/default/update-session'
import {
  BACKDOOR_COMMANDS,
  CONTENT_ID_PAYLOAD_REGEX,
  SET_PAYLOAD_BACKDOOR_REGEX,
  START_CONVERSATION_PAYLOAD,
  UPDATE_SESSION_PAYLOAD_REGEX,
} from './constants'
import { BotRequest } from './types'
import { isProduction } from './utils/env-utils'

export function routes(request: BotRequest): Route[] {
  console.log('[User Input]', request.input)

  if (!isProduction()) {
    checkSetPayloadBackdoor(request)
  }

  const routes: Route[] = [
    {
      path: 'bot-info-backdoor',
      text: BACKDOOR_COMMANDS.botInfo,
      action: BotInfoBackdoorAction,
    },
    {
      path: 'content-id',
      payload: CONTENT_ID_PAYLOAD_REGEX,
      action: ContentIdAction,
    },
    {
      path: 'update-session',
      payload: UPDATE_SESSION_PAYLOAD_REGEX,
      action: UpdateSessionAction,
    },
    {
      path: 'start-conversation',
      payload: START_CONVERSATION_PAYLOAD,
      action: StartConversationAction,
    },
    {
      path: 'flow-builder-action',
      text: /.*/,
      payload: /.*/,
      action: ExtendedFlowBuilderAction,
    },
  ]

  if (!isProduction()) {
    routes.unshift({
      path: 'reset-backdoor',
      text: BACKDOOR_COMMANDS.reset,
      action: ResetBackdoorAction,
    })
  }

  return routes
}

function checkSetPayloadBackdoor(request: BotRequest): void {
  if (
    request.input.data &&
    SET_PAYLOAD_BACKDOOR_REGEX.test(request.input.data)
  ) {
    const payload = request.input.data.split('=')[1]
    request.input.payload = payload
  }
}
