import {
  FlowBuilderActionProps,
  type PayloadParamsBase,
} from '@botonic/plugin-flow-builder'

import { BotRequest } from '../../types'
import { getPayloadData, getRequestData } from '../../utils/actions'
import { ExtendedFlowBuilderAction } from './extended-flow-builder'

type SimpleType = string | number | boolean | undefined

//Action intended to be used to update session variables values (normally used in Flow Builder)
export class UpdateSessionAction extends ExtendedFlowBuilderAction {
  static async botonicInit(
    request: BotRequest
  ): Promise<FlowBuilderActionProps> {
    const { payload } = getRequestData(request)
    const { followUpContentID, ...sessionUpdates } =
      getPayloadData<PayloadParamsBase>(payload)

    updateSession(request, sessionUpdates)

    return followUpContentID
      ? super.botonicInit(request, followUpContentID)
      : { contents: [] }
  }
}

function updateSession(
  request: BotRequest,
  sessionUpdates: Record<string, SimpleType>
): void {
  const sessionVariables = Object.entries(sessionUpdates)
  sessionVariables.forEach(([key, value]) => {
    const session = request.session as any
    if (session[key]) {
      session[key] = getValue(value)
      return
    }
    request.session.user.extra_data[key] = getValue(value)
  })
}

const keywords: Record<string, any> = { undefined: undefined }

function getValue(value: SimpleType): SimpleType {
  const keywordFound = Object.keys(keywords).find(keyword => keyword === value)
  return keywordFound ? keywords[keywordFound] : value
}
