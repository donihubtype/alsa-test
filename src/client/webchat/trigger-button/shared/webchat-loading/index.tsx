import React from 'react'

import { WebchatSkeleton, WebchatSkeletonHeader } from './styles'

export const WebchatLoading = (): React.ReactElement => {
  return (
    <WebchatSkeleton>
      <WebchatSkeletonHeader />
    </WebchatSkeleton>
  )
}
