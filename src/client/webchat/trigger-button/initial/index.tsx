import * as React from 'react'

import { Language } from '../../../../shared/locales'
import { TriggerButton } from '../shared/button'
import { WebchatOptions } from '../shared/types'
import { getIntegrations } from './integrations'

export const InitialTriggerButton = (
  opt: WebchatOptions
): React.ReactElement => {
  const integrations = getIntegrations(opt)

  return (
    <TriggerButton
      integrations={integrations}
      language={opt.language as Language}
    />
  )
}
