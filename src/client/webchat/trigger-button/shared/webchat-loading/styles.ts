import styled from 'styled-components'

import { colors } from '../../../constants-styles'

export const WebchatSkeleton = styled.div`
  bottom: 20px;
  right: 20px;
  z-index: 10000;
  position: fixed;
  height: 620px;
  width: 390px;
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 12px;
  background-color: ${colors.white};
  @media (max-width: 650px) {
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
`

export const WebchatSkeletonHeader = styled.div`
  @keyframes flickerAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-o-keyframes flickerAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-moz-keyframes flickerAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes flickerAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  border-radius: 24px 24px 0px 0px;
  height: 70px;
  width: 100%;
  background-color: ${colors.main[500]};
  -webkit-animation: flickerAnimation 2s infinite;
  -moz-animation: flickerAnimation 2s infinite;
  -o-animation: flickerAnimation 2s infinite;
  animation: flickerAnimation 2s infinite;
  @media (max-width: 650px) {
    border-radius: 0;
  }
`
