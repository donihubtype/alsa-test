import styled from 'styled-components'

import { colors } from './constants-styles'

const CustomButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${colors.main};
  border-radius: 8px;
`

export const PrimaryButton = styled(CustomButton)`
  background: ${colors.main};
  color: ${colors.white};
  &:hover {
    background: ${colors.main};
    border: 1px solid ${colors.main};
  }

  &:disabled {
    background: ${colors.main};
    border: 1px solid ${colors.main};
  }
`

export const SecondaryButton = styled(CustomButton)`
  background: ${colors.white};
  color: ${colors.main};
  &:hover {
    background: ${colors.main[100]};
  }

  &:disabled {
    border: 1px solid ${colors.main[200]};
    color: ${colors.main[200]};
  }
`
