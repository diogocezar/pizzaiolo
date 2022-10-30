interface Fields {
  title: string
  value: string
  short: boolean
}
interface Actions {
  type: string
  text: string
  url?: string
  action_id?: string
  value?: string
}

export interface Attachments {
  color?: string
  title: string
  fields?: Array<Fields>
  actions?: Array<Actions>
  title_link?: string
  author_icon?: string
  author_name?: string
  footer?: string
}

export interface SlackMessage {
  channel?: string
  text: string
  timestamp?: string
  attachments?: Array<Attachments>
}
