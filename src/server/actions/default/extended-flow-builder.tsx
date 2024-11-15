import {
  FlowBuilderActionProps,
  FlowBuilderMultichannelAction,
} from '@botonic/plugin-flow-builder'
import { RequestContext } from '@botonic/react'
import React from 'react'

import { BotRequest } from '../../types'
import { renderFlowBuilderContents } from '../../utils/flow-builder'

export class ExtendedFlowBuilderAction extends React.Component<FlowBuilderActionProps> {
  static contextType = RequestContext

  static async botonicInit(
    request: BotRequest,
    contentId?: string
  ): Promise<FlowBuilderActionProps> {
    return FlowBuilderMultichannelAction.botonicInit(request, contentId)
  }

  render(): React.ReactNode {
    return renderFlowBuilderContents(
      this.props.contents,
      this.context as BotRequest
    )
  }
}
