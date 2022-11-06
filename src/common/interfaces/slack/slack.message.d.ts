interface TextDetails {
  type: string
  text: string | TextDetails
  emoji?: boolean
  url?: string
}
interface Blocks {
  type: string
  text?: TextDetails
  fields?: Array[{ type: string; text: string }]
  elements?: Array[{ type: string; text: string }]
  accessory?: TextDetails & { value?: string; action_id?: string }
}

export interface Attachments {
  color?: string
  blocks: Array<Blocks>
}

export interface SlackMessage {
  channel?: string
  text?: string
  timestamp?: string
  attachments?: Array<Attachments>
}
