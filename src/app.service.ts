import { CommentPayload } from 'src/types/comment'
import { Injectable } from '@nestjs/common'
import { PullRequestPayload } from 'src/types/pull_request'
import { ReviewPayload } from 'src/types/review'
import { PizzaioloService } from './pizzaiolo/pizzaiolo.service'
import { SlackService } from './slack/slack.service'

type Payload = PullRequestPayload | CommentPayload | ReviewPayload

@Injectable()
export class AppService {
  constructor(
    private pizzaioloService: PizzaioloService,
    private slackService: SlackService
  ) {}

  async sendMessage(payload: Payload): Promise<boolean> {
    if (!this.pizzaioloService.validatePayload(payload)) return false

    this.pizzaioloService.executeActions({
      payload,
      slackService: this.slackService,
    })

    return true
  }
}
