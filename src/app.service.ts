import { Injectable } from '@nestjs/common'
import { Payload } from 'src/common/interfaces/github/payload'
import { PizzaioloService } from 'src/pizzaiolo/pizzaiolo.service'
import { payloadValidator } from 'src/common/validators/payload.validator'
import { PayloadInteractivity } from 'src/common/interfaces/slack/interactivity.payload'
import { interactivityValidator } from 'src/common/validators/interactivity.validator'
import { InteractivityService } from 'src/pizzaiolo/interactivity.service'

@Injectable()
export class AppService {
  constructor(
    private pizzaioloService: PizzaioloService,
    private interactivityService: InteractivityService
  ) {}

  async sendMessage(payload: Payload): Promise<boolean> {
    if (!payloadValidator(payload)) return false

    this.pizzaioloService.executeActions(payload)

    return true
  }

  async interactivity(payload: PayloadInteractivity): Promise<boolean> {
    const parsedPayload = interactivityValidator(payload)

    if (!parsedPayload) return

    this.interactivityService.executeActions(parsedPayload)

    return true
  }
}
