/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable node/no-unpublished-import */
import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

import { environment } from '../pulumi-config'
import { tags } from './shared'

export const dynamoDbTable = new aws.dynamodb.Table(`alsa-${environment}`, {
  attributes: [
    {
      name: 'key',
      type: 'S',
    },
  ],
  hashKey: 'key',
  readCapacity: 1,
  tags,
  writeCapacity: 1,
})

const dynamodbTableReadTarget = new aws.appautoscaling.Target(
  'dynamodbTableReadTarget',
  {
    maxCapacity: 10,
    minCapacity: 1,
    resourceId: pulumi.interpolate`table/${dynamoDbTable.id}`,
    scalableDimension: 'dynamodb:table:ReadCapacityUnits',
    serviceNamespace: 'dynamodb',
  }
)
const dynamodbTableReadPolicy = new aws.appautoscaling.Policy(
  'dynamodbTableReadPolicy',
  {
    policyType: 'TargetTrackingScaling',
    resourceId: dynamodbTableReadTarget.resourceId,
    scalableDimension: dynamodbTableReadTarget.scalableDimension,
    serviceNamespace: dynamodbTableReadTarget.serviceNamespace,
    targetTrackingScalingPolicyConfiguration: {
      predefinedMetricSpecification: {
        predefinedMetricType: 'DynamoDBReadCapacityUtilization',
      },
      targetValue: 70,
    },
  }
)

const dynamodbTableWriteTarget = new aws.appautoscaling.Target(
  'dynamodbTableWriteTarget',
  {
    maxCapacity: 10,
    minCapacity: 1,
    resourceId: pulumi.interpolate`table/${dynamoDbTable.id}`,
    scalableDimension: 'dynamodb:table:WriteCapacityUnits',
    serviceNamespace: 'dynamodb',
  }
)

const dynamodbTableWritePolicy = new aws.appautoscaling.Policy(
  'dynamodbTableWritePolicy',
  {
    policyType: 'TargetTrackingScaling',
    resourceId: dynamodbTableWriteTarget.resourceId,
    scalableDimension: dynamodbTableWriteTarget.scalableDimension,
    serviceNamespace: dynamodbTableWriteTarget.serviceNamespace,
    targetTrackingScalingPolicyConfiguration: {
      predefinedMetricSpecification: {
        predefinedMetricType: 'DynamoDBWriteCapacityUtilization',
      },
      targetValue: 70,
    },
  }
)
