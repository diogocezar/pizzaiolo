import { Injectable } from '@nestjs/common'
import { SlackService as LibSlackService } from 'nestjs-slack'

@Injectable()
export class SlackService {
  constructor(private slackService: LibSlackService) {}
  sendMessage(message: string): void {
    this.slackService.sendText(message, { channel: process.env.CHANNEL })
  }
}
