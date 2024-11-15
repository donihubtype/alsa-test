import { RequestContext, Text } from '@botonic/react'
import React from 'react'

import { BotRequest } from '../../types'
import { getRequestData } from '../../utils/actions'

interface BotInfoBackdoorActionProps {
  userData: string
}

export class BotInfoBackdoorAction extends React.Component<BotInfoBackdoorActionProps> {
  static contextType = RequestContext
  static botonicInit(request: BotRequest): BotInfoBackdoorActionProps {
    const { userData } = getRequestData(request)

    console.log({ request })

    return { userData: JSON.stringify(userData) }
  }

  render(): React.ReactNode {
    const commitHash = process.env['GIT_COMMITHASH']
    const branch = process.env['GIT_BRANCH']
    const packageVersion = process.env['PACKAGE_VERSION']
    const { userData } = this.props
    return (
      <>
        {commitHash && (
          <Text>
            Bot version: {packageVersion} | Github branch: {branch} | Commit:{' '}
            {commitHash}
          </Text>
        )}
        {userData && <Text>User data: {userData}</Text>}
      </>
    )
  }
}
