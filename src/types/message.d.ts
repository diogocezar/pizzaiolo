export interface SubElements {
  type: string
  text: string
  name: string
  unicode: string
  url: string
}

export interface Element {
  type: string
  elements: SubElements[]
}

export interface Block {
  type: string
  block_id: string
  elements: Element[]
}

export interface Icons {
  image_36: string
  image_48: string
  image_72: string
}

export interface BotProfile {
  id: string
  app_id: string
  name: string
  icons: Icons
  deleted: boolean
  updated: number
  team_id: string
}

export interface Message {
  bot_id: string
  type: string
  text: string
  user: string
  ts: string
  app_id: string
  blocks: Block[]
  team: string
  bot_profile: BotProfile
}

export interface ResponseMetadata {
  warnings: string[]
}

export interface MessageData {
  ok: boolean
  channel: string
  ts: string
  message: Message
  warning: string
  response_metadata: ResponseMetadata
  pullRequestUrl: string
}
