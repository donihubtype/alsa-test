import { ReactElement } from 'react'

import { ExampleWebview } from '../client/webviews/example'

export const START_CONVERSATION_PAYLOAD = 'start_conversation'

export const SUBMITED_WEBVIEW_PAYLOAD = 'ADD_SUBMITED_WEBVIEW_PAYLOAD'

export const UPDATE_SESSION_PAYLOAD = 'update-session'

export const UPDATE_SESSION_PAYLOAD_REGEX = new RegExp(
  `^${UPDATE_SESSION_PAYLOAD}.*`
)

export const CONTENT_ID_PAYLOAD = 'content-id'

export const CONTENT_ID_PAYLOAD_REGEX = new RegExp(`^${CONTENT_ID_PAYLOAD}.*`)

export const BACKDOOR_COMMANDS = {
  botInfo: '###bot_info',
  reset: '###reset',
  setPayload: '###payload=',
}

export const SET_PAYLOAD_BACKDOOR_REGEX = new RegExp(
  `^${BACKDOOR_COMMANDS.setPayload}.*`
)

export const EXAMPLE_WEBVIEW_URL = 'https://www.example_webview.com'

export const WEBVIEW_BY_URL: Record<string, () => ReactElement> = {
  [EXAMPLE_WEBVIEW_URL]: ExampleWebview,
}

export const TEST_ACTION_PAYLOAD = 'test'

export const TEST_ACTION_PAYLOAD_REGEX = new RegExp(`^${TEST_ACTION_PAYLOAD}.*`)
