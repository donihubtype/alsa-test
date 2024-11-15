import { customMessage } from '@botonic/react'
import React from 'react'
import styled from 'styled-components'

import { getLocalContents } from '../../../shared/locales'
import { colors } from '../constants-styles'

const Text = styled.p`
  font-size: 10px;
  line-height: 15px;
  color: ${colors.neutral[900]};
  position: sticky;
  text-align: center;
  top: 0;
`

const CustomInitialMessage = () => {
  return <Text>{getLocalContents().initialMessage}</Text>
}
export default customMessage({
  name: 'initial-message',
  component: CustomInitialMessage,
  defaultProps: {
    blob: false,
    enabletimestamps: false,
  },
})
