import { FlowButton, FlowContent, FlowText } from '@botonic/plugin-flow-builder'
import { Button, Multichannel, Text } from '@botonic/react'
import React from 'react'

import { WEBVIEW_BY_URL } from '../constants'
import { BotRequest } from '../types'

export function renderFlowBuilderContents(
  contents: FlowContent[],
  request: BotRequest
): React.ReactNode {
  return (
    <Multichannel text={{ buttonsAsText: false }}>
      {contents.map(content => {
        if (content instanceof FlowText) {
          if (hasWebviewButtons(content)) {
            reduceSessionSizeBeforeWebview(request)
            return renderSpecialContent(content)
          }
        }
        return content.toBotonic(content.id, request)
      })}
    </Multichannel>
  )
}

function reduceSessionSizeBeforeWebview(request: BotRequest): void {
  delete request.session._hubtype_case_contact_reasons
}

function hasWebviewButtons(content: FlowText): boolean {
  return content.buttons.some(b => isWebviewButton(b))
}

function renderSpecialContent(content: FlowText): JSX.Element {
  return (
    <Text>
      {content.text}
      {renderButtons(content)}
    </Text>
  )
}

function renderButtons(content: FlowText): React.ReactNode {
  return content.buttons.map((button: FlowButton, i: number) => {
    if (isWebviewButton(button)) {
      return (
        <Button webview={WEBVIEW_BY_URL[button.url as string]}>
          {button.text}
        </Button>
      )
    }
    return button.renderButton(i, content.buttonStyle)
  })
}

function isWebviewButton(button: FlowButton): boolean {
  return !!button.url && Object.keys(WEBVIEW_BY_URL).includes(button.url)
}
