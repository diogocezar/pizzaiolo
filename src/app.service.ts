import { Injectable } from '@nestjs/common'
import { Payload } from 'src/common/interfaces/github/payload'
import { PizzaioloService } from 'src/pizzaiolo/pizzaiolo.service'
import { SlackService } from 'src/slack/slack.service'
import { payloadValidator } from 'src/common/validators/payload.validator'

@Injectable()
export class AppService {
  constructor(private pizzaioloService: PizzaioloService) {}

  async sendMessage(payload: Payload): Promise<boolean> {
    if (!payloadValidator(payload)) return false
    this.pizzaioloService.executeActions(payload)
    return true
  }
}
