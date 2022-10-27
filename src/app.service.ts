import { Injectable } from '@nestjs/common'
import { Payload } from 'src/types/payload'
import { PizzaioloService } from './pizzaiolo/pizzaiolo.service'
import { SlackService } from './slack/slack.service'

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
