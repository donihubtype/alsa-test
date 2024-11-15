import { createWebviewContentsContext } from '@botonic/plugin-flow-builder'

export const TRANSCRIPT_HEADER_IMAGE_URL = ''

export const FLOW_BUILDER_API_URL =
  'https://api.ent0.flowbuilder.prod.hubtype.com'

export const WEBVIEW_ID = ''

export const MAP_CONTENTS = {}

export const MyWebviewContentsContext =
  createWebviewContentsContext<typeof MAP_CONTENTS>()
