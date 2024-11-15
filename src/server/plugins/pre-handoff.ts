import { Plugin, PluginPostRequest } from '@botonic/core'

export default class PreHandoffPlugin implements Plugin {
  post(request: PluginPostRequest): void {
    const _botonic_action = request.session._botonic_action

    if (_botonic_action) {
      const create_case = JSON.parse(_botonic_action.split('create_case:')[1])

      const botonicActionJson = { ...create_case }

      request.session._botonic_action = `create_case:${JSON.stringify(
        botonicActionJson
      )}`
    }
  }
}
