import { Injectable } from '@nestjs/common'
import { ParsedPayloadInteractivity } from 'src/common/interfaces/slack/interactivity.payload'
import { SlackMessage } from 'src/common/interfaces/slack/slack.message'
import { SlackService } from 'src/slack/slack.service'

@Injectable()
export class InteractivityService {
  constructor(private slackService: SlackService) {}

  async executeActions(payload: ParsedPayloadInteractivity): Promise<void> {
    const { message } = payload
    const { attachments, text } = message

    await this.slackService.sendMessage({
      text,
      timestamp: null,
      attachments,
    } as SlackMessage)
  }
}
