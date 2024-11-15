import { FlowBuilderActionProps } from '@botonic/plugin-flow-builder'
import { RequestContext } from '@botonic/react'

import { BotRequest } from '../types'
import { getRequestData } from '../utils/actions'
import { ExtendedFlowBuilderAction } from './default/extended-flow-builder'

export class TestAction extends ExtendedFlowBuilderAction {
  static contextType = RequestContext

  static async botonicInit(
    request: BotRequest
  ): Promise<FlowBuilderActionProps> {
    const { userData } = getRequestData(request)

    userData.test = 'test value'

    request.input.payload = JSON.stringify(userData)

    return super.botonicInit(request)
  }
}
