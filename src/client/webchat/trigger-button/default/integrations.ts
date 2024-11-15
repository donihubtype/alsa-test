import { getBotonicApp } from '@botonic/react'

import { getLocalContents } from '../../../../shared/locales'
import { WebchatSvg } from '../../svgs/webchat-svg'
import { Integration, IntegrationOptions } from '../shared/types'

export function getIntegrations(): IntegrationOptions[] {
  const contents = getLocalContents()
  return [
    {
      id: Integration.webchat,
      text: contents.integrationsMenu.webchat,
      image: WebchatSvg,
      onClick: () => getBotonicApp().open(),
    },
  ]
}
