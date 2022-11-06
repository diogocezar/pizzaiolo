import { Attachments } from 'src/common/interfaces/slack/slack.message'

export interface PayloadInteractivity {
  payload: string
}

export interface ParsedPayloadInteractivity {
  type: string
  user: {
    id: string
    username: string
    name: string
    team_id: string
  }
  api_app_id: string
  token: string
  container: {
    type: string
    message_ts: string
    channel_id: string
    is_ephemeral: boolean
    is_app_unfurl: boolean
  }
  trigger_id: string
  team: {
    id: string
    domain: string
  }
  enterprise: null
  is_enterprise_install: boolean
  channel: {
    id: string
    name: string
  }
  message: {
    bot_id: string
    type: string
    text: string
    user: string
    ts: string
    app_id: string
    blocks: []
    team: string
    attachments: Array<Attachments>
  }
  state: {
    values: unknown
  }
  response_url: string
  actions: [
    {
      action_id: string
      block_id: string
      text: []
      value: string
      type: string
      action_ts: string
    }
  ]
}
