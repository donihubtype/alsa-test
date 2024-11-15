/* eslint-disable node/no-unpublished-import */
import { Route } from '@pulumi/awsx/classic/apigateway'

import { OptionsLambda, TokenLambda } from './lambda-definitions'

const routes: Route[] = [
  {
    path: '/token',
    method: 'GET',
    eventHandler: TokenLambda,
  },
  {
    path: '/token',
    method: 'OPTIONS',
    eventHandler: OptionsLambda,
  },
]

export default routes
