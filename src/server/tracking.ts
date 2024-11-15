import BotonicPluginHubtypeAnalytics, {
  EventAction,
  HtEventProps,
} from '@botonic/plugin-hubtype-analytics'
import { ActionRequest } from '@botonic/react'

import { isBrowser, isLocal } from './utils/env-utils'

export async function trackEvent(
  request: ActionRequest,
  eventName: string,
  extraInfo?: Record<string, any>
) {
  if (isLocal()) {
    console.log('TRACKING:', eventName, extraInfo) //Keep it for debugging
    return
  }
  const htEventProps = extraInfo
    ? {
        action: eventName as EventAction,
        ...extraInfo,
      }
    : { action: eventName as EventAction }
  await trackHtEvent(request, htEventProps as HtEventProps)
}

export async function trackHtEvent(
  request: ActionRequest,
  htEventProps: HtEventProps
) {
  const printLogs = !isBrowser()
  const hubtypeAnalyticsPlugin = isBrowser()
    ? new BotonicPluginHubtypeAnalytics()
    : (request.plugins.hubtypeAnalytics as BotonicPluginHubtypeAnalytics)
  try {
    const response = await hubtypeAnalyticsPlugin.trackEvent(
      request,
      htEventProps
    )
    printLogs && console.log('TrackHtEvent Success', { data: response.data })
  } catch (error: any) {
    printLogs &&
      console.log(
        'TrackHtEvent Error',
        { error },
        JSON.stringify(error.response?.data),
        {
          errorData: error.response?.data,
        }
      )
  }
  return
}
