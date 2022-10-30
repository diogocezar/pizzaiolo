interface Fields {
  title: string
  value: string
  short: boolean
}

interface TextDetails {
  type: string
  text: string
  emoji: boolean
}

interface Actions {
  type: string
  text: string | TextDetails
  url?: string
  action_id?: string
  style?: string
  value?: string
}

interface Blocks {
  type: string
  elements: Actions[]
}

export interface Attachments {
  color?: string
  title?: string
  fields?: Array<Fields>
  actions?: Array<Actions>
  title_link?: string
  author_icon?: string
  author_name?: string
  footer?: string
  blocks?: Array<Blocks>
}

export interface SlackMessage {
  channel?: string
  text: string
  timestamp?: string
  attachments?: Array<Attachments>
}
