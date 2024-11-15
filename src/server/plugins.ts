import * as core from '@botonic/core'
import * as HubtypeAnalyticsPlugin from '@botonic/plugin-hubtype-analytics'
import { InactivityOptions } from '@hubtype/plugin-inactivity'

import { CONFIG } from './config'
import {
  INACTIVE_CLIENT_CONTACT_REASON,
  REOPEN_CASE_PAYLOAD,
  SHOW_NOTHING_PAYLOAD,
  WELCOME_BACK_CONTENT_ID,
} from './constants'
import * as PreHandoffPlugin from './plugins/pre-handoff'
import * as ResetUserDataPlugin from './plugins/reset-user-data'
import * as SetContactReasonPlugin from './plugins/set-contact-reason'
import * as UpdateSessionPlugin from './plugins/update-session'
import { BotRequest } from './types'
import { getRequestData, restartBot } from './utils/actions'
import { getUUIDByContentID } from './utils/contents'
import { getEnvironment } from './utils/env-utils'

const config = CONFIG[getEnvironment()]

export const plugins: core.PluginConfig<any>[] = [
  {
    id: 'flowBuilder',
    resolve: require('@botonic/plugin-flow-builder'),
    options: config.flowBuilder,
  },
  {
    id: 'hubtypeAnalytics',
    resolve: require('@botonic/plugin-hubtype-analytics'),
    options: HubtypeAnalyticsPlugin,
  },
  {
    id: 'setContactReason',
    resolve: SetContactReasonPlugin,
  },
  {
    id: 'preHandoff',
    resolve: PreHandoffPlugin,
  },
  {
    id: 'updateSessionPlugin',
    resolve: UpdateSessionPlugin,
  },
  { id: 'resetUserData', resolve: ResetUserDataPlugin },
  {
    id: 'reopenCaseInactiveClientPlugin',
    resolve: require('@hubtype/plugin-inactivity'),
    options: {
      getDateToCheck: (request: BotRequest) => {
        const { userData } = getRequestData(request)
        if (!userData.lastMessageSentReopenCase) {
          userData.lastMessageSentReopenCase = new Date()
        }
        return userData.lastMessageSentReopenCase
      },
      maxInactiveHours: config.reopenCaseMaxInactiveHours,
      inactivityAction: (request: BotRequest) => {
        const { userData } = getRequestData(request)
        if (userData.contactReason === INACTIVE_CLIENT_CONTACT_REASON) {
          request.input.payload = getUUIDByContentID(
            request,
            WELCOME_BACK_CONTENT_ID
          )
        }
        userData.lastMessageSentReopenCase = new Date()
      },
      defaultAction: (request: BotRequest) => {
        const { userData } = getRequestData(request)
        if (userData.contactReason === INACTIVE_CLIENT_CONTACT_REASON) {
          request.input.payload = REOPEN_CASE_PAYLOAD
        }
        userData.lastMessageSentReopenCase = new Date()
      },
    } as InactivityOptions,
  },
  {
    id: 'inactivityPlugin',
    resolve: require('@hubtype/plugin-inactivity'),
    options: {
      getDateToCheck: (request: BotRequest) => {
        const { userData } = getRequestData(request)
        if (!userData.customLastMessageSentDate) {
          userData.customLastMessageSentDate = new Date()
        }
        return userData.customLastMessageSentDate
      },
      maxInactiveHours: config.maxInactiveHours,
      inactivityAction: (request: BotRequest) => {
        const { userData, payload } = getRequestData(request)
        restartBot(request)
        if (!payload) {
          request.input.payload = getUUIDByContentID(
            request,
            WELCOME_BACK_CONTENT_ID
          )
        }
        if (payload !== SHOW_NOTHING_PAYLOAD) {
          userData.customLastMessageSentDate = new Date()
        }
      },
      defaultAction: (request: BotRequest) => {
        const { userData, payload } = getRequestData(request)
        if (payload !== SHOW_NOTHING_PAYLOAD) {
          userData.customLastMessageSentDate = new Date()
        }
      },
    } as InactivityOptions,
  },
]
