import { faPaperclip } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { UserInputButton } from './styles'

export const AttachmentsButton = () => {
  return (
    <UserInputButton>
      <FontAwesomeIcon icon={faPaperclip} />
    </UserInputButton>
  )
}
