import { Injectable } from '@nestjs/common';
import { PizzaioloService } from './pizzaiolo/pizzaiolo.service';
import { SlackService } from './slack/slack.service';

@Injectable()
export class AppService {
  constructor(
    private pizzaioloService: PizzaioloService,
    private slackService: SlackService,
  ) {}
  sendMessage(payload): boolean {
    if (!this.pizzaioloService.validatePayload(payload)) return false;
    const message = this.pizzaioloService.getMessage(payload);
    this.slackService.sendMessage(message);
    return true;
  }
}
