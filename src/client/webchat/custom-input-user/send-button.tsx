import { faPaperPlaneTop } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { UserInputButton } from './styles'

export const SendButton = () => {
  return (
    <UserInputButton>
      <FontAwesomeIcon icon={faPaperPlaneTop} />
    </UserInputButton>
  )
}
