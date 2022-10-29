import { Injectable } from '@nestjs/common'
import { SlackApi } from 'src/config/api/slack.api'
import { SlackMessage } from 'src/common/interfaces/slack.message'
import { SlackReaction } from 'src/common/interfaces/slack/slack.reaction'

@Injectable()
export class SlackService {
  constructor(private apiSlackService: SlackApi) {}

  async sendMessage({
    text,
    timestamp,
    attachments,
  }: SlackMessage): Promise<any> {
    let payload: SlackMessage = {
      channel: process.env.SLACK_CHANNEL,
      text,
      ...(timestamp && { timestamp }),
    }
    if (attachments) {
      payload = {
        ...payload,
        attachments,
      }
    }
    const { data } = await this.apiSlackService.post(
      '/chat.postMessage',
      payload
    )
    return data
  }

  async addReaction({ name, timestamp }: SlackReaction): Promise<void> {
    if (!timestamp) return
    await this.apiSlackService.post('/reactions.add', {
      channel: process.env.SLACK_CHANNEL,
      name,
      timestamp,
    })
  }
}
