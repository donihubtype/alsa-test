import * as React from 'react'

import { getLocalContents } from '../../../../shared/locales'
import { CommentSvg } from '../../svgs/comment-svg'
import TriggerButtonState from '../../utils/custom-trigger-state'
import { IntegrationsMenu } from '../shared/integrations-menu'
import {
  AnimatedText,
  Container,
  ContainerTriggerButton,
  TriggerButtonImageContainer,
} from '../shared/styles'
import { Integration, TriggerButtonOptions } from '../shared/types'
import { WebchatLoading } from './webchat-loading'

const baseId = 'botonic-trigger'

export const MultilineText = ({ text }: { text: string }) => {
  if (!text.includes('\n')) {
    return <AnimatedText>{text}</AnimatedText>
  }

  const lines = text.split('\n').map(line => line.trim())

  return (
    <div>
      {lines.map(line => (
        <AnimatedText>{line}</AnimatedText>
      ))}
    </div>
  )
}

export const TriggerButton = ({
  integrations,
  language,
}: TriggerButtonOptions): React.ReactElement => {
  const contents = getLocalContents(language)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  let firstAnimationTimeout: NodeJS.Timeout
  const [showIntegrationMenu, setShowIntegrationMenu] = React.useState(false)
  const [showWebchatLoading, setShowWebchatLoading] = React.useState(false)

  const addHover = () => {
    if (!TriggerButtonState.firstAnimationShown) {
      TriggerButtonState.setFirstAnimationShown(true)
      clearTimeout(firstAnimationTimeout)
    }

    if (!showIntegrationMenu) {
      triggerRef.current?.classList.remove('no-hover')
      triggerRef.current?.classList.add('hover')
    }
  }
  const removeHover = () => {
    triggerRef.current?.classList.remove('hover')
    triggerRef.current?.classList.add('no-hover')
  }

  React.useEffect(() => {
    firstAnimationTimeout = setTimeout(() => {
      if (!TriggerButtonState.firstAnimationShown) {
        triggerRef.current?.dispatchEvent(
          new Event('mouseover', { bubbles: true })
        )
        TriggerButtonState.setFirstAnimationShown(true)
        setTimeout(() => {
          removeHover()
        }, 8000)
      }
    }, 6000)
  }, [])

  React.useEffect(() => {
    if (showIntegrationMenu) {
      removeHover()
    }
  }, [showIntegrationMenu])

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    removeHover()
    if (integrations.length > 1) {
      event.stopPropagation()
      setShowIntegrationMenu(!showIntegrationMenu)
      return
    }
    integrations[0].onClick()
  }

  React.useEffect(() => {
    const webchatIntegration = integrations.find(
      integration => integration.id === Integration.webchat
    )
    if (webchatIntegration) {
      const onClick = webchatIntegration.onClick
      webchatIntegration.onClick = () => {
        onClick()
        setShowWebchatLoading(true)
      }
    }
  }, [])

  if (showWebchatLoading) {
    return <WebchatLoading />
  }

  return (
    <Container>
      {showIntegrationMenu && integrations.length > 1 ? (
        <IntegrationsMenu
          baseId={baseId}
          integrations={integrations}
          show={showIntegrationMenu}
          onClickOutside={() => setShowIntegrationMenu(!showIntegrationMenu)}
        />
      ) : null}

      <ContainerTriggerButton
        id={`${baseId}-button`}
        onMouseOver={addHover}
        onMouseLeave={removeHover}
        className='no-hover'
        ref={triggerRef}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          handleClick(event)
        }
        text={contents.triggerButtonText}
      >
        <TriggerButtonImageContainer>
          <CommentSvg />
        </TriggerButtonImageContainer>
        <MultilineText text={contents.triggerButtonText} />
      </ContainerTriggerButton>
    </Container>
  )
}
