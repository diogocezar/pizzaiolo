import { Injectable } from '@nestjs/common'
import { CommentPayload } from 'src/types/comment'
import { CommentResolvedPayload } from 'src/types/comment_resolved'
import { CommentUnresolvedPayload } from 'src/types/comment_unresolved'
import { PullRequestPayload } from 'src/types/pull_request'
import { ReviewPayload } from 'src/types/review'
import { PizzaioloService } from './pizzaiolo/pizzaiolo.service'
import { SlackService } from './slack/slack.service'

type Payload =
  | PullRequestPayload
  | CommentPayload
  | CommentResolvedPayload
  | CommentUnresolvedPayload
  | ReviewPayload

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
