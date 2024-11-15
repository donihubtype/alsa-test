import { faFaceSmile } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { UserInputButton } from './styles'

export const EmojiPickerButton = () => {
  return (
    <UserInputButton>
      <FontAwesomeIcon icon={faFaceSmile} />
    </UserInputButton>
  )
}
