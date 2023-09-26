import { Injectable } from '@nestjs/common'
import { ParsedPayloadInteractivity } from 'src/common/interfaces/slack/interactivity.payload'
import { SlackMessage } from 'src/common/interfaces/slack/slack.message'
import { SlackReaction } from 'src/common/interfaces/slack/slack.reaction'
import { PizzaioloRepository } from 'src/pizzaiolo/pizzaiolo.repository'
import { SlackService } from 'src/slack/slack.service'

@Injectable()
export class InteractivityService {
  constructor(
    private slackService: SlackService,
    private pizzaioloRepository: PizzaioloRepository
  ) {}

  async executeActions(payload: ParsedPayloadInteractivity): Promise<void> {
    const { message } = payload

    const { message: messageInfo } = await this.slackService.getReaction({
      timestamp: message.ts,
    })

    const { text, attachments, reactions } = messageInfo

    const newMessage = await this.slackService.sendMessage({
      text,
      timestamp: undefined,
      attachments,
    } as SlackMessage)

    reactions?.forEach(async (reaction: SlackReaction) => {
      await this.slackService.addReaction({
        name: reaction.name,
        timestamp: newMessage.ts,
      })
    })

    const foundPullRequest =
      (await this.pizzaioloRepository.findPullRequest({
        timestamp: message.ts,
      })) || undefined

    await this.pizzaioloRepository.saveMessage({
      pull_request: foundPullRequest || undefined,
      timestamp: newMessage.ts,
      url: foundPullRequest?.url,
    })
  }
}
