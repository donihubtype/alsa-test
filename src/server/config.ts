import { Session } from '@botonic/core'
import {
  type BotonicPluginFlowBuilderOptions,
  FlowBuilderJSONVersion,
} from '@botonic/plugin-flow-builder'
import { ActionRequest } from '@botonic/react'

import { ClientConfig, clientConfig } from '../client/config'
import { context } from './domain/user-data'
import { trackEvent } from './tracking'
import { BotSession } from './types'
import { ENVIRONMENT, isLocal } from './utils/env-utils'

function getFlowBuilderConfig(
  env: ENVIRONMENT
): BotonicPluginFlowBuilderOptions {
  const FLOW_BUILDER_API_URL = 'https://api.ent0.flowbuilder.prod.hubtype.com'
  return {
    apiUrl: FLOW_BUILDER_API_URL,
    jsonVersion: isLocal(env)
      ? FlowBuilderJSONVersion.DRAFT
      : FlowBuilderJSONVersion.LATEST,
    getLocale: (session: Session) => context(session as BotSession).locale,
    getAccessToken: () => 'e9d945e7da267d8962364430968261', // Used locally,
    trackEvent: async (request: ActionRequest, eventName, args) => {
      await trackEvent(request, eventName, args)
    },
  }
}

interface Config extends ClientConfig {
  flowBuilder: BotonicPluginFlowBuilderOptions
}

export const CONFIG: Record<ENVIRONMENT, Config> = {
  [ENVIRONMENT.LOCAL]: {
    ...clientConfig[ENVIRONMENT.LOCAL],
    flowBuilder: getFlowBuilderConfig(ENVIRONMENT.LOCAL),
  },
  [ENVIRONMENT.STAGING]: {
    ...clientConfig[ENVIRONMENT.STAGING],
    flowBuilder: getFlowBuilderConfig(ENVIRONMENT.STAGING),
  },
  [ENVIRONMENT.PRODUCTION]: {
    ...clientConfig[ENVIRONMENT.PRODUCTION],
    flowBuilder: getFlowBuilderConfig(ENVIRONMENT.PRODUCTION),
  },
}
