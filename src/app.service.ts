import { Injectable } from '@nestjs/common';
import { SlackService } from 'nestjs-slack';

@Injectable()
export class AppService {
  constructor(private slack: SlackService) {}
  sendMessage(): string {
    const message = 'Pizza is ready!';
    console.log(process.env);
    this.slack.sendText(message, { channel: process.env.CHANNEL });
    return message;
  }
}
