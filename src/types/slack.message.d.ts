export interface SlackMessage {
  channel: string
  text: string
  timestamp?: string
  attachments?: Array<any>
}
