import * as React from 'react'

import { TriggerButton } from '../shared/button'
import { getIntegrations } from './integrations'

export const DefaultTriggerButton = (): React.ReactElement => {
  const integrations = getIntegrations()

  return <TriggerButton integrations={integrations} />
}
