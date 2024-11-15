import React from 'react'

import { useOnClickOutside } from '../../hooks/use-on-click-outside'
import { ContainerIntegrationMenu, IntegrationButton } from './styles'
import { IntegrationMenuProps } from './types'

export const IntegrationsMenu = ({
  baseId,
  integrations,
  onClickOutside,
  show,
}: IntegrationMenuProps) => {
  const menuRef = React.useRef<HTMLDivElement>(null)

  useOnClickOutside(show, baseId, () => onClickOutside(), menuRef)

  return (
    <ContainerIntegrationMenu ref={menuRef} id={`${baseId}-menu`}>
      {integrations.map((integration, index) => {
        const Image = integration.image
        return (
          <IntegrationButton
            key={`integration-${index}`}
            id={`${baseId}-menu-button${index}`}
            isFirstElement={index === 0}
            isLastElement={index === integrations.length - 1}
            onClick={event => {
              event.stopPropagation()
              integration.onClick()
            }}
          >
            {integration.text}
            <Image />
          </IntegrationButton>
        )
      })}
    </ContainerIntegrationMenu>
  )
}
