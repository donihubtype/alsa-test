import { WebchatArgs } from '@botonic/react'

import { Language } from '../../../../shared/locales'

export enum Integration {
  webchat = 'webchat',
  whatsapp = 'whatsapp',
}
export interface IntegrationOptions {
  id: Integration
  text: string
  image: () => React.JSX.Element
  onClick: () => void
}

export interface IntegrationMenuProps {
  baseId: string
  integrations: IntegrationOptions[]
  onClickOutside: () => void
  show: boolean
}

export interface WebchatOptions {
  elementId: string
  webchatUrl: string
  webchatConfig: WebchatArgs
  language: string
}

export interface TriggerButtonOptions {
  integrations: IntegrationOptions[]
  language?: Language
}
