import { getBotonicApp, WebchatApp, WebchatArgs } from '@botonic/react'

import { isLocal } from '../../../../server/utils/env-utils'
import { getLocalContents } from '../../../../shared/locales'
import { WebchatSvg } from '../../svgs/webchat-svg'
import {
  Integration,
  IntegrationOptions,
  WebchatOptions,
} from '../shared/types'

export function getIntegrations(options: WebchatOptions): IntegrationOptions[] {
  const contents = getLocalContents()

  const { elementId, webchatUrl, webchatConfig } = options
  return [
    {
      id: Integration.webchat,
      text: contents.integrationsMenu.webchat,
      image: WebchatSvg,
      onClick: () =>
        isLocal()
          ? getBotonicApp().open()
          : loadAndOpenWebchat(elementId, webchatUrl, webchatConfig),
    },
  ]
}

export function loadAndOpenWebchat(
  elementId: string,
  webchatUrl: string,
  webchatConfig: WebchatArgs
): void {
  webchatConfig = openChatOnLoad(webchatConfig)
  loadBotonic(elementId, webchatUrl, webchatConfig)
}

export function openChatOnLoad(webchatConfig: WebchatArgs): WebchatArgs {
  const snippetOnInit = webchatConfig.onInit
  webchatConfig.onInit = (app: WebchatApp, args: any) => {
    snippetOnInit && snippetOnInit(app, args)
    app.open()
  }
  return webchatConfig
}

export function loadBotonic(
  elementId: string,
  webchatUrl: string,
  webchatConfig: WebchatArgs
): void {
  const script = document.createElement('script')
  script.src = webchatUrl
  script.onload = () => executeBotonic(elementId, webchatConfig)
  document.body.appendChild(script)
}

export function executeBotonic(
  elementId: string,
  webchatConfig: WebchatArgs
): void {
  getBotonicApp().render(
    document.getElementById(elementId) as HTMLElement,
    webchatConfig
  )
}
