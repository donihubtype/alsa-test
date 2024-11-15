/* eslint-disable node/no-unpublished-import */
import * as pulumi from '@pulumi/pulumi'

const config = new pulumi.Config()

export const privateSubnetIds: pulumi.Input<string>[] =
  config.requireObject('privateSubnetIds')
export const securityGroupsIds: pulumi.Input<string>[] =
  config.requireObject('securityGroupsIds')
export const environment: string = config.require('environment')
export const tokenUrl: string = config.require('tokenUrl')
export const clientId: string = config.require('clientId')
export const clientSecret: pulumi.Output<string> =
  config.requireSecret('clientSecret')
