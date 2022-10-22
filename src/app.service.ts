import { Injectable } from '@nestjs/common';
import { SlackService } from 'nestjs-slack';

@Injectable()
export class AppService {
  constructor(private slack: SlackService) {}
  sendMessage(params): any {
    const message = `New Pizza! \n ${JSON.stringify(params)}`;
    this.slack.sendText(message, { channel: process.env.CHANNEL });
  }
}
